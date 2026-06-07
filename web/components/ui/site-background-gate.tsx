'use client';

import { type ReactNode } from 'react';
import { useOptionalImmersive } from '@/components/immersive/immersive-provider';
import { ImmersiveFallback } from '@/components/immersive/immersive-shell';
import { cn } from '@/lib/cn';

type SiteBackgroundGateProps = {
  children: ReactNode;
  enabled?: boolean;
};

export function SiteBackgroundGate({ children, enabled = true }: SiteBackgroundGateProps) {
  const immersive = useOptionalImmersive();
  const isImmersive = immersive?.isImmersive ?? false;

  if (!enabled || isImmersive) {
    return <>{children}</>;
  }

  return (
    <div className={cn('relative min-h-screen bg-charcoal')}>
      <ImmersiveFallback />
      {children}
    </div>
  );
}
