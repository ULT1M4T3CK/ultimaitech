"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { CameraRig } from "@/components/immersive/camera-rig";
import { PostFX } from "@/components/immersive/post-fx";
import { SceneLighting } from "@/components/immersive/scene-lighting";
import { useImmersive } from "@/components/immersive/immersive-provider";
import type { SceneId } from "@/lib/immersive-routes";
const AboutScene = dynamic(
  () =>
    import("@/components/immersive/scenes/about-scene").then(
      (m) => m.AboutScene,
    ),
  { ssr: false },
);
const HubScene = dynamic(
  () =>
    import("@/components/immersive/scenes/hub-scene").then((m) => m.HubScene),
  { ssr: false },
);
const NexusCoreScene = dynamic(
  () =>
    import("@/components/immersive/scenes/nexus-core-scene").then(
      (m) => m.NexusCoreScene,
    ),
  { ssr: false },
);
const ProjectsScene = dynamic(
  () =>
    import("@/components/immersive/scenes/projects-scene").then(
      (m) => m.ProjectsScene,
    ),
  { ssr: false },
);
const ServicesScene = dynamic(
  () =>
    import("@/components/immersive/scenes/services-scene").then(
      (m) => m.ServicesScene,
    ),
  { ssr: false },
);
type SceneRouterProps = { sceneId: SceneId };
function SceneContent({ sceneId }: { sceneId: SceneId }) {
  switch (sceneId) {
    case "services":
      return <ServicesScene />;
    case "projects":
      return <ProjectsScene />;
    case "about":
      return <AboutScene />;
    case "hub":
    default:
      return <HubScene />;
  }
}
export function SceneRouter({ sceneId }: SceneRouterProps) {
  const { tier, narrativeMode } = useImmersive();
  const activeScene = narrativeMode ? "narrative" : sceneId;
  return (
    <>
      <SceneLighting tier={tier} sceneId={activeScene} />
      <Suspense fallback={null}>
        {narrativeMode ? (
          <NexusCoreScene />
        ) : (
          <SceneContent sceneId={sceneId} />
        )}
      </Suspense>
      <CameraRig sceneId={activeScene} enabled={!narrativeMode} />
      <PostFX />
    </>
  );
}
