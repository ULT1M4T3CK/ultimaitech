"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/base-path";

export function SignOutButton({ label = "Uitloggen" }: { label?: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="w-full border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      onClick={() => signOut({ callbackUrl: withBasePath("/login") })}
    >
      <LogOut className="size-3.5 opacity-80" aria-hidden />
      {label}
    </Button>
  );
}
