"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { MarkdownBody } from "@/components/markdown-body";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ExamQuestionClient } from "@/server/actions/exams";
import {
  startExamSession,
  startSetExamSession,
  submitExamAttempt,
  submitSetExamAttempt,
} from "@/server/actions/exams";
import type { QuestionType } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useAbandonAttempt } from "@/components/exam/use-abandon-attempt";

type Props = {
  courseId: string;
  setId: string;
  /** Omit or null for a full question-set exam spanning all sections. */
  sectionId?: string | null;
  mode?: "EXAM" | "COURSE_RUN";
};

function emptySelection(type: QuestionType): string[] {
  void type;
  return [];
}

export function WalkthroughExam({ courseId, setId, sectionId = null, mode = "EXAM" }: Props) {
  const isSetExam = !sectionId;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [finalized, setFinalized] = useState(false);
  const [questions, setQuestions] = useState<ExamQuestionClient[]>([]);
  const [index, setIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [pending, startTransition] = useTransition();

  const releaseAttempt = useAbandonAttempt(attemptId, Boolean(attemptId) && !finalized);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setFinalized(false);
        const session = isSetExam
          ? await startSetExamSession(setId, { mode })
          : await startExamSession(sectionId!, { mode });
        if (cancelled) return;
        setAttemptId(session.attemptId);
        setQuestions(session.questions);
        const init: Record<string, string[]> = {};
        for (const q of session.questions) init[q.id] = emptySelection(q.type);
        setSelections(init);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Kon het examen niet starten.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isSetExam, mode, sectionId, setId]);

  const q = questions[index];
  const total = questions.length;
  const prevQ = index > 0 ? questions[index - 1] : null;
  const showSectionDivider =
    isSetExam && q?.section && (index === 0 || prevQ?.section?.id !== q.section.id);

  function setSelectionFor(questionId: string, type: QuestionType, optionId: string, checked: boolean) {
    setSelections((prev) => {
      const cur = prev[questionId] ?? [];
      if (type === "MULTI") {
        const set = new Set(cur);
        if (checked) set.add(optionId);
        else set.delete(optionId);
        return { ...prev, [questionId]: [...set] };
      }
      return { ...prev, [questionId]: [optionId] };
    });
  }

  function validateCurrent(): boolean {
    if (!q) return false;
    const sel = selections[q.id] ?? [];
    if (q.type === "MULTI") return sel.length >= 1;
    return sel.length === 1;
  }

  function validateAll(): boolean {
    for (const qq of questions) {
      const sel = selections[qq.id] ?? [];
      if (qq.type === "MULTI") {
        if (sel.length < 1) return false;
      } else if (sel.length !== 1) return false;
    }
    return true;
  }

  function resultHref(id: string) {
    const runQuery = mode === "COURSE_RUN" ? "?run=1" : "";
    if (isSetExam) {
      return `/courses/${courseId}/sets/${setId}/result/${id}${runQuery}`;
    }
    return `/courses/${courseId}/sets/${setId}/sections/${sectionId}/result/${id}${runQuery}`;
  }

  function submit() {
    if (!attemptId) return;
    if (!validateAll()) {
      setError("Beantwoord alle vragen voordat je inlevert.");
      return;
    }
    setError(null);
    const payload = {
      attemptId,
      answers: questions.map((qq) => ({
        questionId: qq.id,
        selectedOptionIds: selections[qq.id] ?? [],
      })),
    };
    startTransition(async () => {
      try {
        if (isSetExam) {
          await submitSetExamAttempt(payload);
        } else {
          await submitExamAttempt(payload);
        }
        releaseAttempt();
        setFinalized(true);
        router.push(resultHref(attemptId));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Inleveren mislukt.");
      }
    });
  }

  if (loading) {
    return (
      <Card className="card-learning overflow-hidden">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-24">
          <Loader2 className="size-10 animate-spin text-primary" aria-hidden />
          <p className="text-sm font-medium text-muted-foreground">Je poging wordt voorbereid…</p>
        </CardContent>
      </Card>
    );
  }

  if (error && !q) {
    return (
      <Alert variant="destructive" className="border-destructive/30">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!q || !attemptId) {
    return (
      <Alert className="border-border/80 bg-muted/30">
        <AlertDescription>
          {isSetExam
            ? "Er zijn nog geen automatisch beoordeelde vragen voor deze vragenset."
            : "Er zijn nog geen automatisch beoordeelde vragen voor dit onderdeel."}
        </AlertDescription>
      </Alert>
    );
  }

  const sel = selections[q.id] ?? [];
  const useSegmentedProgress = total <= 20;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <div className="flex flex-col gap-1 text-xs font-medium text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="min-w-0 truncate">
            Vraag {index + 1} van {total}
            {isSetExam && q.section ? ` · ${q.section.name}` : ""}
          </span>
          <span className="shrink-0 tabular-nums">{Math.round(((index + 1) / total) * 100)}% voltooid</span>
        </div>
        {useSegmentedProgress ? (
          <div className="flex gap-1" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={total}>
            {questions.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-300 sm:h-2",
                  i <= index ? "bg-primary" : "bg-muted",
                  i === index && "ring-2 ring-primary/25 ring-offset-1 ring-offset-background sm:ring-offset-2",
                )}
              />
            ))}
          </div>
        ) : (
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={index + 1}
            aria-valuemin={1}
            aria-valuemax={total}
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        )}
      </div>

      {showSectionDivider && q.section ? (
        <Card className="border-primary/30 bg-primary/[0.06]">
          <CardHeader className="py-4">
            <CardTitle className="text-base font-semibold text-primary">
              Onderdeel {q.section.order}: {q.section.name}
            </CardTitle>
          </CardHeader>
        </Card>
      ) : null}

      {q.scenario ? (
        <Card className="border-primary/25 bg-primary/[0.04]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-primary">{q.scenario.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <MarkdownBody markdown={q.scenario.body} className="space-y-2 [&_p]:leading-relaxed" />
          </CardContent>
        </Card>
      ) : null}

      <Card className="card-learning overflow-hidden shadow-md shadow-black/[0.04]">
        <CardHeader className="space-y-2 border-b border-border/60 bg-muted/15 px-4 pb-4 pt-4 sm:space-y-3 sm:px-6 sm:pb-6 sm:pt-6">
          <div className="text-base font-semibold leading-snug sm:text-lg md:text-xl">
            <MarkdownBody markdown={q.prompt} className="space-y-2 [&_p]:leading-relaxed" />
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {q.type === "SINGLE" && "Kies het antwoord dat het beste past."}
            {q.type === "MULTI" && "Selecteer alle antwoorden die van toepassing zijn. Meerdere opties kunnen goed zijn."}
            {q.type === "TRUE_FALSE" && "Kies waar of onwaar."}
            {q.type === "IMAGE_CHOICE" && "Kies de afbeelding of het label dat bij de vraag past."}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 px-4 pt-4 sm:space-y-4 sm:px-6 sm:pt-6">
          {error ? (
            <Alert variant="destructive" className="border-destructive/30">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
          {q.images.map((im) => (
            <div key={im.id} className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-xl border border-border/80 bg-muted shadow-inner">
              <Image src={im.url} alt={im.caption ?? ""} fill className="object-contain" sizes="(max-width:768px) 100vw, 640px" />
              {im.caption ? <p className="mt-2 text-xs text-muted-foreground">{im.caption}</p> : null}
            </div>
          ))}
          {q.imageUrl ? (
            <div className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-xl border border-border/80 bg-muted shadow-inner">
              <Image src={q.imageUrl} alt="" fill className="object-contain" sizes="(max-width:768px) 100vw, 640px" />
            </div>
          ) : null}
          <div className="space-y-3" role="group" aria-label="Antwoordopties">
            {q.options.map((o) => {
              const checked = sel.includes(o.id);
              if (q.type === "MULTI") {
                return (
                  <label
                    key={o.id}
                    className={cn(
                      "flex min-h-[3rem] cursor-pointer touch-manipulation flex-col gap-2 rounded-xl border px-3 py-3 transition-all active:scale-[0.99] sm:flex-row sm:items-start sm:px-4 sm:py-3.5",
                      checked
                        ? "border-primary bg-primary/[0.06] shadow-sm ring-2 ring-primary/20"
                        : "border-border/80 bg-card hover:border-primary/30 hover:bg-muted/30",
                    )}
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 size-5 shrink-0 rounded border-input text-primary sm:mt-1 sm:size-4"
                      checked={checked}
                      onChange={(e) => setSelectionFor(q.id, q.type, o.id, e.target.checked)}
                    />
                    {o.imageUrl ? (
                      <div className="relative h-32 w-full max-w-xs shrink-0 overflow-hidden rounded-md border bg-muted sm:h-24 sm:w-40">
                        <Image src={o.imageUrl} alt="" fill className="object-contain" sizes="160px" />
                      </div>
                    ) : null}
                    <span className="text-sm font-medium leading-relaxed">{o.text}</span>
                  </label>
                );
              }
              return (
                <label
                  key={o.id}
                  className={cn(
                    "flex min-h-[3rem] cursor-pointer touch-manipulation flex-col gap-2 rounded-xl border px-3 py-3 transition-all active:scale-[0.99] sm:flex-row sm:items-start sm:px-4 sm:py-3.5",
                    checked
                      ? "border-primary bg-primary/[0.06] shadow-sm ring-2 ring-primary/20"
                      : "border-border/80 bg-card hover:border-primary/30 hover:bg-muted/30",
                  )}
                >
                  <input
                    type="radio"
                    className="mt-0.5 size-5 shrink-0 border-input text-primary sm:mt-1 sm:size-4"
                    name={q.id}
                    checked={checked}
                    onChange={() => setSelectionFor(q.id, q.type, o.id, true)}
                  />
                  {o.imageUrl ? (
                    <div className="relative h-32 w-full max-w-xs shrink-0 overflow-hidden rounded-md border bg-muted sm:h-24 sm:w-40">
                      <Image src={o.imageUrl} alt="" fill className="object-contain" sizes="160px" />
                    </div>
                  ) : null}
                  <span className="text-sm font-medium leading-relaxed">{o.text}</span>
                </label>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="sticky bottom-0 z-10 flex flex-col gap-2 border-t border-border/60 bg-background/95 px-4 py-3 backdrop-blur supports-[padding:max(0px)]:pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:py-5 lg:static lg:bg-muted/10 lg:backdrop-blur-none">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full touch-manipulation sm:w-auto"
            disabled={index === 0}
            onClick={() => setIndex((i) => i - 1)}
          >
            Terug
          </Button>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            {index < total - 1 ? (
              <Button
                type="button"
                className="h-11 w-full touch-manipulation sm:min-w-[140px] sm:w-auto"
                disabled={!validateCurrent()}
                onClick={() => {
                  setError(null);
                  setIndex((i) => i + 1);
                }}
              >
                Volgende vraag
              </Button>
            ) : (
              <Button type="button" className="h-11 w-full touch-manipulation sm:min-w-[160px] sm:w-auto" disabled={!validateAll() || pending} onClick={submit}>
                {pending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
                    Bezig met inleveren…
                  </>
                ) : (
                  "Poging inleveren"
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
