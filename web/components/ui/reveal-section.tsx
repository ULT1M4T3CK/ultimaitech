"use client";
import { motion } from "motion/react";
import { type ReactNode } from "react";
import { revealTransition } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/components/ui/use-reduced-motion";
type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "section" | "div";
  id?: string;
} & Record<string, unknown>;
export function RevealSection({
  children,
  className,
  delay = 0,
  as = "section",
  id,
  ...rest
}: RevealSectionProps) {
  const reducedMotion = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      id={id}
      className={cn(className)}
      {...rest}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={revealTransition(delay, reducedMotion)}
    >
      {children}
    </Component>
  );
}
