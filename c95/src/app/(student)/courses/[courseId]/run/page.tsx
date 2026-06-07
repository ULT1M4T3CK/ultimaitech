import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";

type Props = { params: Promise<{ courseId: string }> };

export default async function StartCourseRunPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const { courseId } = await params;

  const course = await db.course.findFirst({
    where: { id: courseId, isActive: true },
    include: {
      questionSets: {
        orderBy: { order: "asc" },
        include: {
          sections: {
            orderBy: { order: "asc" },
            include: {
              questions: {
                where: { gradingMode: "AUTO" },
                take: 1,
                select: { id: true },
              },
            },
          },
        },
      },
    },
  });
  if (!course) notFound();

  const firstSet = course.questionSets.find((set) =>
    set.sections.some((section) => section.questions.length > 0),
  );
  if (!firstSet) redirect(`/courses/${courseId}`);

  redirect(`/courses/${courseId}/sets/${firstSet.id}/exam?run=1`);
}
