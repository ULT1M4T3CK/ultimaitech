"use client";
import {
  Bloom,
  EffectComposer,
  SSAO,
  Vignette,
} from "@react-three/postprocessing";
import { useImmersive } from "@/components/immersive/immersive-provider";
import { hasPostFX } from "@/lib/device-tier";
export function PostFX() {
  const { tier, bloom } = useImmersive();
  if (!hasPostFX(tier)) return null;
  const isUltra = tier === "ultra";
  return (
    <EffectComposer enableNormalPass multisampling={isUltra ? 4 : 0}>
      <SSAO
        samples={isUltra ? 24 : 12}
        rings={3}
        distanceThreshold={0.35}
        distanceFalloff={0.12}
        rangeThreshold={0.001}
        rangeFalloff={0.05}
        luminanceInfluence={0.45}
        radius={0.12}
        intensity={isUltra ? 18 : 12}
        bias={0.025}
      />
      <Bloom
        intensity={bloom}
        luminanceThreshold={0.45}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette eskil offset={0.22} darkness={0.48} />
    </EffectComposer>
  );
}
