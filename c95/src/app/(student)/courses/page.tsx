import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CheckCircle2, ChevronRight, CircleDashed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getStudentProgressByCourse } from "@/lib/progress";
import { cn } from "@/lib/utils";

export default async function StudentCoursesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const courses = await getStudentProgressByCourse(session.user.id);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Jouw leerpad</p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Cursussen</h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Elke cursus bevat vragensets. Open een cursus om onderdelen en oefenexamens te zien.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Actieve cursussen</h2>
        <div className="grid gap-4">
          {courses.length === 0 ? (
            <Card className="card-learning border-dashed">
              <CardHeader>
                <CardTitle className="text-lg">Nog geen cursussen</CardTitle>
                <CardDescription>Je instructeur heeft nog geen inhoud gepubliceerd. Kom later terug.</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            courses.map((c) => {
              const sets = c.questionSets;
              const denom = Math.max(sets.length, 1);
              const passed = sets.filter((s) => s.setPassed).length;
              const pct = Math.min(100, Math.round((passed / denom) * 100));
              const allPassed = sets.length > 0 && passed === sets.length;
              return (
                <Link key={c.id} href={`/courses/${c.id}`} className="group block">
                  <Card
                    className={cn(
                      "card-learning card-learning-hover h-full overflow-hidden transition-colors",
                      allPassed && "border-primary/30 ring-1 ring-primary/10",
                    )}
                  >
                    <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
                      <div className="min-w-0 space-y-1">
                        <CardTitle className="text-lg font-semibold leading-snug transition-colors group-hover:text-primary sm:text-xl">
                          {c.name}
                        </CardTitle>
                        <CardDescription className="text-sm leading-relaxed">
                          {sets.length} vragenset{sets.length === 1 ? "" : "s"}
                          {c.description ? ` · ${c.description}` : ""}
                        </CardDescription>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {allPassed ? (
                          <Badge className="gap-1 border-0 bg-primary/15 text-primary hover:bg-primary/20">
                            <CheckCircle2 className="size-3.5" aria-hidden />
                            Alle sets gehaald
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
                          <span>Vragensets gehaald</span>
                          <span>
                            {passed} / {sets.length}
                          </span>
                        </div>
                        <Progress value={pct} className="h-2" />
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Cursus openen
                        <ChevronRight className="size-4" aria-hidden />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
