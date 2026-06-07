import { redirect } from "next/navigation";

export default function LegacyTeacherContentPage() {
  redirect("/teacher/courses");
}
