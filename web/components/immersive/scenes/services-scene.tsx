'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, MeshPhysicalMaterial } from 'three';
import { GltfModel } from '@/components/immersive/gltf-model';
import { useImmersive } from '@/components/immersive/immersive-provider';
import { ASSET_REGISTRY } from '@/lib/assets-3d';

export const SERVICE_PILLAR_POSITIONS: [number, number, number][] = [
  [-3.8, 0.8, 0],
  [0, 0.8, 0],
  [3.8, 0.8, 0],
];

function GlassPillar({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);
  const { invalidate } = useImmersive();

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as MeshPhysicalMaterial;
    mat.emissiveIntensity = 0.15 + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.05;
    invalidate();
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.35, 0.45, 2.2, 24]} />
      <meshPhysicalMaterial
        color="#1a1e26"
        metalness={0.1}
        roughness={0.05}
        transmission={0.85}
        thickness={0.5}
        emissive="#2DD4BF"
        emissiveIntensity={0.15}
        transparent
      />
    </mesh>
  );
}

export function ServicesScene() {
  return (
    <group>
      <GltfModel asset={ASSET_REGISTRY.servicesDais} position={[0, 0, 0]} />

      {SERVICE_PILLAR_POSITIONS.map((pos, i) => (
        <group key={`pillar-group-${i}`}>
          <GltfModel asset={ASSET_REGISTRY.pedestal} position={pos} />
          <GlassPillar position={[pos[0], pos[1] + 1.5, pos[2]]} />
        </group>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0c0f" roughness={0.85} metalness={0.15} />
      </mesh>
    </group>
  );
}
