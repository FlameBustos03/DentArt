"use client";

import type { Ref } from "react";
import Image from "next/image";
import { brandMarkAlt, clinicInfo } from "@/data/mockData";
import { cn } from "@/lib/utils";

export interface BrandLockupProps {
  markRef?: Ref<HTMLSpanElement>;
  showMark?: boolean;
  size?: "nav" | "hero";
  showSlogan?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

const MARK_BOX: Record<NonNullable<BrandLockupProps["size"]>, string> = {
  nav: "h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12",
  hero: "h-16 w-16 sm:h-20 sm:w-20",
};

export function BrandLockup({
  markRef,
  showMark = true,
  size = "hero",
  showSlogan = false,
  className,
  wordmarkClassName,
}: BrandLockupProps) {
  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <span
        ref={markRef}
        className={cn("relative shrink-0", MARK_BOX[size])}
        data-brand-lockup-mark=""
      >
        {showMark ? (
          <Image
            src="/dent-art-mark.png"
            alt={brandMarkAlt}
            fill
            className="object-contain"
            sizes={size === "hero" ? "80px" : "48px"}
            priority
          />
        ) : null}
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "block font-semibold tracking-tight",
            size === "hero" ? "text-3xl sm:text-4xl" : "text-xl",
            wordmarkClassName,
          )}
        >
          Dent Art
        </span>
        {showSlogan ? (
          <span className="hidden text-[11px] italic text-black/70 sm:block">{clinicInfo.slogan}</span>
        ) : null}
      </span>
    </div>
  );
}
