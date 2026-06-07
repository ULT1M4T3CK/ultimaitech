"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { MarkdownBody } from "@/components/markdown-body";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { completeLiveExamSession, updateLiveExamGrade } from "@/server/actions/liveExam";
import type { GradingMode, QuestionType } from "@prisma/client";
type CriterionSnap = { id: string; text: string; isRequired: boolean };

type GradeRow = {
  id: string;
  sectionOrder: number;
  questionOrder: number;
  promptSnapshot: string;
  typeSnapshot: QuestionType;
  gradingModeSnapshot: GradingMode;
  optionsSnapshot: unknown;
  criteriaSnapshot: unknown;
  passed: boolean | null;
  criteriaPassedIds: string[];
  instructorNotes: string | null;
  safetyFailed: boolean;
};

type SessionPayload = {
  id: string;
  status: string;
  safetyFailed: boolean;
  student: { name: string; email: string };
  questionSet: { name: string };
  course: { name: string };
  grades: GradeRow[];
};

export function LiveExamSessionPanel({ session }: { session: SessionPayload }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [local, setLocal] = useState(() =>
    Object.fromEntries(
      session.grades.map((g) => [
        g.id,
        {
          passed: g.passed,
          criteriaPassedIds: [...g.criteriaPassedIds],
          instructorNotes: g.instructorNotes ?? "",
          safetyFailed: g.safetyFailed,
        },
      ]),
    ) as Record<
      string,
      { passed: boolean | null; criteriaPassedIds: string[]; instructorNotes: string; safetyFailed: boolean }
    >,
  );

  const completed = session.status === "COMPLETED";

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm text-muted-foreground">
          {session.course.name} · {session.questionSet.name}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Live-examensessie</h1>
        <p className="text-muted-foreground">
          {session.student.name} · {session.student.email}
        </p>
        {session.safetyFailed ? (
          <Badge variant="destructive" className="mt-2">
            Veiligheidsvlag op sessie
          </Badge>
        ) : null}
      </header>

      <div className="space-y-6">
        {session.grades.map((g) => {
          const crits = (Array.isArray(g.criteriaSnapshot) ? g.criteriaSnapshot : []) as CriterionSnap[];
          const state = local[g.id]!;
          return (
            <Card key={g.id} className="card-learning">
              <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 border-b pb-3">
                <CardTitle className="text-base">
                  Onderdeel {g.sectionOrder} · V{g.questionOrder}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline">{g.typeSnapshot}</Badge>
                  <Badge>{g.gradingModeSnapshot}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <MarkdownBody markdown={g.promptSnapshot} className="space-y-2 text-sm [&_p]:leading-relaxed" />
                {crits.length > 0 ? (
                  <div className="space-y-2">
                    <Label>Criteria</Label>
                    <ul className="space-y-2">
                      {crits.map((c) => (
                        <li key={c.id} className="flex items-start gap-2 text-sm">
                          <input
                            type="checkbox"
                            disabled={completed}
                            checked={state.criteriaPassedIds.includes(c.id)}
                            onChange={(e) => {
                              setLocal((prev) => {
                                const cur = { ...prev[g.id]! };
                                if (e.target.checked) cur.criteriaPassedIds = [...cur.criteriaPassedIds, c.id];
                                else cur.criteriaPassedIds = cur.criteriaPassedIds.filter((x) => x !== c.id);
                                return { ...prev, [g.id]: cur };
                              });
                            }}
                          />
                          <span>
                            {c.text}
                            {c.isRequired ? <span className="text-xs text-muted-foreground"> (required)</span> : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={state.passed === true ? "default" : "outline"}
                    disabled={completed}
                    onClick={() => setLocal((p) => ({ ...p, [g.id]: { ...p[g.id]!, passed: true } }))}
                  >
                    Goed
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={state.passed === false ? "destructive" : "outline"}
                    disabled={completed}
                    onClick={() => setLocal((p) => ({ ...p, [g.id]: { ...p[g.id]!, passed: false } }))}
                  >
                    Onvoldoende
                  </Button>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      disabled={completed}
                      checked={state.safetyFailed}
                      onChange={(e) =>
                        setLocal((p) => ({ ...p, [g.id]: { ...p[g.id]!, safetyFailed: e.target.checked } }))
                      }
                    />
                    Veiligheidsfout
                  </label>
                </div>
                <div className="grid gap-2">
                  <Label>Notes</Label>
                  <Textarea
                    disabled={completed}
                    value={state.instructorNotes}
                    onChange={(e) =>
                      setLocal((p) => ({ ...p, [g.id]: { ...p[g.id]!, instructorNotes: e.target.value } }))
                    }
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  disabled={completed || pending || state.passed === null}
                  onClick={() =>
                    startTransition(async () => {
                      await updateLiveExamGrade({
                        gradeId: g.id,
                        passed: state.passed === true,
                        criteriaPassedIds: state.criteriaPassedIds,
                        instructorNotes: state.instructorNotes,
                        safetyFailed: state.safetyFailed,
                      });
                      router.refresh();
                    })
                  }
                >
                  Beoordeling opslaan
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!completed ? (
        <Button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await completeLiveExamSession(session.id);
              router.refresh();
            })
          }
        >
          Sessie afronden
        </Button>
      ) : (
        <p className="text-sm font-medium text-muted-foreground">Sessie afgerond.</p>
      )}
    </div>
  );
}
