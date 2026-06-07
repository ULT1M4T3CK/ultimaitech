import { toInternalSegment, parseLocalePath } from '@/lib/i18n';

const IMMERSIVE_SEGMENTS = new Set(['', 'services', 'projects', 'about']);

export type SceneId = 'hub' | 'services' | 'projects' | 'about';

export function isImmersivePath(pathname: string): boolean {
  const { locale, segment } = parseLocalePath(pathname);
  return IMMERSIVE_SEGMENTS.has(toInternalSegment(locale, segment));
}

export function sceneIdFromPath(pathname: string): SceneId {
  const { locale, segment } = parseLocalePath(pathname);
  const internal = toInternalSegment(locale, segment);
  if (internal === 'services') return 'services';
  if (internal === 'projects') return 'projects';
  if (internal === 'about') return 'about';
  return 'hub';
}
