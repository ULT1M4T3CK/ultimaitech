'use client';

import { motion } from 'motion/react';
import { type ReactNode } from 'react';
import { revealTransition, staggerContainer, staggerItem } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/components/ui/use-reduced-motion';

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
        'relative border-b border-border bg-charcoal/80',
        compact ? 'py-10 md:py-12' : 'py-16 md:py-24',
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={staggerContainer(reducedMotion, 0.08)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl space-y-5"
        >
          {label && (
            <motion.p variants={staggerItem(reducedMotion)} className="label-pill w-fit">
              {label}
            </motion.p>
          )}
          <motion.h1
            variants={staggerItem(reducedMotion)}
            className={cn(
              'type-hero text-text',
              compact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl lg:text-6xl',
            )}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={staggerItem(reducedMotion)}
              className="text-base leading-relaxed text-text-muted md:text-lg"
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div variants={staggerItem(reducedMotion)} className="pt-2">
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
