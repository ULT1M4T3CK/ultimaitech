'use client';

import { motion } from 'motion/react';
import { type ReactNode } from 'react';
import { MetalButton } from '@/components/ui/metal-button';
import { revealTransition } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/components/ui/use-reduced-motion';

type AnimatedCtaBandProps = {
  headline: string;
  subtext?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  children?: ReactNode;
  className?: string;
};

export function AnimatedCtaBand({
  headline,
  subtext,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  children,
  className,
}: AnimatedCtaBandProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      className={cn('footer-cta-band section-glow py-16 md:py-20', className)}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={revealTransition(0, reducedMotion)}
    >
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="type-section-title text-2xl text-text md:text-3xl">{headline}</h2>
        {subtext && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-muted">
            {subtext}
          </p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MetalButton href={primaryHref}>{primaryLabel}</MetalButton>
          {secondaryLabel && secondaryHref && (
            <MetalButton href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </MetalButton>
          )}
        </div>
        {children}
      </div>
    </motion.section>
  );
}
