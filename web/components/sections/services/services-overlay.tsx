'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  SERVICE_FOCUS_ORDER,
  useOptionalImmersive,
  type ServiceFocus,
} from '@/components/immersive/immersive-provider';
import { cn } from '@/lib/cn';

type PillarLink = {
  title: string;
  link: string;
};

type ServicesOverlayProps = {
  intro: string;
  pillars: PillarLink[];
};

export function ServicesOverlay({ intro, pillars }: ServicesOverlayProps) {
  const immersive = useOptionalImmersive();
  const serviceFocus = immersive?.serviceFocus ?? 'none';
  const setServiceFocus = immersive?.setServiceFocus;

  const handleFocus = (focus: ServiceFocus) => {
    setServiceFocus?.(focus);
    immersive?.invalidate();
  };

  return (
    <>
      <p className="text-sm leading-relaxed text-text-muted">{intro}</p>
      <div className="space-y-2">
        {pillars.map((pillar, index) => {
          const focus = SERVICE_FOCUS_ORDER[index] ?? 'none';
          const isActive = serviceFocus === focus;

          return (
            <Link
              key={pillar.title}
              href={pillar.link}
              className={cn(
                'flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium text-text transition-all duration-200',
                isActive
                  ? 'border-accent/45 bg-accent/8 shadow-[0_0_20px_-6px_rgba(45,212,191,0.35)]'
                  : 'border-border bg-surface/50 hover:border-accent/30',
              )}
              onMouseEnter={() => handleFocus(focus)}
              onMouseLeave={() => handleFocus('none')}
              onFocus={() => handleFocus(focus)}
              onBlur={() => handleFocus('none')}
            >
              {pillar.title}
              <ArrowRight className={cn('h-4 w-4', isActive ? 'text-accent' : 'text-accent/70')} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
