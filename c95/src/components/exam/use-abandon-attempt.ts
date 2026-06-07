"use client";

import { useEffect, useRef } from "react";
import { withBasePath } from "@/lib/base-path";

function abandonAttempt(attemptId: string) {
  const url = withBasePath("/api/attempts/abandon");
  const body = JSON.stringify({ attemptId });
  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon(url, blob);
    return;
  }
  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}

export function useAbandonAttempt(attemptId: string | null, active: boolean) {
  const attemptRef = useRef(attemptId);
  const activeRef = useRef(active);
  const armedRef = useRef(false);

  useEffect(() => {
    attemptRef.current = attemptId;
    activeRef.current = active;
  }, [attemptId, active]);

  useEffect(() => {
    if (!attemptId || !active) return;

    armedRef.current = false;
    const timer = window.setTimeout(() => {
      armedRef.current = true;
    }, 750);

    const abandonIfActive = () => {
      if (!armedRef.current || !attemptRef.current || !activeRef.current) return;
      abandonAttempt(attemptRef.current);
      activeRef.current = false;
    };

    window.addEventListener("pagehide", abandonIfActive);
    window.addEventListener("beforeunload", abandonIfActive);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pagehide", abandonIfActive);
      window.removeEventListener("beforeunload", abandonIfActive);
      abandonIfActive();
    };
  }, [attemptId, active]);

  return () => {
    activeRef.current = false;
  };
}
