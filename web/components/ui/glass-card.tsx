import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
type GlassCardProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  glow?: boolean;
  hover?: boolean;
  accentBar?: boolean;
};
export function GlassCard({
  children,
  className,
  hover = true,
  accentBar = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "studio-surface group",
        hover && "transition-colors hover:border-border-strong",
        accentBar && "relative overflow-hidden border-l-2 border-l-accent",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
