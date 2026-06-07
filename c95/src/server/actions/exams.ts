"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { correctOptionIdsFromOptions, isAnswerCorrect, isAutoGradedWalkthroughType, sectionResult } from "@/lib/scoring";
import { triggerSurveyAfterExam } from "@/server/actions/surveys";
import type { AttemptMode, Prisma, QuestionType, GradingMode } from "@prisma/client";

async function requireStudent() {
  const s = await auth();
  if (!s?.user?.id || s.user.role !== "STUDENT") throw new Error("Niet geautoriseerd");
  return s.user;
}

type AttemptContext = {
  mode?: AttemptMode;
};

function normalizeAttemptMode(mode: AttemptMode | undefined, fallback: AttemptMode): AttemptMode {
  if (mode === "COURSE_RUN") return "COURSE_RUN";
  return fallback;
}

/** Mark any in-progress attempts matching the filter as failed (abandoned). */
async function abandonInProgressAttempts(where: { userId: string } & Record<string, unknown>) {
  await db.examAttempt.updateMany({
    where: { ...where, submittedAt: null },
    data: {
      submittedAt: new Date(),
      passed: false,
      correctCount: 0,
      safetyFailed: false,
    },
  });
}

async function revalidateAttemptSurfaces(
  courseId: string | null | undefined,
  setId: string | null | undefined,
  sectionId: string | null | undefined,
  attemptId?: string,
  options?: { setExam?: boolean },
) {
  revalidatePath("/dashboard");
  revalidatePath("/courses");
  if (courseId) revalidatePath(`/courses/${courseId}`);
  if (courseId && setId) revalidatePath(`/courses/${courseId}/sets/${setId}`);
  if (courseId && setId && sectionId) revalidatePath(`/courses/${courseId}/sets/${setId}/sections/${sectionId}`);
  if (courseId && setId && options?.setExam && attemptId) {
    revalidatePath(`/courses/${courseId}/sets/${setId}/exam`);
    revalidatePath(`/courses/${courseId}/sets/${setId}/result/${attemptId}`);
  }
  if (courseId && setId && sectionId && attemptId) {
    revalidatePath(`/courses/${courseId}/sets/${setId}/sections/${sectionId}/result/${attemptId}`);
  }
}

export async function startExamAttempt(sectionId: string, context: AttemptContext = {}) {
  const user = await requireStudent();
  const mode = normalizeAttemptMode(context.mode, "EXAM");

  const sub = await db.section.findUnique({
    where: { id: sectionId },
    include: {
      questionSet: { select: { id: true, name: true, courseId: true } },
      questions: {
        where: { gradingMode: "AUTO" },
        orderBy: { order: "asc" },
        select: { id: true, type: true, gradingMode: true },
      },
    },
  });
  if (!sub) throw new Error("Onderdeel niet gevonden");

  const walkthroughQuestions = sub.questions.filter((q) => isAutoGradedWalkthroughType(q.type, q.gradingMode));
  if (walkthroughQuestions.length === 0) {
    throw new Error("Nog geen automatisch beoordeelde vragen in dit onderdeel. Gebruik Studiemodus voor door instructeur beoordeelde items.");
  }

  await abandonInProgressAttempts({ userId: user.id, sectionId, mode });

  return db.examAttempt.create({
    data: {
      userId: user.id,
      sectionId,
      courseId: sub.questionSet.courseId,
      sectionName: sub.name,
      questionSetName: sub.questionSet.name,
      mode,
      totalCount: walkthroughQuestions.length,
    },
    select: { id: true },
  });
}

export async function startStudyAttempt(sectionId: string, context: AttemptContext = {}) {
  const user = await requireStudent();
  const mode = normalizeAttemptMode(context.mode, "STUDY");

  const section = await db.section.findUnique({
    where: { id: sectionId },
    include: {
      questionSet: { select: { id: true, name: true, courseId: true } },
      _count: { select: { questions: true } },
    },
  });
  if (!section) throw new Error("Onderdeel niet gevonden");

  const existing = await db.examAttempt.findFirst({
    where: { userId: user.id, sectionId, submittedAt: null, mode },
    orderBy: { startedAt: "desc" },
    select: { id: true },
  });
  if (existing) return existing;

  return db.examAttempt.create({
    data: {
      userId: user.id,
      sectionId,
      courseId: section.questionSet.courseId,
      sectionName: section.name,
      questionSetName: section.questionSet.name,
      mode,
      correctCount: section._count.questions,
      totalCount: section._count.questions,
    },
    select: { id: true },
  });
}

const submitSchema = z.object({
  attemptId: z.string().cuid(),
  answers: z.array(
    z.object({
      questionId: z.string().cuid(),
      selectedOptionIds: z.array(z.string()),
    }),
  ),
});

export async function submitExamAttempt(input: z.infer<typeof submitSchema>) {
  const user = await requireStudent();
  const parsed = submitSchema.safeParse(input);
  if (!parsed.success) throw new Error("Ongeldige gegevens");

  const { attemptId, answers } = parsed.data;
  const questionIds = new Set(answers.map((x) => x.questionId));
  if (questionIds.size !== answers.length) {
    throw new Error("Dubbele antwoorden op dezelfde vraag.");
  }

  const attempt = await db.examAttempt.findFirst({
    where: { id: attemptId, userId: user.id, submittedAt: null, mode: { in: ["EXAM", "COURSE_RUN"] } },
    include: {
      section: {
        include: {
          questionSet: true,
          questions: {
            where: { gradingMode: "AUTO" },
            include: { options: true },
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!attempt?.section) throw new Error("Poging niet gevonden of al ingeleverd.");

  const questions = attempt.section.questions.filter((q) => isAutoGradedWalkthroughType(q.type, q.gradingMode));
  if (questions.length !== answers.length) throw new Error("Beantwoord alle vragen voordat je inlevert.");

  const byId = new Map(questions.map((q) => [q.id, q]));
  for (const a of answers) {
    if (!byId.has(a.questionId)) throw new Error("Ongeldige vraag in poging.");
  }

  let safetyFailed = false;
  const orderedAnswers = questions.map((q) => {
    const sel = answers.find((x) => x.questionId === q.id);
    if (!sel) throw new Error("Antwoord ontbreekt");
    const correctIds = correctOptionIdsFromOptions(q.options);
    const ok = isAnswerCorrect(q.type, correctIds, sel.selectedOptionIds);
    if (q.safetyCritical && !ok) safetyFailed = true;
    const optionsSnapshot = q.options
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((o) => ({
        id: o.id,
        text: o.text,
        isCorrect: o.isCorrect,
        imageUrl: o.imageUrl,
      })) as Prisma.InputJsonValue;

    return {
      questionOrder: q.order,
      prompt: q.prompt,
      type: q.type,
      gradingMode: q.gradingMode,
      imageUrl: q.imageUrl,
      feedbackSnapshot: q.feedback,
      optionsSnapshot,
      selectedOptionIds: sel.selectedOptionIds,
      isCorrect: ok,
      safetyFailed: q.safetyCritical && !ok,
    };
  });

  const correctCount = orderedAnswers.filter((a) => a.isCorrect).length;
  const { passed } = sectionResult({
    passingQuestionCount: attempt.section.passingQuestionCount,
    correctCount,
    totalCount: questions.length,
    safetyFailed,
  });

  await db.$transaction(async (tx) => {
    await tx.examAnswer.createMany({
      data: orderedAnswers.map((a) => ({
        attemptId,
        questionOrder: a.questionOrder,
        prompt: a.prompt,
        type: a.type,
        gradingMode: a.gradingMode,
        imageUrl: a.imageUrl,
        feedbackSnapshot: a.feedbackSnapshot,
        optionsSnapshot: a.optionsSnapshot,
        selectedOptionIds: a.selectedOptionIds,
        isCorrect: a.isCorrect,
        safetyFailed: a.safetyFailed,
      })),
    });
    await tx.examAttempt.update({
      where: { id: attemptId },
      data: {
        submittedAt: new Date(),
        correctCount,
        totalCount: questions.length,
        passed,
        safetyFailed,
      },
    });
  });

  const courseId = attempt.section.questionSet.courseId;
  const setId = attempt.section.questionSet.id;

  await revalidateAttemptSurfaces(courseId, setId, attempt.sectionId, attemptId);

  void triggerSurveyAfterExam(user.id, attemptId, courseId, passed).catch((err) => {
    console.error("[survey] trigger after section exam failed:", err);
  });

  return { attemptId, passed, correctCount, totalCount: questions.length, safetyFailed };
}

export async function completeStudyAttempt(attemptId: string) {
  const user = await requireStudent();
  const parsed = z.string().cuid().safeParse(attemptId);
  if (!parsed.success) throw new Error("Ongeldige poging");

  const attempt = await db.examAttempt.findFirst({
    where: {
      id: parsed.data,
      userId: user.id,
      submittedAt: null,
      mode: { in: ["STUDY", "COURSE_RUN"] },
    },
    include: {
      section: { include: { questionSet: { select: { id: true, courseId: true } } } },
    },
  });
  if (!attempt) throw new Error("Poging niet gevonden of al afgerond.");

  await db.examAttempt.update({
    where: { id: attempt.id },
    data: {
      submittedAt: new Date(),
      passed: true,
      safetyFailed: false,
      correctCount: attempt.totalCount,
    },
  });

  await revalidateAttemptSurfaces(attempt.courseId, attempt.section?.questionSet.id, attempt.sectionId, attempt.id);

  return {
    attemptId: attempt.id,
    passed: true,
    courseId: attempt.courseId,
    setId: attempt.section?.questionSet.id ?? null,
    sectionId: attempt.sectionId,
    mode: attempt.mode,
  };
}

export async function abandonAttemptForStudent(attemptId: string) {
  const user = await requireStudent();
  const parsed = z.string().cuid().safeParse(attemptId);
  if (!parsed.success) throw new Error("Ongeldige poging");

  const attempt = await db.examAttempt.findFirst({
    where: { id: parsed.data, userId: user.id, submittedAt: null },
    include: {
      section: { include: { questionSet: { select: { id: true, courseId: true } } } },
      questionSet: { select: { id: true, courseId: true } },
    },
  });
  if (!attempt) return { abandoned: false };

  await db.examAttempt.update({
    where: { id: attempt.id },
    data: {
      submittedAt: new Date(),
      passed: false,
      correctCount: 0,
      safetyFailed: false,
    },
  });

  const setId = attempt.questionSetId ?? attempt.section?.questionSet.id ?? null;
  const isSetExam = Boolean(attempt.questionSetId && !attempt.sectionId);
  await revalidateAttemptSurfaces(attempt.courseId, setId, attempt.sectionId, attempt.id, {
    setExam: isSetExam,
  });

  return { abandoned: true, attemptId: attempt.id };
}

export async function getExamAttemptForStudent(attemptId: string) {
  const user = await requireStudent();
  return db.examAttempt.findFirst({
    where: { id: attemptId, userId: user.id, submittedAt: { not: null } },
    include: {
      answers: { orderBy: { questionOrder: "asc" } },
      section: { select: { id: true, questionSetId: true } },
      questionSet: {
        select: {
          id: true,
          name: true,
          passingSectionCount: true,
          sections: { select: { id: true, name: true, order: true, passingQuestionCount: true } },
        },
      },
    },
  });
}

export type ExamQuestionClient = {
  id: string;
  type: QuestionType;
  gradingMode: GradingMode;
  prompt: string;
  imageUrl: string | null;
  order: number;
  scenario: { title: string; body: string } | null;
  images: { id: string; url: string; caption: string | null }[];
  options: { id: string; text: string; imageUrl: string | null }[];
  section?: { id: string; name: string; order: number };
};

export async function getQuestionsForWalkthrough(sectionId: string) {
  await requireStudent();
  const sub = await db.section.findUnique({
    where: { id: sectionId },
    include: {
      questions: {
        where: { gradingMode: "AUTO" },
        orderBy: { order: "asc" },
        include: {
          options: { orderBy: { order: "asc" } },
          images: { orderBy: { order: "asc" } },
          scenario: { select: { title: true, body: true } },
        },
      },
      questionSet: { select: { id: true, courseId: true } },
    },
  });
  if (!sub) return null;

  const questions: ExamQuestionClient[] = sub.questions
    .filter((q) => isAutoGradedWalkthroughType(q.type, q.gradingMode))
    .map((q) => ({
      id: q.id,
      type: q.type,
      gradingMode: q.gradingMode,
      prompt: q.prompt,
      imageUrl: q.imageUrl,
      order: q.order,
      scenario: q.scenario ? { title: q.scenario.title, body: q.scenario.body } : null,
      images: q.images.map((im) => ({ id: im.id, url: im.url, caption: im.caption })),
      options: q.options.map((o) => ({ id: o.id, text: o.text, imageUrl: o.imageUrl })),
    }));

  return {
    sectionId: sub.id,
    questionSetId: sub.questionSet.id,
    courseId: sub.questionSet.courseId,
    questions,
  };
}

export async function startExamSession(sectionId: string, context: AttemptContext = {}) {
  const { id: attemptId } = await startExamAttempt(sectionId, context);
  const walk = await getQuestionsForWalkthrough(sectionId);
  if (!walk) throw new Error("Onderdeel niet gevonden");
  return { attemptId, ...walk };
}

export async function startSetExamAttempt(setId: string, context: AttemptContext = {}) {
  const user = await requireStudent();
  const mode = normalizeAttemptMode(context.mode, "EXAM");

  const set = await db.questionSet.findUnique({
    where: { id: setId },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: {
          questions: {
            where: { gradingMode: "AUTO" },
            orderBy: { order: "asc" },
            select: { id: true, type: true, gradingMode: true },
          },
        },
      },
    },
  });
  if (!set) throw new Error("Vragenset niet gevonden");

  const walkthroughQuestions = set.sections.flatMap((section) =>
    section.questions.filter((q) => isAutoGradedWalkthroughType(q.type, q.gradingMode)),
  );
  if (walkthroughQuestions.length === 0) {
    throw new Error(
      "Nog geen automatisch beoordeelde vragen in deze vragenset. Gebruik Studiemodus voor door instructeur beoordeelde items.",
    );
  }

  await abandonInProgressAttempts({ userId: user.id, questionSetId: setId, sectionId: null, mode });

  return db.examAttempt.create({
    data: {
      userId: user.id,
      questionSetId: setId,
      courseId: set.courseId,
      sectionName: "Hele vragenset",
      questionSetName: set.name,
      mode,
      totalCount: walkthroughQuestions.length,
    },
    select: { id: true },
  });
}

export async function getQuestionsForSetWalkthrough(setId: string) {
  await requireStudent();
  const set = await db.questionSet.findUnique({
    where: { id: setId },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: {
          questions: {
            where: { gradingMode: "AUTO" },
            orderBy: { order: "asc" },
            include: {
              options: { orderBy: { order: "asc" } },
              images: { orderBy: { order: "asc" } },
              scenario: { select: { title: true, body: true } },
            },
          },
        },
      },
    },
  });
  if (!set) return null;

  let globalOrder = 0;
  const questions: ExamQuestionClient[] = [];
  for (const section of set.sections) {
    for (const q of section.questions) {
      if (!isAutoGradedWalkthroughType(q.type, q.gradingMode)) continue;
      globalOrder += 1;
      questions.push({
        id: q.id,
        type: q.type,
        gradingMode: q.gradingMode,
        prompt: q.prompt,
        imageUrl: q.imageUrl,
        order: globalOrder,
        scenario: q.scenario ? { title: q.scenario.title, body: q.scenario.body } : null,
        images: q.images.map((im) => ({ id: im.id, url: im.url, caption: im.caption })),
        options: q.options.map((o) => ({ id: o.id, text: o.text, imageUrl: o.imageUrl })),
        section: { id: section.id, name: section.name, order: section.order },
      });
    }
  }

  return {
    questionSetId: set.id,
    courseId: set.courseId,
    questions,
  };
}

export async function startSetExamSession(setId: string, context: AttemptContext = {}) {
  const { id: attemptId } = await startSetExamAttempt(setId, context);
  const walk = await getQuestionsForSetWalkthrough(setId);
  if (!walk) throw new Error("Vragenset niet gevonden");
  return { attemptId, ...walk };
}

export async function submitSetExamAttempt(input: z.infer<typeof submitSchema>) {
  const user = await requireStudent();
  const parsed = submitSchema.safeParse(input);
  if (!parsed.success) throw new Error("Ongeldige gegevens");

  const { attemptId, answers } = parsed.data;
  const questionIds = new Set(answers.map((x) => x.questionId));
  if (questionIds.size !== answers.length) {
    throw new Error("Dubbele antwoorden op dezelfde vraag.");
  }

  const attempt = await db.examAttempt.findFirst({
    where: {
      id: attemptId,
      userId: user.id,
      submittedAt: null,
      questionSetId: { not: null },
      sectionId: null,
      mode: { in: ["EXAM", "COURSE_RUN"] },
    },
    include: {
      questionSet: {
        include: {
          sections: {
            orderBy: { order: "asc" },
            include: {
              questions: {
                where: { gradingMode: "AUTO" },
                include: { options: true },
                orderBy: { order: "asc" },
              },
            },
          },
        },
      },
    },
  });

  if (!attempt?.questionSet) throw new Error("Poging niet gevonden of al ingeleverd.");

  const questionSet = attempt.questionSet;
  const flatQuestions: {
    q: (typeof questionSet.sections)[0]["questions"][0];
    section: (typeof questionSet.sections)[0];
  }[] = [];
  for (const section of questionSet.sections) {
    for (const q of section.questions) {
      if (isAutoGradedWalkthroughType(q.type, q.gradingMode)) {
        flatQuestions.push({ q, section });
      }
    }
  }

  if (flatQuestions.length !== answers.length) throw new Error("Beantwoord alle vragen voordat je inlevert.");

  const byId = new Map(flatQuestions.map(({ q, section }) => [q.id, { q, section }]));
  for (const a of answers) {
    if (!byId.has(a.questionId)) throw new Error("Ongeldige vraag in poging.");
  }

  let globalOrder = 0;
  let overallSafetyFailed = false;
  const sectionScores = new Map<
    string,
    { section: (typeof questionSet.sections)[0]; correctCount: number; totalCount: number; safetyFailed: boolean }
  >();

  const orderedAnswers = flatQuestions.map(({ q, section }) => {
    globalOrder += 1;
    const sel = answers.find((x) => x.questionId === q.id);
    if (!sel) throw new Error("Antwoord ontbreekt");
    const correctIds = correctOptionIdsFromOptions(q.options);
    const ok = isAnswerCorrect(q.type, correctIds, sel.selectedOptionIds);
    const qSafetyFailed = q.safetyCritical && !ok;
    if (qSafetyFailed) overallSafetyFailed = true;

    const sectionEntry = sectionScores.get(section.id) ?? {
      section,
      correctCount: 0,
      totalCount: 0,
      safetyFailed: false,
    };
    sectionEntry.totalCount += 1;
    if (ok) sectionEntry.correctCount += 1;
    if (qSafetyFailed) sectionEntry.safetyFailed = true;
    sectionScores.set(section.id, sectionEntry);

    const optionsSnapshot = q.options
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((o) => ({
        id: o.id,
        text: o.text,
        isCorrect: o.isCorrect,
        imageUrl: o.imageUrl,
      })) as Prisma.InputJsonValue;

    return {
      questionOrder: globalOrder,
      prompt: q.prompt,
      type: q.type,
      gradingMode: q.gradingMode,
      imageUrl: q.imageUrl,
      feedbackSnapshot: q.feedback,
      optionsSnapshot,
      selectedOptionIds: sel.selectedOptionIds,
      isCorrect: ok,
      safetyFailed: qSafetyFailed,
      sectionIdSnapshot: section.id,
      sectionNameSnapshot: section.name,
      sectionOrderSnapshot: section.order,
    };
  });

  let sectionsPassedInAttempt = 0;
  for (const { section, correctCount, totalCount, safetyFailed } of sectionScores.values()) {
    const { passed } = sectionResult({
      passingQuestionCount: section.passingQuestionCount,
      correctCount,
      totalCount,
      safetyFailed,
    });
    if (passed) sectionsPassedInAttempt += 1;
  }

  const correctCount = orderedAnswers.filter((a) => a.isCorrect).length;
  const passed =
    sectionsPassedInAttempt >= questionSet.passingSectionCount && questionSet.sections.length > 0;

  await db.$transaction(async (tx) => {
    await tx.examAnswer.createMany({
      data: orderedAnswers.map((a) => ({
        attemptId,
        questionOrder: a.questionOrder,
        prompt: a.prompt,
        type: a.type,
        gradingMode: a.gradingMode,
        imageUrl: a.imageUrl,
        feedbackSnapshot: a.feedbackSnapshot,
        optionsSnapshot: a.optionsSnapshot,
        selectedOptionIds: a.selectedOptionIds,
        isCorrect: a.isCorrect,
        safetyFailed: a.safetyFailed,
        sectionIdSnapshot: a.sectionIdSnapshot,
        sectionNameSnapshot: a.sectionNameSnapshot,
        sectionOrderSnapshot: a.sectionOrderSnapshot,
      })),
    });
    await tx.examAttempt.update({
      where: { id: attemptId },
      data: {
        submittedAt: new Date(),
        correctCount,
        totalCount: flatQuestions.length,
        passed,
        safetyFailed: overallSafetyFailed,
      },
    });
  });

  await revalidateAttemptSurfaces(questionSet.courseId, questionSet.id, null, attemptId, { setExam: true });

  void triggerSurveyAfterExam(user.id, attemptId, questionSet.courseId, passed).catch((err) => {
    console.error("[survey] trigger after set exam failed:", err);
  });

  return {
    attemptId,
    passed,
    correctCount,
    totalCount: flatQuestions.length,
    safetyFailed: overallSafetyFailed,
    sectionsPassedInAttempt,
    passingSectionCount: questionSet.passingSectionCount,
  };
}

export async function getSectionStudyContent(sectionId: string) {
  await requireStudent();
  const sub = await db.section.findUnique({
    where: { id: sectionId },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: {
          options: { orderBy: { order: "asc" } },
          criteria: { orderBy: { order: "asc" } },
          images: { orderBy: { order: "asc" } },
          scenario: { select: { title: true, body: true } },
        },
      },
      questionSet: { select: { id: true, name: true, courseId: true } },
    },
  });
  if (!sub) return null;
  return sub;
}
