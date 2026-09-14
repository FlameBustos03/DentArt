"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ButterflyFallbackProps {
  className?: string;
}

export function ButterflyFallback({ className }: ButterflyFallbackProps) {
  return (
    <div
      className={cn(
        "pointer-events-none relative flex h-full w-full items-center justify-center",
        className,
      )}
      aria-hidden="true"
    >
      <span className="relative block h-14 w-14 overflow-hidden rounded-full sm:h-16 sm:w-16 md:h-20 md:w-20">
        <Image
          src="/dent-art-mark.png"
          alt=""
          fill
          className="scale-110 object-cover"
          sizes="80px"
        />
      </span>
    </div>
  );
}
