'use client';

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { MetalButton } from '@/components/ui/metal-button';
import { revealTransition, staggerContainer, staggerItem } from '@/lib/motion';
import { useReducedMotion } from '@/components/ui/use-reduced-motion';
import type { Dictionary } from '@/lib/locales';

type HeroSectionProps = {
  dict: Dictionary;
};

export function HeroSection({ dict }: HeroSectionProps) {
  const reducedMotion = useReducedMotion();
  const nexus = dict.home.nexus;
  const hero = dict.home.hero;

  const label = nexus?.heroLabel ?? 'Digital systems studio';
  const headline = nexus?.headline ?? hero.headline;
  const subheadline = nexus?.subheadline ?? hero.subtext;
  const trustLine = nexus?.trustLine ?? hero.trustLine;

  return (
    <section
      data-narrative-section="hero"
      className="narrative-section relative min-h-screen"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          variants={staggerContainer(reducedMotion, 0.1, 0.1)}
          initial="hidden"
          animate="visible"
          className="max-w-4xl space-y-6"
        >
          <motion.p variants={staggerItem(reducedMotion)} className="label-pill w-fit">
            {label}
          </motion.p>
          <motion.h1
            variants={staggerItem(reducedMotion)}
            className="type-hero text-4xl text-text md:text-5xl lg:text-6xl xl:text-7xl"
          >
            <span className="premium-gradient-text">{headline}</span>
          </motion.h1>
          <motion.p
            variants={staggerItem(reducedMotion)}
            className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg"
          >
            {subheadline}
          </motion.p>
          <motion.div
            variants={staggerItem(reducedMotion)}
            className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center"
          >
            <MetalButton href={dict.slugs.contact}>{hero.cta1}</MetalButton>
            <MetalButton href={dict.slugs.projects} variant="secondary">
              {hero.cta2}
            </MetalButton>
          </motion.div>
          <motion.p
            variants={staggerItem(reducedMotion)}
            className="text-xs font-medium tracking-wide text-text-faint"
          >
            {trustLine}
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-faint"
        initial={reducedMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={revealTransition(0.6, reducedMotion)}
        aria-hidden
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </motion.div>
    </section>
  );
}
