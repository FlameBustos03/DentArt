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

const BOX: Record<NonNullable<BrandLockupProps["size"]>, string> = {
  nav: "h-10 w-[9.25rem] sm:w-[10.5rem]",
  hero: "h-[4.5rem] w-[min(28rem,88vw)] sm:h-24 sm:w-[min(36rem,90vw)]",
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
      className={cn("relative inline-block shrink-0 bg-transparent", BOX[size], className)}
      style={{ backgroundColor: "transparent" }}
    >
      <span
        ref={dockRef}
        className="pointer-events-none absolute left-0 top-0 h-full w-[38%] bg-transparent"
        data-lockup-d=""
        aria-hidden="true"
      />
      {showLockup ? (
        <Image
          src="/brand/dent-art-lockup.png"
          alt={brandMarkAlt}
          fill
          unoptimized
          className="bg-transparent object-contain object-left"
          style={{ backgroundColor: "transparent" }}
          sizes={size === "hero" ? "(min-width: 640px) 36rem, 88vw" : "192px"}
          priority
        />
      ) : null}
    </span>
  );
}
