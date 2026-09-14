"use client";

import { useEffect, useState } from "react";

export type Hero3DMode = "pending" | "webgl" | "fallback";

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const hardware =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ??
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });
    if (hardware) {
      return true;
    }
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function useHero3DEnabled(): Hero3DMode {
  const [mode, setMode] = useState<Hero3DMode>("pending");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");

    const resolve = () => {
      if (reduced.matches || !desktop.matches || !supportsWebGL()) {
        setMode("fallback");
        return;
      }
      setMode("webgl");
    };

    resolve();
    reduced.addEventListener("change", resolve);
    desktop.addEventListener("change", resolve);
    return () => {
      reduced.removeEventListener("change", resolve);
      desktop.removeEventListener("change", resolve);
    };
  }, []);

  return mode;
}
