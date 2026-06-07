'use client';

import { Suspense } from 'react';
import { CameraRig } from '@/components/immersive/camera-rig';
import { PostFX } from '@/components/immersive/post-fx';
import { SceneLighting } from '@/components/immersive/scene-lighting';
import { AboutScene } from '@/components/immersive/scenes/about-scene';
import { HubScene } from '@/components/immersive/scenes/hub-scene';
import { NexusCoreScene } from '@/components/immersive/scenes/nexus-core-scene';
import { ProjectsScene } from '@/components/immersive/scenes/projects-scene';
import { ServicesScene } from '@/components/immersive/scenes/services-scene';
import { useImmersive } from '@/components/immersive/immersive-provider';
import type { SceneId } from '@/lib/immersive-routes';

type SceneRouterProps = {
  sceneId: SceneId;
};

function SceneContent({ sceneId }: { sceneId: SceneId }) {
  switch (sceneId) {
    case 'services':
      return <ServicesScene />;
    case 'projects':
      return <ProjectsScene />;
    case 'about':
      return <AboutScene />;
    case 'hub':
    default:
      return <HubScene />;
  }
}

export function SceneRouter({ sceneId }: SceneRouterProps) {
  const { tier, narrativeMode } = useImmersive();
  const activeScene = narrativeMode ? 'narrative' : sceneId;

  return (
    <>
      <SceneLighting tier={tier} sceneId={activeScene} />
      <Suspense fallback={null}>
        {narrativeMode ? <NexusCoreScene /> : <SceneContent sceneId={sceneId} />}
      </Suspense>
      <CameraRig sceneId={activeScene} enabled={!narrativeMode} />
      <PostFX />
    </>
  );
}
