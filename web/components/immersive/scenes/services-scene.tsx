'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, MeshPhysicalMaterial } from 'three';
import { GltfModel } from '@/components/immersive/gltf-model';
import { SceneFloor } from '@/components/immersive/scene-floor';
import { useImmersive } from '@/components/immersive/immersive-provider';
import { ASSET_REGISTRY } from '@/lib/assets-3d';
import { hasFullDetail } from '@/lib/device-tier';

export const SERVICE_PILLAR_POSITIONS: [number, number, number][] = [
  [-3.8, 0.8, 0],
  [0, 0.8, 0],
  [3.8, 0.8, 0],
];

function GlassPillar({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);
  const { invalidate, tier } = useImmersive();
  const fullDetail = hasFullDetail(tier);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as MeshPhysicalMaterial;
    mat.emissiveIntensity = 0.12 + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.04;
    invalidate();
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <cylinderGeometry args={[0.35, 0.45, 2.2, 32]} />
      <meshPhysicalMaterial
        color="#1c222c"
        metalness={0.15}
        roughness={0.04}
        transmission={fullDetail ? 0.92 : 0.75}
        thickness={0.65}
        ior={1.45}
        attenuationColor="#0d1218"
        attenuationDistance={0.8}
        emissive="#2DD4BF"
        emissiveIntensity={0.12}
        transparent
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

export function ServicesScene() {
  return (
    <group>
      <GltfModel asset={ASSET_REGISTRY.servicesDais} position={[0, 0, 0]} materialPreset="architecture" />

      {SERVICE_PILLAR_POSITIONS.map((pos, i) => (
        <group key={`pillar-group-${i}`}>
          <GltfModel asset={ASSET_REGISTRY.pedestal} position={pos} materialPreset="architecture" />
          <GlassPillar position={[pos[0], pos[1] + 1.5, pos[2]]} />
          <pointLight
            position={[pos[0], pos[1] + 2.8, pos[2] + 0.4]}
            intensity={0.3}
            color="#2DD4BF"
            distance={4}
            decay={2}
          />
        </group>
      ))}

      <SceneFloor size={20} />
    </group>
  );
}
