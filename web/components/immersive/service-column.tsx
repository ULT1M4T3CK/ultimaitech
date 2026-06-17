"use client";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import { GltfModel } from "@/components/immersive/gltf-model";
import {
  TEAL_ACCENT,
  useImmersive,
  type ServiceFocus,
} from "@/components/immersive/immersive-provider";
import { ASSET_REGISTRY } from "@/lib/assets-3d";
import { hasFullDetail } from "@/lib/device-tier";
export type ServiceColumnId = "websites" | "software" | "ai";
type ServiceColumnProps = {
  id: ServiceColumnId;
  position: [number, number, number];
};
function focusIntensity(
  focus: ServiceFocus,
  id: ServiceColumnId,
  pulse: number,
): number {
  if (focus === "none") return 0.45;
  if (focus === id) {
    if (id === "ai") return 0.55 + pulse * 0.15;
    return 0.75;
  }
  return 0.22;
}
export function ServiceColumn({ id, position }: ServiceColumnProps) {
  const channelRef = useRef<Mesh>(null);
  const capRef = useRef<Mesh>(null);
  const { serviceFocus, tier, invalidate } = useImmersive();
  const fullDetail = hasFullDetail(tier);
  useFrame((state) => {
    const pulse = Math.sin(state.clock.elapsedTime * 2.2) * 0.5 + 0.5;
    const intensity = focusIntensity(serviceFocus, id, pulse);
    if (channelRef.current) {
      const mat = channelRef.current.material as MeshStandardMaterial;
      mat.emissiveIntensity = intensity;
    }
    if (capRef.current && fullDetail) {
      const capMat = capRef.current.material as MeshPhysicalMaterial;
      capMat.emissiveIntensity = serviceFocus === id ? 0.04 : 0;
    }
    if (serviceFocus === "ai" && id === "ai") {
      invalidate();
    }
  });
  const capY = position[1] + 2.65;
  return (
    <group position={position}>
      <GltfModel
        asset={ASSET_REGISTRY.pedestal}
        position={[0, 0, 0]}
        materialPreset="architecture"
      />
      <mesh position={[0, 2.15, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.42, 0.04, 16, 48]} />
        <meshStandardMaterial
          color="#4a5560"
          metalness={0.92}
          roughness={0.34}
          envMapIntensity={1.3}
        />
      </mesh>
      <mesh ref={capRef} position={[0, capY, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.34, 0.28, fullDetail ? 32 : 16]} />
        {fullDetail ? (
          <meshPhysicalMaterial
            color="#141820"
            metalness={0.05}
            roughness={0.06}
            transmission={0.55}
            thickness={0.4}
            ior={1.49}
            transparent
            envMapIntensity={0.8}
          />
        ) : (
          <meshStandardMaterial
            color="#1a2228"
            metalness={0.2}
            roughness={0.35}
          />
        )}
      </mesh>
      <mesh
        ref={channelRef}
        position={[0, capY, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.18, 0.025, 12, 48]} />
        <meshStandardMaterial
          color={TEAL_ACCENT}
          emissive={TEAL_ACCENT}
          emissiveIntensity={0.45}
          metalness={0.1}
          roughness={0.4}
          toneMapped
        />
      </mesh>
      {serviceFocus === "websites" && id === "websites" && fullDetail && (
        <mesh position={[0, capY, 0.12]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.28, 0.28]} />
          <meshStandardMaterial
            color="#1a2530"
            emissive="#3a5060"
            emissiveIntensity={0.35}
            transparent
            opacity={0.85}
          />
        </mesh>
      )}
    </group>
  );
}
