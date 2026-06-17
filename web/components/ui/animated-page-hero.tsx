"use client";
import { motion } from "motion/react";
import { type ReactNode } from "react";
import { revealTransition, staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/components/ui/use-reduced-motion";
type AnimatedPageHeroProps = {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  compact?: boolean;
};
export function AnimatedPageHero({
  label,
  title,
  description,
  children,
  className,
  compact = false,
}: AnimatedPageHeroProps) {
  const reducedMotion = useReducedMotion();
  return (
    <section
      className={cn(
        "studio-hero relative border-b border-border",
        compact ? "py-10 md:py-12" : "py-[4.5rem] md:py-28",
        className,
      )}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          variants={staggerContainer(reducedMotion, 0.08)}
          initial="hidden"
          animate="visible"
          className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(18rem,0.38fr)] lg:items-end"
        >
          <div className="max-w-4xl space-y-5">
            {label && (
              <motion.p
                variants={staggerItem(reducedMotion)}
                className="label-pill w-fit"
              >
                {label}
              </motion.p>
            )}
            <motion.h1
              variants={staggerItem(reducedMotion)}
              className={cn(
                "type-hero max-w-4xl text-balance text-text",
                compact
                  ? "text-3xl md:text-4xl"
                  : "text-4xl md:text-5xl lg:text-6xl",
              )}
            >
              {title}
            </motion.h1>
            {description && (
              <motion.p
                variants={staggerItem(reducedMotion)}
                className="max-w-3xl text-base leading-relaxed text-text-muted md:text-lg"
              >
                {description}
              </motion.p>
            )}
          </div>
          {children && (
            <motion.div
              variants={staggerItem(reducedMotion)}
              className="studio-surface w-full p-4 lg:justify-self-end"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
