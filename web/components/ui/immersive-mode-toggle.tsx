'use client';

import { useOptionalImmersive } from '@/components/immersive/immersive-provider';
import { cn } from '@/lib/cn';

export function ImmersiveModeToggle({ className }: { className?: string }) {
  const immersive = useOptionalImmersive();
  if (!immersive) return null;

  const { tier, prefers3D, setPrefers3D } = immersive;
  if (tier === false) return null;

  return (
    <div className={cn('immersive-mode-toggle', className)} role="group" aria-label="View mode">
      <button
        type="button"
        className={cn(!prefers3D && 'is-active')}
        onClick={() => setPrefers3D(false)}
        aria-pressed={!prefers3D}
      >
        2D
      </button>
      <button
        type="button"
        className={cn(prefers3D && 'is-active')}
        onClick={() => setPrefers3D(true)}
        aria-pressed={prefers3D}
      >
        3D
      </button>
    </div>
  );
}
