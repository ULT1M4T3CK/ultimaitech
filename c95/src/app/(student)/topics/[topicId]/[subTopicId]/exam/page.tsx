import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";

type Props = { params: Promise<{ topicId: string; subTopicId: string }> };

export default async function LegacyExamRedirect({ params }: Props) {
  const { topicId, subTopicId } = await params;
  const sec = await db.section.findFirst({
    where: { id: subTopicId, questionSetId: topicId },
    include: { questionSet: { select: { courseId: true } } },
  });
  if (!sec) notFound();
  redirect(`/courses/${sec.questionSet.courseId}/sets/${topicId}/sections/${subTopicId}/exam`);
}
