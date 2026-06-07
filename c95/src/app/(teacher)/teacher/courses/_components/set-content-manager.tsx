"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  LayoutGrid,
  ListChecks,
  Plus,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  createQuestion,
  createSection,
  deleteQuestion,
  deleteSection,
  getQuestionForEdit,
  listSections,
  reorderQuestions,
  reorderSections,
  updateQuestion,
  updateSection,
} from "@/server/actions/content";
import type { GradingMode, QuestionType } from "@prisma/client";

export type SectionRow = {
  id: string;
  questionSetId: string;
  name: string;
  order: number;
  passingQuestionCount: number;
  phaseLabel: string | null;
  code: string | null;
  questions: { id: string; order: number; prompt: string; type: QuestionType; gradingMode: GradingMode }[];
};

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  SINGLE: "Enkele keuze",
  MULTI: "Meerkeuze",
  TRUE_FALSE: "Waar / onwaar",
  IMAGE_CHOICE: "Afbeeldingskeuze",
  OPEN_ANSWER: "Open antwoord",
  OBSERVATION_CHECKLIST: "Observatiechecklist",
  PHYSICAL_INSPECTION: "Fysieke controle",
  SAFETY_OVERRIDE: "Veiligheidsoverschrijving",
};

const GRADING_LABELS: Record<GradingMode, string> = {
  AUTO: "Automatisch",
  INSTRUCTOR: "Live / instructeur",
};

function questionTypeLabel(t: QuestionType): string {
  return QUESTION_TYPE_LABELS[t] ?? t;
}

function gradingLabel(g: GradingMode): string {
  return GRADING_LABELS[g] ?? g;
}

function StatPill({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: number }) {
  return (
    <div className="flex min-w-[8.5rem] items-center gap-3 rounded-xl border bg-background/90 px-4 py-3 shadow-sm">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" aria-hidden />
      </div>
      <div>
        <p className="text-2xl font-semibold tabular-nums leading-none">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

type Props = {
  courseId: string;
  courseName?: string;
  questionSetId: string;
  setName: string;
  initialSections: SectionRow[];
};

export function QuestionSetContentEditor({
  courseId,
  courseName = "Course",
  questionSetId,
  setName,
  initialSections,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [sections, setSections] = useState<SectionRow[]>(initialSections);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(initialSections[0]?.id ?? null);
  const [addSectionOpen, setAddSectionOpen] = useState(false);

  const refreshSections = useCallback(async (): Promise<SectionRow[]> => {
    const rows = await listSections(questionSetId);
    const typed = rows as unknown as SectionRow[];
    setSections(typed);
    return typed;
  }, [questionSetId]);

  useEffect(() => {
    setSections(initialSections);
  }, [initialSections]);

  const urlSectionId = searchParams.get("section");

  useEffect(() => {
    if (sections.length === 0) {
      setActiveSectionId(null);
      return;
    }
    const resolved = urlSectionId && sections.some((s) => s.id === urlSectionId) ? urlSectionId : sections[0].id;
    setActiveSectionId(resolved);
    if (urlSectionId !== resolved) {
      router.replace(`${pathname}?section=${resolved}`, { scroll: false });
    }
  }, [sections, urlSectionId, pathname, router]);

  const selectSection = useCallback(
    (id: string) => {
      setActiveSectionId(id);
      router.replace(`${pathname}?section=${id}`, { scroll: false });
    },
    [pathname, router],
  );

  const sectionIds = sections.map((s) => s.id);
  const totalQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0);
  const activeSection = sections.find((s) => s.id === activeSectionId) ?? null;
  const activeIdx = activeSection ? sections.findIndex((s) => s.id === activeSection.id) : -1;

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-10">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <Link
          href="/teacher/courses"
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 hover:bg-muted hover:text-foreground"
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          Cursussen
        </Link>
        <ChevronRight className="size-4 shrink-0 opacity-40" aria-hidden />
        <Link
          href={`/teacher/courses/${courseId}`}
          className="max-w-[min(100%,14rem)] truncate rounded-md px-1.5 py-0.5 hover:bg-muted hover:text-foreground"
          title={courseName}
        >
          {courseName}
        </Link>
        <ChevronRight className="size-4 shrink-0 opacity-40" aria-hidden />
        <span className="max-w-[min(100%,14rem)] truncate font-medium text-foreground" title={setName}>
          {setName}
        </span>
      </nav>

      <header className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-card via-card to-muted/30 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Vragenset</p>
            <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{setName}</h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Bouw onderdelen, stel in hoeveel antwoorden goed moeten zijn om te halen, en voeg vragen toe per onderdeel.
              Open en observatievragen worden door instructeurs beoordeeld in{" "}
              <Link href="/teacher/live-exam" className="font-medium text-primary underline-offset-4 hover:underline">
                Live-examen
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <StatPill icon={LayoutGrid} label="Onderdelen" value={sections.length} />
            <StatPill icon={ListChecks} label="Vragen" value={totalQuestions} />
          </div>
        </div>
      </header>

      <details className="group rounded-xl border bg-card shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
          <span>Tips voor de editor</span>
          <ChevronDown
            className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <div className="space-y-2 border-t px-4 py-3 text-sm text-muted-foreground">
          <p>
            Voeg vragen toe met <strong className="font-medium text-foreground">Vraag opslaan</strong> in het actieve
            onderdeelpaneel.
          </p>
          <p>Gebruik de pijlen om onderdelen en vragen te herschikken.</p>
          <p>Automatisch beoordeelde typen hebben waar nodig minimaal één juiste optie nodig.</p>
        </div>
      </details>

      <Dialog open={addSectionOpen} onOpenChange={setAddSectionOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Nieuw onderdeel</DialogTitle>
          </DialogHeader>
          <form
            className="flex flex-col gap-4"
            action={(fd) => {
              fd.append("questionSetId", questionSetId);
              startTransition(async () => {
                await createSection(fd);
                setAddSectionOpen(false);
                router.refresh();
                const next = await refreshSections();
                const newest = next[next.length - 1];
                if (newest) {
                  setActiveSectionId(newest.id);
                  router.replace(`${pathname}?section=${newest.id}`, { scroll: false });
                }
              });
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="dlg-new-section-name">Naam onderdeel</Label>
                <Input id="dlg-new-section-name" name="name" required placeholder="e.g. Onderdeel A — PBM" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dlg-new-phase">Faselabel (optioneel)</Label>
                <Input id="dlg-new-phase" name="phaseLabel" placeholder="Fase 1: Voor vertrek" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dlg-new-code">Code (optioneel)</Label>
                <Input id="dlg-new-code" name="code" placeholder="A" />
              </div>
            </div>
            <div className="flex flex-wrap items-end gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dlg-new-pass">Vereiste goede antwoorden om te halen</Label>
                <Input
                  id="dlg-new-pass"
                  name="passingQuestionCount"
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="w-36"
                />
              </div>
              <Button type="submit" disabled={pending} className="gap-1.5">
                <Plus className="size-4" aria-hidden />
                Onderdeel toevoegen
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {sections.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-muted/15 px-6 py-14 text-center sm:px-10">
          <LayoutGrid className="mx-auto size-12 text-muted-foreground/50" aria-hidden />
          <h2 className="mt-4 text-lg font-semibold">Nog geen onderdelen</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Maak je eerste onderdeel aan en voeg daarna vragen toe in de editor.
          </p>
          <Button type="button" className="mt-6 gap-1.5" onClick={() => setAddSectionOpen(true)}>
            <Plus className="size-4" aria-hidden />
            Nieuw onderdeel
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6 md:grid md:grid-cols-[minmax(0,260px)_1fr] md:items-start md:gap-8">
          <div className="md:hidden">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="section-picker" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Actief onderdeel
              </Label>
              <Button type="button" size="sm" variant="secondary" className="gap-1" onClick={() => setAddSectionOpen(true)}>
                <Plus className="size-3.5" aria-hidden />
                New
              </Button>
            </div>
            <Select
              value={activeSectionId ?? ""}
              onValueChange={(id) => {
                if (id) selectSection(id);
              }}
            >
              <SelectTrigger id="section-picker" className="mt-2 w-full">
                <SelectValue placeholder="Kies een onderdeel" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((st) => (
                  <SelectItem key={st.id} value={st.id}>
                    #{st.order} · {st.name} ({st.questions.length} questions)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {activeSection && activeIdx >= 0 ? (
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border/60 pt-3">
                <span className="text-xs font-medium text-muted-foreground">Reorder</span>
                <Button
                  type="button"
                  size="icon-sm"
                  variant="outline"
                  aria-label="Onderdeel omhoog"
                  disabled={pending || activeIdx === 0}
                  onClick={() =>
                    startTransition(async () => {
                      const ids = [...sectionIds];
                      [ids[activeIdx - 1], ids[activeIdx]] = [ids[activeIdx], ids[activeIdx - 1]];
                      await reorderSections(questionSetId, ids);
                      router.refresh();
                      await refreshSections();
                    })
                  }
                >
                  <ChevronUp className="size-4" />
                </Button>
                <Button
                  type="button"
                  size="icon-sm"
                  variant="outline"
                  aria-label="Onderdeel omlaag"
                  disabled={pending || activeIdx >= sections.length - 1}
                  onClick={() =>
                    startTransition(async () => {
                      const ids = [...sectionIds];
                      [ids[activeIdx + 1], ids[activeIdx]] = [ids[activeIdx], ids[activeIdx + 1]];
                      await reorderSections(questionSetId, ids);
                      router.refresh();
                      await refreshSections();
                    })
                  }
                >
                  <ChevronDown className="size-4" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="ml-auto gap-1"
                  disabled={pending}
                  onClick={() => {
                    if (
                      !confirm(
                        "Dit onderdeel en alle vragen erin verwijderen? Dit kan niet ongedaan worden gemaakt.",
                      )
                    )
                      return;
                    startTransition(async () => {
                      const fd = new FormData();
                      fd.append("id", activeSection.id);
                      await deleteSection(fd);
                      router.refresh();
                      await refreshSections();
                    });
                  }}
                >
                  <Trash2 className="size-3.5" aria-hidden />
                  Delete
                </Button>
              </div>
            ) : null}
          </div>

          <aside className="hidden min-h-0 md:flex md:flex-col">
            <div className="flex items-center justify-between gap-2 border-b pb-3">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sections</h2>
              <Button type="button" size="sm" variant="secondary" className="gap-1" onClick={() => setAddSectionOpen(true)}>
                <Plus className="size-3.5" aria-hidden />
                New
              </Button>
            </div>
            <ScrollArea className="mt-3 h-[min(70vh,36rem)] pr-2">
              <div className="flex flex-col gap-1.5">
                {sections.map((st, sidx) => (
                  <div
                    key={st.id}
                    className={cn(
                      "rounded-xl border p-2 transition-colors",
                      activeSectionId === st.id ? "border-primary/35 bg-primary/[0.06] shadow-sm" : "border-border/60 bg-card",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => selectSection(st.id)}
                      className="flex w-full flex-col gap-1 rounded-lg px-2 py-1.5 text-left text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                      aria-current={activeSectionId === st.id ? "true" : undefined}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex min-w-0 items-center gap-2">
                          <Badge variant="secondary" className="shrink-0 font-mono text-[10px]">
                            #{st.order}
                          </Badge>
                          <span className="truncate font-medium">{st.name}</span>
                        </span>
                        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{st.questions.length}</span>
                      </div>
                      {(st.phaseLabel || st.code) && (
                        <p className="truncate pl-1 text-[11px] text-muted-foreground">
                          {[st.phaseLabel, st.code].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </button>
                    <div className="mt-1 flex items-center justify-end gap-1 border-t border-border/40 pt-1.5">
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        title="Onderdeel omhoog"
                        aria-label="Onderdeel omhoog"
                        disabled={pending || sidx === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          startTransition(async () => {
                            const ids = [...sectionIds];
                            [ids[sidx - 1], ids[sidx]] = [ids[sidx], ids[sidx - 1]];
                            await reorderSections(questionSetId, ids);
                            router.refresh();
                            await refreshSections();
                          });
                        }}
                      >
                        <ChevronUp className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        title="Onderdeel omlaag"
                        aria-label="Onderdeel omlaag"
                        disabled={pending || sidx >= sections.length - 1}
                        onClick={(e) => {
                          e.stopPropagation();
                          startTransition(async () => {
                            const ids = [...sectionIds];
                            [ids[sidx + 1], ids[sidx]] = [ids[sidx], ids[sidx + 1]];
                            await reorderSections(questionSetId, ids);
                            router.refresh();
                            await refreshSections();
                          });
                        }}
                      >
                        <ChevronDown className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        title="Onderdeel verwijderen"
                        aria-label="Onderdeel verwijderen"
                        disabled={pending}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            !confirm(
                              "Dit onderdeel en alle vragen erin verwijderen? Dit kan niet ongedaan worden gemaakt.",
                            )
                          )
                            return;
                          startTransition(async () => {
                            const fd = new FormData();
                            fd.append("id", st.id);
                            await deleteSection(fd);
                            router.refresh();
                            await refreshSections();
                          });
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </aside>

          <div className="min-w-0">
            {activeSection ? (
              <Card className="overflow-hidden shadow-sm">
                <CardHeader className="border-b bg-muted/20 pb-4">
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="font-mono text-xs">
                        #{activeSection.order}
                      </Badge>
                      <CardTitle className="text-lg leading-snug">{activeSection.name}</CardTitle>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="font-normal">
                        Haal {activeSection.passingQuestionCount} goed
                      </Badge>
                      <Badge variant="outline" className="font-normal">
                        {activeSection.questions.length} question{activeSection.questions.length === 1 ? "" : "s"}
                      </Badge>
                      {activeSection.phaseLabel ? (
                        <Badge variant="outline" className="max-w-full truncate font-normal" title={activeSection.phaseLabel}>
                          {activeSection.phaseLabel}
                        </Badge>
                      ) : null}
                      {activeSection.code ? (
                        <Badge variant="outline" className="font-mono font-normal">
                          {activeSection.code}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="rounded-xl border bg-muted/15 p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Instellingen onderdeel
                    </p>
                    <form
                      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end"
                      action={(fd) =>
                        startTransition(async () => {
                          await updateSection(fd);
                          router.refresh();
                          await refreshSections();
                        })
                      }
                    >
                      <input type="hidden" name="id" value={activeSection.id} />
                      <div className="grid gap-2 sm:col-span-2 lg:col-span-5">
                        <Label htmlFor={`sec-name-${activeSection.id}`}>Weergavenaam</Label>
                        <Input
                          id={`sec-name-${activeSection.id}`}
                          key={`name-${activeSection.id}-${activeSection.name}`}
                          name="name"
                          defaultValue={activeSection.name}
                          required
                        />
                      </div>
                      <div className="grid gap-2 lg:col-span-3">
                        <Label htmlFor={`sec-phase-${activeSection.id}`}>Faselabel</Label>
                        <Input
                          id={`sec-phase-${activeSection.id}`}
                          key={`phase-${activeSection.id}-${activeSection.phaseLabel ?? ""}`}
                          name="phaseLabel"
                          defaultValue={activeSection.phaseLabel ?? ""}
                          placeholder="Optioneel"
                        />
                      </div>
                      <div className="grid gap-2 lg:col-span-2">
                        <Label htmlFor={`sec-code-${activeSection.id}`}>Code</Label>
                        <Input
                          id={`sec-code-${activeSection.id}`}
                          key={`code-${activeSection.id}-${activeSection.code ?? ""}`}
                          name="code"
                          defaultValue={activeSection.code ?? ""}
                          placeholder="Optioneel"
                        />
                      </div>
                      <div className="grid gap-2 lg:col-span-2">
                        <Label htmlFor={`sec-pass-${activeSection.id}`}>Drempel om te halen</Label>
                        <Input
                          id={`sec-pass-${activeSection.id}`}
                          key={`pass-${activeSection.id}-${activeSection.passingQuestionCount}`}
                          name="passingQuestionCount"
                          type="number"
                          min={1}
                          defaultValue={activeSection.passingQuestionCount}
                        />
                      </div>
                      <div className="sm:col-span-2 lg:col-span-12 lg:flex lg:justify-end">
                        <Button type="submit" disabled={pending} variant="secondary">
                          Onderdeel opslaan
                        </Button>
                      </div>
                    </form>
                  </div>

                  <QuestionTable
                    sectionId={activeSection.id}
                    questions={activeSection.questions}
                    pending={pending}
                    startTransition={startTransition}
                    router={router}
                    onRefresh={async () => {
                      await refreshSections();
                    }}
                  />
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionTable({
  sectionId,
  questions,
  pending,
  startTransition,
  router,
  onRefresh,
}: {
  sectionId: string;
  questions: SectionRow["questions"];
  pending: boolean;
  startTransition: (cb: () => void) => void;
  router: ReturnType<typeof useRouter>;
  onRefresh: () => Promise<void>;
}) {
  const qIds = questions.map((q) => q.id);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold">Vragen in dit onderdeel</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Herschik met de pijlen, bewerk details in het dialoogvenster of verwijder een vraag.
        </p>
      </div>

      {questions.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-muted/10 px-4 py-10 text-center text-sm text-muted-foreground">
          Nog geen vragen. Voeg er hieronder een toe.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>Vraag</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden sm:table-cell">Beoordeling</TableHead>
              <TableHead className="w-[1%] text-right">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((q, qidx) => (
              <TableRow key={q.id}>
                <TableCell className="text-center font-mono text-muted-foreground">{q.order}</TableCell>
                <TableCell className="max-w-[min(100vw,28rem)] whitespace-normal text-foreground">
                  <span className="line-clamp-2 md:line-clamp-3" title={q.prompt}>
                    {q.prompt}
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5 md:hidden">
                    <Badge variant="secondary" className="font-normal">
                      {questionTypeLabel(q.type)}
                    </Badge>
                    <Badge variant="outline" className="font-normal">
                      {gradingLabel(q.gradingMode)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="secondary" className="font-normal">
                    {questionTypeLabel(q.type)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline" className="font-normal">
                    {gradingLabel(q.gradingMode)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-wrap justify-end gap-1">
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="outline"
                      title="Move up"
                      aria-label="Vraag omhoog"
                      disabled={pending || qidx === 0}
                      onClick={() =>
                        startTransition(async () => {
                          const ids = [...qIds];
                          [ids[qidx - 1], ids[qidx]] = [ids[qidx], ids[qidx - 1]];
                          await reorderQuestions(sectionId, ids);
                          router.refresh();
                          await onRefresh();
                        })
                      }
                    >
                      <ChevronUp className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="outline"
                      title="Move down"
                      aria-label="Vraag omlaag"
                      disabled={pending || qidx >= questions.length - 1}
                      onClick={() =>
                        startTransition(async () => {
                          const ids = [...qIds];
                          [ids[qidx + 1], ids[qidx]] = [ids[qidx], ids[qidx + 1]];
                          await reorderQuestions(sectionId, ids);
                          router.refresh();
                          await onRefresh();
                        })
                      }
                    >
                      <ChevronDown className="size-4" />
                    </Button>
                    <QuestionEditDialog questionId={q.id} sectionId={sectionId} onSaved={onRefresh} router={router} />
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="destructive"
                      title="Vraag verwijderen"
                      aria-label="Vraag verwijderen"
                      disabled={pending}
                      onClick={() => {
                        if (!confirm("Deze vraag uit het onderdeel verwijderen?")) return;
                        startTransition(async () => {
                          const fd = new FormData();
                          fd.append("id", q.id);
                          await deleteQuestion(fd);
                          router.refresh();
                          await onRefresh();
                        });
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Separator />
      <div>
        <h3 className="text-base font-semibold">Vraag toevoegen</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Markdown is supported in the prompt. Instructor-graded types may need rubrics or seed data until the full editor
          ships.
        </p>
      </div>
      <NewQuestionForm sectionId={sectionId} onCreated={onRefresh} router={router} />
    </div>
  );
}

const QUESTION_TYPES: QuestionType[] = [
  "SINGLE",
  "MULTI",
  "TRUE_FALSE",
  "IMAGE_CHOICE",
  "OPEN_ANSWER",
  "OBSERVATION_CHECKLIST",
  "PHYSICAL_INSPECTION",
  "SAFETY_OVERRIDE",
];

function NewQuestionForm({
  sectionId,
  onCreated,
  router,
}: {
  sectionId: string;
  onCreated: () => Promise<void>;
  router: ReturnType<typeof useRouter>;
}) {
  const [pending, startTransition] = useTransition();
  const [type, setType] = useState<QuestionType>("SINGLE");
  const [opts, setOpts] = useState<{ text: string; isCorrect: boolean; imageUrl?: string }[]>([
    { text: "", isCorrect: true },
    { text: "", isCorrect: false },
  ]);
  const [prompt, setPrompt] = useState("");
  const [feedback, setFeedback] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadBusy, setUploadBusy] = useState(false);

  const needsOptions =
    type === "SINGLE" || type === "MULTI" || type === "TRUE_FALSE" || type === "IMAGE_CHOICE";

  return (
    <Card className="border-primary/20 bg-muted/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Vraag toevoegen</CardTitle>
        <CardDescription>Markdown-vriendelijke vraag en feedback. Opties verplicht voor automatisch beoordeelde meerkeuzevragen.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label>Type</Label>
          <Select value={type} onValueChange={(v) => setType(v as QuestionType)}>
            <SelectTrigger className="max-w-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {QUESTION_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {questionTypeLabel(t)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Vraag</Label>
          <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} required placeholder="Vraagtekst (markdown ok)" />
        </div>
        <div className="grid gap-2">
          <Label>Feedback (optioneel)</Label>
          <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Getoond na inleveren" />
        </div>
        <div className="grid gap-2">
          <Label>Afbeelding (optioneel)</Label>
          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={uploadBusy}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setUploadBusy(true);
              try {
                const fd = new FormData();
                fd.append("file", file);
                const res = await fetch(withBasePath("/api/upload"), { method: "POST", body: fd });
                const data = (await res.json()) as { url?: string; error?: string };
                if (!res.ok) throw new Error(data.error ?? "Upload mislukt");
                setImageUrl(data.url ?? "");
              } catch (err) {
                alert(err instanceof Error ? err.message : "Upload mislukt");
              } finally {
                setUploadBusy(false);
              }
            }}
          />
          {imageUrl ? <p className="text-xs text-muted-foreground">Geüpload: {imageUrl}</p> : null}
        </div>
        {needsOptions ? (
          <div className="space-y-2">
            <Label>Options</Label>
            {opts.map((o, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2">
                <Input
                  value={o.text}
                  onChange={(e) => {
                    const next = [...opts];
                    next[i] = { ...next[i], text: e.target.value };
                    setOpts(next);
                  }}
                  placeholder={`Option ${i + 1}`}
                  className="max-w-xl"
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={o.isCorrect}
                    onChange={(e) => {
                      const next = [...opts];
                      if (type === "SINGLE" || type === "TRUE_FALSE" || type === "IMAGE_CHOICE") {
                        next.forEach((x, j) => {
                          x.isCorrect = j === i ? e.target.checked : false;
                        });
                      } else {
                        next[i] = { ...next[i], isCorrect: e.target.checked };
                      }
                      setOpts([...next]);
                    }}
                  />
                  Goed
                </label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={opts.length <= 2}
                  onClick={() => setOpts(opts.filter((_, j) => j !== i))}
                >
                  Verwijderen
                </Button>
              </div>
            ))}
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setOpts([...opts, { text: "", isCorrect: false, imageUrl: undefined }])}
            >
              Optie toevoegen
            </Button>
          </div>
        ) : null}
        <Button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await createQuestion({
                sectionId,
                type,
                prompt,
                feedback: feedback || undefined,
                imageUrl: imageUrl || undefined,
                options: needsOptions ? opts.map((o) => ({ text: o.text, isCorrect: o.isCorrect, imageUrl: o.imageUrl })) : [],
              });
              router.refresh();
              await onCreated();
              setPrompt("");
              setFeedback("");
              setImageUrl("");
              setOpts([
                { text: "", isCorrect: true },
                { text: "", isCorrect: false },
              ]);
            })
          }
        >
          Vraag opslaan
        </Button>
      </CardContent>
    </Card>
  );
}

function QuestionEditDialog({
  questionId,
  sectionId,
  onSaved,
  router,
}: {
  questionId: string;
  sectionId: string;
  onSaved: () => Promise<void>;
  router: ReturnType<typeof useRouter>;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <>
      <Button type="button" size="sm" variant="outline" onClick={() => setOpen(true)}>
        Bewerken
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Vraag bewerken</DialogTitle>
          </DialogHeader>
          {open ? (
            <QuestionEditInner
              questionId={questionId}
              sectionId={sectionId}
              pending={pending}
              startTransition={startTransition}
              onClose={() => setOpen(false)}
              onSaved={onSaved}
              router={router}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

function QuestionEditInner({
  questionId,
  sectionId,
  pending,
  startTransition,
  onClose,
  onSaved,
  router,
}: {
  questionId: string;
  sectionId: string;
  pending: boolean;
  startTransition: (cb: () => void) => void;
  onClose: () => void;
  onSaved: () => Promise<void>;
  router: ReturnType<typeof useRouter>;
}) {
  const [data, setData] = useState<Awaited<ReturnType<typeof getQuestionForEdit>>>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const q = await getQuestionForEdit(questionId);
      if (!cancelled) setData(q);
    })();
    return () => {
      cancelled = true;
    };
  }, [questionId]);

  if (!data) {
    return <p className="text-sm text-muted-foreground">Laden…</p>;
  }

  return (
    <QuestionEditForm
      sectionId={sectionId}
      initial={data}
      pending={pending}
      onSave={(payload) =>
        startTransition(async () => {
          await updateQuestion(payload);
          router.refresh();
          await onSaved();
          onClose();
        })
      }
      onCancel={onClose}
    />
  );
}

function QuestionEditForm({
  sectionId,
  initial,
  pending,
  onSave,
  onCancel,
}: {
  sectionId: string;
  initial: NonNullable<Awaited<ReturnType<typeof getQuestionForEdit>>>;
  pending: boolean;
  onSave: (p: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [type, setType] = useState<QuestionType>(initial.type);
  const [opts, setOpts] = useState(
    initial.options.map((o) => ({ text: o.text, isCorrect: o.isCorrect, imageUrl: o.imageUrl ?? undefined })),
  );
  const [prompt, setPrompt] = useState(initial.prompt);
  const [feedback, setFeedback] = useState(initial.feedback ?? "");
  const [imageUrl, setImageUrl] = useState(initial.imageUrl ?? "");
  const [uploadBusy, setUploadBusy] = useState(false);

  const needsOptions =
    type === "SINGLE" || type === "MULTI" || type === "TRUE_FALSE" || type === "IMAGE_CHOICE";

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label>Type</Label>
        <Select value={type} onValueChange={(v) => setType(v as QuestionType)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {QUESTION_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {questionTypeLabel(t)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>Prompt</Label>
        <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Feedback</Label>
        <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Image</Label>
        <Input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={uploadBusy}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setUploadBusy(true);
            try {
              const fd = new FormData();
              fd.append("file", file);
              const res = await fetch(withBasePath("/api/upload"), { method: "POST", body: fd });
              const json = (await res.json()) as { url?: string; error?: string };
              if (!res.ok) throw new Error(json.error ?? "Upload mislukt");
              setImageUrl(json.url ?? "");
            } catch (err) {
              alert(err instanceof Error ? err.message : "Upload mislukt");
            } finally {
              setUploadBusy(false);
            }
          }}
        />
        <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Of plak afbeeldings-URL" />
      </div>
      {needsOptions ? (
        <div className="space-y-2">
          <Label>Options</Label>
          {opts.map((o, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2">
              <Input
                value={o.text}
                onChange={(e) => {
                  const next = [...opts];
                  next[i] = { ...next[i], text: e.target.value };
                  setOpts(next);
                }}
                className="flex-1"
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={o.isCorrect}
                  onChange={(e) => {
                    const next = [...opts];
                    if (type === "SINGLE" || type === "TRUE_FALSE" || type === "IMAGE_CHOICE") {
                      next.forEach((x, j) => {
                        x.isCorrect = j === i ? e.target.checked : false;
                      });
                    } else {
                      next[i] = { ...next[i], isCorrect: e.target.checked };
                    }
                    setOpts([...next]);
                  }}
                />
                Goed
              </label>
              <Button type="button" size="sm" variant="outline" disabled={opts.length <= 2} onClick={() => setOpts(opts.filter((_, j) => j !== i))}>
                Remove
              </Button>
            </div>
          ))}
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => setOpts([...opts, { text: "", isCorrect: false, imageUrl: undefined }])}
        >
          Optie toevoegen
        </Button>
        </div>
      ) : null}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuleren
        </Button>
        <Button
          type="button"
          disabled={pending}
          onClick={() =>
            onSave({
              id: initial.id,
              sectionId,
              type,
              prompt,
              feedback: feedback || undefined,
              imageUrl: imageUrl || undefined,
              options: needsOptions ? opts : [],
            })
          }
        >
          Opslaan
        </Button>
      </div>
    </div>
  );
}
