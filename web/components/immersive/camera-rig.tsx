'use client';

import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useImmersive } from '@/components/immersive/immersive-provider';
import type { SceneId } from '@/lib/immersive-routes';

export type CameraPreset = {
  position: [number, number, number];
  target: [number, number, number];
};

export const CAMERA_PRESETS: Record<SceneId | 'narrative', CameraPreset> = {
  hub: { position: [0, 3.5, 11], target: [0, 1.2, 0] },
  services: { position: [0, 2.8, 9.5], target: [0, 1.2, 0] },
  projects: { position: [0, 2.2, 8], target: [0, 1.5, -2] },
  about: { position: [2.2, 2.2, 6.5], target: [0, 1, 0] },
  narrative: { position: [0, 4, 12], target: [0, 1.2, 0] },
};

const TRANSITION_MS = 1400;

type CameraRigProps = {
  sceneId: SceneId | 'narrative';
  enabled?: boolean;
};

export function CameraRig({ sceneId, enabled = true }: CameraRigProps) {
  const { invalidate } = useImmersive();
  const { camera: threeCamera } = useThree();
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const fromPos = useRef(new THREE.Vector3());
  const toPos = useRef(new THREE.Vector3());
  const fromTarget = useRef(new THREE.Vector3());
  const toTarget = useRef(new THREE.Vector3());
  const progress = useRef(1);
  const prevScene = useRef(sceneId);

  useEffect(() => {
    const preset = CAMERA_PRESETS[sceneId];
    fromPos.current.copy(threeCamera.position);
    if (controlsRef.current) {
      fromTarget.current.copy(controlsRef.current.target);
    }
    toPos.current.set(...preset.position);
    toTarget.current.set(...preset.target);
    progress.current = prevScene.current === sceneId ? 1 : 0;
    prevScene.current = sceneId;
    invalidate();
  }, [sceneId, threeCamera, invalidate]);

  useFrame((_, delta) => {
    if (progress.current >= 1) return;

    progress.current = Math.min(1, progress.current + delta / (TRANSITION_MS / 1000));

    const t = easeInOutCubic(progress.current);
    threeCamera.position.lerpVectors(fromPos.current, toPos.current, t);

    if (controlsRef.current) {
      controlsRef.current.target.lerpVectors(fromTarget.current, toTarget.current, t);
      controlsRef.current.update();
    }

    invalidate();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={enabled}
      enablePan={false}
      minDistance={4}
      maxDistance={18}
      minPolarAngle={Math.PI * 0.15}
      maxPolarAngle={Math.PI * 0.48}
      target={CAMERA_PRESETS[sceneId].target}
      onChange={() => invalidate()}
    />
  );
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
