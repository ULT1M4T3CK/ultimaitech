import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { auth } from "@/auth";
import { MarkdownBody } from "@/components/markdown-body";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SurveyInvitationBanner } from "@/components/survey/survey-invitation-banner";
import { getExamAttemptForStudent } from "@/server/actions/exams";
import { sectionResult } from "@/lib/scoring";
import { db } from "@/lib/db";
import { CheckCircle2, ChevronRight, XCircle } from "lucide-react";

type OptSnap = { id: string; text: string; isCorrect: boolean; imageUrl?: string | null };

type Props = {
  params: Promise<{ courseId: string; setId: string; attemptId: string }>;
  searchParams: Promise<{ run?: string }>;
};

type AnswerRow = {
  id: string;
  prompt: string;
  isCorrect: boolean;
  safetyFailed: boolean;
  imageUrl: string | null;
  feedbackSnapshot: string | null;
  optionsSnapshot: unknown;
  selectedOptionIds: string[];
  sectionIdSnapshot: string | null;
  sectionNameSnapshot: string | null;
  sectionOrderSnapshot: number | null;
};

type SectionGroup = {
  sectionId: string;
  sectionName: string;
  sectionOrder: number;
  passingQuestionCount: number;
  correctCount: number;
  totalCount: number;
  safetyFailed: boolean;
  passed: boolean;
  answers: AnswerRow[];
};

export default async function QuestionSetResultPage({ params, searchParams }: Props) {
  const { courseId, setId, attemptId } = await params;
  const { run } = await searchParams;
  const isCourseRun = run === "1";
  const session = await auth();
  if (!session?.user?.id) notFound();

  const attempt = await getExamAttemptForStudent(attemptId);
  if (!attempt) notFound();
  if (attempt.questionSetId !== setId) notFound();
  if (!attempt.questionSetId || attempt.sectionId) notFound();

  const sectionMeta = new Map(
    (attempt.questionSet?.sections ?? []).map((s) => [
      s.id,
      { name: s.name, order: s.order, passingQuestionCount: s.passingQuestionCount },
    ]),
  );

  const groupMap = new Map<string, SectionGroup>();
  for (const a of attempt.answers) {
    const sid = a.sectionIdSnapshot;
    if (!sid) continue;
    const meta = sectionMeta.get(sid);
    let group = groupMap.get(sid);
    if (!group) {
      group = {
        sectionId: sid,
        sectionName: a.sectionNameSnapshot ?? meta?.name ?? "Onderdeel",
        sectionOrder: a.sectionOrderSnapshot ?? meta?.order ?? 0,
        passingQuestionCount: meta?.passingQuestionCount ?? 0,
        correctCount: 0,
        totalCount: 0,
        safetyFailed: false,
        passed: false,
        answers: [],
      };
      groupMap.set(sid, group);
    }
    group.answers.push(a);
    group.totalCount += 1;
    if (a.isCorrect) group.correctCount += 1;
    if (a.safetyFailed) group.safetyFailed = true;
  }

  const sectionGroups = [...groupMap.values()].sort((a, b) => a.sectionOrder - b.sectionOrder);
  for (const g of sectionGroups) {
    const { passed } = sectionResult({
      passingQuestionCount: g.passingQuestionCount,
      correctCount: g.correctCount,
      totalCount: g.totalCount,
      safetyFailed: g.safetyFailed,
    });
    g.passed = passed;
  }

  const sectionsPassedInAttempt = sectionGroups.filter((g) => g.passed).length;
  const passingSectionCount = attempt.questionSet?.passingSectionCount ?? 0;

  let nextSetId: string | null = null;
  let courseName: string | null = null;
  if (isCourseRun) {
    const course = await db.course.findUnique({
      where: { id: courseId },
      select: {
        name: true,
        questionSets: {
          orderBy: { order: "asc" },
          select: { id: true, _count: { select: { sections: true } } },
        },
      },
    });
    courseName = course?.name ?? null;
    const setsWithSections = course?.questionSets.filter((s) => s._count.sections > 0) ?? [];
    const currentIndex = setsWithSections.findIndex((s) => s.id === setId);
    if (currentIndex >= 0 && currentIndex < setsWithSections.length - 1) {
      nextSetId = setsWithSections[currentIndex + 1]!.id;
    }
  }

  const examHref = isCourseRun
    ? `/courses/${courseId}/sets/${setId}/exam?run=1`
    : `/courses/${courseId}/sets/${setId}/exam`;

  return (
    <div className="space-y-10">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link
          href={isCourseRun ? `/courses/${courseId}` : `/courses/${courseId}/sets/${setId}`}
          className="font-medium text-foreground/80 hover:text-primary"
        >
          {isCourseRun ? courseName ?? "Cursus" : attempt.questionSetName}
        </Link>
        <ChevronRight className="size-4 opacity-50" aria-hidden />
        <span className="font-medium text-foreground">Resultaten</span>
      </nav>

      <Card
        className={cn(
          "card-learning overflow-hidden border-2",
          attempt.passed ? "border-primary/35 bg-primary/[0.04]" : "border-border",
        )}
      >
        <CardHeader className="flex flex-col gap-6 space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              {isCourseRun ? "Vragenset voltooid" : "Vragenset-examen voltooid"}
            </CardTitle>
            <CardDescription className="text-base">
              {attempt.questionSetName} · {isCourseRun ? "Volledige cursus" : "Hele vragenset"}
              <br />
              <span className="text-xs text-muted-foreground/90">Oefenexamen · alle onderdelen</span>
              {attempt.safetyFailed ? (
                <>
                  <br />
                  <span className="font-semibold text-destructive">
                    Veiligheidskritisch item gemist in minstens één onderdeel.
                  </span>
                </>
              ) : null}
              {attempt.submittedAt ? (
                <>
                  <br />
                  <span className="text-xs text-muted-foreground/90">
                    Ingeleverd {new Date(attempt.submittedAt).toLocaleString("nl-NL")}
                  </span>
                </>
              ) : null}
              <br />
              <span className="text-sm text-muted-foreground">
                Onderdelen gehaald in deze poging:{" "}
                <strong className="text-foreground">
                  {sectionsPassedInAttempt} / {sectionGroups.length}
                </strong>
                {passingSectionCount > 0 ? (
                  <>
                    {" "}
                    (norm voor set: minimaal {passingSectionCount} onderde
                    {passingSectionCount === 1 ? "el" : "len"})
                  </>
                ) : null}
              </span>
            </CardDescription>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <div
              className={cn(
                "flex size-28 flex-col items-center justify-center rounded-2xl border-2 text-center shadow-inner sm:size-32",
                attempt.passed
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-muted-foreground/20 bg-muted/50 text-foreground",
              )}
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Totaal</span>
              <span className="text-3xl font-bold tabular-nums sm:text-4xl">
                {attempt.correctCount}
                <span className="text-lg font-semibold text-muted-foreground">/{attempt.totalCount}</span>
              </span>
            </div>
            {attempt.passed ? (
              <Badge className="gap-1.5 border-0 bg-primary px-3 py-1 text-primary-foreground">
                <CheckCircle2 className="size-4" aria-hidden />
                Vragenset gehaald
              </Badge>
            ) : (
              <Badge variant="destructive" className="gap-1.5 px-3 py-1">
                <XCircle className="size-4" aria-hidden />
                Niet gehaald
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 border-t border-border/60 bg-muted/15 px-4 py-4 sm:flex-row sm:flex-wrap sm:gap-3 sm:px-6 sm:py-5">
          {isCourseRun && nextSetId ? (
            <Link
              href={`/courses/${courseId}/sets/${nextSetId}/exam?run=1`}
              className={cn(buttonVariants(), "h-11 w-full gap-2 px-6 sm:w-auto")}
            >
              Volgende vragenset
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          ) : null}
          <Link
            href={examHref}
            className={cn(
              buttonVariants({ variant: isCourseRun && nextSetId ? "outline" : "default" }),
              "h-11 w-full gap-2 px-6 sm:w-auto",
            )}
          >
            Nieuwe poging
            <ChevronRight className="size-4" aria-hidden />
          </Link>
          {isCourseRun ? (
            <Link href={`/courses/${courseId}`} className={cn(buttonVariants({ variant: "outline" }), "h-11 w-full px-6 sm:w-auto")}>
              {nextSetId ? "Terug naar cursus" : "Cursus voltooid — terug naar cursus"}
            </Link>
          ) : (
            <Link href={`/courses/${courseId}/sets/${setId}`} className={cn(buttonVariants({ variant: "outline" }), "h-11 w-full px-6 sm:w-auto")}>
              Terug naar set
            </Link>
          )}
        </CardContent>
      </Card>

      <SurveyInvitationBanner userId={session.user.id} attemptId={attemptId} />

      <section className="space-y-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Per onderdeel</h2>
        {sectionGroups.map((group) => (
          <div key={group.sectionId} className="space-y-4">
            <Card className={cn("card-learning", group.passed ? "border-primary/25" : "")}>
              <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0 pb-3">
                <CardTitle className="text-lg">
                  Onderdeel {group.sectionOrder}: {group.sectionName}
                </CardTitle>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium tabular-nums text-muted-foreground">
                    {group.correctCount}/{group.totalCount} goed
                  </span>
                  {group.passed ? (
                    <Badge className="border-0 bg-primary/15 text-primary">Gehaald</Badge>
                  ) : (
                    <Badge variant="secondary">Niet gehaald</Badge>
                  )}
                </div>
              </CardHeader>
            </Card>

            <div className="space-y-4 pl-0 sm:pl-2">
              {group.answers.map((a, i) => {
                const opts = a.optionsSnapshot as unknown as OptSnap[];
                return (
                  <Card key={a.id} className="card-learning">
                    <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex gap-3">
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-card text-xs font-bold text-muted-foreground shadow-sm ring-1 ring-border">
                            {i + 1}
                          </span>
                          <div className="text-base font-medium leading-relaxed">
                            <MarkdownBody markdown={a.prompt} className="space-y-2 text-sm [&_p]:leading-relaxed" />
                          </div>
                        </div>
                        {a.isCorrect ? (
                          <Badge variant="secondary" className="shrink-0 gap-1 border border-primary/20 bg-primary/10 text-primary">
                            Goed
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="shrink-0">
                            Fout
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-5">
                      {a.imageUrl ? (
                        <div className="relative aspect-video w-full max-w-lg overflow-hidden rounded-xl border bg-muted shadow-sm">
                          <Image src={a.imageUrl} alt="" fill className="object-contain" sizes="(max-width:768px) 100vw, 512px" />
                        </div>
                      ) : null}
                      <ul className="space-y-2">
                        {opts.map((o) => {
                          const picked = a.selectedOptionIds.includes(o.id);
                          return (
                            <li
                              key={o.id}
                              className={cn(
                                "rounded-xl border px-4 py-3 text-sm leading-relaxed transition-colors",
                                o.isCorrect && "border-emerald-500/35 bg-emerald-500/[0.07]",
                                !o.isCorrect && picked && "border-destructive/40 bg-destructive/[0.06]",
                                !o.isCorrect && !picked && "border-border/80 bg-card",
                              )}
                            >
                              {o.imageUrl ? (
                                <div className="relative mb-2 aspect-video max-h-40 w-full max-w-xs overflow-hidden rounded-md border bg-muted">
                                  <Image src={o.imageUrl} alt="" fill className="object-contain" sizes="200px" />
                                </div>
                              ) : null}
                              <span className="font-medium text-foreground">{o.text}</span>
                              <span className="mt-1 block text-xs text-muted-foreground">
                                {o.isCorrect ? "Juiste optie" : null}
                                {!o.isCorrect && picked ? "Jouw antwoord" : null}
                                {!o.isCorrect && !picked ? "Andere optie" : null}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                      {a.feedbackSnapshot ? (
                        <>
                          <Separator />
                          <div className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                            <span className="font-semibold text-foreground">Feedback · </span>
                            <MarkdownBody markdown={a.feedbackSnapshot} className="mt-2 space-y-2 text-sm [&_p]:leading-relaxed" />
                          </div>
                        </>
                      ) : null}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
