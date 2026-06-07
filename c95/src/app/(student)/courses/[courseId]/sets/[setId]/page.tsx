import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getStudentProgressByCourse } from "@/lib/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookOpen, ClipboardList, PlayCircle } from "lucide-react";

type Props = { params: Promise<{ courseId: string; setId: string }> };

export default async function QuestionSetHubPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const { courseId, setId } = await params;

  const courses = await getStudentProgressByCourse(session.user.id);
  const course = courses.find((c) => c.id === courseId);
  const qs = course?.questionSets.find((x) => x.id === setId);
  if (!course || !qs) notFound();

  const setRow = await db.questionSet.findFirst({
    where: { id: setId, courseId },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  if (!setRow) notFound();

  const [recentSectionAttempts, recentSetAttempts] = await Promise.all([
    db.examAttempt.findMany({
      where: {
        userId: session.user.id,
        sectionId: { in: setRow.sections.map((s) => s.id) },
        submittedAt: { not: null },
      },
      orderBy: { submittedAt: "desc" },
      select: { sectionId: true, id: true },
    }),
    db.examAttempt.findMany({
      where: {
        userId: session.user.id,
        questionSetId: setId,
        sectionId: null,
        submittedAt: { not: null },
        mode: { in: ["EXAM", "COURSE_RUN"] },
      },
      orderBy: { submittedAt: "desc" },
      take: 5,
      select: { id: true, submittedAt: true, passed: true, correctCount: true, totalCount: true },
    }),
  ]);
  const lastBySection = new Map<string, string>();
  for (const a of recentSectionAttempts) {
    if (a.sectionId && !lastBySection.has(a.sectionId)) lastBySection.set(a.sectionId, a.id);
  }

  const bySection = new Map(qs.sections.map((s) => [s.id, s]));

  return (
    <div className="space-y-10">
      <nav className="text-sm text-muted-foreground">
        <Link href="/courses" className="hover:text-primary">
          Cursussen
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/courses/${courseId}`} className="hover:text-primary">
          {course.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground">{qs.name}</span>
      </nav>

      <header className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Vragenset · {setRow.sections.length} onderde{setRow.sections.length === 1 ? "el" : "len"}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{qs.name}</h1>
          <p className="max-w-2xl text-muted-foreground">
            Haal minimaal <strong className="font-semibold text-foreground">{qs.passingSectionCount}</strong> onderdelen om
            deze set te voltooien.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/courses/${courseId}/sets/${setId}/exam`}
            className={cn(buttonVariants(), "inline-flex h-11 items-center gap-2")}
          >
            <PlayCircle className="size-4" aria-hidden />
            Examen starten voor hele vragenset
          </Link>
        </div>
      </header>

      {recentSetAttempts.length > 0 ? (
        <Card className="card-learning">
          <CardHeader>
            <CardTitle className="text-lg">Recente volledige-set examens</CardTitle>
            <CardDescription>Alle onderdelen in één doorlopende poging</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentSetAttempts.map((a) => (
              <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 px-4 py-3">
                <div className="text-sm">
                  <span className="font-medium tabular-nums">
                    {a.correctCount}/{a.totalCount}
                  </span>
                  <span className="mx-2 text-muted-foreground">·</span>
                  {a.passed ? (
                    <Badge className="border-0 bg-primary/15 text-primary">Gehaald</Badge>
                  ) : (
                    <Badge variant="secondary">Niet gehaald</Badge>
                  )}
                  {a.submittedAt ? (
                    <span className="ml-2 text-xs text-muted-foreground">
                      {new Date(a.submittedAt).toLocaleString("nl-NL")}
                    </span>
                  ) : null}
                </div>
                <Link
                  href={`/courses/${courseId}/sets/${setId}/result/${a.id}`}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "inline-flex items-center gap-2")}
                >
                  <ClipboardList className="size-4" aria-hidden />
                  Resultaat
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <div className="space-y-4">
        {setRow.sections.map((st) => {
          const p = bySection.get(st.id);
          return (
            <Card key={st.id} className="card-learning">
              <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4 space-y-0">
                <div>
                  <CardTitle className="text-lg">
                    Onderdeel {st.order}: {st.name}
                  </CardTitle>
                  <CardDescription>
                    Norm: {st.passingQuestionCount} goed · {p?.autoQuestionCount ?? 0} automatisch beoordeeld in app-examen
                    {st.phaseLabel ? ` · ${st.phaseLabel}` : ""}
                  </CardDescription>
                </div>
                {p?.everPassed ? (
                  <Badge className="border-0 bg-primary/15 text-primary">Gehaald</Badge>
                ) : (
                  <Badge variant="secondary">Openen</Badge>
                )}
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Link
                  href={`/courses/${courseId}/sets/${setId}/sections/${st.id}/exam`}
                  className={cn(buttonVariants(), "inline-flex h-11 items-center gap-2")}
                >
                  <PlayCircle className="size-4" aria-hidden />
                  Examen starten
                </Link>
                <Link
                  href={`/courses/${courseId}/sets/${setId}/sections/${st.id}/study`}
                  className={cn(buttonVariants({ variant: "outline" }), "inline-flex h-11 items-center gap-2")}
                >
                  <BookOpen className="size-4" aria-hidden />
                  Studeren (alle items)
                </Link>
                {lastBySection.has(st.id) ? (
                  <Link
                    href={`/courses/${courseId}/sets/${setId}/sections/${st.id}/result/${lastBySection.get(st.id)}`}
                    className={cn(buttonVariants({ variant: "secondary" }), "inline-flex h-11 items-center gap-2")}
                  >
                    <ClipboardList className="size-4" aria-hidden />
                    Laatste resultaat
                  </Link>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
