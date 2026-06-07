import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { listStudentsForLiveExam } from "@/server/actions/liveExam";
import { LiveExamStartForm } from "./live-exam-start-form";

export default async function LiveExamPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const courses = await db.course.findMany({
    orderBy: { order: "asc" },
    include: { questionSets: { orderBy: { order: "asc" }, select: { id: true, name: true } } },
  });
  const students = await listStudentsForLiveExam();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Live-examen</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Start a session to grade all questions in a question set for one student (including instructor-graded and
          checklists).
        </p>
      </header>

      <LiveExamStartForm courses={courses} students={students} />
    </div>
  );
}
