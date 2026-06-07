import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { StudentShell } from "@/components/student-shell";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "STUDENT") redirect("/teacher");

  return (
    <StudentShell user={{ name: session.user.name, email: session.user.email }}>
      {children}
    </StudentShell>
  );
}
