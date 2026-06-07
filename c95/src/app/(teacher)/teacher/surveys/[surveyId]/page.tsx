import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSurveyById, listCoursesForSurveyAssignment } from "@/server/actions/surveys";
import { SurveyEditor } from "./survey-editor";
import { SurveyAssignmentsPanel } from "./survey-assignments-panel";

type Props = { params: Promise<{ surveyId: string }> };

export default async function SurveyEditorPage({ params }: Props) {
  const { surveyId } = await params;
  const [survey, courses] = await Promise.all([
    getSurveyById(surveyId),
    listCoursesForSurveyAssignment(),
  ]);

  if (!survey) notFound();

  return (
    <div className="space-y-10">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/teacher/surveys" className="font-medium text-foreground/80 hover:text-primary">
          Enquêtes
        </Link>
        <ChevronRight className="size-4 opacity-50" aria-hidden />
        <span className="font-medium text-foreground">{survey.title}</span>
      </nav>

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{survey.title}</h1>
          {survey.description ? (
            <p className="max-w-2xl text-muted-foreground">{survey.description}</p>
          ) : null}
        </div>
        <Link
          href={`/teacher/surveys/${surveyId}/results`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Resultaten bekijken
        </Link>
      </header>

      <SurveyEditor survey={survey} />
      <SurveyAssignmentsPanel surveyId={survey.id} assignments={survey.assignments} courses={courses} />
    </div>
  );
}
