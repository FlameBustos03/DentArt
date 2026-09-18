"use client";

import type { Ref } from "react";
import Image from "next/image";
import { brandMarkAlt } from "@/data/mockData";
import { brandLockupImage } from "@/lib/brandAssets";
import { cn } from "@/lib/utils";

export interface BrandLockupProps {
  lockupRef?: Ref<HTMLSpanElement>;
  dockRef?: Ref<HTMLSpanElement>;
  showLockup?: boolean;
  size?: "nav" | "hero";
  className?: string;
}

/** The lockup PNG is 1125x422; the butterfly-D occupies its left 38%. */
const LOCKUP_ASPECT = "aspect-[1125/422]";

const BOX: Record<NonNullable<BrandLockupProps["size"]>, string> = {
  nav: "h-10",
  hero: "h-9 md:h-[4.5rem] lg:h-24 xl:h-[7.5rem]",
};

export function BrandLockup({
  lockupRef,
  dockRef,
  showLockup = true,
  size = "hero",
  className,
}: BrandLockupProps) {
  return (
    <span
      ref={lockupRef}
      className={cn("relative inline-block shrink-0 bg-transparent", LOCKUP_ASPECT, BOX[size], className)}
    >
      <span
        ref={dockRef}
        className="pointer-events-none absolute left-0 top-0 h-full w-[38%] bg-transparent"
        data-lockup-d=""
        aria-hidden="true"
      />
      {/* Always mounted so the heading keeps its accessible name and the PNG is
          preloaded while the butterfly is still in flight. */}
      <Image
        src={brandLockupImage}
        alt={brandMarkAlt}
        fill
        className={cn(
          "bg-transparent object-contain object-left motion-safe:transition-opacity motion-safe:duration-300",
          // The flight only plays at lg+ with motion allowed (CinematicButterfly
          // settles immediately otherwise), so below lg and under reduced motion
          // the server-rendered lockup must not wait for hydration to show up.
          showLockup ? "opacity-100" : "opacity-0 max-lg:opacity-100 motion-reduce:opacity-100",
        )}
        sizes={size === "hero" ? "(min-width: 1280px) 320px, (min-width: 1024px) 256px, (min-width: 768px) 192px, 144px" : "107px"}
        priority
      />
    </span>
  );
}
