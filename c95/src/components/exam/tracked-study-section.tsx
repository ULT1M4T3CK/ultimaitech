"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { MarkdownBody } from "@/components/markdown-body";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { completeStudyAttempt, startStudyAttempt } from "@/server/actions/exams";
import { useAbandonAttempt } from "@/components/exam/use-abandon-attempt";

type StudyContent = {
  id: string;
  name: string;
  questions: {
    id: string;
    type: string;
    gradingMode: string;
    prompt: string;
    imageUrl: string | null;
    referenceMaterial: string | null;
    canonicalAnswer: string | null;
    feedback: string | null;
    scenario: { title: string; body: string } | null;
    images: { id: string; url: string; caption: string | null }[];
    options: { id: string; text: string; imageUrl: string | null; isCorrect: boolean }[];
    criteria: { id: string; text: string; isRequired: boolean }[];
  }[];
};

type Props = {
  sectionId: string;
  data: StudyContent;
  mode?: "STUDY" | "COURSE_RUN";
  completeHref: string;
};

export function TrackedStudySection({ sectionId, data, mode = "STUDY", completeHref }: Props) {
  const router = useRouter();
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [finalized, setFinalized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const releaseAttempt = useAbandonAttempt(attemptId, Boolean(attemptId) && !finalized);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setFinalized(false);
        const attempt = await startStudyAttempt(sectionId, { mode });
        if (!cancelled) setAttemptId(attempt.id);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Kon studiepoging niet starten.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [mode, sectionId]);

  function complete() {
    if (!attemptId) return;
    setError(null);
    startTransition(async () => {
      try {
        await completeStudyAttempt(attemptId);
        releaseAttempt();
        setFinalized(true);
        router.push(completeHref);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Afronden mislukt.");
      }
    });
  }

  return (
    <div className="space-y-6">
      {error ? (
        <Alert variant="destructive" className="border-destructive/30">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <div className="space-y-6">
        {data.questions.map((q, i) => (
          <Card key={q.id} className="card-learning">
            <CardHeader className="border-b border-border/50 pb-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-base">Vraag {i + 1}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline">{q.type}</Badge>
                  <Badge variant={q.gradingMode === "INSTRUCTOR" ? "secondary" : "default"}>{q.gradingMode}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {q.scenario ? (
                <div className="rounded-lg border border-primary/20 bg-primary/[0.04] p-4 text-sm">
                  <p className="font-semibold text-primary">{q.scenario.title}</p>
                  <MarkdownBody markdown={q.scenario.body} className="mt-2 space-y-2 text-sm [&_p]:leading-relaxed" />
                </div>
              ) : null}
              <MarkdownBody markdown={q.prompt} className="space-y-2 text-sm [&_p]:leading-relaxed" />
              {q.referenceMaterial ? <p className="text-sm italic text-muted-foreground">{q.referenceMaterial}</p> : null}
              {q.images.map((im) => (
                <figure key={im.id} className="space-y-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={im.url} alt="" className="max-h-64 rounded-lg border object-contain" />
                  {im.caption ? <figcaption className="text-xs text-muted-foreground">{im.caption}</figcaption> : null}
                </figure>
              ))}
              {q.imageUrl ? (
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={q.imageUrl} alt="" className="max-h-64 rounded-lg border object-contain" />
                </figure>
              ) : null}
              {q.options.length > 0 ? (
                <ul className="space-y-2 text-sm">
                  {q.options.map((o) => (
                    <li key={o.id} className="rounded-md border px-3 py-2">
                      {o.imageUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={o.imageUrl} alt="" className="mb-2 max-h-40 object-contain" />
                      ) : null}
                      <span className={o.isCorrect ? "font-medium text-emerald-700 dark:text-emerald-400" : ""}>
                        {o.text}
                        {o.isCorrect ? " · (correct)" : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {q.canonicalAnswer ? (
                <>
                  <Separator />
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Modelantwoord</p>
                    <MarkdownBody markdown={q.canonicalAnswer} className="mt-2 space-y-2 text-sm [&_p]:leading-relaxed" />
                  </div>
                </>
              ) : null}
              {q.criteria.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Checklist</p>
                  <ul className="mt-2 list-inside list-disc text-sm">
                    {q.criteria.map((c) => (
                      <li key={c.id}>
                        {c.text}
                        {c.isRequired ? " (required)" : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {q.feedback ? (
                <>
                  <Separator />
                  <MarkdownBody markdown={q.feedback} className="space-y-2 text-sm [&_p]:leading-relaxed" />
                </>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="card-learning border-primary/20">
        <CardFooter className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Rond dit onderdeel expliciet af. Weggaan zonder afronden wordt als gezakt geregistreerd.
          </p>
          <Button type="button" className="h-11 w-full sm:w-auto" disabled={!attemptId || pending} onClick={complete}>
            {pending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
                Afronden…
              </>
            ) : mode === "COURSE_RUN" ? (
              "Onderdeel afronden en doorgaan"
            ) : (
              "Onderdeel afronden"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
