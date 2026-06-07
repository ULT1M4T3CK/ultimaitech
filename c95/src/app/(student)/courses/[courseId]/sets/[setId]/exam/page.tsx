import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { WalkthroughExam } from "@/components/exam/walkthrough-exam";

type Props = {
  params: Promise<{ courseId: string; setId: string }>;
  searchParams: Promise<{ run?: string }>;
};

export default async function QuestionSetExamPage({ params, searchParams }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const { courseId, setId } = await params;
  const { run } = await searchParams;
  const isCourseRun = run === "1";

  const set = await db.questionSet.findFirst({
    where: { id: setId, courseId },
    select: { id: true, name: true, course: { select: { name: true } } },
  });
  if (!set) notFound();

  return (
    <div className="space-y-5 sm:space-y-8">
      <nav className="text-sm text-muted-foreground">
        <Link
          href={isCourseRun ? `/courses/${courseId}` : `/courses/${courseId}/sets/${setId}`}
          className="inline-flex min-h-10 items-center gap-1 font-medium text-foreground/80 hover:text-primary"
        >
          ← {isCourseRun ? set.course.name : set.name}
        </Link>
      </nav>

      <header className="space-y-1.5 sm:space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {isCourseRun ? "Volledige cursus" : "Hele vragenset"}
        </p>
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">Oefenexamen</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          {set.course.name} · {isCourseRun ? set.name : "Alle onderdelen in één doorlopende poging"}
        </p>
        {isCourseRun ? (
          <p className="text-xs text-muted-foreground sm:text-sm">
            Beantwoord elke vraag achter elkaar. Weggaan zonder inleveren telt als gezakt — je begint opnieuw.
          </p>
        ) : null}
      </header>

      <WalkthroughExam courseId={courseId} setId={setId} mode={isCourseRun ? "COURSE_RUN" : "EXAM"} />
    </div>
  );
}
