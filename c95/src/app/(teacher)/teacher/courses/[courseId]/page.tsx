import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createQuestionSet, deleteQuestionSet, deleteCourse, listQuestionSets, updateQuestionSet } from "@/server/actions/content";
import { ChevronRight } from "lucide-react";

type Props = { params: Promise<{ courseId: string }> };

export default async function TeacherCourseDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { courseId } = await params;

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: { questionSets: { orderBy: { order: "asc" } } },
  });
  if (!course) notFound();

  const sets = await listQuestionSets(courseId);

  return (
    <div className="space-y-10">
      <nav className="text-sm text-muted-foreground">
        <Link href="/teacher/courses" className="hover:text-primary">
          ← Cursussen
        </Link>
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{course.name}</h1>
          <p className="mt-1 text-muted-foreground">
            Slug: <code className="rounded bg-muted px-1">{course.slug}</code>
          </p>
        </div>
        <form action={deleteCourse}>
          <input type="hidden" name="id" value={course.id} />
          <Button type="submit" variant="destructive" size="sm">
            Cursus verwijderen
          </Button>
        </form>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Vragenset toevoegen</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-wrap items-end gap-3" action={createQuestionSet}>
            <input type="hidden" name="courseId" value={courseId} />
            <div className="grid gap-2">
              <Label>Naam</Label>
              <Input name="name" required placeholder="Vragenset 1" />
            </div>
            <div className="grid gap-2">
              <Label>Te halen onderdelen</Label>
              <Input name="passingSectionCount" type="number" min={1} defaultValue={1} className="w-28" />
            </div>
            <Button type="submit">Set toevoegen</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase text-muted-foreground">Vragensets</h2>
        {sets.map((s) => (
          <Card key={s.id} className="card-learning">
            <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4">
              <div>
                <CardTitle className="text-lg">{s.name}</CardTitle>
                <CardDescription>
                  {s._count.sections} section(s) · pass {s.passingSectionCount}
                </CardDescription>
              </div>
              <Link href={`/teacher/courses/${courseId}/sets/${s.id}`}>
                <Button size="sm" className="gap-1">
                  Inhoud bewerken
                  <ChevronRight className="size-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              <form className="flex flex-wrap items-end gap-2" action={updateQuestionSet}>
                <input type="hidden" name="id" value={s.id} />
                <Input name="name" defaultValue={s.name} className="max-w-md" required />
                <Input name="passingSectionCount" type="number" min={1} defaultValue={s.passingSectionCount} className="w-24" />
                <Button type="submit" size="sm" variant="secondary">
                  Set opslaan
                </Button>
              </form>
              <form action={deleteQuestionSet}>
                <input type="hidden" name="id" value={s.id} />
                <Button type="submit" size="sm" variant="destructive">
                  Set verwijderen
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
