'use client';

import dynamic from 'next/dynamic';
import { Suspense, type ReactNode } from 'react';
import { ImmersiveLayout } from '@/components/immersive/immersive-layout';
import {
  ImmersiveProvider,
  useImmersive,
  type PortalConfig,
} from '@/components/immersive/immersive-provider';
import { ScrollNarrativeTimeline } from '@/components/immersive/scroll-narrative-timeline';
import { sceneIdFromPath } from '@/lib/immersive-routes';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';

const ImmersiveCanvas = dynamic(
  () => import('@/components/immersive/immersive-canvas').then((m) => m.ImmersiveCanvas),
  { ssr: false, loading: () => null },
);

const SCENE_HINTS: Record<string, string> = {
  hub: 'Drag to explore · Click portals to navigate',
  services: 'Three pillars · Websites, software, AI',
  projects: 'Featured work corridor',
  about: 'Studio workspace',
  narrative: 'Scroll to assemble the nexus',
};

type ImmersiveShellInnerProps = {
  children: ReactNode;
};

function ImmersiveShellInner({ children }: ImmersiveShellInnerProps) {
  const pathname = usePathname();
  const { isImmersive, narrativeMode, tier } = useImmersive();
  const sceneId = sceneIdFromPath(pathname);
  const hintKey = narrativeMode ? 'narrative' : sceneId;
  const hint = SCENE_HINTS[hintKey] ?? SCENE_HINTS.hub;

  const showPoster = narrativeMode && (tier === 'lite' || tier === false);

  return (
    <div className="relative min-h-screen bg-charcoal">
      {showPoster && <div className="narrative-poster" aria-hidden />}

      {isImmersive && (
        <Suspense fallback={null}>
          <ImmersiveCanvas />
        </Suspense>
      )}

      {narrativeMode && tier !== false && tier !== 'lite' && <ScrollNarrativeTimeline />}

      <ImmersiveLayout sceneHint={hint}>{children}</ImmersiveLayout>
    </div>
  );
}

type ImmersiveShellProps = {
  children: ReactNode;
  forceNarrative?: boolean;
  portalConfig?: PortalConfig[];
};

export function ImmersiveShell({ children, forceNarrative, portalConfig }: ImmersiveShellProps) {
  return (
    <ImmersiveProvider forceNarrative={forceNarrative} portalConfig={portalConfig}>
      <ImmersiveShellInner>{children}</ImmersiveShellInner>
    </ImmersiveProvider>
  );
}

export function ImmersiveFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'fixed inset-0 -z-10 bg-gradient-to-b from-charcoal via-surface to-charcoal',
        className,
      )}
      aria-hidden
    />
  );
}
