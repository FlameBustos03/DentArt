"use client";

import dynamic from "next/dynamic";
import { ButterflyFallback } from "@/components/hero/ButterflyFallback";
import { WebGLBoundary } from "@/components/hero/WebGLBoundary";
import { useHero3DEnabled } from "@/hooks/useHero3DEnabled";
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

  return (
    <div
      className={cn("relative h-full w-full", className)}
      data-hero-3d={showCanvas ? "webgl" : "fallback"}
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
