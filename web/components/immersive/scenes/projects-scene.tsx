'use client';

import { GltfModel } from '@/components/immersive/gltf-model';
import { SceneFloor } from '@/components/immersive/scene-floor';
import { ScreenPanel } from '@/components/immersive/screen-panel';
import { ASSET_REGISTRY, PROJECT_SCREEN_TEXTURES } from '@/lib/assets-3d';

export const PROJECT_SCREEN_POSITIONS: [number, number, number][] = [
  [-4, 1.8, -2.5],
  [0, 2.2, -3.2],
  [4, 1.8, -2.5],
];

const SCREEN_PANEL_OFFSET: [number, number, number][] = [
  [-4, 1.8, -2.38],
  [0, 2.2, -3.08],
  [4, 1.8, -2.38],
];

export function ProjectsScene() {
  return (
    <group>
      <GltfModel asset={ASSET_REGISTRY.corridorWall} position={[0, 0, -1.5]} materialPreset="architecture" />

      {PROJECT_SCREEN_POSITIONS.map((pos, i) => (
        <GltfModel
          key={`screen-${i}`}
          asset={ASSET_REGISTRY.screenWide}
          position={pos}
          materialPreset="architecture"
        />
      ))}

      {SCREEN_PANEL_OFFSET.map((pos, i) => (
        <ScreenPanel key={`panel-${i}`} position={pos} src={PROJECT_SCREEN_TEXTURES[i]} />
      ))}

      {SCREEN_PANEL_OFFSET.map((pos, i) => (
        <pointLight
          key={`screen-light-${i}`}
          position={[pos[0], pos[1] + 0.6, pos[2] + 0.8]}
          intensity={0.45}
          color="#e2ecff"
          distance={5}
          decay={2}
        />
      ))}

      <SceneFloor size={18} />
    </group>
  );
}
