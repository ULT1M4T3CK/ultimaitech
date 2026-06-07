import { PORTAL_POSITIONS, type PortalConfig } from '@/components/immersive/immersive-provider';
import type { Dictionary } from '@/lib/locales';

export function portalConfigFromDict(dict: Dictionary): PortalConfig[] {
  const labels = dict.home.nexus?.portalLabels ?? {
    services: dict.nav[1]?.name ?? 'Services',
    projects: dict.nav[2]?.name ?? 'Projects',
    about: dict.nav[3]?.name ?? 'About',
    hub: dict.nav[0]?.name ?? 'Hub',
  };

  const hrefs = [dict.slugs.services, dict.slugs.projects, dict.slugs.about, dict.slugs.home];
  const rotations = [0, -Math.PI / 2, Math.PI, Math.PI / 2];
  const keys = ['services', 'projects', 'about', 'hub'] as const;

  return keys.map((key, index) => ({
    position: PORTAL_POSITIONS[index],
    label: labels[key],
    href: hrefs[index],
    rotationY: rotations[index],
  }));
}
