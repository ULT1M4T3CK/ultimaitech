"use client";

const NARRATIVE_KEY = "ultimaitech-narrative-complete";
const IMMERSIVE_MODE_KEY = "ultimaitech-immersive-mode";

export function hasCompletedNarrative(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(NARRATIVE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markNarrativeComplete(): void {
  try {
    sessionStorage.setItem(NARRATIVE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function getImmersiveModePreference(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const stored = sessionStorage.getItem(IMMERSIVE_MODE_KEY);
    if (stored === "2d") return false;
    if (stored === "3d") return true;
  } catch {
    /* ignore */
  }
  return false;
}

export function setImmersiveModePreference(prefers3D: boolean): void {
  try {
    sessionStorage.setItem(IMMERSIVE_MODE_KEY, prefers3D ? "3d" : "2d");
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent("immersive-mode-change", { detail: { prefers3D } }),
  );
}
