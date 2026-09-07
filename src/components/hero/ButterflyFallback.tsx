"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export interface ButterflyFallbackProps {
  className?: string;
}

export function ButterflyFallback({ className }: ButterflyFallbackProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={cn("pointer-events-none relative flex h-full w-full items-center justify-center", className)}
      aria-hidden="true"
    >
      <motion.div
        className="relative"
        animate={
          reduced
            ? undefined
            : {
                y: [0, -12, 0],
                rotate: [-6, 6, -6],
              }
        }
        transition={
          reduced
            ? undefined
            : { duration: 5.4, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <span className="absolute inset-[-18%] rounded-full bg-lime-500/25 blur-2xl" />
        <span className="relative block h-36 w-36 overflow-hidden rounded-full border border-lime-500/50 bg-white shadow-lime sm:h-44 sm:w-44">
          <Image
            src="/dent-art-mark.png"
            alt=""
            fill
            className="object-cover"
            sizes="176px"
          />
        </span>
      </motion.div>
    </div>
  );
}
