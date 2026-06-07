import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getLiveExamSession } from "@/server/actions/liveExam";
import { LiveExamSessionPanel } from "./session-panel";

type Props = { params: Promise<{ sessionId: string }> };

export default async function LiveExamSessionPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { sessionId } = await params;

  const data = await getLiveExamSession(sessionId);
  if (!data) notFound();

  return (
    <LiveExamSessionPanel
      session={{
        id: data.id,
        status: data.status,
        safetyFailed: data.safetyFailed,
        student: data.student,
        questionSet: data.questionSet,
        course: data.course,
        grades: data.grades.map((g) => ({
          id: g.id,
          sectionOrder: g.sectionOrder,
          questionOrder: g.questionOrder,
          promptSnapshot: g.promptSnapshot,
          typeSnapshot: g.typeSnapshot,
          gradingModeSnapshot: g.gradingModeSnapshot,
          optionsSnapshot: g.optionsSnapshot,
          criteriaSnapshot: g.criteriaSnapshot,
          passed: g.passed,
          criteriaPassedIds: g.criteriaPassedIds,
          instructorNotes: g.instructorNotes,
          safetyFailed: g.safetyFailed,
        })),
      }}
    />
  );
}
