'use client';

import { MeshReflectorMaterial } from '@react-three/drei';
import { useImmersive } from '@/components/immersive/immersive-provider';
import { reflectiveFloorQuality } from '@/lib/device-tier';

type SceneFloorProps = {
  size?: number;
  variant?: 'default' | 'resin';
};

export function SceneFloor({ size = 24, variant = 'default' }: SceneFloorProps) {
  const { tier } = useImmersive();
  const quality = reflectiveFloorQuality(tier);
  const resin = variant === 'resin';

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[size, size]} />
      {quality === 'high' ? (
        <MeshReflectorMaterial
          blur={[300, 120]}
          mixBlur={0.65}
          mixStrength={resin ? 0.48 : 0.42}
          resolution={1024}
          mirror={resin ? 0.5 : 0.45}
          depthScale={0.9}
          minDepthThreshold={0.85}
          maxDepthThreshold={1.15}
          color={resin ? '#06080b' : '#080a0d'}
          metalness={resin ? 0.78 : 0.72}
          roughness={resin ? 0.22 : 0.28}
          envMapIntensity={0.6}
        />
      ) : quality === 'low' ? (
        <MeshReflectorMaterial
          blur={[128, 64]}
          mixBlur={0.75}
          mixStrength={resin ? 0.34 : 0.28}
          resolution={256}
          mirror={resin ? 0.35 : 0.3}
          color={resin ? '#07090c' : '#090b0e'}
          metalness={resin ? 0.62 : 0.55}
          roughness={resin ? 0.36 : 0.42}
        />
      ) : (
        <meshStandardMaterial
          color={resin ? '#07090c' : '#090b0e'}
          roughness={0.82}
          metalness={0.22}
          envMapIntensity={0.35}
        />
      )}
    </mesh>
  );
}
