export type GltfAsset = {
  id: string;
  path: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
};

export const HDR_PATH = "/assets/3d/hdr/studio_small_03_1k.hdr";
export const HERO_TEXTURE = "/assets/images/hero.png";
export const MONITOR_TEXTURE = "/assets/images/about-portrait.png";

export const PROJECT_SCREEN_TEXTURES = [
  "/assets/images/usecases/nijenhuis-usecase.jpeg",
  "/assets/images/usecases/houthandel-jan-sok-usecase.jpeg",
  "/assets/images/usecases/wal-beschoeiing-usecase.jpeg",
] as const;

export const ASSET_REGISTRY = {
  hubPlatform: {
    id: "hubPlatform",
    path: "/assets/3d/models/hub_platform.glb",
  },
  hubRing: { id: "hubRing", path: "/assets/3d/models/hub_ring.glb" },
  wallPanel: { id: "wallPanel", path: "/assets/3d/models/wall_panel.glb" },
  servicesDais: {
    id: "servicesDais",
    path: "/assets/3d/models/services_dais.glb",
  },
  pedestal: { id: "pedestal", path: "/assets/3d/models/pedestal.glb" },
  screenWide: { id: "screenWide", path: "/assets/3d/models/screen_wide.glb" },
  corridorWall: {
    id: "corridorWall",
    path: "/assets/3d/models/corridor_wall.glb",
  },
  desk: { id: "desk", path: "/assets/3d/models/desk.glb" },
  monitor: { id: "monitor", path: "/assets/3d/models/monitor.glb" },
  chair: { id: "chair", path: "/assets/3d/models/chair.glb" },
} as const satisfies Record<string, GltfAsset>;

export const PRELOAD_ASSETS = Object.values(ASSET_REGISTRY).map((a) => a.path);
