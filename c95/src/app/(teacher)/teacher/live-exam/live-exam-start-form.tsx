"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startLiveExamSession } from "@/server/actions/liveExam";

type CourseOpt = {
  id: string;
  name: string;
  questionSets: { id: string; name: string }[];
};

type StudentOpt = { id: string; name: string; email: string };

export function LiveExamStartForm({ courses, students }: { courses: CourseOpt[]; students: StudentOpt[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const course = courses.find((c) => c.id === courseId) ?? courses[0];
  const [setId, setSetId] = useState(course?.questionSets[0]?.id ?? "");
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");

  function onCourseChange(v: string | null) {
    const id = v ?? "";
    setCourseId(id);
    const c = courses.find((x) => x.id === id);
    setSetId(c?.questionSets[0]?.id ?? "");
  }

  return (
    <div className="max-w-lg space-y-4 rounded-xl border bg-card p-6">
      <div className="grid gap-2">
        <Label>Cursus</Label>
        <Select value={courseId} onValueChange={onCourseChange}>
          <SelectTrigger>
            <SelectValue placeholder="Cursus" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>Vragenset</Label>
        <Select value={setId} onValueChange={(v) => setSetId(v ?? "")}>
          <SelectTrigger>
            <SelectValue placeholder="Vragenset" />
          </SelectTrigger>
          <SelectContent>
            {(course?.questionSets ?? []).map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>Student</Label>
        <Select value={studentId} onValueChange={(v) => setStudentId(v ?? "")}>
          <SelectTrigger>
            <SelectValue placeholder="Student" />
          </SelectTrigger>
          <SelectContent>
            {students.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name} ({s.email})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        type="button"
        disabled={pending || !setId || !studentId}
        onClick={() =>
          startTransition(async () => {
            const { sessionId } = await startLiveExamSession({ studentId, questionSetId: setId });
            router.push(`/teacher/live-exam/${sessionId}`);
          })
        }
      >
        {pending ? "Bezig met starten…" : "Sessie starten"}
      </Button>
    </div>
  );
}
