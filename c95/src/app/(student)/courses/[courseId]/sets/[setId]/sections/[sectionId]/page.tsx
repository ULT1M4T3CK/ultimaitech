import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getStudentProgressByCourse } from "@/lib/progress";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookOpen, ClipboardList, PlayCircle } from "lucide-react";

type Props = { params: Promise<{ courseId: string; setId: string; sectionId: string }> };

export default async function SectionHubPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const { courseId, setId, sectionId } = await params;

  const sec = await db.section.findFirst({
    where: { id: sectionId, questionSetId: setId },
    include: {
      questionSet: {
        select: { id: true, name: true, courseId: true, course: { select: { id: true, name: true } } },
      },
    },
  });
  if (!sec || sec.questionSet.courseId !== courseId) notFound();

  const courses = await getStudentProgressByCourse(session.user.id);
  const course = courses.find((c) => c.id === courseId);
  const qs = course?.questionSets.find((x) => x.id === setId);
  const stP = qs?.sections.find((s) => s.id === sectionId);

  const lastAttempt = await db.examAttempt.findFirst({
    where: { userId: session.user.id, sectionId, submittedAt: { not: null } },
    orderBy: { submittedAt: "desc" },
    select: { id: true },
  });

  const instructorCount = await db.question.count({
    where: { sectionId, gradingMode: "INSTRUCTOR" },
  });

  return (
    <div className="space-y-8">
      <nav className="text-sm text-muted-foreground">
        <Link href="/courses" className="hover:text-primary">
          Cursussen
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/courses/${courseId}`} className="hover:text-primary">
          {sec.questionSet.course.name}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/courses/${courseId}/sets/${setId}`} className="hover:text-primary">
          {sec.questionSet.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground">{sec.name}</span>
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{sec.name}</h1>
        <p className="text-muted-foreground">
          Haal minimaal <strong className="text-foreground">{sec.passingQuestionCount}</strong> automatisch beoordeelde
          vragen goed.
        </p>
        {instructorCount > 0 ? (
          <p className="text-sm text-amber-800 dark:text-amber-200">
            Dit onderdeel bevat <strong>{instructorCount}</strong> door de instructeur beoordeelde item(s) — gebruik{" "}
            <strong>Studeren</strong> om ze te lezen; ze worden beoordeeld tijdens je live-examen met een instructeur.
          </p>
        ) : null}
      </header>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/courses/${courseId}/sets/${setId}/sections/${sectionId}/exam`}
          className={cn(buttonVariants(), "inline-flex h-11 justify-center gap-2 text-base shadow-sm")}
        >
          <PlayCircle className="size-4" aria-hidden />
          Begeleid examen starten
        </Link>
        <Link
          href={`/courses/${courseId}/sets/${setId}/sections/${sectionId}/study`}
          className={cn(buttonVariants({ variant: "outline" }), "inline-flex h-11 items-center gap-2")}
        >
          <BookOpen className="size-4" aria-hidden />
          Studiemodus
        </Link>
        {lastAttempt ? (
          <Link
            href={`/courses/${courseId}/sets/${setId}/sections/${sectionId}/result/${lastAttempt.id}`}
            className={cn(buttonVariants({ variant: "secondary" }), "inline-flex h-11 items-center gap-2")}
          >
            <ClipboardList className="size-4" aria-hidden />
            Laatste resultaat bekijken
          </Link>
        ) : null}
      </div>

      {stP && stP.bestTotal > 0 ? (
        <p className="text-sm text-muted-foreground">
          Beste score tot nu toe: {stP.bestCorrect}/{stP.bestTotal}
          {stP.everPassed ? " · Onderdeel gehaald" : ""}
        </p>
      ) : null}
    </div>
  );
}
