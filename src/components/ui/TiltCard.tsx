"use client";

import { useCallback, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

const RESTING: CSSProperties = {
  transform: "perspective(920px) rotateX(0deg) rotateY(0deg) translateZ(0)",
};

export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [transform, setTransform] = useState<CSSProperties>(RESTING);
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (reduced) {
        return;
      }
      const node = ref.current;
      if (!node) {
        return;
      }
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - py) * maxTilt * 2;
      setTransform({
        transform: `perspective(920px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`,
      });
      setGlow({ x: px * 100, y: py * 100, active: true });
    },
    [maxTilt, reduced],
  );

  const onPointerLeave = useCallback(() => {
    setTransform(RESTING);
    setGlow({ x: 50, y: 50, active: false });
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "tilt-card relative h-full transition-[transform,box-shadow] duration-200 will-change-transform",
        glow.active && "tilt-card--lit",
        className,
      )}
      style={transform}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200",
          glow.active && "opacity-100",
        )}
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(46, 204, 113, 0.08), transparent 58%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
