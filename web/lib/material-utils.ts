import type { Mesh, Object3D } from 'three';
import { MeshStandardMaterial } from 'three';

export type MaterialPreset = 'architecture' | 'furniture' | 'metal' | 'default';

type ArchitecturalSurface = {
  color: string;
  metalness: number;
  roughness: number;
  envScale?: number;
};

function meshMaterials(mesh: Mesh): MeshStandardMaterial[] {
  const raw = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  return raw.filter(
    (mat): mat is MeshStandardMaterial =>
      !!mat && 'isMeshStandardMaterial' in mat && (mat as MeshStandardMaterial).isMeshStandardMaterial,
  );
}

function isKenneyColormapMaterial(mat: MeshStandardMaterial): boolean {
  return mat.name === 'colormap';
}

function surfaceForMesh(meshName: string, preset: MaterialPreset): ArchitecturalSurface {
  const name = meshName.toLowerCase();

  if (name.includes('floor') || name.includes('dais') || name.includes('platform') || name.includes('big')) {
    return { color: '#2a2f36', metalness: 0.85, roughness: 0.32, envScale: 1.2 };
  }

  if (name.includes('detail') || name.includes('pedestal')) {
    return { color: '#1e2329', metalness: 0.12, roughness: 0.68, envScale: 0.85 };
  }

  if (name.includes('wall') || name.includes('panel') || name.includes('corridor')) {
    return { color: '#252a31', metalness: 0.18, roughness: 0.58, envScale: 0.9 };
  }

  if (name.includes('ring') || name.includes('metal') || name.includes('chrome') || preset === 'metal') {
    return { color: '#3d454e', metalness: 0.9, roughness: 0.28, envScale: 1.35 };
  }

  if (preset === 'furniture' || name.includes('desk') || name.includes('chair') || name.includes('wood')) {
    return { color: '#2c2620', metalness: 0.08, roughness: 0.72, envScale: 0.8 };
  }

  if (preset === 'architecture') {
    return { color: '#2a3038', metalness: 0.22, roughness: 0.48, envScale: 1.05 };
  }

  return { color: '#2a3038', metalness: 0.2, roughness: 0.5, envScale: 1 };
}

function applyArchitecturalSurface(
  mat: MeshStandardMaterial,
  surface: ArchitecturalSurface,
  envMapIntensity: number,
) {
  mat.map = null;
  mat.normalMap = null;
  mat.roughnessMap = null;
  mat.metalnessMap = null;
  mat.aoMap = null;
  mat.color.set(surface.color);
  mat.metalness = surface.metalness;
  mat.roughness = surface.roughness;
  mat.emissive.set('#000000');
  mat.emissiveIntensity = 0;
  mat.envMapIntensity = envMapIntensity * (surface.envScale ?? 1);
}

export function enhanceGltfMaterials(
  root: Object3D,
  preset: MaterialPreset = 'default',
  envMapIntensity = 0.9,
) {
  root.traverse((child) => {
    if (!('isMesh' in child) || !(child as Mesh).isMesh) return;

    const mesh = child as Mesh;
    const name = mesh.name.toLowerCase();

    meshMaterials(mesh).forEach((mat) => {
      if (isKenneyColormapMaterial(mat)) {
        applyArchitecturalSurface(mat, surfaceForMesh(mesh.name, preset), envMapIntensity);
        return;
      }

      mat.envMapIntensity = envMapIntensity;

      if (name.includes('screen') || name.includes('display') || name.includes('monitor')) {
        mat.emissive.set('#0c1018');
        mat.emissiveIntensity = 0.08;
        mat.roughness = Math.min(mat.roughness, 0.2);
        mat.metalness = Math.max(mat.metalness, 0.05);
        return;
      }

      if (name.includes('metal') || name.includes('ring') || name.includes('chrome') || preset === 'metal') {
        mat.metalness = Math.max(mat.metalness, 0.72);
        mat.roughness = Math.min(mat.roughness, 0.28);
        mat.envMapIntensity = envMapIntensity * 1.35;
        return;
      }

      if (
        preset === 'architecture' ||
        name.includes('wall') ||
        name.includes('panel') ||
        name.includes('platform') ||
        name.includes('corridor') ||
        name.includes('dais')
      ) {
        mat.roughness = Math.min(mat.roughness, 0.52);
        mat.metalness = Math.max(mat.metalness, 0.18);
        mat.envMapIntensity = envMapIntensity * 1.15;
        return;
      }

      if (preset === 'furniture' || name.includes('desk') || name.includes('chair') || name.includes('wood')) {
        mat.roughness = Math.max(0.45, Math.min(mat.roughness, 0.72));
        mat.metalness = Math.min(mat.metalness, 0.12);
        mat.envMapIntensity = envMapIntensity * 0.95;
      }
    });
  });
}
