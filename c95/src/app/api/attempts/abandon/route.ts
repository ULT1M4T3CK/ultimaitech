import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/db";

const abandonSchema = z.object({
  attemptId: z.string().cuid(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "STUDENT") {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige gegevens" }, { status: 400 });
  }

  const parsed = abandonSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ongeldige gegevens" }, { status: 400 });
  }

  const attempt = await db.examAttempt.findFirst({
    where: {
      id: parsed.data.attemptId,
      userId: session.user.id,
      submittedAt: null,
    },
    include: {
      section: { include: { questionSet: { select: { id: true, courseId: true } } } },
      questionSet: { select: { id: true, courseId: true } },
    },
  });

  if (!attempt) {
    return NextResponse.json({ abandoned: false });
  }

  await db.examAttempt.update({
    where: { id: attempt.id },
    data: {
      submittedAt: new Date(),
      correctCount: 0,
      passed: false,
      safetyFailed: false,
    },
  });

  const courseId = attempt.courseId ?? attempt.section?.questionSet.courseId ?? attempt.questionSet?.courseId;
  const setId = attempt.questionSetId ?? attempt.section?.questionSet.id ?? null;
  const isSetExam = Boolean(attempt.questionSetId && !attempt.sectionId);

  revalidatePath("/dashboard");
  revalidatePath("/courses");
  if (courseId) revalidatePath(`/courses/${courseId}`);
  if (courseId && setId) revalidatePath(`/courses/${courseId}/sets/${setId}`);
  if (courseId && setId && isSetExam) {
    revalidatePath(`/courses/${courseId}/sets/${setId}/exam`);
  }
  if (courseId && setId && attempt.sectionId) {
    revalidatePath(`/courses/${courseId}/sets/${setId}/sections/${attempt.sectionId}`);
    revalidatePath(
      `/courses/${courseId}/sets/${setId}/sections/${attempt.sectionId}/result/${attempt.id}`,
    );
  }

  return NextResponse.json({ abandoned: true });
}
