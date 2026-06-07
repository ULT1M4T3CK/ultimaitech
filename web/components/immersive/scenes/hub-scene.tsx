'use client';

import { Sparkles } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import { GltfModel } from '@/components/immersive/gltf-model';
import { PortalRing } from '@/components/immersive/portal-ring';
import { SceneFloor } from '@/components/immersive/scene-floor';
import { useImmersive } from '@/components/immersive/immersive-provider';
import { ASSET_REGISTRY } from '@/lib/assets-3d';
import { hasFullDetail } from '@/lib/device-tier';

const WALL_PANEL_POSITIONS: [number, number, number][] = [
  [-4.2, 1.6, -3.8],
  [4.2, 1.6, -3.8],
  [-4.2, 1.6, 3.8],
  [4.2, 1.6, 3.8],
];

export function HubScene() {
  const { tier, portalConfig } = useImmersive();
  const router = useRouter();
  const fullDetail = hasFullDetail(tier);

  return (
    <group>
      <GltfModel asset={ASSET_REGISTRY.hubPlatform} position={[0, 0, 0]} materialPreset="architecture" />
      <GltfModel asset={ASSET_REGISTRY.hubRing} position={[0, 0.05, 0]} materialPreset="metal" />

      {WALL_PANEL_POSITIONS.map((pos, i) => (
        <GltfModel
          key={`wall-${i}`}
          asset={ASSET_REGISTRY.wallPanel}
          position={pos}
          rotation={[0, i < 2 ? 0 : Math.PI, 0]}
          materialPreset="architecture"
        />
      ))}

      {portalConfig.map((portal, index) => (
        <PortalRing
          key={portal.label}
          index={index}
          position={portal.position}
          rotationY={portal.rotationY}
          onClick={() => router.push(portal.href)}
        />
      ))}

      {fullDetail && (
        <Sparkles count={28} scale={[14, 6, 14]} size={1.2} speed={0.18} opacity={0.22} color="#2DD4BF" />
      )}

      <SceneFloor />
    </group>
  );
}
