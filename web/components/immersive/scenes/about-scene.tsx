'use client';

import { GltfModel } from '@/components/immersive/gltf-model';
import { ASSET_REGISTRY } from '@/lib/assets-3d';

export function AboutScene() {
  return (
    <group>
      <GltfModel asset={ASSET_REGISTRY.desk} position={[0, 0, 0.5]} />
      <GltfModel asset={ASSET_REGISTRY.monitor} position={[0, 0.85, 0.2]} />
      <GltfModel asset={ASSET_REGISTRY.chair} position={[0, 0, 1.8]} rotation={[0, Math.PI, 0]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#0a0c0f" roughness={0.88} metalness={0.12} />
      </mesh>
    </group>
  );
}
