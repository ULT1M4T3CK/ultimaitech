import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { ArrowUpRight, CalendarDays, ChevronRight, GraduationCap, School, Users } from "lucide-react";
import { BarChart, type BarChartItem } from "@/components/charts/bar-chart";

export default async function TeacherHomePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const isAdmin = session.user.role === "ADMIN";
  const userId = session.user.id;

  const studentFilter = isAdmin
    ? { role: "STUDENT" as const }
    : { role: "STUDENT" as const, invitedById: userId };

  const [studentCount, quizCount, courses, recentAttempts, recentStudents] = await Promise.all([
    db.user.count({ where: studentFilter }),
    db.questionSet.count(),
    db.course.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      include: {
        questionSets: {
          include: {
            sections: {
              include: {
                attempts: {
                  where: { submittedAt: { not: null } },
                  select: { passed: true },
                },
              },
            },
          },
        },
      },
    }),
    db.examAttempt.findMany({
      where: {
        submittedAt: { not: null },
        user: studentFilter,
      },
      orderBy: { submittedAt: "desc" },
      take: 6,
      select: {
        id: true,
        sectionName: true,
        questionSetName: true,
        correctCount: true,
        totalCount: true,
        passed: true,
        submittedAt: true,
        user: { select: { name: true } },
      },
    }),
    db.user.findMany({
      where: studentFilter,
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, name: true, createdAt: true },
    }),
  ]);

  const totalAttempts = courses.reduce(
    (acc, c) =>
      acc +
      c.questionSets.reduce(
        (a, qs) => a + qs.sections.reduce((s, sec) => s + sec.attempts.length, 0),
        0,
      ),
    0,
  );
  const passedAttempts = courses.reduce(
    (acc, c) =>
      acc +
      c.questionSets.reduce(
        (a, qs) =>
          a + qs.sections.reduce((s, sec) => s + sec.attempts.filter((at) => at.passed).length, 0),
        0,
      ),
    0,
  );
  const avgPassRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;

  const chartData: BarChartItem[] = courses.map((c) => {
    const attempts = c.questionSets.flatMap((qs) =>
      qs.sections.flatMap((sec) => sec.attempts),
    );
    const total = attempts.length;
    const passed = attempts.filter((a) => a.passed).length;
    const rate = total > 0 ? Math.round((passed / total) * 100) : 0;
    return { label: c.name.length > 12 ? c.name.slice(0, 10) + "…" : c.name, value: rate };
  });

  const lowestIdx = chartData.reduce(
    (minIdx, item, idx, arr) => (item.value < arr[minIdx].value ? idx : minIdx),
    0,
  );
  if (chartData.length > 0) chartData[lowestIdx].highlight = true;
  const lowestCourse = courses[lowestIdx];

  const activityItems = [
    ...recentAttempts.map((a) => ({
      id: a.id,
      type: "exam" as const,
      text: `${a.user.name} heeft ${a.sectionName} ${a.passed ? "behaald" : "niet gehaald"} met ${a.totalCount > 0 ? Math.round((a.correctCount / a.totalCount) * 100) : 0}%.`,
      detail: a.questionSetName,
      time: a.submittedAt!,
      passed: a.passed,
    })),
    ...recentStudents.map((s) => ({
      id: s.id,
      type: "student" as const,
      text: `Nieuwe student ${s.name} is toegevoegd aan het portaal.`,
      detail: null,
      time: s.createdAt,
      passed: true,
    })),
  ]
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 6);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Overzicht</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Welkom terug. Hier is de actuele status van je studenten en modules.
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1.5 border-border px-3 py-1.5 text-sm font-medium">
          <CalendarDays className="size-4" aria-hidden />
          Deze Week
        </Badge>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="card-learning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="size-5" aria-hidden />
            </span>
            <Badge variant="secondary" className="gap-1 text-xs font-normal">
              <ArrowUpRight className="size-3" aria-hidden />
              12%
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Totaal Studenten
            </p>
            <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight">{studentCount}</p>
          </CardContent>
        </Card>

        <Card className="card-learning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            <Badge variant="secondary" className="gap-1 text-xs font-normal">
              {courses.length} nieuw
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Actieve Quizzes
            </p>
            <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight">{quizCount}</p>
          </CardContent>
        </Card>

        <Card className="gradient-pink overflow-hidden border-0 text-white shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white/15">
              <School className="size-5 text-white" aria-hidden />
            </span>
            <span className="text-xs text-white/80">Doel: 80%</span>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
              Gemiddeld Slagingspercentage
            </p>
            <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight">{avgPassRate}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card className="card-learning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-semibold">Slagingspercentage per Module</CardTitle>
            <Link href="/teacher/reports" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Volledig rapport
              <ChevronRight className="size-4" />
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            {chartData.length > 0 ? (
              <>
                <div className="h-52">
                  <BarChart data={chartData} target={80} className="h-full" />
                </div>
                {lowestCourse && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg border bg-muted/30 p-3">
                    <span className="mt-0.5 text-primary">ℹ</span>
                    <p className="text-sm text-muted-foreground">
                      <strong className="font-medium text-foreground">{lowestCourse.name}</strong>{" "}
                      vertoont een lager dan gemiddeld slagingspercentage. Overweeg extra
                      oefenmateriaal toe te wijzen.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Nog geen data beschikbaar.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="card-learning">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Recente Activiteit</CardTitle>
          </CardHeader>
          <CardContent>
            {activityItems.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                Nog geen activiteit.
              </p>
            ) : (
              <div className="space-y-4">
                {activityItems.map((item) => {
                  const timeAgo = getTimeAgo(item.time);
                  let dotColor = "bg-blue-500";
                  if (item.type === "exam") {
                    dotColor = item.passed ? "bg-green-500" : "bg-red-500";
                  }
                  return (
                    <div key={item.id} className="flex items-start gap-3">
                      <span className={`mt-1.5 size-2.5 shrink-0 rounded-full ${dotColor}`} />
                      <div className="min-w-0">
                        <p className="text-sm leading-snug">{item.text}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{timeAgo}</p>
                      </div>
                    </div>
                  );
                })}
                <Link
                  href="/teacher/reports"
                  className="block pt-2 text-center text-sm font-medium text-primary hover:underline"
                >
                  Toon alle activiteiten
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Zojuist";
  if (minutes < 60) return `${minutes} minuten geleden`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} uur geleden`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Gisteren";
  return `${days} dagen geleden`;
}
