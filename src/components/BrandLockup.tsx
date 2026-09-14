"use client";

import type { Ref } from "react";
import Image from "next/image";
import { brandMarkAlt } from "@/data/mockData";
import { cn } from "@/lib/utils";

export interface BrandLockupProps {
  lockupRef?: Ref<HTMLSpanElement>;
  dockRef?: Ref<HTMLSpanElement>;
  showLockup?: boolean;
  size?: "nav" | "hero";
  plate?: boolean;
  className?: string;
}

/** public/brand/dent-art-lockup.png is 1181x481; the butterfly occupies its left 38%. */
const LOCKUP_ASPECT = "aspect-[1181/481]";

const BOX: Record<NonNullable<BrandLockupProps["size"]>, string> = {
  nav: "h-10 sm:h-11 lg:h-12",
  hero: "h-[4.5rem] sm:h-24",
};

export function BrandLockup({
  lockupRef,
  dockRef,
  showLockup = true,
  size = "hero",
  plate = false,
  className,
}: BrandLockupProps) {
  return (
    <span
      ref={lockupRef}
      className={cn(
        "relative inline-block shrink-0",
        LOCKUP_ASPECT,
        BOX[size],
        // overflow-hidden: the PNG has its own white background, so without
        // clipping its square corners paint over the rounded plate.
        plate && "overflow-hidden rounded-2xl bg-white",
        className,
      )}
    >
      <span
        ref={dockRef}
        className="pointer-events-none absolute left-0 top-0 h-full w-[38%]"
        data-lockup-d=""
        aria-hidden="true"
      />
      {/* Always mounted so the heading keeps its accessible name and the PNG is
          preloaded while the butterfly is still in flight. */}
      <Image
        src="/brand/dent-art-lockup.png"
        alt={brandMarkAlt}
        fill
        className={cn(
          "object-contain object-left motion-safe:transition-opacity motion-safe:duration-300",
          showLockup ? "opacity-100" : "opacity-0",
        )}
        sizes={size === "hero" ? "(min-width: 640px) 236px, 177px" : "118px"}
        priority
      />
    </span>
  );
}
