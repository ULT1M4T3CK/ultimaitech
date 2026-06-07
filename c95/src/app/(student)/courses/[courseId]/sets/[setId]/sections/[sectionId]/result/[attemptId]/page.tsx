import Link from "next/link";
import { notFound, redirect } from "next/navigation";
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
import { CheckCircle2, ChevronRight, XCircle } from "lucide-react";

type OptSnap = { id: string; text: string; isCorrect: boolean; imageUrl?: string | null };

type Props = { params: Promise<{ courseId: string; setId: string; sectionId: string; attemptId: string }> };

export default async function SectionResultPage({ params }: Props) {
  const { courseId, setId, sectionId, attemptId } = await params;
  const session = await auth();
  if (!session?.user?.id) notFound();

  const attempt = await getExamAttemptForStudent(attemptId);
  if (!attempt) notFound();
  if (attempt.sectionId && attempt.sectionId !== sectionId) notFound();
  const isStudyLike = attempt.mode === "STUDY" || attempt.mode === "COURSE_RUN";
  const retryHref = isStudyLike
    ? `/courses/${courseId}/sets/${setId}/sections/${sectionId}/study${attempt.mode === "COURSE_RUN" ? "?run=1" : ""}`
    : `/courses/${courseId}/sets/${setId}/sections/${sectionId}/exam`;

  return (
    <div className="space-y-10">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link
          href={`/courses/${courseId}/sets/${setId}/sections/${sectionId}`}
          className="font-medium text-foreground/80 hover:text-primary"
        >
          {attempt.sectionName}
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
            <CardTitle className="text-2xl font-semibold tracking-tight">Poging voltooid</CardTitle>
            <CardDescription className="text-base">
              {attempt.questionSetName} · {attempt.sectionName}
              <br />
              <span className="text-xs text-muted-foreground/90">
                {attempt.mode === "COURSE_RUN" ? "Volledige cursus" : attempt.mode === "STUDY" ? "Studiemodus" : "Oefenexamen"}
              </span>
              {attempt.safetyFailed ? (
                <>
                  <br />
                  <span className="font-semibold text-destructive">Veiligheidskritisch item gemist — onderdeel niet gehaald.</span>
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
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Score</span>
              <span className="text-3xl font-bold tabular-nums sm:text-4xl">
                {attempt.correctCount}
                <span className="text-lg font-semibold text-muted-foreground">/{attempt.totalCount}</span>
              </span>
            </div>
            {attempt.passed ? (
              <Badge className="gap-1.5 border-0 bg-primary px-3 py-1 text-primary-foreground">
                <CheckCircle2 className="size-4" aria-hidden />
                Gehaald
              </Badge>
            ) : (
              <Badge variant="destructive" className="gap-1.5 px-3 py-1">
                <XCircle className="size-4" aria-hidden />
                Niet gehaald
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3 border-t border-border/60 bg-muted/15 px-6 py-5">
          <Link
            href={retryHref}
            className={cn(buttonVariants(), "h-11 gap-2 px-6")}
          >
            {isStudyLike ? "Opnieuw studeren" : "Nieuwe poging"}
            <ChevronRight className="size-4" aria-hidden />
          </Link>
          <Link href={`/courses/${courseId}/sets/${setId}`} className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6")}>
            Terug naar set
          </Link>
        </CardContent>
      </Card>

      {!isStudyLike ? (
        <SurveyInvitationBanner userId={session.user.id} attemptId={attemptId} />
      ) : null}

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Vragenoverzicht</h2>
        <div className="space-y-4">
          {attempt.answers.length === 0 ? (
            <Card className="card-learning border-dashed">
              <CardContent className="py-6 text-sm text-muted-foreground">
                Deze poging heeft geen antwoordregels. Dat is normaal voor studiemodus en voor pogingen die vroeg zijn verlaten.
              </CardContent>
            </Card>
          ) : null}
          {attempt.answers.map((a, i) => {
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
      </section>
    </div>
  );
}
