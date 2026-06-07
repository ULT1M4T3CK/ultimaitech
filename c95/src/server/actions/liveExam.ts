"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";
import type { GradingMode, QuestionType } from "@prisma/client";

async function requireTeacherOrAdmin() {
  const s = await auth();
  const r = s?.user?.role;
  if (r !== "TEACHER" && r !== "ADMIN") throw new Error("Niet geautoriseerd");
  return s!.user;
}

export async function listStudentsForLiveExam() {
  const user = await requireTeacherOrAdmin();
  return db.user.findMany({
    where: {
      role: "STUDENT",
      ...(user.role === "ADMIN" ? {} : { invitedById: user.id }),
    },
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true },
  });
}

/** Create session + grade rows with snapshots for every question in the set (all sections, ordered). */
export async function startLiveExamSession(input: { studentId: string; questionSetId: string }) {
  const teacher = await requireTeacherOrAdmin();
  const { studentId, questionSetId } = input;

  const set = await db.questionSet.findFirst({
    where: { id: questionSetId },
    include: {
      course: { select: { id: true } },
      sections: {
        orderBy: { order: "asc" },
        include: {
          questions: {
            orderBy: { order: "asc" },
            include: { options: true, criteria: { orderBy: { order: "asc" } } },
          },
        },
      },
    },
  });
  if (!set) throw new Error("Vragenset niet gevonden");

  const student = await db.user.findFirst({
    where: {
      id: studentId,
      role: "STUDENT",
      ...(teacher.role === "ADMIN" ? {} : { invitedById: teacher.id }),
    },
  });
  if (!student) throw new Error("Student niet gevonden");

  const session = await db.liveExamSession.create({
    data: {
      teacherId: teacher.id,
      studentId,
      courseId: set.courseId,
      questionSetId,
      status: "IN_PROGRESS",
    },
  });

  const gradeRows: Prisma.LiveExamGradeCreateManyInput[] = [];

  for (const sec of set.sections) {
    for (const q of sec.questions) {
      const optionsSnapshot = (
        q.options.length > 0
          ? q.options.map((o) => ({
              id: o.id,
              text: o.text,
              imageUrl: o.imageUrl,
              isCorrect: o.isCorrect,
              order: o.order,
            }))
          : []
      ) as Prisma.InputJsonValue;
      const criteriaSnapshot = (
        q.criteria.length > 0
          ? q.criteria.map((c) => ({
              id: c.id,
              text: c.text,
              order: c.order,
              isRequired: c.isRequired,
            }))
          : []
      ) as Prisma.InputJsonValue;

      gradeRows.push({
        sessionId: session.id,
        questionId: q.id,
        sectionOrder: sec.order,
        questionOrder: q.order,
        promptSnapshot: q.prompt,
        typeSnapshot: q.type,
        gradingModeSnapshot: q.gradingMode,
        optionsSnapshot,
        criteriaSnapshot,
      });
    }
  }

  if (gradeRows.length > 0) {
    await db.liveExamGrade.createMany({ data: gradeRows });
  }

  revalidatePath("/teacher/live-exam");
  revalidatePath(`/teacher/students/${studentId}`);
  return { sessionId: session.id };
}

export async function getLiveExamSession(sessionId: string) {
  const user = await requireTeacherOrAdmin();
  return db.liveExamSession.findFirst({
    where: { id: sessionId, teacherId: user.id },
    include: {
      grades: { orderBy: [{ sectionOrder: "asc" }, { questionOrder: "asc" }] },
      student: { select: { id: true, name: true, email: true } },
      teacher: { select: { id: true, name: true } },
      questionSet: { select: { name: true } },
      course: { select: { name: true } },
    },
  });
}

const gradeSchema = z.object({
  gradeId: z.string().cuid(),
  passed: z.boolean(),
  criteriaPassedIds: z.array(z.string()).optional(),
  instructorNotes: z.string().optional(),
  safetyFailed: z.boolean().optional(),
});

export async function updateLiveExamGrade(raw: z.infer<typeof gradeSchema>) {
  const user = await requireTeacherOrAdmin();
  const parsed = gradeSchema.safeParse(raw);
  if (!parsed.success) throw new Error("Invalid");

  const grade = await db.liveExamGrade.findFirst({
    where: { id: parsed.data.gradeId },
    include: { session: true },
  });
  if (!grade || grade.session.teacherId !== user.id) throw new Error("Niet gevonden");

  await db.liveExamGrade.update({
    where: { id: grade.id },
    data: {
      passed: parsed.data.passed,
      criteriaPassedIds: parsed.data.criteriaPassedIds ?? [],
      instructorNotes: parsed.data.instructorNotes?.trim() || null,
      safetyFailed: parsed.data.safetyFailed ?? false,
    },
  });

  revalidatePath("/teacher/live-exam");
  revalidatePath(`/teacher/live-exam/${grade.sessionId}`);
}

export async function completeLiveExamSession(sessionId: string) {
  const user = await requireTeacherOrAdmin();
  const session = await db.liveExamSession.findFirst({
    where: { id: sessionId, teacherId: user.id },
    include: { grades: true },
  });
  if (!session) throw new Error("Niet gevonden");

  const safetyFailed = session.grades.some((g) => g.safetyFailed);
  await db.liveExamSession.update({
    where: { id: sessionId },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
      safetyFailed,
    },
  });

  revalidatePath("/teacher/live-exam");
  revalidatePath(`/teacher/students/${session.studentId}`);
}

export async function listLiveExamSessionsForStudent(studentId: string) {
  const user = await requireTeacherOrAdmin();
  const student = await db.user.findFirst({
    where: {
      id: studentId,
      role: "STUDENT",
      ...(user.role === "ADMIN" ? {} : { invitedById: user.id }),
    },
  });
  if (!student) return [];

  return db.liveExamSession.findMany({
    where: { studentId },
    orderBy: { startedAt: "desc" },
    take: 30,
    include: {
      questionSet: { select: { name: true } },
      course: { select: { name: true, slug: true } },
    },
  });
}
