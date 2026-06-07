"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sendSurveyToStudents } from "@/server/actions/surveys";

type SurveyOption = { id: string; title: string };
type StudentOption = { id: string; name: string; email: string };

export function ManualSendForm({
  surveys,
  students,
}: {
  surveys: SurveyOption[];
  students: StudentOption[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [surveyId, setSurveyId] = useState(surveys[0]?.id ?? "");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === students.length) setSelected(new Set());
    else setSelected(new Set(students.map((s) => s.id)));
  };

  if (surveys.length === 0) {
    return (
      <Card className="card-learning">
        <CardContent className="py-8 text-sm text-muted-foreground">
          Geen actieve enquêtes met vragen. Maak eerst een enquête aan en voeg vragen toe.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-learning">
      <CardHeader>
        <CardTitle>Versturen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 max-w-md">
          <Label>Enquête</Label>
          <Select value={surveyId} onValueChange={(v) => v && setSurveyId(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Kies enquête" />
            </SelectTrigger>
            <SelectContent>
              {surveys.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Studenten ({selected.size} geselecteerd)</Label>
            <Button type="button" variant="ghost" size="sm" onClick={selectAll}>
              {selected.size === students.length ? "Geen selecteren" : "Alles selecteren"}
            </Button>
          </div>
          {students.length === 0 ? (
            <p className="text-sm text-muted-foreground">Geen studenten beschikbaar.</p>
          ) : (
            <ul className="max-h-80 space-y-1 overflow-y-auto rounded-xl border border-border/70 p-2">
              {students.map((s) => (
                <li key={s.id}>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/40">
                    <input
                      type="checkbox"
                      checked={selected.has(s.id)}
                      onChange={() => toggle(s.id)}
                      disabled={pending}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-sm">{s.name}</span>
                      <span className="block text-xs text-muted-foreground">{s.email}</span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {message ? <p className="text-sm text-primary">{message}</p> : null}

        <Button
          type="button"
          disabled={pending || selected.size === 0 || !surveyId}
          onClick={() => {
            setError(null);
            setMessage(null);
            startTransition(async () => {
              try {
                const { sent } = await sendSurveyToStudents(surveyId, [...selected]);
                setMessage(`${sent} uitnodiging${sent === 1 ? "" : "en"} verstuurd.`);
                setSelected(new Set());
                router.refresh();
              } catch (err) {
                setError(err instanceof Error ? err.message : "Mislukt");
              }
            });
          }}
        >
          {pending ? "Versturen…" : "Enquête versturen"}
        </Button>
      </CardContent>
    </Card>
  );
}
