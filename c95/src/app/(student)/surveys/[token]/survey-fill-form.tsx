"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { SurveyQuestionType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { submitSurveyResponse } from "@/server/actions/surveys";

type Question = {
  id: string;
  type: SurveyQuestionType;
  prompt: string;
  required: boolean;
  options: string[];
};

export function SurveyFillForm({
  invitationId,
  questions,
}: {
  invitationId: string;
  questions: Question[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [singles, setSingles] = useState<Record<string, string>>({});
  const [multis, setMultis] = useState<Record<string, Set<string>>>({});

  const toggleMulti = (qId: string, opt: string) => {
    setMultis((prev) => {
      const set = new Set(prev[qId] ?? []);
      if (set.has(opt)) set.delete(opt);
      else set.add(opt);
      return { ...prev, [qId]: set };
    });
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);

        const answers: { questionId: string; value: string | number | string[] }[] = [];

        for (const q of questions) {
          if (q.type === "RATING") {
            const v = ratings[q.id];
            if (v == null && q.required) {
              setError(`Beantwoord: ${q.prompt}`);
              return;
            }
            if (v != null) answers.push({ questionId: q.id, value: v });
          } else if (q.type === "TEXT") {
            const v = texts[q.id]?.trim() ?? "";
            if (!v && q.required) {
              setError(`Beantwoord: ${q.prompt}`);
              return;
            }
            if (v) answers.push({ questionId: q.id, value: v });
          } else if (q.type === "SINGLE_CHOICE") {
            const v = singles[q.id];
            if (!v && q.required) {
              setError(`Beantwoord: ${q.prompt}`);
              return;
            }
            if (v) answers.push({ questionId: q.id, value: v });
          } else if (q.type === "MULTI_CHOICE") {
            const v = [...(multis[q.id] ?? [])];
            if (v.length === 0 && q.required) {
              setError(`Beantwoord: ${q.prompt}`);
              return;
            }
            if (v.length > 0) answers.push({ questionId: q.id, value: v });
          }
        }

        startTransition(async () => {
          try {
            await submitSurveyResponse(invitationId, answers);
            router.refresh();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Mislukt");
          }
        });
      }}
    >
      {questions.map((q, i) => (
        <Card key={q.id} className="card-learning">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">
              {i + 1}. {q.prompt}
              {q.required ? <span className="text-destructive"> *</span> : null}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {q.type === "RATING" && (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`size-11 rounded-xl border text-sm font-semibold transition-colors ${
                      ratings[q.id] === n
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                    onClick={() => setRatings((r) => ({ ...r, [q.id]: n }))}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}
            {q.type === "TEXT" && (
              <Textarea
                value={texts[q.id] ?? ""}
                onChange={(e) => setTexts((t) => ({ ...t, [q.id]: e.target.value }))}
                rows={4}
                placeholder="Jouw antwoord…"
              />
            )}
            {q.type === "SINGLE_CHOICE" && (
              <ul className="space-y-2">
                {q.options.map((opt) => (
                  <li key={opt}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/70 px-4 py-3 hover:bg-muted/30">
                      <input
                        type="radio"
                        name={q.id}
                        checked={singles[q.id] === opt}
                        onChange={() => setSingles((s) => ({ ...s, [q.id]: opt }))}
                      />
                      {opt}
                    </label>
                  </li>
                ))}
              </ul>
            )}
            {q.type === "MULTI_CHOICE" && (
              <ul className="space-y-2">
                {q.options.map((opt) => (
                  <li key={opt}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/70 px-4 py-3 hover:bg-muted/30">
                      <input
                        type="checkbox"
                        checked={(multis[q.id] ?? new Set()).has(opt)}
                        onChange={() => toggleMulti(q.id, opt)}
                      />
                      {opt}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      ))}

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
        {pending ? "Verzenden…" : "Enquête verzenden"}
      </Button>
    </form>
  );
}
