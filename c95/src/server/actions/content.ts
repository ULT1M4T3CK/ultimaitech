"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import type { GradingMode, QuestionType } from "@prisma/client";

async function requireTeacherOrAdmin() {
  const s = await auth();
  const r = s?.user?.role;
  if (r !== "TEACHER" && r !== "ADMIN") throw new Error("Niet geautoriseerd");
  return s!.user;
}

function revalidateAllContent() {
  revalidatePath("/teacher/content");
  revalidatePath("/teacher/courses");
  revalidatePath("/dashboard");
  revalidatePath("/courses");
}

// --- Courses ---

export async function listCourses() {
  await requireTeacherOrAdmin();
  return db.course.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { questionSets: true } } },
  });
}

export async function createCourse(formData: FormData) {
  await requireTeacherOrAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  if (!name || !slug) throw new Error("Naam en slug verplicht");
  const maxOrder = await db.course.aggregate({ _max: { order: true } });
  const order = (maxOrder._max.order ?? 0) + 1;
  await db.course.create({
    data: { name, slug, order },
  });
  revalidateAllContent();
}

export async function updateCourse(formData: FormData) {
  await requireTeacherOrAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  if (!id || !name) throw new Error("Invalid");
  await db.course.update({
    where: { id },
    data: { name, description },
  });
  revalidateAllContent();
}

export async function deleteCourse(formData: FormData) {
  await requireTeacherOrAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Invalid");
  await db.course.delete({ where: { id } });
  revalidateAllContent();
}

// --- Vragensets ---

export async function listQuestionSets(courseId: string) {
  await requireTeacherOrAdmin();
  return db.questionSet.findMany({
    where: { courseId },
    orderBy: { order: "asc" },
    include: { _count: { select: { sections: true } } },
  });
}

export async function createQuestionSet(formData: FormData) {
  await requireTeacherOrAdmin();
  const courseId = String(formData.get("courseId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const passing = Number(formData.get("passingSectionCount") ?? 1);
  if (!courseId || !name) throw new Error("Naam verplicht");
  const maxOrder = await db.questionSet.aggregate({
    where: { courseId },
    _max: { order: true },
  });
  const order = (maxOrder._max.order ?? 0) + 1;
  await db.questionSet.create({
    data: {
      courseId,
      name,
      order,
      passingSectionCount: Number.isFinite(passing) && passing > 0 ? passing : 1,
    },
  });
  revalidateAllContent();
}

export async function updateQuestionSet(formData: FormData) {
  await requireTeacherOrAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const passing = Number(formData.get("passingSectionCount") ?? 1);
  if (!id || !name) throw new Error("Invalid");
  await db.questionSet.update({
    where: { id },
    data: {
      name,
      passingSectionCount: Number.isFinite(passing) && passing > 0 ? passing : 1,
    },
  });
  revalidateAllContent();
}

export async function deleteQuestionSet(formData: FormData) {
  await requireTeacherOrAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Invalid");
  await db.questionSet.delete({ where: { id } });
  revalidateAllContent();
}

export async function reorderQuestionSets(courseId: string, ids: string[]) {
  await requireTeacherOrAdmin();
  await db.$transaction(
    ids.map((id, idx) =>
      db.questionSet.update({
        where: { id, courseId },
        data: { order: idx + 1 },
      }),
    ),
  );
  revalidateAllContent();
}

// --- Sections ---

export async function listSections(questionSetId: string) {
  await requireTeacherOrAdmin();
  return db.section.findMany({
    where: { questionSetId },
    orderBy: { order: "asc" },
    include: {
      _count: { select: { questions: true } },
      questions: {
        orderBy: { order: "asc" },
        select: { id: true, order: true, prompt: true, type: true, gradingMode: true },
      },
    },
  });
}

export async function createSection(formData: FormData) {
  await requireTeacherOrAdmin();
  const questionSetId = String(formData.get("questionSetId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const passing = Number(formData.get("passingQuestionCount") ?? 1);
  const phaseLabel = String(formData.get("phaseLabel") ?? "").trim() || null;
  const code = String(formData.get("code") ?? "").trim() || null;
  if (!questionSetId || !name) throw new Error("Invalid");
  const maxOrder = await db.section.aggregate({
    where: { questionSetId },
    _max: { order: true },
  });
  const order = (maxOrder._max.order ?? 0) + 1;
  await db.section.create({
    data: {
      questionSetId,
      name,
      order,
      phaseLabel,
      code,
      passingQuestionCount: Number.isFinite(passing) && passing > 0 ? passing : 1,
    },
  });
  revalidateAllContent();
}

export async function updateSection(formData: FormData) {
  await requireTeacherOrAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const passing = Number(formData.get("passingQuestionCount") ?? 1);
  const phaseLabel = String(formData.get("phaseLabel") ?? "").trim() || null;
  const code = String(formData.get("code") ?? "").trim() || null;
  if (!id || !name) throw new Error("Invalid");
  await db.section.update({
    where: { id },
    data: {
      name,
      phaseLabel,
      code,
      passingQuestionCount: Number.isFinite(passing) && passing > 0 ? passing : 1,
    },
  });
  revalidateAllContent();
}

export async function deleteSection(formData: FormData) {
  await requireTeacherOrAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Invalid");
  await db.section.delete({ where: { id } });
  revalidateAllContent();
}

export async function reorderSections(questionSetId: string, ids: string[]) {
  await requireTeacherOrAdmin();
  await db.$transaction(
    ids.map((id, idx) =>
      db.section.update({
        where: { id, questionSetId },
        data: { order: idx + 1 },
      }),
    ),
  );
  revalidateAllContent();
}

function defaultGradingMode(type: QuestionType): GradingMode {
  switch (type) {
    case "OPEN_ANSWER":
    case "OBSERVATION_CHECKLIST":
    case "PHYSICAL_INSPECTION":
    case "SAFETY_OVERRIDE":
      return "INSTRUCTOR";
    default:
      return "AUTO";
  }
}

const optionSchema = z.object({
  text: z.string().min(1),
  isCorrect: z.boolean(),
  imageUrl: z
    .string()
    .optional()
    .transform((s) => (s && s.trim() ? s.trim() : undefined)),
});

const createQuestionSchema = z.object({
  sectionId: z.string().cuid(),
  type: z.enum([
    "SINGLE",
    "MULTI",
    "TRUE_FALSE",
    "IMAGE_CHOICE",
    "OPEN_ANSWER",
    "OBSERVATION_CHECKLIST",
    "PHYSICAL_INSPECTION",
    "SAFETY_OVERRIDE",
  ]),
  prompt: z.string().min(1),
  feedback: z.string().optional(),
  instructorNote: z.string().optional(),
  canonicalAnswer: z.string().optional(),
  imageUrl: z
    .string()
    .optional()
    .transform((s) => (s && s.trim() ? s.trim() : undefined)),
  referenceMaterial: z.string().optional(),
  safetyCritical: z.boolean().optional(),
  gradingMode: z.enum(["AUTO", "INSTRUCTOR"]).optional(),
  options: z.array(optionSchema).min(0),
});

function validateQuestionOptions(type: QuestionType, options: z.infer<typeof optionSchema>[]) {
  if (
    type === "OPEN_ANSWER" ||
    type === "OBSERVATION_CHECKLIST" ||
    type === "PHYSICAL_INSPECTION" ||
    type === "SAFETY_OVERRIDE"
  ) {
    return;
  }
  if (options.length < 2) throw new Error("Minimaal twee antwoordopties vereist voor dit vraagtype.");
  const correct = options.filter((o) => o.isCorrect).length;
  if (type === "SINGLE" || type === "TRUE_FALSE" || type === "IMAGE_CHOICE") {
    if (correct !== 1) throw new Error("Enkele keuze, afbeeldingskeuze en waar/onwaar vereisen precies één goed antwoord.");
  }
  if (type === "MULTI") {
    if (correct < 2) throw new Error("Meerkeuze vereist minimaal twee goede antwoorden.");
  }
}

export async function createQuestion(raw: unknown) {
  await requireTeacherOrAdmin();
  const parsed = createQuestionSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Ongeldige vraag");
  const {
    sectionId,
    type,
    prompt,
    feedback,
    instructorNote,
    canonicalAnswer,
    imageUrl,
    referenceMaterial,
    safetyCritical,
    gradingMode: gm,
    options,
  } = parsed.data;
  validateQuestionOptions(type, options);
  const gradingMode = gm ?? defaultGradingMode(type);

  const maxOrder = await db.question.aggregate({
    where: { sectionId },
    _max: { order: true },
  });
  const order = (maxOrder._max.order ?? 0) + 1;

  await db.question.create({
    data: {
      sectionId,
      type,
      gradingMode,
      prompt: prompt.trim(),
      feedback: feedback?.trim() || null,
      instructorNote: instructorNote?.trim() || null,
      canonicalAnswer: canonicalAnswer?.trim() || null,
      imageUrl: imageUrl?.trim() || null,
      referenceMaterial: referenceMaterial?.trim() || null,
      safetyCritical: safetyCritical ?? false,
      order,
      options: {
        create: options.map((o, i) => ({
          text: o.text.trim(),
          imageUrl: o.imageUrl?.trim() || null,
          isCorrect: o.isCorrect,
          order: i + 1,
        })),
      },
    },
  });
  revalidateAllContent();
}

const updateQuestionSchema = createQuestionSchema.extend({
  id: z.string().cuid(),
});

export async function updateQuestion(raw: unknown) {
  await requireTeacherOrAdmin();
  const parsed = updateQuestionSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Ongeldige vraag");
  const {
    id,
    sectionId,
    type,
    prompt,
    feedback,
    instructorNote,
    canonicalAnswer,
    imageUrl,
    referenceMaterial,
    safetyCritical,
    gradingMode: gm,
    options,
  } = parsed.data;
  validateQuestionOptions(type, options);
  const gradingMode = gm ?? defaultGradingMode(type);

  const q = await db.question.findFirst({ where: { id, sectionId } });
  if (!q) throw new Error("Vraag niet gevonden");

  await db.$transaction([
    db.answerOption.deleteMany({ where: { questionId: id } }),
    db.question.update({
      where: { id },
      data: {
        type,
        gradingMode,
        prompt: prompt.trim(),
        feedback: feedback?.trim() || null,
        instructorNote: instructorNote?.trim() || null,
        canonicalAnswer: canonicalAnswer?.trim() || null,
        imageUrl: imageUrl?.trim() || null,
        referenceMaterial: referenceMaterial?.trim() || null,
        safetyCritical: safetyCritical ?? false,
        options: {
          create: options.map((o, i) => ({
            text: o.text.trim(),
            imageUrl: o.imageUrl?.trim() || null,
            isCorrect: o.isCorrect,
            order: i + 1,
          })),
        },
      },
    }),
  ]);
  revalidateAllContent();
}

export async function deleteQuestion(formData: FormData) {
  await requireTeacherOrAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Invalid");
  await db.question.delete({ where: { id } });
  revalidateAllContent();
}

export async function reorderQuestions(sectionId: string, ids: string[]) {
  await requireTeacherOrAdmin();
  await db.$transaction(
    ids.map((id, idx) =>
      db.question.update({
        where: { id, sectionId },
        data: { order: idx + 1 },
      }),
    ),
  );
  revalidateAllContent();
}

export async function getQuestionForEdit(questionId: string) {
  await requireTeacherOrAdmin();
  return db.question.findUnique({
    where: { id: questionId },
    include: {
      options: { orderBy: { order: "asc" } },
      section: { select: { questionSetId: true, id: true } },
    },
  });
}
