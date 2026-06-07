'use client';

import { ContactShadows, Environment } from '@react-three/drei';
import { TEAL_ACCENT } from '@/components/immersive/immersive-provider';
import { HDR_PATH } from '@/lib/assets-3d';
import { hasFullDetail, type DeviceTier } from '@/lib/device-tier';
import type { SceneId } from '@/lib/immersive-routes';

type SceneLightingProps = {
  tier: DeviceTier;
  sceneId?: SceneId | 'narrative';
};

type LightPreset = {
  envIntensity: number;
  key: { position: [number, number, number]; intensity: number; color: string };
  fill: { position: [number, number, number]; intensity: number; color: string };
  rim: { position: [number, number, number]; intensity: number; color: string };
  contactOpacity: number;
  contactBlur: number;
};

const PRESETS: Record<string, LightPreset> = {
  services: {
    envIntensity: 0.55,
    key: { position: [4, 9, 7], intensity: 1.2, color: '#f2ece4' },
    fill: { position: [-6, 4, 2], intensity: 0.28, color: '#8aa8c8' },
    rim: { position: [0, 2, -8], intensity: 0.35, color: TEAL_ACCENT },
    contactOpacity: 0.35,
    contactBlur: 3.5,
  },
  default: {
    envIntensity: 0.72,
    key: { position: [5, 11, 6], intensity: 1.35, color: '#f4efe6' },
    fill: { position: [-7, 5, -5], intensity: 0.42, color: '#6a9fd4' },
    rim: { position: [0, 4, -9], intensity: 0.48, color: TEAL_ACCENT },
    contactOpacity: 0.55,
    contactBlur: 2.8,
  },
};

export function SceneLighting({ tier, sceneId = 'hub' }: SceneLightingProps) {
  const fullDetail = hasFullDetail(tier);
  const shadowSize = tier === 'ultra' ? 2048 : 1536;
  const presetKey = sceneId === 'services' ? 'services' : 'default';
  const preset = PRESETS[presetKey];
  const envIntensity = fullDetail ? preset.envIntensity : preset.envIntensity * 0.55;

  return (
    <>
      {tier !== false ? (
        <Environment files={HDR_PATH} background={false} environmentIntensity={envIntensity} />
      ) : (
        <color attach="background" args={['#0d0f12']} />
      )}

      <hemisphereLight args={['#c8d4e8', '#12151a', 0.38]} />
      <ambientLight intensity={0.14} color="#e8e4dc" />

      <directionalLight
        position={preset.key.position}
        intensity={preset.key.intensity}
        color={preset.key.color}
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
      <directionalLight
        position={preset.fill.position}
        intensity={preset.fill.intensity}
        color={preset.fill.color}
      />
      <directionalLight
        position={preset.rim.position}
        intensity={preset.rim.intensity}
        color={preset.rim.color}
      />

      {fullDetail && (
        <ContactShadows
          position={[0, 0.005, 0]}
          opacity={preset.contactOpacity}
          scale={22}
          blur={preset.contactBlur}
          far={9}
          resolution={tier === 'ultra' ? 1024 : 512}
          color="#000000"
        />
      )}
    </>
  );
}
