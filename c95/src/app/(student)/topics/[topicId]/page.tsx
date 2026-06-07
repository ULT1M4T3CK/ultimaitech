import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";

type Props = { params: Promise<{ topicId: string }> };

/** Legacy URL: topicId was a question set id. */
export default async function LegacyTopicRedirect({ params }: Props) {
  const { topicId } = await params;
  const set = await db.questionSet.findUnique({
    where: { id: topicId },
    select: { courseId: true },
  });
  if (!set) notFound();
  redirect(`/courses/${set.courseId}/sets/${topicId}`);
}
