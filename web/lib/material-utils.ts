import type { Mesh, Object3D } from 'three';
import { MeshStandardMaterial } from 'three';

export type MaterialPreset = 'architecture' | 'furniture' | 'metal' | 'default';

function meshMaterials(mesh: Mesh): MeshStandardMaterial[] {
  const raw = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  return raw.filter(
    (mat): mat is MeshStandardMaterial =>
      !!mat && 'isMeshStandardMaterial' in mat && (mat as MeshStandardMaterial).isMeshStandardMaterial,
  );
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
