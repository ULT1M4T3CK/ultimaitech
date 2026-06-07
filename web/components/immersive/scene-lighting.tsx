'use client';

import { ContactShadows, Environment } from '@react-three/drei';
import { TEAL_ACCENT } from '@/components/immersive/immersive-provider';
import { HDR_PATH } from '@/lib/assets-3d';
import { hasFullDetail, type DeviceTier } from '@/lib/device-tier';

type SceneLightingProps = {
  tier: DeviceTier;
};

export function SceneLighting({ tier }: SceneLightingProps) {
  const fullDetail = hasFullDetail(tier);
  const shadowSize = tier === 'ultra' ? 2048 : 1536;

  return (
    <>
      {tier !== false ? (
        <Environment
          files={HDR_PATH}
          background={false}
          environmentIntensity={fullDetail ? 0.72 : 0.38}
        />
      ) : (
        <color attach="background" args={['#0d0f12']} />
      )}

      <hemisphereLight args={['#c8d4e8', '#12151a', 0.38]} />
      <ambientLight intensity={0.14} color="#e8e4dc" />

      <directionalLight
        position={[5, 11, 6]}
        intensity={1.35}
        color="#f4efe6"
        castShadow={fullDetail}
        shadow-mapSize={[shadowSize, shadowSize]}
        shadow-camera-far={32}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-bias={-0.00025}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[-7, 5, -5]} intensity={0.42} color="#6a9fd4" />
      <directionalLight position={[0, 4, -9]} intensity={0.48} color={TEAL_ACCENT} />

      {fullDetail && (
        <ContactShadows
          position={[0, 0.005, 0]}
          opacity={0.55}
          scale={22}
          blur={2.8}
          far={9}
          resolution={tier === 'ultra' ? 1024 : 512}
          color="#000000"
        />
      )}
    </>
  );
}
