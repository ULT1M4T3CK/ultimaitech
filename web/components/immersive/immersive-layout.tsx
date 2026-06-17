"use client";
import { type ReactNode } from "react";
import { useImmersive } from "@/components/immersive/immersive-provider";
import { cn } from "@/lib/cn";
type ImmersiveLayoutProps = { children: ReactNode; sceneHint?: string };
export function ImmersiveLayout({ children, sceneHint }: ImmersiveLayoutProps) {
  const { isImmersive, narrativeMode } = useImmersive();
  return (
    <div className="relative z-10">
      {isImmersive && sceneHint && (
        <div
          className={cn(
            "pointer-events-none fixed bottom-6 left-1/2 z-20 -translate-x-1/2",
            "rounded-full border border-border bg-surface px-4 py-2",
            "text-xs tracking-wide text-text-muted ",
          )}
          aria-hidden
        >
          {sceneHint}
        </div>
      )}
      <div
        className={cn(
          "relative",
          isImmersive && !narrativeMode && "pointer-events-none",
          isImmersive && narrativeMode && "pointer-events-auto",
        )}
      >
        <div className={cn(isImmersive && "pointer-events-auto")}>
          {children}
        </div>
      </div>
    </div>
  );
}
