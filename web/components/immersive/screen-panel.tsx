"use client";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
type ScreenPanelProps = {
  position: [number, number, number];
  rotation?: [number, number, number];
  src: string;
  width?: number;
  height?: number;
  emissiveIntensity?: number;
};
export function ScreenPanel({
  position,
  rotation = [0, 0, 0],
  src,
  width = 2.15,
  height = 1.22,
  emissiveIntensity = 1.8,
}: ScreenPanelProps) {
  const texture = useTexture(src);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        map={texture}
        emissiveMap={texture}
        emissive="#ffffff"
        emissiveIntensity={emissiveIntensity}
        roughness={0.18}
        metalness={0.02}
        toneMapped
      />
    </mesh>
  );
}
