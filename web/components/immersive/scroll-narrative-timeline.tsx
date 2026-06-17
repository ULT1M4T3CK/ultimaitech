"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useImmersive } from "@/components/immersive/immersive-provider";
import { markNarrativeComplete } from "@/lib/narrative-session";
const PHASE_COUNT = 7;
export function ScrollNarrativeTimeline() {
  const {
    setNexusProgress,
    setNexusPhase,
    setNarrativeComplete,
    narrativeMode,
  } = useImmersive();
  const completedRef = useRef(false);
  useEffect(() => {
    if (!narrativeMode) return;
    gsap.registerPlugin(ScrollTrigger);
    const container = document.getElementById("narrative-scroll");
    if (!container) return;
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      onUpdate: (self) => {
        const progress = self.progress;
        const phase = Math.min(
          PHASE_COUNT - 1,
          Math.floor(progress * PHASE_COUNT),
        );
        setNexusProgress(progress);
        setNexusPhase(phase);
        if (progress >= 0.98 && !completedRef.current) {
          completedRef.current = true;
          markNarrativeComplete();
          setNarrativeComplete();
        }
      },
    });
    return () => {
      trigger.kill();
    };
  }, [narrativeMode, setNexusProgress, setNexusPhase, setNarrativeComplete]);
  return null;
}
