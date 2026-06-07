import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { TrackedStudySection } from "@/components/exam/tracked-study-section";
import { getSectionStudyContent } from "@/server/actions/exams";

type Props = {
  params: Promise<{ courseId: string; setId: string; sectionId: string }>;
  searchParams: Promise<{ run?: string }>;
};

export default async function SectionStudyPage({ params, searchParams }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const { courseId, setId, sectionId } = await params;
  const { run } = await searchParams;
  const isCourseRun = run === "1";

  const data = await getSectionStudyContent(sectionId);
  if (!data || data.questionSet.id !== setId || data.questionSet.courseId !== courseId) notFound();

  let completeHref = `/courses/${courseId}/sets/${setId}/sections/${sectionId}`;

  if (isCourseRun) {
    const course = await db.course.findFirst({
      where: { id: courseId, isActive: true },
      include: {
        questionSets: {
          orderBy: { order: "asc" },
          include: { sections: { orderBy: { order: "asc" } } },
        },
      },
    });
    if (!course) notFound();

    const orderedSections = course.questionSets.flatMap((qs) =>
      qs.sections.map((section) => ({
        setId: qs.id,
        sectionId: section.id,
      })),
    );
    const currentIndex = orderedSections.findIndex((section) => section.sectionId === sectionId);
    const next = currentIndex >= 0 ? orderedSections[currentIndex + 1] : null;
    completeHref = next
      ? `/courses/${courseId}/sets/${next.setId}/sections/${next.sectionId}/study?run=1`
      : `/courses/${courseId}`;
  }

  return (
    <div className="space-y-8">
      <nav className="text-sm text-muted-foreground">
        <Link href={`/courses/${courseId}/sets/${setId}/sections/${sectionId}`} className="hover:text-primary">
          ← {isCourseRun ? "Cursus verlaten" : "Terug naar onderdeel"}
        </Link>
      </nav>

      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {isCourseRun ? "Volledige cursus" : "Studiemodus"}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{data.name}</h1>
        <p className="mt-1 text-muted-foreground">
          Rond dit onderdeel af voordat je weggaat. Anders wordt deze poging als gezakt geregistreerd.
        </p>
      </header>

      <TrackedStudySection
        sectionId={sectionId}
        data={data}
        mode={isCourseRun ? "COURSE_RUN" : "STUDY"}
        completeHref={completeHref}
      />
    </div>
  );
}
