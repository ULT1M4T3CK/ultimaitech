'use client';

import { Environment } from '@react-three/drei';
import { TEAL_ACCENT } from '@/components/immersive/immersive-provider';
import { HDR_PATH } from '@/lib/assets-3d';
import { hasFullDetail, type DeviceTier } from '@/lib/device-tier';

type SceneLightingProps = {
  tier: DeviceTier;
};

export function SceneLighting({ tier }: SceneLightingProps) {
  const fullDetail = hasFullDetail(tier);

  return (
    <>
      {fullDetail ? (
        <Environment files={HDR_PATH} background={false} environmentIntensity={0.45} />
      ) : (
        <color attach="background" args={['#0d0f12']} />
      )}

      <ambientLight intensity={0.22} color="#ece9e2" />
      <directionalLight
        position={[6, 10, 4]}
        intensity={1.1}
        color="#ece9e2"
        castShadow={fullDetail}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={30}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-8, 4, -6]} intensity={0.35} color="#5a93d9" />
      <directionalLight position={[0, 3, -10]} intensity={0.55} color={TEAL_ACCENT} />
    </>
  );
}
