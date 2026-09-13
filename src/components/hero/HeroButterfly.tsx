"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ButterflyFallback } from "@/components/hero/ButterflyFallback";
import { WebGLBoundary } from "@/components/hero/WebGLBoundary";
import { useHero3DEnabled } from "@/hooks/useHero3DEnabled";
import { useAmbientEdgeSlot } from "@/hooks/useAmbientEdgeSlot";
import type { HeroSceneProps } from "@/components/hero/types";
import { cn } from "@/lib/utils";

const ButterflyScene = dynamic(
  () => import("@/components/hero/ButterflyScene").then((module) => module.ButterflyScene),
  { ssr: false, loading: () => <ButterflyFallback /> },
);

export interface HeroButterflyProps extends HeroSceneProps {
  className?: string;
}

export function HeroButterfly({ className, ...sceneProps }: HeroButterflyProps) {
  const mode = useHero3DEnabled();
  const showCanvas = mode === "webgl";
  const slotRef = useRef<HTMLDivElement>(null);
  useAmbientEdgeSlot(slotRef, showCanvas ? "webgl" : mode);

  return (
    <div
      ref={slotRef}
      className={cn(
        "pointer-events-none absolute z-[1] right-4 top-8 lg:right-6 lg:top-24",
        showCanvas ? "h-40 w-40 opacity-[0.62]" : "h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20",
        className,
      )}
      data-hero-3d={showCanvas ? "webgl" : "fallback"}
      aria-hidden="true"
    >
      {showCanvas ? (
        <WebGLBoundary fallback={<ButterflyFallback />}>
          <ButterflyScene {...sceneProps} />
        </WebGLBoundary>
      ) : (
        <ButterflyFallback />
      )}
    </div>
  );
}
