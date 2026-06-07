'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import * as THREE from 'three';
import { SceneRouter } from '@/components/immersive/scene-router';
import { useImmersive } from '@/components/immersive/immersive-provider';
import { PRELOAD_ASSETS } from '@/lib/assets-3d';
import { getDpr } from '@/lib/device-tier';
import { sceneIdFromPath, type SceneId } from '@/lib/immersive-routes';

PRELOAD_ASSETS.forEach((path) => useGLTF.preload(path));

type ImmersiveCanvasProps = {
  sceneId?: SceneId;
};

function DemandLoopDriver() {
  const { registerInvalidate, narrativeMode, nexusProgress } = useImmersive();
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => registerInvalidate(invalidate), [registerInvalidate, invalidate]);

  useEffect(() => {
    if (narrativeMode) invalidate();
  }, [narrativeMode, nexusProgress, invalidate]);

  return null;
}

export function ImmersiveCanvas({ sceneId: sceneIdProp }: ImmersiveCanvasProps) {
  const pathname = usePathname();
  const { tier, isImmersive, registerInvalidate, narrativeMode } = useImmersive();
  const sceneId = sceneIdProp ?? sceneIdFromPath(pathname);
  const dpr = getDpr(tier);

  if (!isImmersive) return null;

  return (
    <Canvas
      frameloop="demand"
      dpr={dpr}
      shadows={tier === 'full' || tier === 'ultra'}
      gl={{
        antialias: tier !== 'lite',
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      camera={{ fov: 45, near: 0.1, far: 100, position: [0, 3.5, 11] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: narrativeMode ? 'none' : 'auto',
      }}
      onCreated={({ invalidate }) => {
        registerInvalidate(invalidate);
      }}
    >
      <color attach="background" args={['#0d0f12']} />
      <fog attach="fog" args={['#0d0f12', 12, 28]} />
      <DemandLoopDriver />
      <SceneRouter sceneId={sceneId} />
      <Preload all />
    </Canvas>
  );
}
