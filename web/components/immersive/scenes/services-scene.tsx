'use client';

import { Line, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { GltfModel } from '@/components/immersive/gltf-model';
import { SceneFloor } from '@/components/immersive/scene-floor';
import { ServiceColumn } from '@/components/immersive/service-column';
import { CORE_POSITION } from '@/components/immersive/signal-paths';
import { useImmersive } from '@/components/immersive/immersive-provider';
import { ASSET_REGISTRY } from '@/lib/assets-3d';
import { hasFullDetail } from '@/lib/device-tier';

export const SERVICE_PILLAR_POSITIONS: [number, number, number][] = [
  [-3.8, 0.8, 0],
  [0, 0.8, 0],
  [3.8, 0.8, 0],
];

const WALL_PANEL_POSITIONS: [number, number, number][] = [
  [-4.2, 1.6, -3.8],
  [4.2, 1.6, -3.8],
  [-4.2, 1.6, 3.8],
  [4.2, 1.6, 3.8],
];

const COLUMN_IDS = ['websites', 'software', 'ai'] as const;

function ServicesSignalPaths() {
  const { serviceFocus, invalidate } = useImmersive();
  const groupRef = useRef<THREE.Group>(null);

  const paths = useMemo(() => {
    if (serviceFocus !== 'software') return [];
    const core = new THREE.Vector3(...CORE_POSITION);
    return SERVICE_PILLAR_POSITIONS.map((pos) => {
      const end = new THREE.Vector3(pos[0], pos[1] + 2.2, pos[2]);
      const mid = new THREE.Vector3().addVectors(core, end).multiplyScalar(0.5);
      mid.y += 0.8;
      return new THREE.QuadraticBezierCurve3(core, mid, end).getPoints(20);
    });
  }, [serviceFocus]);

  useFrame((state) => {
    if (serviceFocus === 'software' && groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      invalidate();
    }
  });

  if (serviceFocus !== 'software') return null;

  return (
    <group ref={groupRef}>
      {paths.map((points, i) => (
        <Line
          key={`svc-path-${i}`}
          points={points}
          color="#2DD4BF"
          lineWidth={1.2}
          transparent
          opacity={0.35}
        />
      ))}
    </group>
  );
}

function DaisCore({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const { serviceFocus, invalidate, tier } = useImmersive();
  const fullDetail = hasFullDetail(tier);

  useFrame((state) => {
    if (!groupRef.current) return;
    const lift = serviceFocus === 'software' ? 0.04 : 0;
    groupRef.current.position.y = position[1] + lift + Math.sin(state.clock.elapsedTime * 0.4) * 0.003;
    if (serviceFocus === 'software') invalidate();
  });

  return (
    <group ref={groupRef} position={position}>
      <GltfModel asset={ASSET_REGISTRY.servicesDais} position={[0, 0, 0]} materialPreset="architecture" />
      {serviceFocus === 'software' && fullDetail && (
        <>
          <mesh position={[-0.6, 2.8, 0]} castShadow>
            <boxGeometry args={[0.5, 0.06, 0.5]} />
            <meshStandardMaterial color="#353c44" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0.6, 2.85, 0]} castShadow>
            <boxGeometry args={[0.5, 0.06, 0.5]} />
            <meshStandardMaterial color="#353c44" metalness={0.8} roughness={0.3} />
          </mesh>
        </>
      )}
    </group>
  );
}

function AiColumnParticles() {
  const { serviceFocus, tier } = useImmersive();
  if (serviceFocus !== 'ai' || !hasFullDetail(tier)) return null;

  return (
    <Sparkles
      position={[3.8, 3.2, 0]}
      count={12}
      scale={[0.6, 1.2, 0.6]}
      size={0.8}
      speed={0.15}
      opacity={0.25}
      color="#2DD4BF"
    />
  );
}

export function ServicesScene() {
  return (
    <group>
      {WALL_PANEL_POSITIONS.map((pos, i) => (
        <GltfModel
          key={`svc-wall-${i}`}
          asset={ASSET_REGISTRY.wallPanel}
          position={pos}
          rotation={[0, i < 2 ? 0 : Math.PI, 0]}
          materialPreset="architecture"
        />
      ))}

      <mesh position={[0, 5.2, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#0a0c0f" roughness={0.92} metalness={0.08} side={THREE.DoubleSide} />
      </mesh>

      <DaisCore position={[0, 0, 0]} />

      {SERVICE_PILLAR_POSITIONS.map((pos, i) => (
        <ServiceColumn key={COLUMN_IDS[i]} id={COLUMN_IDS[i]} position={pos} />
      ))}

      <ServicesSignalPaths />
      <AiColumnParticles />
      <SceneFloor size={22} variant="resin" />
    </group>
  );
}
