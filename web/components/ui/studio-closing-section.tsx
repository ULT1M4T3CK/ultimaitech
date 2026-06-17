"use client";
import { motion } from "motion/react";
import { MetalButton } from "@/components/ui/metal-button";
import { revealTransition } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/components/ui/use-reduced-motion";
type StudioClosingSectionProps = {
  eyebrow?: string;
  headline: string;
  subtext?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  responseNote?: string;
  email?: string;
  className?: string;
};
export function StudioClosingSection({
  eyebrow,
  headline,
  subtext,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  responseNote,
  email,
  className,
}: StudioClosingSectionProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.section
      className={cn("studio-closing", className)}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={revealTransition(0, reducedMotion)}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.5fr)] lg:items-end">
        <div className="space-y-5">
          {eyebrow && <p className="editorial-eyebrow">{eyebrow}</p>}
          <h2 className="type-section-title max-w-2xl text-2xl text-text md:text-3xl lg:text-4xl">
            {headline}
          </h2>
          {subtext && (
            <p className="max-w-xl text-base leading-relaxed text-text-muted">
              {subtext}
            </p>
          )}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <MetalButton href={primaryHref}>{primaryLabel}</MetalButton>
            {secondaryLabel && secondaryHref && (
              <MetalButton href={secondaryHref} variant="secondary">
                {secondaryLabel}
              </MetalButton>
            )}
          </div>
        </div>
        {(responseNote || email) && (
          <div className="studio-surface space-y-3 p-5 lg:justify-self-end">
            {responseNote && (
              <p className="text-sm leading-relaxed text-text-muted">
                {responseNote}
              </p>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="block text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                {email}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}
