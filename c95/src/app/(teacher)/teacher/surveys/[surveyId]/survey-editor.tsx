"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import type { Survey, SurveyQuestion, SurveyQuestionType } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  addSurveyQuestion,
  deleteSurvey,
  deleteSurveyQuestion,
  reorderSurveyQuestions,
  updateSurvey,
  updateSurveyQuestion,
} from "@/server/actions/surveys";

const TYPE_LABELS: Record<SurveyQuestionType, string> = {
  RATING: "Beoordeling (1–5)",
  TEXT: "Open tekst",
  SINGLE_CHOICE: "Enkele keuze",
  MULTI_CHOICE: "Meerdere keuzes",
};

type SurveyWithQuestions = Survey & { questions: SurveyQuestion[] };

export function SurveyEditor({ survey }: { survey: SurveyWithQuestions }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [newType, setNewType] = useState<SurveyQuestionType>("RATING");
  const [newPrompt, setNewPrompt] = useState("");
  const [newOptions, setNewOptions] = useState("Optie 1\nOptie 2");

  return (
    <div className="space-y-8">
      <Card className="card-learning">
        <CardHeader>
          <CardTitle>Instellingen</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex max-w-xl flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setError(null);
              const fd = new FormData(e.currentTarget);
              startTransition(async () => {
                try {
                  await updateSurvey(survey.id, {
                    title: String(fd.get("title") ?? ""),
                    description: String(fd.get("description") ?? "") || undefined,
                    isActive: fd.get("isActive") === "on",
                  });
                  router.refresh();
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Mislukt");
                }
              });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="edit-title">Titel</Label>
              <Input id="edit-title" name="title" defaultValue={survey.title} required disabled={pending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-desc">Beschrijving</Label>
              <Textarea id="edit-desc" name="description" defaultValue={survey.description ?? ""} rows={2} disabled={pending} />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isActive" defaultChecked={survey.isActive} disabled={pending} />
              Actief (automatisch versturen ingeschakeld)
            </label>
            <Button type="submit" variant="secondary" disabled={pending}>
              Opslaan
            </Button>
          </form>
          <div className="mt-6 border-t pt-4">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={pending}
              onClick={() => {
                if (!confirm("Enquête definitief verwijderen?")) return;
                startTransition(async () => {
                  await deleteSurvey(survey.id);
                  router.push("/teacher/surveys");
                });
              }}
            >
              Enquête verwijderen
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="card-learning">
        <CardHeader>
          <CardTitle>Vragen ({survey.questions.length})</CardTitle>
          <CardDescription>Sleep niet nodig — gebruik pijlen om te herschikken.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {survey.questions.map((q, index) => (
            <QuestionRow
              key={q.id}
              question={q}
              index={index}
              total={survey.questions.length}
              surveyId={survey.id}
              orderedIds={survey.questions.map((x) => x.id)}
              disabled={pending}
              onMutate={() => router.refresh()}
            />
          ))}

          <div className="rounded-xl border border-dashed border-border/80 bg-muted/10 p-4 space-y-4">
            <p className="text-sm font-medium">Vraag toevoegen</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={newType} onValueChange={(v) => setNewType(v as SurveyQuestionType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(TYPE_LABELS) as SurveyQuestionType[]).map((t) => (
                      <SelectItem key={t} value={t}>
                        {TYPE_LABELS[t]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Vraag</Label>
              <Input value={newPrompt} onChange={(e) => setNewPrompt(e.target.value)} placeholder="Jouw vraag…" />
            </div>
            {(newType === "SINGLE_CHOICE" || newType === "MULTI_CHOICE") && (
              <div className="space-y-2">
                <Label>Opties (één per regel)</Label>
                <Textarea value={newOptions} onChange={(e) => setNewOptions(e.target.value)} rows={4} />
              </div>
            )}
            <Button
              type="button"
              disabled={pending || !newPrompt.trim()}
              onClick={() => {
                setError(null);
                const options =
                  newType === "SINGLE_CHOICE" || newType === "MULTI_CHOICE"
                    ? newOptions.split("\n").map((s) => s.trim()).filter(Boolean)
                    : undefined;
                startTransition(async () => {
                  try {
                    await addSurveyQuestion(survey.id, {
                      type: newType,
                      prompt: newPrompt.trim(),
                      options,
                    });
                    setNewPrompt("");
                    router.refresh();
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Mislukt");
                  }
                });
              }}
            >
              Vraag toevoegen
            </Button>
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}

function QuestionRow({
  question,
  index,
  total,
  surveyId,
  orderedIds,
  disabled,
  onMutate,
}: {
  question: SurveyQuestion;
  index: number;
  total: number;
  surveyId: string;
  orderedIds: string[];
  disabled: boolean;
  onMutate: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const opts = Array.isArray(question.options) ? (question.options as string[]) : [];

  const move = (dir: -1 | 1) => {
    const next = [...orderedIds];
    const j = index + dir;
    if (j < 0 || j >= total) return;
    [next[index], next[j]] = [next[j]!, next[index]!];
    startTransition(async () => {
      await reorderSurveyQuestions(surveyId, next);
      onMutate();
    });
  };

  return (
    <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="space-y-1">
          <Badge variant="secondary">{TYPE_LABELS[question.type]}</Badge>
          <p className="font-medium">{question.prompt}</p>
          {opts.length > 0 ? (
            <ul className="text-sm text-muted-foreground list-disc pl-5">
              {opts.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex gap-1">
          <Button type="button" size="icon" variant="outline" disabled={disabled || pending || index === 0} onClick={() => move(-1)}>
            <ArrowUp className="size-4" />
          </Button>
          <Button type="button" size="icon" variant="outline" disabled={disabled || pending || index === total - 1} onClick={() => move(1)}>
            <ArrowDown className="size-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="destructive"
            disabled={disabled || pending}
            onClick={() => {
              if (!confirm("Vraag verwijderen?")) return;
              startTransition(async () => {
                await deleteSurveyQuestion(question.id);
                onMutate();
              });
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
      <form
        className="grid gap-2 sm:grid-cols-[1fr_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const type = String(fd.get("type")) as SurveyQuestionType;
          const optionsRaw = String(fd.get("options") ?? "");
          const options =
            type === "SINGLE_CHOICE" || type === "MULTI_CHOICE"
              ? optionsRaw.split("\n").map((s) => s.trim()).filter(Boolean)
              : undefined;
          startTransition(async () => {
            await updateSurveyQuestion(question.id, {
              type,
              prompt: String(fd.get("prompt") ?? ""),
              options,
              required: fd.get("required") === "on",
            });
            onMutate();
          });
        }}
      >
        <Input name="prompt" defaultValue={question.prompt} className="sm:col-span-2" />
        <select name="type" defaultValue={question.type} className="h-10 rounded-md border bg-background px-3 text-sm">
          {(Object.keys(TYPE_LABELS) as SurveyQuestionType[]).map((t) => (
            <option key={t} value={t}>
              {TYPE_LABELS[t]}
            </option>
          ))}
        </select>
        <Button type="submit" size="sm" variant="secondary" disabled={pending}>
          Bijwerken
        </Button>
        {(question.type === "SINGLE_CHOICE" || question.type === "MULTI_CHOICE") && (
          <Textarea name="options" defaultValue={opts.join("\n")} rows={3} className="sm:col-span-2" placeholder="Opties…" />
        )}
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="required" defaultChecked={question.required} />
          Verplicht
        </label>
      </form>
    </div>
  );
}
