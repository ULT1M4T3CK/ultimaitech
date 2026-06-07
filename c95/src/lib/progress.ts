import { db } from "@/lib/db";
import { sectionResult } from "@/lib/scoring";

export type SectionProgress = {
  id: string;
  name: string;
  order: number;
  phaseLabel: string | null;
  code: string | null;
  passingQuestionCount: number;
  questionCount: number;
  autoQuestionCount: number;
  everPassed: boolean;
  bestCorrect: number;
  bestTotal: number;
  lastSubmittedAt: Date | null;
};

export type QuestionSetProgress = {
  id: string;
  name: string;
  order: number;
  passingSectionCount: number;
  sections: SectionProgress[];
  passedSectionCount: number;
  setPassed: boolean;
};

export type CourseProgress = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
  questionSets: QuestionSetProgress[];
};

function mergeSectionAgg(
  map: Map<string, { everPassed: boolean; bestCorrect: number; bestTotal: number; lastSubmittedAt: Date | null }>,
  sectionId: string,
  update: { everPassed: boolean; correctCount: number; totalCount: number; submittedAt: Date },
) {
  const existing = map.get(sectionId);
  if (!existing) {
    map.set(sectionId, {
      everPassed: update.everPassed,
      bestCorrect: update.correctCount,
      bestTotal: update.totalCount,
      lastSubmittedAt: update.submittedAt,
    });
    return;
  }
  existing.everPassed = existing.everPassed || update.everPassed;
  if (update.correctCount > existing.bestCorrect) {
    existing.bestCorrect = update.correctCount;
    existing.bestTotal = update.totalCount;
  }
  if (!existing.lastSubmittedAt || update.submittedAt > existing.lastSubmittedAt) {
    existing.lastSubmittedAt = update.submittedAt;
  }
  map.set(sectionId, existing);
}

/**
 * Full learner progress tree: all active courses → question sets → sections.
 */
export async function getStudentProgressByCourse(userId: string): Promise<CourseProgress[]> {
  const courses = await db.course.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    include: {
      questionSets: {
        orderBy: { order: "asc" },
        include: {
          sections: {
            orderBy: { order: "asc" },
            include: {
              _count: {
                select: {
                  questions: true,
                },
              },
              questions: { select: { gradingMode: true } },
            },
          },
        },
      },
    },
  });

  const sectionIds = courses.flatMap((c) =>
    c.questionSets.flatMap((qs) => qs.sections.map((s) => s.id)),
  );
  const setIds = courses.flatMap((c) => c.questionSets.map((qs) => qs.id));

  const passingBySection = new Map<string, number>();
  for (const c of courses) {
    for (const qs of c.questionSets) {
      for (const st of qs.sections) {
        passingBySection.set(st.id, st.passingQuestionCount);
      }
    }
  }

  const [sectionAttempts, setAttempts] = await Promise.all([
    sectionIds.length > 0
      ? db.examAttempt.findMany({
      where: { userId, submittedAt: { not: null }, sectionId: { in: sectionIds } },
      select: {
        sectionId: true,
        passed: true,
        correctCount: true,
        totalCount: true,
        submittedAt: true,
      },
      orderBy: { submittedAt: "desc" },
    })
      : Promise.resolve([]),
    setIds.length > 0
      ? db.examAttempt.findMany({
          where: {
            userId,
            submittedAt: { not: null },
            questionSetId: { in: setIds },
            sectionId: null,
            mode: { in: ["EXAM", "COURSE_RUN"] },
          },
          include: {
            answers: {
              select: {
                sectionIdSnapshot: true,
                isCorrect: true,
                safetyFailed: true,
              },
            },
          },
          orderBy: { submittedAt: "desc" },
        })
      : Promise.resolve([]),
  ]);

  const bySection = new Map<
    string,
    { everPassed: boolean; bestCorrect: number; bestTotal: number; lastSubmittedAt: Date | null }
  >();

  for (const a of sectionAttempts) {
    if (!a.sectionId || !a.submittedAt) continue;
    mergeSectionAgg(bySection, a.sectionId, {
      everPassed: a.passed,
      correctCount: a.correctCount,
      totalCount: a.totalCount,
      submittedAt: a.submittedAt,
    });
  }

  for (const attempt of setAttempts) {
    if (!attempt.submittedAt) continue;
    const grouped = new Map<string, { correctCount: number; totalCount: number; safetyFailed: boolean }>();
    for (const ans of attempt.answers) {
      const sid = ans.sectionIdSnapshot;
      if (!sid) continue;
      const g = grouped.get(sid) ?? { correctCount: 0, totalCount: 0, safetyFailed: false };
      g.totalCount += 1;
      if (ans.isCorrect) g.correctCount += 1;
      if (ans.safetyFailed) g.safetyFailed = true;
      grouped.set(sid, g);
    }
    for (const [sectionId, g] of grouped) {
      const passingQuestionCount = passingBySection.get(sectionId) ?? 0;
      const { passed } = sectionResult({
        passingQuestionCount,
        correctCount: g.correctCount,
        totalCount: g.totalCount,
        safetyFailed: g.safetyFailed,
      });
      mergeSectionAgg(bySection, sectionId, {
        everPassed: passed,
        correctCount: g.correctCount,
        totalCount: g.totalCount,
        submittedAt: attempt.submittedAt!,
      });
    }
  }

  return courses.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    order: c.order,
    questionSets: c.questionSets.map((qs) => {
      const sections: SectionProgress[] = qs.sections.map((st) => {
        const agg = bySection.get(st.id);
        const autoQuestionCount = st.questions.filter((q) => q.gradingMode === "AUTO").length;
        return {
          id: st.id,
          name: st.name,
          order: st.order,
          phaseLabel: st.phaseLabel,
          code: st.code,
          passingQuestionCount: st.passingQuestionCount,
          questionCount: st._count.questions,
          autoQuestionCount,
          everPassed: agg?.everPassed ?? false,
          bestCorrect: agg?.bestCorrect ?? 0,
          bestTotal: agg?.bestTotal ?? 0,
          lastSubmittedAt: agg?.lastSubmittedAt ?? null,
        };
      });

      const passedSectionCount = sections.filter((s) => s.everPassed).length;
      const setPassed =
        sections.length > 0 && passedSectionCount >= qs.passingSectionCount;

      return {
        id: qs.id,
        name: qs.name,
        order: qs.order,
        passingSectionCount: qs.passingSectionCount,
        sections,
        passedSectionCount,
        setPassed,
      };
    }),
  }));
}

/** @deprecated Use getStudentProgressByCourse — kept for gradual migration */
export async function getStudentDashboard(userId: string) {
  const byCourse = await getStudentProgressByCourse(userId);
  return byCourse.flatMap((c) => c.questionSets.map((qs) => ({
    id: qs.id,
    name: qs.name,
    order: qs.order,
    passingSubTopicCount: qs.passingSectionCount,
    subTopics: qs.sections.map((s) => ({
      id: s.id,
      name: s.name,
      order: s.order,
      passingQuestionCount: s.passingQuestionCount,
      questionCount: s.questionCount,
      everPassed: s.everPassed,
      bestCorrect: s.bestCorrect,
      bestTotal: s.bestTotal,
      lastSubmittedAt: s.lastSubmittedAt,
    })),
    passedSubTopicCount: qs.passedSectionCount,
    topicPassed: qs.setPassed,
  })));
}
