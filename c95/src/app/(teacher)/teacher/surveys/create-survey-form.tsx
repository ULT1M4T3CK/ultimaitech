"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createSurvey } from "@/server/actions/surveys";

export function CreateSurveyForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="flex max-w-lg flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          try {
            const survey = await createSurvey({
              title: String(fd.get("title") ?? ""),
              description: String(fd.get("description") ?? "") || undefined,
            });
            router.push(`/teacher/surveys/${survey.id}`);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Mislukt");
          }
        });
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="title">Titel</Label>
        <Input id="title" name="title" required placeholder="Bijv. Feedback na examen" disabled={pending} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Beschrijving (optioneel)</Label>
        <Textarea id="description" name="description" rows={2} disabled={pending} />
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Aanmaken…" : "Enquête aanmaken"}
      </Button>
    </form>
  );
}
