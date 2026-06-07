'use client';

import { type ReactNode } from 'react';
import { useOptionalImmersive } from '@/components/immersive/immersive-provider';
import { AnimatedPageHero } from '@/components/ui/animated-page-hero';
import { cn } from '@/lib/cn';

type PageHeroSwitchProps = {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  compactTitle?: ReactNode;
  compactDescription?: ReactNode;
};

export function PageHeroSwitch({
  label,
  title,
  description,
  children,
  compactTitle,
  compactDescription,
}: PageHeroSwitchProps) {
  const immersive = useOptionalImmersive();
  const isImmersive = immersive?.isImmersive ?? false;
  const narrativeMode = immersive?.narrativeMode ?? false;
  const compact = isImmersive && !narrativeMode;

  if (compact) {
    return (
      <header className="border-b border-border/60 pb-4">
        {label && <p className="label-pill mb-3 w-fit text-[0.625rem]">{label}</p>}
        <h1 className="type-section-title text-2xl text-text">{compactTitle ?? title}</h1>
        {(compactDescription ?? description) && (
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {compactDescription ?? description}
          </p>
        )}
        {children && <div className={cn('mt-4 flex flex-wrap gap-2')}>{children}</div>}
      </header>
    );
  }

  return (
    <AnimatedPageHero label={label} title={title} description={description} compact={compact}>
      {children}
    </AnimatedPageHero>
  );
}
