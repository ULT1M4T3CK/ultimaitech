'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { useDeviceTier, type DeviceTier } from '@/lib/device-tier';
import { isImmersivePath, sceneIdFromPath } from '@/lib/immersive-routes';
import {
  getImmersiveModePreference,
  hasCompletedNarrative,
  markNarrativeComplete,
} from '@/lib/narrative-session';

export const TEAL_ACCENT = '#2DD4BF';

export type PortalConfig = {
  position: [number, number, number];
  label: string;
  href: string;
  rotationY: number;
};

export const PORTAL_POSITIONS: [number, number, number][] = [
  [0, 1.4, -5.5],
  [5.5, 1.4, 0],
  [0, 1.4, 5.5],
  [-5.5, 1.4, 0],
];

export const DEFAULT_PORTAL_CONFIG: PortalConfig[] = [
  { position: [0, 1.4, -5.5], label: 'Services', href: '/services', rotationY: 0 },
  { position: [5.5, 1.4, 0], label: 'Projects', href: '/projects', rotationY: -Math.PI / 2 },
  { position: [0, 1.4, 5.5], label: 'About', href: '/about', rotationY: Math.PI },
  { position: [-5.5, 1.4, 0], label: 'Hub', href: '/', rotationY: Math.PI / 2 },
];

type ImmersiveContextValue = {
  tier: DeviceTier;
  isImmersive: boolean;
  prefers3D: boolean;
  setPrefers3D: (value: boolean) => void;
  portalConfig: PortalConfig[];
  bloom: number;
  bloomBoost: number;
  setBloomBoost: (value: number) => void;
  narrativeMode: boolean;
  nexusProgress: number;
  setNexusProgress: (value: number) => void;
  nexusPhase: number;
  setNexusPhase: (value: number) => void;
  setNarrativeComplete: () => void;
  hoveredPortal: number | null;
  setHoveredPortal: (index: number | null) => void;
  invalidate: () => void;
  registerInvalidate: (fn: () => void) => () => void;
};

const ImmersiveContext = createContext<ImmersiveContextValue | null>(null);

type ImmersiveProviderProps = {
  children: ReactNode;
  portalConfig?: PortalConfig[];
  forceNarrative?: boolean;
};

export function ImmersiveProvider({
  children,
  portalConfig = DEFAULT_PORTAL_CONFIG,
  forceNarrative,
}: ImmersiveProviderProps) {
  const pathname = usePathname();
  const tier = useDeviceTier();
  const [prefers3D, setPrefers3DState] = useState(true);
  const [bloomBoost, setBloomBoost] = useState(0);
  const [nexusProgress, setNexusProgress] = useState(0);
  const [nexusPhase, setNexusPhase] = useState(0);
  const [hoveredPortal, setHoveredPortal] = useState<number | null>(null);
  const [narrativeComplete, setNarrativeCompleteState] = useState(false);
  const [invalidateFns, setInvalidateFns] = useState<Set<() => void>>(new Set());

  useEffect(() => {
    setPrefers3DState(getImmersiveModePreference());
    setNarrativeCompleteState(hasCompletedNarrative());
  }, []);

  useEffect(() => {
    const onModeChange = (e: Event) => {
      const detail = (e as CustomEvent<{ prefers3D: boolean }>).detail;
      if (detail) setPrefers3DState(detail.prefers3D);
    };
    window.addEventListener('immersive-mode-change', onModeChange);
    return () => window.removeEventListener('immersive-mode-change', onModeChange);
  }, []);

  const setPrefers3D = useCallback((value: boolean) => {
    setPrefers3DState(value);
    import('@/lib/narrative-session').then(({ setImmersiveModePreference }) => {
      setImmersiveModePreference(value);
    });
  }, []);

  const setNarrativeComplete = useCallback(() => {
    markNarrativeComplete();
    setNarrativeCompleteState(true);
  }, []);

  const registerInvalidate = useCallback((fn: () => void) => {
    setInvalidateFns((prev) => {
      const next = new Set(prev);
      next.add(fn);
      return next;
    });
    return () => {
      setInvalidateFns((prev) => {
        const next = new Set(prev);
        next.delete(fn);
        return next;
      });
    };
  }, []);

  const invalidate = useCallback(() => {
    invalidateFns.forEach((fn) => fn());
  }, [invalidateFns]);

  const onImmersiveRoute = isImmersivePath(pathname);
  const onHub = sceneIdFromPath(pathname) === 'hub';
  const narrativeMode =
    forceNarrative ?? (onImmersiveRoute && onHub && !narrativeComplete);

  const isImmersive = tier !== false && prefers3D && onImmersiveRoute;
  const bloom = 0.35 + bloomBoost + (hoveredPortal !== null ? 0.15 : 0);

  const value = useMemo<ImmersiveContextValue>(
    () => ({
      tier,
      isImmersive,
      prefers3D,
      setPrefers3D,
      portalConfig,
      bloom,
      bloomBoost,
      setBloomBoost,
      narrativeMode,
      nexusProgress,
      setNexusProgress,
      nexusPhase,
      setNexusPhase,
      setNarrativeComplete,
      hoveredPortal,
      setHoveredPortal,
      invalidate,
      registerInvalidate,
    }),
    [
      tier,
      isImmersive,
      prefers3D,
      setPrefers3D,
      portalConfig,
      bloom,
      bloomBoost,
      narrativeMode,
      nexusProgress,
      nexusPhase,
      setNarrativeComplete,
      hoveredPortal,
      invalidate,
      registerInvalidate,
    ],
  );

  return <ImmersiveContext.Provider value={value}>{children}</ImmersiveContext.Provider>;
}

export function useImmersive(): ImmersiveContextValue {
  const ctx = useContext(ImmersiveContext);
  if (!ctx) {
    throw new Error('useImmersive must be used within ImmersiveProvider');
  }
  return ctx;
}

export function useOptionalImmersive(): ImmersiveContextValue | null {
  return useContext(ImmersiveContext);
}
