'use client';

import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { TEAL_ACCENT, useImmersive } from '@/components/immersive/immersive-provider';

export type NexusModuleId = 'web' | 'software' | 'ai';

export type NexusModule = {
  id: NexusModuleId;
  label: string;
  color: string;
  orbitRadius: number;
  orbitAngle: number;
  height: number;
};

export const NEXUS_MODULES: NexusModule[] = [
  { id: 'web', label: 'Websites', color: '#2DD4BF', orbitRadius: 3.2, orbitAngle: 0, height: 1.4 },
  { id: 'software', label: 'Software', color: '#38BDF8', orbitRadius: 3.2, orbitAngle: (Math.PI * 2) / 3, height: 1.4 },
  { id: 'ai', label: 'AI', color: '#2DD4BF', orbitRadius: 3.2, orbitAngle: (Math.PI * 4) / 3, height: 1.4 },
];

const CORE_POSITION: [number, number, number] = [0, 1.2, 0];

function modulePosition(mod: NexusModule, dockFactor: number): [number, number, number] {
  const spread = 1 - dockFactor;
  const radius = mod.orbitRadius * (0.5 + spread * 1.2);
  const y = mod.height + spread * 0.8;
  return [
    Math.cos(mod.orbitAngle) * radius,
    y,
    Math.sin(mod.orbitAngle) * radius,
  ];
}

function buildBezierPath(
  from: THREE.Vector3,
  to: THREE.Vector3,
  lift: number,
): THREE.Vector3[] {
  const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
  mid.y += lift;
  const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
  return curve.getPoints(24);
}

type SignalPathsProps = {
  dockFactor: number;
  pathIntensity: number;
  pulsePhase?: number;
};

export function SignalPaths({ dockFactor, pathIntensity, pulsePhase = 0 }: SignalPathsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { invalidate } = useImmersive();

  const paths = useMemo(() => {
    const core = new THREE.Vector3(...CORE_POSITION);
    return NEXUS_MODULES.map((mod) => {
      const end = new THREE.Vector3(...modulePosition(mod, dockFactor));
      return buildBezierPath(core, end, 1.2 + dockFactor * 0.6);
    });
  }, [dockFactor]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = pulsePhase * 0.15 + state.clock.elapsedTime * 0.02;
    }
    invalidate();
  });

  if (pathIntensity <= 0.01) return null;

  return (
    <group ref={groupRef}>
      {paths.map((points, i) => (
        <Line
          key={NEXUS_MODULES[i].id}
          points={points}
          color={TEAL_ACCENT}
          lineWidth={1.5}
          transparent
          opacity={pathIntensity * 0.85}
          depthWrite={false}
        />
      ))}
    </group>
  );
}

export { CORE_POSITION, modulePosition };
