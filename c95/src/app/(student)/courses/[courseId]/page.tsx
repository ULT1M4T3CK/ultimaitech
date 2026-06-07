import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { CheckCircle2, ChevronRight, CircleDashed, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getStudentProgressByCourse } from "@/lib/progress";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ courseId: string }> };

export default async function CourseHubPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const { courseId } = await params;

  const courses = await getStudentProgressByCourse(session.user.id);
  const course = courses.find((c) => c.id === courseId);
  if (!course) notFound();

  const firstRunSet = course.questionSets.find((qs) => qs.sections.some((s) => s.autoQuestionCount > 0));

  return (
    <div className="space-y-10">
      <nav className="text-sm text-muted-foreground">
        <Link href="/courses" className="hover:text-primary">
          Cursussen
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground">{course.name}</span>
      </nav>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{course.name}</h1>
          {course.description ? <p className="max-w-2xl text-muted-foreground">{course.description}</p> : null}
        </div>
        {firstRunSet ? (
          <Link
            href={`/courses/${courseId}/sets/${firstRunSet.id}/exam?run=1`}
            className={cn(buttonVariants(), "inline-flex h-11 items-center gap-2 sm:shrink-0")}
          >
            <PlayCircle className="size-4" aria-hidden />
            Start volledige cursus
          </Link>
        ) : (
          <span className={cn(buttonVariants({ variant: "secondary" }), "inline-flex h-11 cursor-not-allowed items-center gap-2 opacity-60 sm:shrink-0")}>
            <PlayCircle className="size-4" aria-hidden />
            Start volledige cursus
          </span>
        )}
      </header>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Vragensets</h2>
        <div className="grid gap-4">
          {course.questionSets.map((qs) => {
            const denom = Math.max(qs.sections.length, 1);
            const pct = Math.min(100, Math.round((qs.passedSectionCount / denom) * 100));
            return (
              <Link key={qs.id} href={`/courses/${courseId}/sets/${qs.id}`} className="group block">
                <Card
                  className={cn(
                    "card-learning card-learning-hover h-full overflow-hidden transition-colors",
                    qs.setPassed && "border-primary/30 ring-1 ring-primary/10",
                  )}
                >
                  <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
                    <div className="min-w-0 space-y-1">
                      <CardTitle className="text-lg font-semibold leading-snug transition-colors group-hover:text-primary sm:text-xl">
                        {qs.name}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        Haal {qs.passingSectionCount} van {qs.sections.length} onderde{qs.sections.length === 1 ? "el" : "len"}.
                      </CardDescription>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {qs.setPassed ? (
                        <Badge className="gap-1 border-0 bg-primary/15 text-primary hover:bg-primary/20">
                          <CheckCircle2 className="size-3.5" aria-hidden />
                          Gehaald
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1 font-normal">
                          <CircleDashed className="size-3.5 opacity-70" aria-hidden />
                          Bezig
                        </Badge>
                      )}
                      <ChevronRight
                        className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium text-muted-foreground">
                        <span>Onderdelen gehaald</span>
                        <span>
                          {qs.passedSectionCount} / {qs.sections.length}
                        </span>
                      </div>
                      <Progress value={pct} className="h-2" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Set openen
                      <ChevronRight className="size-4" aria-hidden />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
