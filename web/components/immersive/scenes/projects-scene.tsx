'use client';

import { GltfModel } from '@/components/immersive/gltf-model';
import { ASSET_REGISTRY } from '@/lib/assets-3d';

export const PROJECT_SCREEN_POSITIONS: [number, number, number][] = [
  [-4, 1.8, -2.5],
  [0, 2.2, -3.2],
  [4, 1.8, -2.5],
];

export function ProjectsScene() {
  return (
    <group>
      <GltfModel asset={ASSET_REGISTRY.corridorWall} position={[0, 0, -1.5]} />

      {PROJECT_SCREEN_POSITIONS.map((pos, i) => (
        <GltfModel
          key={`screen-${i}`}
          asset={ASSET_REGISTRY.screenWide}
          position={pos}
          rotation={[0, 0, 0]}
        />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#0a0c0f" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
}
