'use client';

import { RoundedBox, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { GltfModel } from '@/components/immersive/gltf-model';
import { PortalRing } from '@/components/immersive/portal-ring';
import {
  CORE_POSITION,
  NEXUS_MODULES,
  SignalPaths,
  modulePosition,
} from '@/components/immersive/signal-paths';
import { SceneFloor } from '@/components/immersive/scene-floor';
import { ScreenPanel } from '@/components/immersive/screen-panel';
import { useImmersive } from '@/components/immersive/immersive-provider';
import { ASSET_REGISTRY, PROJECT_SCREEN_TEXTURES } from '@/lib/assets-3d';
import { PROJECT_SCREEN_POSITIONS } from '@/components/immersive/scenes/projects-scene';
import { SERVICE_PILLAR_POSITIONS } from '@/components/immersive/scenes/services-scene';
import { hasFullDetail } from '@/lib/device-tier';

const WALL_PANEL_POSITIONS: [number, number, number][] = [
  [-4.2, 1.6, -3.8],
  [4.2, 1.6, -3.8],
  [-4.2, 1.6, 3.8],
  [4.2, 1.6, 3.8],
];

const SCREEN_PANEL_OFFSET: [number, number, number][] = [
  [-4, 1.8, -2.38],
  [0, 2.2, -3.08],
  [4, 1.8, -2.38],
];

function NexusModuleBox({
  mod,
  dockFactor,
  highlight,
  rotationOffset,
}: {
  mod: (typeof NEXUS_MODULES)[number];
  dockFactor: number;
  highlight: number;
  rotationOffset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { invalidate } = useImmersive();
  const pos = modulePosition(mod, dockFactor);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = rotationOffset + state.clock.elapsedTime * 0.25;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + mod.orbitAngle) * 0.08;
    invalidate();
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[0.88, 0.88, 0.88]}
      radius={0.07}
      smoothness={4}
      position={pos}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial
        color="#1e242e"
        emissive={mod.color}
        emissiveIntensity={0.12 + highlight * 0.55}
        metalness={0.58}
        roughness={0.2}
        clearcoat={0.35}
        clearcoatRoughness={0.12}
        envMapIntensity={1.1}
      />
    </RoundedBox>
  );
}

function phaseState(phase: number, progress: number) {
  const blend = progress % (1 / 7);
  return {
    dockFactor: THREE.MathUtils.clamp(phase >= 1 ? 0.3 + phase * 0.12 + blend : phase * 0.15, 0, 1),
    pathIntensity: THREE.MathUtils.clamp(phase >= 1 ? (phase - 0.5) / 5.5 : 0, 0, 1),
    showCorridor: phase >= 2,
    showScreens: phase >= 2,
    showPillars: phase >= 3,
    processRotation: phase >= 4 ? (phase - 3) * 0.4 : 0,
    showWallPanels: phase >= 5,
    showPortals: phase >= 6,
    corePulse: phase >= 3 ? 0.3 + Math.min(phase - 2, 3) * 0.15 : 0.1,
  };
}

export function NexusCoreScene() {
  const { tier, nexusPhase, nexusProgress, portalConfig } = useImmersive();
  const ringRef = useRef<THREE.Group>(null);
  const fullDetail = hasFullDetail(tier);

  const state = useMemo(
    () => phaseState(nexusPhase, nexusProgress),
    [nexusPhase, nexusProgress],
  );

  useFrame((frameState) => {
    if (ringRef.current) {
      ringRef.current.rotation.y =
        frameState.clock.elapsedTime * 0.08 + state.processRotation;
    }
  });

  return (
    <group>
      <GltfModel asset={ASSET_REGISTRY.hubPlatform} position={[0, 0, 0]} materialPreset="architecture" />

      <group ref={ringRef} position={CORE_POSITION}>
        <GltfModel
          asset={ASSET_REGISTRY.hubRing}
          position={[0, 0.05, 0]}
          scale={0.85 + state.corePulse * 0.1}
          materialPreset="metal"
        />
      </group>

      {NEXUS_MODULES.map((mod, i) => (
        <NexusModuleBox
          key={mod.id}
          mod={mod}
          dockFactor={state.dockFactor}
          highlight={state.pathIntensity}
          rotationOffset={state.processRotation * (i + 1)}
        />
      ))}

      <SignalPaths
        dockFactor={state.dockFactor}
        pathIntensity={state.pathIntensity}
        pulsePhase={state.processRotation}
      />

      {state.showCorridor && (
        <GltfModel
          asset={ASSET_REGISTRY.corridorWall}
          position={[0, 0, -1.5]}
          scale={0.5 + state.dockFactor * 0.5}
          materialPreset="architecture"
        />
      )}

      {state.showScreens &&
        PROJECT_SCREEN_POSITIONS.map((pos, i) => (
          <GltfModel
            key={`nexus-screen-${i}`}
            asset={ASSET_REGISTRY.screenWide}
            position={pos}
            scale={0.6 + state.dockFactor * 0.4}
            materialPreset="architecture"
          />
        ))}

      {state.showScreens &&
        SCREEN_PANEL_OFFSET.map((pos, i) => (
          <ScreenPanel
            key={`nexus-panel-${i}`}
            position={pos}
            src={PROJECT_SCREEN_TEXTURES[i]}
            emissiveIntensity={1.2 + state.pathIntensity * 0.8}
          />
        ))}

      {state.showPillars &&
        SERVICE_PILLAR_POSITIONS.map((pos, i) => (
          <GltfModel key={`nexus-pedestal-${i}`} asset={ASSET_REGISTRY.pedestal} position={pos} materialPreset="architecture" />
        ))}

      {state.showWallPanels &&
        WALL_PANEL_POSITIONS.map((pos, i) => (
          <GltfModel
            key={`nexus-wall-${i}`}
            asset={ASSET_REGISTRY.wallPanel}
            position={pos}
            rotation={[0, i < 2 ? 0 : Math.PI, 0]}
            scale={0.7 + state.dockFactor * 0.3}
            materialPreset="architecture"
          />
        ))}

      {state.showPortals &&
        portalConfig.map((portal, index) => (
          <PortalRing
            key={`nexus-portal-${portal.label}`}
            index={index}
            position={portal.position}
            rotationY={portal.rotationY}
          />
        ))}

      {fullDetail && (
        <Sparkles count={22} scale={[12, 5, 12]} size={1} speed={0.15} opacity={0.18} color="#2DD4BF" />
      )}

      <SceneFloor />
    </group>
  );
}
