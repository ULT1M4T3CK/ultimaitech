import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AuthSplitShell } from "@/components/auth/auth-split-shell";
import { LoginForm } from "./login-form";

type Search = Record<string, string | string[] | undefined>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<Search> | Search;
}) {
  const session = await auth();
  if (session?.user) {
    redirect(session.user.role === "STUDENT" ? "/dashboard" : "/teacher");
  }

  const sp = (await Promise.resolve(searchParams)) ?? {};
  const raw = sp.callbackUrl;
  const callbackUrl =
    typeof raw === "string" ? raw : Array.isArray(raw) && raw[0] ? String(raw[0]) : undefined;

  return (
    <AuthSplitShell
      eyebrow="C95 · CCV-vragensets"
      title="Interactief leren voor praktijktoetsen"
      description="Gestructureerde vragensets volgens het CCV-kader. Log in om verder te gaan met je training of examenvoorbereiding."
    >
      <LoginForm callbackUrl={callbackUrl} />
    </AuthSplitShell>
  );
}
