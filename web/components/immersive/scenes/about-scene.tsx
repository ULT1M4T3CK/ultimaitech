"use client";
import { GltfModel } from "@/components/immersive/gltf-model";
import { SceneFloor } from "@/components/immersive/scene-floor";
import { ScreenPanel } from "@/components/immersive/screen-panel";
import { ASSET_REGISTRY, MONITOR_TEXTURE } from "@/lib/assets-3d";
export function AboutScene() {
  return (
    <group>
      <GltfModel
        asset={ASSET_REGISTRY.desk}
        position={[0, 0, 0.5]}
        materialPreset="furniture"
      />
      <GltfModel
        asset={ASSET_REGISTRY.monitor}
        position={[0, 0.85, 0.2]}
        materialPreset="architecture"
      />
      <GltfModel
        asset={ASSET_REGISTRY.chair}
        position={[0, 0, 1.8]}
        rotation={[0, Math.PI, 0]}
        materialPreset="furniture"
      />
      <ScreenPanel
        position={[0, 0.92, 0.34]}
        src={MONITOR_TEXTURE}
        width={0.72}
        height={0.48}
        emissiveIntensity={1.4}
      />
      <pointLight
        position={[0, 2.2, 1.2]}
        intensity={0.55}
        color="#f0ebe3"
        distance={7}
        decay={2}
      />
      <pointLight
        position={[-1.5, 1.4, 0.5]}
        intensity={0.25}
        color="#6a9fd4"
        distance={5}
        decay={2}
      />
      <SceneFloor size={16} />
    </group>
  );
}
