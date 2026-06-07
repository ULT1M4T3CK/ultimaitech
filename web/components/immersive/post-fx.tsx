'use client';

import { Bloom, Vignette } from '@react-three/postprocessing';
import { useImmersive } from '@/components/immersive/immersive-provider';
import { hasPostFX } from '@/lib/device-tier';

export function PostFX() {
  const { tier, bloom } = useImmersive();

  if (!hasPostFX(tier)) return null;

  return (
    <>
      <Bloom
        intensity={bloom}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.85}
        mipmapBlur
      />
      <Vignette eskil offset={0.25} darkness={0.55} />
    </>
  );
}
