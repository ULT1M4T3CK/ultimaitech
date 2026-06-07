"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createInviteCodeForRole } from "@/server/actions/invites";

export function InviteActions({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        size="sm"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const { code } = await createInviteCodeForRole("STUDENT");
            alert(`Studentuitnodiging aangemaakt: ${code}\n\nRegistration URL:\n${window.location.origin}/register/${code}`);
            router.refresh();
          })
        }
      >
        Nieuwe studentcode
      </Button>
      {isAdmin ? (
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              const { code } = await createInviteCodeForRole("TEACHER");
              alert(`Instructeuruitnodiging aangemaakt: ${code}\n\nRegistration URL:\n${window.location.origin}/register/${code}`);
              router.refresh();
            })
          }
        >
          Nieuwe instructeurscode
        </Button>
      ) : null}
    </div>
  );
}
