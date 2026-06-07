'use client';

import { MeshReflectorMaterial } from '@react-three/drei';
import { useImmersive } from '@/components/immersive/immersive-provider';
import { reflectiveFloorQuality } from '@/lib/device-tier';

type SceneFloorProps = {
  size?: number;
};

export function SceneFloor({ size = 24 }: SceneFloorProps) {
  const { tier } = useImmersive();
  const quality = reflectiveFloorQuality(tier);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[size, size]} />
      {quality === 'high' ? (
        <MeshReflectorMaterial
          blur={[300, 120]}
          mixBlur={0.65}
          mixStrength={0.42}
          resolution={1024}
          mirror={0.45}
          depthScale={0.9}
          minDepthThreshold={0.85}
          maxDepthThreshold={1.15}
          color="#080a0d"
          metalness={0.72}
          roughness={0.28}
          envMapIntensity={0.6}
        />
      ) : quality === 'low' ? (
        <MeshReflectorMaterial
          blur={[128, 64]}
          mixBlur={0.75}
          mixStrength={0.28}
          resolution={256}
          mirror={0.3}
          color="#090b0e"
          metalness={0.55}
          roughness={0.42}
        />
      ) : (
        <meshStandardMaterial color="#090b0e" roughness={0.82} metalness={0.22} envMapIntensity={0.35} />
      )}
    </mesh>
  );
}
