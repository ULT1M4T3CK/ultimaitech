#!/usr/bin/env node
/**
 * Rebakes Kenney template GLBs with a dark architectural baseColor.
 * Strips the saturated colormap atlas and assigns per-material PBR factors.
 *
 * Usage: node scripts/retexture-3d-assets.mjs
 */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { NodeIO } from '@gltf-transform/core';
import { KHRTextureTransform } from '@gltf-transform/extensions';

const __dirname = dirname(fileURLToPath(import.meta.url));
const modelsDir = join(__dirname, '../public/assets/3d/models');

const SURFACES = {
  floor: { baseColorFactor: [0.165, 0.184, 0.212, 1], metallicFactor: 0.85, roughnessFactor: 0.32 },
  detail: { baseColorFactor: [0.118, 0.137, 0.161, 1], metallicFactor: 0.12, roughnessFactor: 0.68 },
  wall: { baseColorFactor: [0.145, 0.165, 0.192, 1], metallicFactor: 0.18, roughnessFactor: 0.58 },
  default: { baseColorFactor: [0.165, 0.188, 0.22, 1], metallicFactor: 0.22, roughnessFactor: 0.48 },
};

const MODELS = [
  'hub_platform.glb',
  'hub_ring.glb',
  'wall_panel.glb',
  'services_dais.glb',
  'pedestal.glb',
  'screen_wide.glb',
  'corridor_wall.glb',
  'desk.glb',
  'monitor.glb',
  'chair.glb',
];

function surfaceForMesh(name) {
  const n = name.toLowerCase();
  if (n.includes('floor') || n.includes('big') || n.includes('dais') || n.includes('platform')) {
    return SURFACES.floor;
  }
  if (n.includes('detail') || n.includes('pedestal')) {
    return SURFACES.detail;
  }
  if (n.includes('wall') || n.includes('panel') || n.includes('corridor')) {
    return SURFACES.wall;
  }
  if (n.includes('ring') || n.includes('metal')) {
    return { baseColorFactor: [0.24, 0.27, 0.31, 1], metallicFactor: 0.9, roughnessFactor: 0.28 };
  }
  return SURFACES.default;
}

const io = new NodeIO().registerExtensions([KHRTextureTransform]);

for (const file of MODELS) {
  const input = join(modelsDir, file);
  const doc = await io.read(input);
  const root = doc.getRoot();

  for (const mesh of root.listMeshes()) {
    const surface = surfaceForMesh(mesh.getName());
    for (const prim of mesh.listPrimitives()) {
      const mat = prim.getMaterial();
      if (!mat) continue;
      mat.setBaseColorTexture(null);
      mat.setBaseColorFactor(surface.baseColorFactor);
      mat.setMetallicFactor(surface.metallicFactor);
      mat.setRoughnessFactor(surface.roughnessFactor);
    }
  }

  await io.write(input, doc);
  console.log(`Retextured ${file}`);
}

console.log('Done.');
