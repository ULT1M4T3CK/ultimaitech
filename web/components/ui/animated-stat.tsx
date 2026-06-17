"use client";
import { motion } from "motion/react";
import { revealTransition } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/components/ui/use-reduced-motion";
type AnimatedStatProps = {
  value: string;
  label: string;
  className?: string;
  delay?: number;
};
export function AnimatedStat({
  value,
  label,
  className,
  delay = 0,
}: AnimatedStatProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={cn("space-y-1", className)}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={revealTransition(delay, reducedMotion)}
    >
      <p className="type-stat-value text-3xl text-accent md:text-4xl">
        {value}
      </p>
      <p className="text-sm leading-snug text-text-muted">{label}</p>
    </motion.div>
  );
}
