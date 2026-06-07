import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";

export default async function TeacherReportsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const isAdmin = session.user.role === "ADMIN";

  const userId = session.user.id;

  const [attempts, liveSessions, students] = await Promise.all([
    db.examAttempt.count({
      where: {
        submittedAt: { not: null },
        user: isAdmin ? { role: "STUDENT" } : { role: "STUDENT", invitedById: userId },
      },
    }),
    db.liveExamSession.count({
      where: {
        status: "COMPLETED",
        student: isAdmin ? { role: "STUDENT" } : { role: "STUDENT", invitedById: userId },
      },
    }),
    db.user.count({
      where: isAdmin ? { role: "STUDENT" } : { role: "STUDENT", invitedById: userId },
    }),
  ]);

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Insights</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Reports</h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Momentopname van leerlingactiviteit binnen jouw bereik (zelfstudiepogingen en afgeronde live-examens).
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="card-learning">
          <CardHeader>
            <CardTitle>Studenten</CardTitle>
            <CardDescription>Accounts die je kunt bekijken op het tabblad Studenten.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">{students}</p>
          </CardContent>
        </Card>
        <Card className="card-learning">
          <CardHeader>
            <CardTitle>Ingeleverde pogingen</CardTitle>
            <CardDescription>Afgeronde onderdeelexamens (automatisch beoordeelde zelfstudie).</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">{attempts}</p>
          </CardContent>
        </Card>
        <Card className="card-learning">
          <CardHeader>
            <CardTitle>Live-examens</CardTitle>
            <CardDescription>Afgeronde sessies onder begeleiding van een instructeur.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">{liveSessions}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
