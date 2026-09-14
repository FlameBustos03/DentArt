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

const BOX: Record<NonNullable<BrandLockupProps["size"]>, string> = {
  nav: "h-10 w-[9.5rem] sm:h-11 sm:w-[10.5rem] lg:h-12 lg:w-48",
  hero: "h-[4.5rem] w-[min(28rem,88vw)] sm:h-24 sm:w-[min(36rem,90vw)]",
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
        BOX[size],
        plate && "rounded-2xl bg-white px-3 py-1.5",
        className,
      )}
    >
      <span
        ref={dockRef}
        className="pointer-events-none absolute left-0 top-0 h-full w-[38%]"
        data-lockup-d=""
        aria-hidden="true"
      />
      {showLockup ? (
        <Image
          src="/brand/dent-art-lockup.png"
          alt={brandMarkAlt}
          fill
          className="object-contain object-left"
          sizes={size === "hero" ? "(min-width: 640px) 36rem, 88vw" : "192px"}
          priority
        />
      ) : null}
    </span>
  );
}
