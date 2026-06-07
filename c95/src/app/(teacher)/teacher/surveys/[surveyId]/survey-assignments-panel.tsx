"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { SurveyAssignment, SurveyTrigger } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assignSurveyToTrigger, removeSurveyAssignment } from "@/server/actions/surveys";

const TRIGGER_LABELS: Record<SurveyTrigger, string> = {
  EXAM_PASSED: "Examen gehaald",
  EXAM_FAILED: "Examen niet gehaald",
  MANUAL: "Handmatig",
};

type AssignmentWithCourse = SurveyAssignment & {
  course: { id: string; name: string } | null;
};

export function SurveyAssignmentsPanel({
  surveyId,
  assignments,
  courses,
}: {
  surveyId: string;
  assignments: AssignmentWithCourse[];
  courses: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [courseId, setCourseId] = useState<string>("global");
  const [trigger, setTrigger] = useState<"EXAM_PASSED" | "EXAM_FAILED">("EXAM_PASSED");

  const autoAssignments = assignments.filter((a) => a.trigger !== "MANUAL");

  return (
    <Card className="card-learning">
      <CardHeader>
        <CardTitle>Automatische toewijzing</CardTitle>
        <CardDescription>
          Koppel deze enquête aan een examenuitslag. Bij globaal geldt dit voor alle cursussen.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {autoAssignments.length > 0 ? (
          <ul className="space-y-2">
            {autoAssignments.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/70 px-3 py-2 text-sm"
              >
                <span>
                  <Badge variant="outline" className="mr-2 font-normal">
                    {TRIGGER_LABELS[a.trigger]}
                  </Badge>
                  {a.course ? a.course.name : "Alle cursussen"}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  disabled={pending}
                  onClick={() => {
                    startTransition(async () => {
                      await removeSurveyAssignment(a.id);
                      router.refresh();
                    });
                  }}
                >
                  Verwijderen
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Nog geen automatische toewijzingen.</p>
        )}

        <div className="grid gap-4 sm:grid-cols-3 border-t pt-4">
          <div className="space-y-2">
            <Label>Cursus</Label>
            <Select value={courseId} onValueChange={(v) => setCourseId(v ?? "global")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Alle cursussen (globaal)</SelectItem>
                {courses.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Trigger</Label>
            <Select value={trigger} onValueChange={(v) => setTrigger(v as typeof trigger)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EXAM_PASSED">Examen gehaald</SelectItem>
                <SelectItem value="EXAM_FAILED">Examen niet gehaald</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              disabled={pending}
              className="w-full"
              onClick={() => {
                setError(null);
                startTransition(async () => {
                  try {
                    await assignSurveyToTrigger({
                      surveyId,
                      courseId: courseId === "global" ? null : courseId,
                      trigger,
                    });
                    router.refresh();
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Mislukt");
                  }
                });
              }}
            >
              Toewijzen
            </Button>
          </div>
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </CardContent>
    </Card>
  );
}
