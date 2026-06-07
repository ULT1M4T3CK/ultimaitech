"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { sendSurveyEmail } from "@/lib/email";
import type { Prisma, SurveyQuestionType, SurveyTrigger } from "@prisma/client";

async function requireTeacherOrAdmin() {
  const s = await auth();
  const r = s?.user?.role;
  if (r !== "TEACHER" && r !== "ADMIN") throw new Error("Niet geautoriseerd");
  return s!;
}

async function requireStudent() {
  const s = await auth();
  if (!s?.user?.id || s.user.role !== "STUDENT") throw new Error("Niet geautoriseerd");
  return s.user;
}

function revalidateSurveyPaths(surveyId?: string) {
  revalidatePath("/teacher/surveys");
  revalidatePath("/teacher/surveys/send");
  revalidatePath("/dashboard");
  if (surveyId) {
    revalidatePath(`/teacher/surveys/${surveyId}`);
    revalidatePath(`/teacher/surveys/${surveyId}/results`);
  }
}

async function createInvitationAndEmail(params: {
  surveyId: string;
  userId: string;
  trigger: SurveyTrigger;
  attemptId?: string | null;
}) {
  const survey = await db.survey.findUnique({
    where: { id: params.surveyId, isActive: true },
    include: { questions: { orderBy: { order: "asc" } } },
  });
  if (!survey || survey.questions.length === 0) return null;

  const user = await db.user.findUnique({
    where: { id: params.userId },
    select: { id: true, email: true, name: true },
  });
  if (!user) return null;

  const invitation = await db.surveyInvitation.create({
    data: {
      surveyId: params.surveyId,
      userId: params.userId,
      attemptId: params.attemptId ?? null,
      trigger: params.trigger,
    },
    select: { id: true, token: true },
  });

  const emailSent = await sendSurveyEmail({
    to: user.email,
    studentName: user.name,
    surveyTitle: survey.title,
    surveyPath: `/surveys/${invitation.token}`,
  });

  if (emailSent) {
    await db.surveyInvitation.update({
      where: { id: invitation.id },
      data: { emailSent: true },
    });
  }

  return invitation;
}

// --- Teacher CRUD ---

export async function listSurveys() {
  await requireTeacherOrAdmin();
  return db.survey.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { questions: true, invitations: true, assignments: true } },
    },
  });
}

export async function getSurveyById(surveyId: string) {
  await requireTeacherOrAdmin();
  return db.survey.findUnique({
    where: { id: surveyId },
    include: {
      questions: { orderBy: { order: "asc" } },
      assignments: { include: { course: { select: { id: true, name: true } } } },
      _count: { select: { invitations: true } },
    },
  });
}

const surveyMetaSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  isActive: z.boolean().optional(),
});

export async function createSurvey(input: z.infer<typeof surveyMetaSchema>) {
  await requireTeacherOrAdmin();
  const parsed = surveyMetaSchema.safeParse(input);
  if (!parsed.success) throw new Error("Ongeldige gegevens");

  const survey = await db.survey.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      isActive: parsed.data.isActive ?? true,
    },
  });
  revalidateSurveyPaths();
  return survey;
}

export async function updateSurvey(surveyId: string, input: z.infer<typeof surveyMetaSchema>) {
  await requireTeacherOrAdmin();
  const parsed = surveyMetaSchema.safeParse(input);
  if (!parsed.success) throw new Error("Ongeldige gegevens");

  const survey = await db.survey.update({
    where: { id: surveyId },
    data: {
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      isActive: parsed.data.isActive ?? true,
    },
  });
  revalidateSurveyPaths(surveyId);
  return survey;
}

export async function deleteSurvey(surveyId: string) {
  await requireTeacherOrAdmin();
  await db.survey.delete({ where: { id: surveyId } });
  revalidateSurveyPaths();
}

const questionSchema = z.object({
  type: z.enum(["RATING", "TEXT", "SINGLE_CHOICE", "MULTI_CHOICE"]),
  prompt: z.string().min(1).max(2000),
  options: z.array(z.string().min(1)).optional(),
  required: z.boolean().optional(),
});

export async function addSurveyQuestion(surveyId: string, input: z.infer<typeof questionSchema>) {
  await requireTeacherOrAdmin();
  const parsed = questionSchema.safeParse(input);
  if (!parsed.success) throw new Error("Ongeldige vraag");

  const maxOrder = await db.surveyQuestion.aggregate({
    where: { surveyId },
    _max: { order: true },
  });
  const order = (maxOrder._max.order ?? -1) + 1;

  const options =
    parsed.data.type === "SINGLE_CHOICE" || parsed.data.type === "MULTI_CHOICE"
      ? (parsed.data.options ?? [])
      : null;

  if ((parsed.data.type === "SINGLE_CHOICE" || parsed.data.type === "MULTI_CHOICE") && (!options || options.length < 2)) {
    throw new Error("Keuzevragen vereisen minimaal twee opties.");
  }

  const question = await db.surveyQuestion.create({
    data: {
      surveyId,
      type: parsed.data.type as SurveyQuestionType,
      prompt: parsed.data.prompt,
      options: options as Prisma.InputJsonValue | undefined,
      required: parsed.data.required ?? true,
      order,
    },
  });
  revalidateSurveyPaths(surveyId);
  return question;
}

export async function updateSurveyQuestion(
  questionId: string,
  input: z.infer<typeof questionSchema>,
) {
  await requireTeacherOrAdmin();
  const parsed = questionSchema.safeParse(input);
  if (!parsed.success) throw new Error("Ongeldige vraag");

  const existing = await db.surveyQuestion.findUnique({ where: { id: questionId } });
  if (!existing) throw new Error("Vraag niet gevonden");

  const options =
    parsed.data.type === "SINGLE_CHOICE" || parsed.data.type === "MULTI_CHOICE"
      ? (parsed.data.options ?? [])
      : null;

  if ((parsed.data.type === "SINGLE_CHOICE" || parsed.data.type === "MULTI_CHOICE") && (!options || options.length < 2)) {
    throw new Error("Keuzevragen vereisen minimaal twee opties.");
  }

  const question = await db.surveyQuestion.update({
    where: { id: questionId },
    data: {
      type: parsed.data.type as SurveyQuestionType,
      prompt: parsed.data.prompt,
      options: options as Prisma.InputJsonValue | undefined,
      required: parsed.data.required ?? true,
    },
  });
  revalidateSurveyPaths(existing.surveyId);
  return question;
}

export async function deleteSurveyQuestion(questionId: string) {
  await requireTeacherOrAdmin();
  const q = await db.surveyQuestion.findUnique({ where: { id: questionId } });
  if (!q) return;
  await db.surveyQuestion.delete({ where: { id: questionId } });
  revalidateSurveyPaths(q.surveyId);
}

export async function reorderSurveyQuestions(surveyId: string, orderedQuestionIds: string[]) {
  await requireTeacherOrAdmin();
  const questions = await db.surveyQuestion.findMany({
    where: { surveyId },
    select: { id: true },
  });
  const validIds = new Set(questions.map((q) => q.id));
  if (orderedQuestionIds.length !== questions.length || !orderedQuestionIds.every((id) => validIds.has(id))) {
    throw new Error("Ongeldige volgorde");
  }

  await db.$transaction(
    orderedQuestionIds.map((id, order) =>
      db.surveyQuestion.update({ where: { id }, data: { order } }),
    ),
  );
  revalidateSurveyPaths(surveyId);
}

// --- Assignments ---

const assignmentSchema = z.object({
  surveyId: z.string().cuid(),
  courseId: z.string().cuid().nullable(),
  trigger: z.enum(["EXAM_PASSED", "EXAM_FAILED"]),
});

export async function assignSurveyToTrigger(input: z.infer<typeof assignmentSchema>) {
  await requireTeacherOrAdmin();
  const parsed = assignmentSchema.safeParse(input);
  if (!parsed.success) throw new Error("Ongeldige toewijzing");

  const compoundKey = {
    surveyId: parsed.data.surveyId,
    courseId: parsed.data.courseId,
    trigger: parsed.data.trigger,
  } as Prisma.SurveyAssignmentSurveyIdCourseIdTriggerCompoundUniqueInput;

  const assignment = await db.surveyAssignment.upsert({
    where: {
      surveyId_courseId_trigger: compoundKey,
    },
    create: {
      surveyId: parsed.data.surveyId,
      courseId: parsed.data.courseId,
      trigger: parsed.data.trigger,
    },
    update: {
      surveyId: parsed.data.surveyId,
    },
  });
  revalidateSurveyPaths(parsed.data.surveyId);
  return assignment;
}

export async function removeSurveyAssignment(assignmentId: string) {
  await requireTeacherOrAdmin();
  const a = await db.surveyAssignment.findUnique({ where: { id: assignmentId } });
  if (!a) return;
  await db.surveyAssignment.delete({ where: { id: assignmentId } });
  revalidateSurveyPaths(a.surveyId);
}

export async function listCoursesForSurveyAssignment() {
  await requireTeacherOrAdmin();
  return db.course.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    select: { id: true, name: true },
  });
}

// --- Invitations & triggers ---

export async function sendSurveyToStudents(surveyId: string, userIds: string[]) {
  await requireTeacherOrAdmin();
  const uniqueIds = [...new Set(userIds)];
  if (uniqueIds.length === 0) throw new Error("Selecteer minimaal één student.");

  const survey = await db.survey.findUnique({
    where: { id: surveyId, isActive: true },
    include: { _count: { select: { questions: true } } },
  });
  if (!survey) throw new Error("Enquête niet gevonden");
  if (survey._count.questions === 0) throw new Error("Voeg eerst vragen toe aan de enquête.");

  const students = await db.user.findMany({
    where: { id: { in: uniqueIds }, role: "STUDENT" },
    select: { id: true },
  });

  let sent = 0;
  for (const student of students) {
    const inv = await createInvitationAndEmail({
      surveyId,
      userId: student.id,
      trigger: "MANUAL",
    });
    if (inv) sent += 1;
  }

  revalidateSurveyPaths(surveyId);
  return { sent };
}

export async function triggerSurveyAfterExam(
  userId: string,
  attemptId: string,
  courseId: string | null | undefined,
  passed: boolean,
) {
  const trigger: SurveyTrigger = passed ? "EXAM_PASSED" : "EXAM_FAILED";

  const assignments = await db.surveyAssignment.findMany({
    where: {
      trigger,
      survey: { isActive: true },
      OR: courseId
        ? [{ courseId }, { courseId: null }]
        : [{ courseId: null }],
    },
    include: {
      survey: { include: { _count: { select: { questions: true } } } },
    },
  });

  const seenSurveyIds = new Set<string>();
  for (const assignment of assignments) {
    if (assignment.survey._count.questions === 0) continue;
    if (seenSurveyIds.has(assignment.surveyId)) continue;

    const existing = await db.surveyInvitation.findFirst({
      where: {
        userId,
        surveyId: assignment.surveyId,
        attemptId,
        completedAt: null,
      },
    });
    if (existing) {
      seenSurveyIds.add(assignment.surveyId);
      continue;
    }

    await createInvitationAndEmail({
      surveyId: assignment.surveyId,
      userId,
      attemptId,
      trigger,
    });
    seenSurveyIds.add(assignment.surveyId);
  }

  revalidatePath("/dashboard");
}

// --- Student queries ---

export async function getPendingSurveysForUser(userId: string) {
  return db.surveyInvitation.findMany({
    where: { userId, completedAt: null },
    orderBy: { sentAt: "desc" },
    include: {
      survey: { select: { id: true, title: true, description: true } },
    },
  });
}

export async function getPendingSurveyForAttempt(userId: string, attemptId: string) {
  return db.surveyInvitation.findFirst({
    where: { userId, attemptId, completedAt: null },
    include: {
      survey: { select: { id: true, title: true, description: true } },
    },
    orderBy: { sentAt: "desc" },
  });
}

export async function getSurveyInvitationByToken(token: string) {
  const session = await auth();
  const invitation = await db.surveyInvitation.findUnique({
    where: { token },
    include: {
      survey: {
        include: { questions: { orderBy: { order: "asc" } } },
      },
      user: { select: { id: true, name: true } },
      response: { select: { id: true } },
    },
  });
  if (!invitation) return null;

  if (session?.user?.id && session.user.id !== invitation.userId) {
    if (session.user.role === "STUDENT") return null;
  }

  return invitation;
}

const answerInputSchema = z.object({
  questionId: z.string().cuid(),
  value: z.union([z.string(), z.number(), z.array(z.string())]),
});

export async function submitSurveyResponse(
  invitationId: string,
  answers: z.infer<typeof answerInputSchema>[],
) {
  const user = await requireStudent();
  const parsed = z.array(answerInputSchema).safeParse(answers);
  if (!parsed.success) throw new Error("Ongeldige antwoorden");

  const invitation = await db.surveyInvitation.findFirst({
    where: { id: invitationId, userId: user.id, completedAt: null },
    include: {
      survey: { include: { questions: true } },
      response: true,
    },
  });
  if (!invitation) throw new Error("Uitnodiging niet gevonden of al ingevuld.");
  if (invitation.response) throw new Error("Enquête is al ingevuld.");

  const requiredQuestions = invitation.survey.questions.filter((q) => q.required);
  const answeredIds = new Set(parsed.data.map((a) => a.questionId));

  for (const q of requiredQuestions) {
    if (!answeredIds.has(q.id)) throw new Error(`Vraag verplicht: ${q.prompt.slice(0, 50)}…`);
  }

  for (const a of parsed.data) {
    const q = invitation.survey.questions.find((x) => x.id === a.questionId);
    if (!q) throw new Error("Ongeldige vraag");
    validateAnswerValue(q.type, a.value, q.options);
  }

  await db.$transaction(async (tx) => {
    const response = await tx.surveyResponse.create({
      data: { invitationId: invitation.id },
    });
    await tx.surveyAnswer.createMany({
      data: parsed.data.map((a) => ({
        responseId: response.id,
        questionId: a.questionId,
        value: JSON.stringify(a.value),
      })),
    });
    await tx.surveyInvitation.update({
      where: { id: invitation.id },
      data: { completedAt: new Date() },
    });
  });

  revalidatePath("/dashboard");
  revalidatePath(`/surveys/${invitation.token}`);
  revalidateSurveyPaths(invitation.surveyId);

  return { ok: true };
}

function validateAnswerValue(
  type: SurveyQuestionType,
  value: string | number | string[],
  options: Prisma.JsonValue | null,
) {
  if (type === "RATING") {
    const n = typeof value === "number" ? value : Number(value);
    if (!Number.isInteger(n) || n < 1 || n > 5) throw new Error("Beoordeling moet tussen 1 en 5 liggen.");
    return;
  }
  if (type === "TEXT") {
    if (typeof value !== "string" || value.trim().length === 0) throw new Error("Tekstantwoord is verplicht.");
    return;
  }
  const opts = Array.isArray(options) ? (options as string[]) : [];
  if (type === "SINGLE_CHOICE") {
    if (typeof value !== "string" || !opts.includes(value)) throw new Error("Ongeldige keuze.");
    return;
  }
  if (type === "MULTI_CHOICE") {
    if (!Array.isArray(value) || value.length === 0) throw new Error("Selecteer minimaal één optie.");
    if (!value.every((v) => opts.includes(v))) throw new Error("Ongeldige keuze.");
  }
}

// --- Results ---

export async function getSurveyResults(surveyId: string) {
  await requireTeacherOrAdmin();

  const survey = await db.survey.findUnique({
    where: { id: surveyId },
    include: {
      questions: { orderBy: { order: "asc" } },
      invitations: {
        include: {
          user: { select: { id: true, name: true, email: true } },
          response: {
            include: { answers: true },
          },
        },
        orderBy: { sentAt: "desc" },
      },
    },
  });
  if (!survey) return null;

  const completed = survey.invitations.filter((i) => i.response);
  const pending = survey.invitations.filter((i) => !i.completedAt);

  return {
    survey: {
      id: survey.id,
      title: survey.title,
      description: survey.description,
      questions: survey.questions,
    },
    stats: {
      totalInvitations: survey.invitations.length,
      completed: completed.length,
      pending: pending.length,
    },
    responses: completed.map((inv) => ({
      invitationId: inv.id,
      studentName: inv.user.name,
      studentEmail: inv.user.email,
      submittedAt: inv.response!.submittedAt,
      trigger: inv.trigger,
      answers: inv.response!.answers.map((a) => {
        const q = survey.questions.find((x) => x.id === a.questionId);
        let parsed: unknown = a.value;
        try {
          parsed = JSON.parse(a.value);
        } catch {
          /* keep string */
        }
        return {
          questionId: a.questionId,
          prompt: q?.prompt ?? "—",
          type: q?.type,
          value: parsed,
        };
      }),
    })),
  };
}

export async function listStudentsForSurveySend() {
  const session = await requireTeacherOrAdmin();
  const isAdmin = session.user.role === "ADMIN";

  return db.user.findMany({
    where: {
      role: "STUDENT",
      ...(isAdmin ? {} : { invitedById: session.user.id }),
    },
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true },
  });
}
