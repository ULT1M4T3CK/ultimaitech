import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { listCourses, createCourse } from "@/server/actions/content";
import { ChevronRight } from "lucide-react";

export default async function TeacherCoursesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const courses = await listCourses();

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Authoring</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Cursussen</h1>
        <p className="max-w-2xl text-muted-foreground">
          Elke cursus bevat vragensets. Open een cursus om sets en onderdelen te beheren.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Cursus toevoegen</CardTitle>
          <CardDescription>Maak een nieuwe cursus met een unieke URL-slug.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-wrap items-end gap-3" action={createCourse}>
            <div className="grid gap-2">
              <Label htmlFor="cname">Naam</Label>
              <Input id="cname" name="name" required placeholder="e.g. VPTC" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cslug">Slug</Label>
              <Input id="cslug" name="slug" required placeholder="vptc" className="w-40" />
            </div>
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Jouw cursussen</h2>
        {courses.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nog geen cursussen.</p>
        ) : (
          <div className="grid gap-3">
            {courses.map((c) => (
              <Link key={c.id} href={`/teacher/courses/${c.id}`} className="group block">
                <Card className="card-learning card-learning-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg">{c.name}</CardTitle>
                    <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Slug: <code className="rounded bg-muted px-1">{c.slug}</code> · {c._count.questionSets} question set(s)
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
