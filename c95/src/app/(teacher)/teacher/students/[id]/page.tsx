import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/lib/db";
import { getStudentProgressByCourse } from "@/lib/progress";
import { listLiveExamSessionsForStudent } from "@/server/actions/liveExam";

type Props = { params: Promise<{ id: string }> };

export default async function TeacherStudentDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) notFound();

  const student = await db.user.findFirst({
    where: {
      id,
      role: "STUDENT",
      ...(session.user.role === "ADMIN" ? {} : { invitedById: session.user.id }),
    },
  });
  if (!student) notFound();

  const [attempts, progress, liveSessions] = await Promise.all([
    db.examAttempt.findMany({
      where: { userId: id, submittedAt: { not: null } },
      orderBy: { submittedAt: "desc" },
      take: 40,
      include: {
        section: { include: { questionSet: { select: { name: true } } } },
      },
    }),
    getStudentProgressByCourse(id),
    listLiveExamSessionsForStudent(id),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/teacher/students" className="text-sm text-muted-foreground hover:text-foreground">
          ← Studenten
        </Link>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{student.name}</h1>
        <p className="text-muted-foreground">{student.email}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Voortgang per onderwerp</CardTitle>
          <CardDescription>Status gebaseerd op beste pogingen en &quot;ooit gehaald&quot; per onderdeel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {progress.flatMap((c) =>
            c.questionSets.map((qs) => (
              <div key={qs.id}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-medium">
                    {c.name} · {qs.name}
                  </h3>
                  {qs.setPassed ? <Badge>Set gehaald</Badge> : <Badge variant="secondary">Bezig</Badge>}
                </div>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {qs.sections.map((s) => (
                    <li key={s.id}>
                      {s.name}:{" "}
                      {s.everPassed ? (
                        <span className="text-foreground">passed</span>
                      ) : (
                        <span>not passed</span>
                      )}
                      {s.bestTotal > 0 ? (
                        <span>
                          {" "}
                          (best {s.bestCorrect}/{s.bestTotal})
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <Separator className="mt-4" />
              </div>
            )),
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pogingsgeschiedenis</CardTitle>
          <CardDescription>Weesrijen hebben geen actief onderdeel (inhoud is verwijderd).</CardDescription>
        </CardHeader>
        <CardContent>
          {attempts.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nog geen ingeleverde pogingen.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>When</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Set / onderdeel</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attempts.map((a) => {
                  const topicLabel = a.section?.questionSet.name ?? a.questionSetName;
                  const stepLabel = a.section?.name ?? a.sectionName;
                  const orphaned = !a.sectionId;
                  return (
                    <TableRow key={a.id}>
                      <TableCell className="whitespace-nowrap text-sm">
                        {a.submittedAt ? new Date(a.submittedAt).toLocaleString() : ""}
                      </TableCell>
                      <TableCell className="text-sm">
                        {a.mode === "COURSE_RUN"
                          ? "Volledige cursus"
                          : a.mode === "STUDY"
                            ? "Studie"
                            : !a.sectionId && a.questionSetId
                              ? "Vragenset-examen"
                              : "Examen"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {topicLabel} · {stepLabel}
                        {orphaned ? (
                          <Badge variant="outline" className="ml-2">
                            Orphaned
                          </Badge>
                        ) : null}
                      </TableCell>
                      <TableCell className="text-sm">
                        {a.correctCount}/{a.totalCount}
                      </TableCell>
                      <TableCell>{a.passed ? <Badge>Gehaald</Badge> : <Badge variant="destructive">Gezakt</Badge>}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live-examensessies</CardTitle>
          <CardDescription>Afgeronde sessies onder begeleiding voor deze leerling.</CardDescription>
        </CardHeader>
        <CardContent>
          {liveSessions.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nog geen live-examensessies.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>When</TableHead>
                  <TableHead>Cursus / set</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liveSessions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="whitespace-nowrap text-sm">
                      {s.completedAt ? new Date(s.completedAt).toLocaleString() : new Date(s.startedAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm">
                      {s.course.name} · {s.questionSet.name}
                    </TableCell>
                    <TableCell>
                      {s.status === "COMPLETED" ? (
                        <Badge variant={s.safetyFailed ? "destructive" : "secondary"}>
                          {s.safetyFailed ? "Afgerond (veiligheid)" : "Completed"}
                        </Badge>
                      ) : (
                        <Badge variant="outline">{s.status}</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
