'use client';

import { useEffect, useState } from 'react';

export type DeviceTier = false | 'lite' | 'full' | 'ultra';

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function detectTier(): DeviceTier {
  if (typeof window === 'undefined') return 'full';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (!detectWebGL()) return false;
  if (window.matchMedia('(max-width: 768px)').matches) return 'lite';

  const isLarge = window.matchMedia('(min-width: 1280px)').matches;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency ?? 2;
  const isUltra = isLarge && (memory === undefined || memory >= 4) && cores >= 4;
  return isUltra ? 'ultra' : 'full';
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('full');

  useEffect(() => {
    setTier(detectTier());
  }, []);

  return tier;
}

export function getDpr(tier: DeviceTier): [number, number] {
  if (tier === 'ultra') return [1, 2];
  if (tier === 'full') return [1, 1.5];
  if (tier === 'lite') return [1, 1.25];
  return [1, 1];
}

export function hasPostFX(tier: DeviceTier): boolean {
  return tier === 'full' || tier === 'ultra';
}

export function hasReflectiveFloor(tier: DeviceTier): boolean {
  return tier === 'full' || tier === 'ultra';
}

export function reflectiveFloorQuality(tier: DeviceTier): 'none' | 'low' | 'high' {
  if (tier === 'ultra') return 'high';
  if (tier === 'full') return 'low';
  return 'none';
}

export function hasFullDetail(tier: DeviceTier): boolean {
  return tier === 'full' || tier === 'ultra';
}
