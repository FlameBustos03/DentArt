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
  className?: string;
}

/** public/brand/dent-art-lockup.png is 1125x422; the butterfly-D occupies its left 38%. */
const LOCKUP_ASPECT = "aspect-[1125/422]";

const BOX: Record<NonNullable<BrandLockupProps["size"]>, string> = {
  nav: "h-10",
  hero: "h-[4.5rem] sm:h-24",
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
      style={{ backgroundColor: "transparent" }}
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
        src="/brand/dent-art-lockup.png"
        alt={brandMarkAlt}
        fill
        unoptimized
        className={cn(
          "bg-transparent object-contain object-left motion-safe:transition-opacity motion-safe:duration-300",
          showLockup ? "opacity-100" : "opacity-0",
        )}
        style={{ backgroundColor: "transparent" }}
        sizes={size === "hero" ? "(min-width: 640px) 256px, 192px" : "107px"}
        priority
      />
    </span>
  );
}
