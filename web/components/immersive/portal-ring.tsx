"use client";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { AdditiveBlending, DoubleSide, type Mesh, ShaderMaterial } from "three";
import { useImmersive } from "@/components/immersive/immersive-provider";
const portalVertexShader = /* glsl */ ` varying vec3 vNormal; varying vec3 vViewPosition; void main() { vNormal = normalize(normalMatrix * normal); vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); vViewPosition = -mvPosition.xyz; gl_Position = projectionMatrix * mvPosition; }
`;
const portalFragmentShader = /* glsl */ ` uniform float uTime; uniform float uIntensity; uniform float uHover; uniform vec3 uColor; varying vec3 vNormal; varying vec3 vViewPosition; void main() { vec3 viewDir = normalize(vViewPosition); float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5); float pulse = 0.85 + 0.15 * sin(uTime * 2.0); float alpha = fresnel * uIntensity * pulse * (0.6 + uHover * 0.4); vec3 glow = uColor * (1.0 + uHover * 0.8); gl_FragColor = vec4(glow, alpha); }
`;
type PortalRingProps = {
  index: number;
  position: [number, number, number];
  rotationY?: number;
  onClick?: () => void;
};
export function PortalRing({
  index,
  position,
  rotationY = 0,
  onClick,
}: PortalRingProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { setHoveredPortal, invalidate } = useImmersive();
  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 1.2 },
          uHover: { value: 0 },
          uColor: { value: [0.176, 0.831, 0.749] },
        },
        vertexShader: portalVertexShader,
        fragmentShader: portalFragmentShader,
        transparent: true,
        depthWrite: false,
        side: DoubleSide,
        blending: AdditiveBlending,
      }),
    [],
  );
  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as ShaderMaterial;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uHover.value +=
      ((hovered ? 1 : 0) - mat.uniforms.uHover.value) * 0.12;
    invalidate();
  });
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[1.1, 0.05, 32, 64]} />
        <meshStandardMaterial
          color="#1a2228"
          metalness={0.85}
          roughness={0.22}
          envMapIntensity={1.3}
        />
      </mesh>
      <mesh
        ref={meshRef}
        rotation={[Math.PI / 2, 0, 0]}
        material={material}
        onClick={onClick}
        onPointerOver={() => {
          setHovered(true);
          setHoveredPortal(index);
          invalidate();
        }}
        onPointerOut={() => {
          setHovered(false);
          setHoveredPortal(null);
          invalidate();
        }}
      >
        <torusGeometry args={[1.1, 0.07, 32, 64]} />
      </mesh>
    </group>
  );
}
