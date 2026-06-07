import { auth } from "@/auth";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { listStudentsForTeacher, listUnusedInvitesForUser } from "@/server/actions/invites";
import { InviteActions } from "./invite-actions";

export default async function TeacherStudentsPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";
  const [students, invites] = await Promise.all([listStudentsForTeacher(), listUnusedInvitesForUser()]);

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Roster &amp; access</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Studenten</h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Genereer eenmalige uitnodigingscodes. Elke code registreert precies één leerlingaccount.
        </p>
      </header>

      <Card className="card-learning">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 space-y-0">
          <div>
            <CardTitle>Uitnodigingscodes</CardTitle>
            <CardDescription>
              Share the registration URL:{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">/register/CODE</code>
            </CardDescription>
          </div>
          <InviteActions isAdmin={isAdmin} />
        </CardHeader>
        <CardContent>
          {invites.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nog geen ongebruikte codes.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {invites.map((i) => (
                <li
                  key={i.code}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/70 bg-muted/20 px-4 py-2.5"
                >
                  <span className="font-mono text-sm font-medium tracking-wide">{i.code}</span>
                  <Badge variant="outline" className="font-normal">
                    {i.role}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card className="card-learning">
        <CardHeader>
          <CardTitle>Leerlingaccounts</CardTitle>
          <CardDescription>
            {isAdmin ? "Alle studentaccounts." : "Studenten geregistreed met jouw uitnodigingscodes."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nog geen studenten.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Naam</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead className="text-right">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/teacher/students/${s.id}`}
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        View
                      </Link>
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
