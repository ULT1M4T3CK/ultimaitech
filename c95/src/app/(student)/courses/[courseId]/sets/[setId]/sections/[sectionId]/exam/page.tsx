import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { WalkthroughExam } from "@/components/exam/walkthrough-exam";

type Props = { params: Promise<{ courseId: string; setId: string; sectionId: string }> };

export default async function SectionExamPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const { courseId, setId, sectionId } = await params;

  const sub = await db.section.findFirst({
    where: { id: sectionId, questionSetId: setId },
    include: { questionSet: { select: { name: true, courseId: true } } },
  });
  if (!sub || sub.questionSet.courseId !== courseId) notFound();

  return (
    <div className="space-y-8">
      <nav className="text-sm text-muted-foreground">
        <Link href={`/courses/${courseId}/sets/${setId}/sections/${sectionId}`} className="inline-flex items-center gap-1 font-medium text-foreground/80 hover:text-primary">
          ← {sub.name}
        </Link>
      </nav>

      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Begeleide poging</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Oefenexamen</h1>
        <p className="text-muted-foreground">{sub.questionSet.name}</p>
      </header>

      <WalkthroughExam courseId={courseId} setId={setId} sectionId={sectionId} />
    </div>
  );
}
