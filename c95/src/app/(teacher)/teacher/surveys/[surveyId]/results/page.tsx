import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSurveyResults } from "@/server/actions/surveys";

type Props = { params: Promise<{ surveyId: string }> };

const TRIGGER_LABELS: Record<string, string> = {
  EXAM_PASSED: "Examen gehaald",
  EXAM_FAILED: "Examen niet gehaald",
  MANUAL: "Handmatig",
};

export default async function SurveyResultsPage({ params }: Props) {
  const { surveyId } = await params;
  const data = await getSurveyResults(surveyId);
  if (!data) notFound();

  return (
    <div className="space-y-10">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/teacher/surveys" className="font-medium text-foreground/80 hover:text-primary">
          Enquêtes
        </Link>
        <ChevronRight className="size-4 opacity-50" aria-hidden />
        <Link href={`/teacher/surveys/${surveyId}`} className="font-medium text-foreground/80 hover:text-primary">
          {data.survey.title}
        </Link>
        <ChevronRight className="size-4 opacity-50" aria-hidden />
        <span className="font-medium text-foreground">Resultaten</span>
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Resultaten: {data.survey.title}</h1>
        <p className="text-muted-foreground">
          {data.stats.completed} ingevuld · {data.stats.pending} openstaand · {data.stats.totalInvitations} totaal
          verstuurd
        </p>
      </header>

      {data.responses.length === 0 ? (
        <Card className="card-learning">
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            Nog geen ingevulde enquêtes.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {data.responses.map((r) => (
            <Card key={r.invitationId} className="card-learning">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-lg">{r.studentName}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">{TRIGGER_LABELS[r.trigger] ?? r.trigger}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(r.submittedAt).toLocaleString("nl-NL")}
                    </span>
                  </div>
                </div>
                <CardDescription>{r.studentEmail}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {r.answers.map((a, i) => (
                  <div key={i} className="rounded-lg border border-border/60 bg-muted/15 px-4 py-3">
                    <p className="text-sm font-medium">{a.prompt}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatAnswerValue(a.value)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function formatAnswerValue(value: unknown): string {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "number") return String(value);
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}
