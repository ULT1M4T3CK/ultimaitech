"use client";
import { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import type { Group } from "three";
import type { GltfAsset } from "@/lib/assets-3d";
import {
  enhanceGltfMaterials,
  type MaterialPreset,
} from "@/lib/material-utils";
type GltfModelProps = {
  asset: GltfAsset;
  castShadow?: boolean;
  receiveShadow?: boolean;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  materialPreset?: MaterialPreset;
  envMapIntensity?: number;
};
function applyShadows(root: Group, cast: boolean, receive: boolean) {
  root.traverse((child) => {
    if ("isMesh" in child && child.isMesh) {
      child.castShadow = cast;
      child.receiveShadow = receive;
    }
  });
}
export function GltfModel({
  asset,
  castShadow = true,
  receiveShadow = true,
  scale: scaleProp,
  position: positionProp,
  rotation: rotationProp,
  materialPreset = "default",
  envMapIntensity = 0.9,
}: GltfModelProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(asset.path);
  const clone = useMemo(() => {
    const cloned = SkeletonUtils.clone(scene) as Group;
    applyShadows(cloned, castShadow, receiveShadow);
    enhanceGltfMaterials(cloned, materialPreset, envMapIntensity);
    return cloned;
  }, [scene, castShadow, receiveShadow, materialPreset, envMapIntensity]);
  const scale = scaleProp ?? asset.scale ?? 1;
  const position = positionProp ?? asset.position ?? [0, 0, 0];
  const rotation = rotationProp ?? asset.rotation ?? [0, 0, 0];
  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={clone} />
    </group>
  );
}
