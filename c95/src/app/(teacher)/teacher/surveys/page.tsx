import Link from "next/link";
import { ClipboardList, Plus, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { listSurveys } from "@/server/actions/surveys";
import { CreateSurveyForm } from "./create-survey-form";

export default async function TeacherSurveysPage() {
  const surveys = await listSurveys();

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Feedback</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Enquêtes</h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Maak enquêtes, koppel ze aan examenuitslagen en stuur ze handmatig naar studenten.
          </p>
        </div>
        <Link href="/teacher/surveys/send" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
          <Send className="size-4" aria-hidden />
          Handmatig versturen
        </Link>
      </header>

      <Card className="card-learning">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="size-5" aria-hidden />
            Nieuwe enquête
          </CardTitle>
          <CardDescription>Geef een titel en optionele beschrijving.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateSurveyForm />
        </CardContent>
      </Card>

      <Card className="card-learning">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="size-5" aria-hidden />
            Alle enquêtes
          </CardTitle>
          <CardDescription>{surveys.length} enquête{surveys.length === 1 ? "" : "s"}</CardDescription>
        </CardHeader>
        <CardContent>
          {surveys.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nog geen enquêtes. Maak er hierboven een aan.</p>
          ) : (
            <ul className="space-y-3">
              {surveys.map((s) => (
                <li
                  key={s.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-muted/15 px-4 py-3"
                >
                  <div className="min-w-0 space-y-1">
                    <Link
                      href={`/teacher/surveys/${s.id}`}
                      className="font-medium text-foreground hover:text-primary"
                    >
                      {s.title}
                    </Link>
                    {s.description ? (
                      <p className="truncate text-sm text-muted-foreground">{s.description}</p>
                    ) : null}
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="font-normal">
                        {s._count.questions} vraag{s._count.questions === 1 ? "" : "en"}
                      </Badge>
                      <Badge variant="outline" className="font-normal">
                        {s._count.invitations} uitnodiging{s._count.invitations === 1 ? "" : "en"}
                      </Badge>
                      {!s.isActive ? (
                        <Badge variant="destructive" className="font-normal">
                          Inactief
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/teacher/surveys/${s.id}`} className={cn(buttonVariants({ size: "sm" }))}>
                      Bewerken
                    </Link>
                    <Link
                      href={`/teacher/surveys/${s.id}/results`}
                      className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
                    >
                      Resultaten
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
