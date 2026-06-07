'use client';

import { MeshReflectorMaterial, Sparkles } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import { GltfModel } from '@/components/immersive/gltf-model';
import { PortalRing } from '@/components/immersive/portal-ring';
import { useImmersive } from '@/components/immersive/immersive-provider';
import { ASSET_REGISTRY } from '@/lib/assets-3d';
import { hasFullDetail, hasReflectiveFloor } from '@/lib/device-tier';

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
  const reflectiveFloor = hasReflectiveFloor(tier);

  return (
    <group>
      <GltfModel asset={ASSET_REGISTRY.hubPlatform} position={[0, 0, 0]} />
      <GltfModel asset={ASSET_REGISTRY.hubRing} position={[0, 0.05, 0]} />

      {WALL_PANEL_POSITIONS.map((pos, i) => (
        <GltfModel
          key={`wall-${i}`}
          asset={ASSET_REGISTRY.wallPanel}
          position={pos}
          rotation={[0, i < 2 ? 0 : Math.PI, 0]}
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
        <Sparkles count={40} scale={[14, 6, 14]} size={1.5} speed={0.25} opacity={0.35} color="#2DD4BF" />
      )}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        {reflectiveFloor ? (
          <MeshReflectorMaterial
            blur={[256, 256]}
            mixBlur={0.8}
            mixStrength={0.35}
            resolution={512}
            mirror={0.4}
            color="#0a0c0f"
            metalness={0.6}
            roughness={0.35}
          />
        ) : (
          <meshStandardMaterial color="#0a0c0f" roughness={0.9} metalness={0.1} />
        )}
      </mesh>
    </group>
  );
}
