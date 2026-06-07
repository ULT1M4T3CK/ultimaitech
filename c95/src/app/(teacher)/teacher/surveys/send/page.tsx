import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { listStudentsForSurveySend, listSurveys } from "@/server/actions/surveys";
import { ManualSendForm } from "./manual-send-form";

export default async function ManualSurveySendPage() {
  const [surveys, students] = await Promise.all([listSurveys(), listStudentsForSurveySend()]);
  const activeSurveys = surveys.filter((s) => s.isActive && s._count.questions > 0);

  return (
    <div className="space-y-10">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/teacher/surveys" className="font-medium text-foreground/80 hover:text-primary">
          Enquêtes
        </Link>
        <ChevronRight className="size-4 opacity-50" aria-hidden />
        <span className="font-medium text-foreground">Handmatig versturen</span>
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Enquête handmatig versturen</h1>
        <p className="max-w-2xl text-muted-foreground">
          Selecteer een enquête en één of meer studenten. Ze ontvangen een e-mail en zien de enquête in het portaal.
        </p>
      </header>

      <ManualSendForm surveys={activeSurveys} students={students} />
    </div>
  );
}
