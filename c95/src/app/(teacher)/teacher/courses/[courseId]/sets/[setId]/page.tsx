import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { listSections } from "@/server/actions/content";
import { QuestionSetContentEditor, type SectionRow } from "../../../_components/set-content-manager";

type Props = { params: Promise<{ courseId: string; setId: string }> };

export default async function TeacherQuestionSetEditorPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { courseId, setId } = await params;

  const [set, course] = await Promise.all([
    db.questionSet.findFirst({
      where: { id: setId, courseId },
    }),
    db.course.findUnique({
      where: { id: courseId },
      select: { name: true },
    }),
  ]);
  if (!set) notFound();

  const sections = (await listSections(setId)) as unknown as SectionRow[];

  return (
    <Suspense fallback={<div className="rounded-xl border bg-muted/30 p-10 text-center text-sm text-muted-foreground">Editor laden…</div>}>
      <QuestionSetContentEditor
        courseId={courseId}
        courseName={course?.name ?? "Course"}
        questionSetId={setId}
        setName={set.name}
        initialSections={sections}
      />
    </Suspense>
  );
}
