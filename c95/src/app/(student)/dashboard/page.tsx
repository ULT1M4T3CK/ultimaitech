import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ChevronRight, Clock, FileText, Flame, Play, Target, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PendingSurveysAlert } from "@/components/survey/pending-surveys-alert";
import { getStudentProgressByCourse } from "@/lib/progress";
import { db } from "@/lib/db";

export default async function StudentDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [courses, recentAttempts] = await Promise.all([
    getStudentProgressByCourse(session.user.id),
    db.examAttempt.findMany({
      where: { userId: session.user.id, submittedAt: { not: null } },
      orderBy: { submittedAt: "desc" },
      take: 5,
      select: {
        id: true,
        mode: true,
        sectionName: true,
        questionSetName: true,
        correctCount: true,
        totalCount: true,
        passed: true,
        submittedAt: true,
      },
    }),
  ]);

  const totalOnderdelen = courses.reduce(
    (acc, c) => acc + c.questionSets.reduce((a, qs) => a + qs.sections.length, 0),
    0,
  );
  const passedSections = courses.reduce(
    (acc, c) =>
      acc + c.questionSets.reduce((a, qs) => a + qs.sections.filter((s) => s.everPassed).length, 0),
    0,
  );
  const overallPct = totalOnderdelen > 0 ? Math.round((passedSections / totalOnderdelen) * 100) : 0;

  const courseMastery = courses.map((c) => {
    const totalQ = c.questionSets.reduce((a, qs) => a + qs.sections.length, 0);
    const passedQ = c.questionSets.reduce(
      (a, qs) => a + qs.sections.filter((s) => s.everPassed).length,
      0,
    );
    const pct = totalQ > 0 ? Math.round((passedQ / totalQ) * 100) : 0;
    const quizzesPassed = c.questionSets.filter((qs) => qs.setPassed).length;
    return { ...c, mastery: pct, quizzesPassed, totalQuizzes: c.questionSets.length };
  });

  const lowestCourse = [...courseMastery].sort((a, b) => a.mastery - b.mastery)[0] ?? null;

  const unpassed = courses
    .flatMap((c) =>
      c.questionSets.flatMap((qs) =>
        qs.sections
          .filter((s) => !s.everPassed && s.autoQuestionCount > 0)
          .map((s) => ({
            courseId: c.id,
            setId: qs.id,
            sectionId: s.id,
            sectionName: s.name,
            setName: qs.name,
            questionCount: s.autoQuestionCount,
          })),
      ),
    )
    .slice(0, 3);

  const firstName = (session.user.name ?? "Leerling").split(" ")[0];

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welkom terug, {firstName}
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Klaar om de weg te meesteren vandaag? Je bent voor {overallPct}% voorbereid op je
            eindexamen.
          </p>
        </div>
        <Link href="/courses">
          <Button className="gap-2 shadow-sm">
            <Play className="size-4" aria-hidden />
            Start Nieuwe Quiz
          </Button>
        </Link>
      </header>

      <PendingSurveysAlert userId={session.user.id} />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {courseMastery.map((c) => (
              <Link key={c.id} href={`/courses/${c.id}`} className="group block">
                <Card className="card-learning card-learning-hover relative h-full overflow-hidden">
                  <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FileText className="size-5" aria-hidden />
                    </span>
                    <Badge variant="outline" className="border-primary/30 font-semibold text-primary">
                      {c.mastery}% Beheersing
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-2">
                    <div>
                      <CardTitle className="text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                        {c.name}
                      </CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {c.quizzesPassed}/{c.totalQuizzes} quizzen behaald
                      </p>
                    </div>
                    <Progress value={c.mastery} className="h-2" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {lowestCourse && lowestCourse.mastery < 80 && (
            <Card className="card-learning overflow-hidden border-primary/20">
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <span className="text-lg font-bold text-primary">{lowestCourse.mastery}%</span>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">{lowestCourse.name}</span>
                    <Badge variant="secondary" className="font-normal">
                      {lowestCourse.mastery}% Beheersing
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Focus vereist</p>
                  <Progress value={lowestCourse.mastery} className="h-2.5" />
                </div>
              </div>
            </Card>
          )}

          {unpassed.length > 0 && (
            <Card className="card-learning">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg font-semibold">Aanbevolen voor jou</CardTitle>
                <Link href="/courses" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  Bekijk alles
                  <ChevronRight className="size-4" />
                </Link>
              </CardHeader>
              <CardContent className="divide-y">
                {unpassed.map((item) => (
                  <div key={item.sectionId} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
                        <FileText className="size-4 text-muted-foreground" aria-hidden />
                      </span>
                      <div>
                        <p className="text-sm font-medium">{item.sectionName}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.questionCount} vragen &middot; {item.setName}
                        </p>
                      </div>
                    </div>
                    <Link href={`/courses/${item.courseId}/sets/${item.setId}/sections/${item.sectionId}/exam`}>
                      <Button size="sm" variant="outline">
                        Starten
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <aside className="space-y-6">
          <Card className="gradient-pink overflow-hidden border-0 text-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-white">Studie Statistieken</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 opacity-80" aria-hidden />
                  <span className="text-sm opacity-90">Tijd besteed</span>
                </div>
                <span className="text-xl font-bold">12h 45m</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="size-4 opacity-80" aria-hidden />
                  <span className="text-sm opacity-90">Score</span>
                </div>
                <span className="text-xl font-bold">{passedSections * 50}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="size-4 opacity-80" aria-hidden />
                  <span className="text-sm opacity-90">Streak</span>
                </div>
                <span className="text-xl font-bold">5 Dagen</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-learning">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Recente Activiteit</CardTitle>
            </CardHeader>
            <CardContent>
              {recentAttempts.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  Nog geen activiteit.
                </p>
              ) : (
                <div className="space-y-3">
                  {recentAttempts.map((a) => {
                    const pct = a.totalCount > 0 ? Math.round((a.correctCount / a.totalCount) * 100) : 0;
                    const timeAgo = getTimeAgo(a.submittedAt!);
                    const modeLabel = a.mode === "COURSE_RUN" ? "volledige cursus" : a.mode === "STUDY" ? "studie" : "quiz";
                    return (
                      <div key={a.id} className="flex items-start gap-3">
                        <span
                          className={`mt-1.5 size-2.5 shrink-0 rounded-full ${a.passed ? "bg-green-500" : "bg-primary"}`}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-snug">
                            {a.passed ? `${a.sectionName} voltooid` : `${a.sectionName}`}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {modeLabel} &middot; Score {pct}% &middot; {timeAgo}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Zojuist";
  if (minutes < 60) return `${minutes} min geleden`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} uur geleden`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Gisteren";
  return `${days} dagen geleden`;
}
