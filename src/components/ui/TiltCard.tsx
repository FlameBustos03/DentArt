"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

const RESTING: CSSProperties = {
  transform: "translateY(0)",
};

export function TiltCard({ children, className, maxTilt = 0 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [transform, setTransform] = useState<CSSProperties>(RESTING);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (reduced || !desktop) {
        return;
      }
      const node = ref.current;
      if (!node) {
        return;
      }
      if (maxTilt > 0) {
        const rect = node.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * maxTilt * 2;
        const rotateX = (0.5 - py) * maxTilt * 2;
        setTransform({
          transform: `perspective(920px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`,
        });
      }
      setLit(true);
    },
    [desktop, maxTilt, reduced],
  );

  const onPointerLeave = useCallback(() => {
    setTransform(RESTING);
    setLit(false);
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "tilt-card card-lift relative h-full will-change-transform",
        lit && !reduced && "tilt-card--lit",
        reduced && "border border-transparent hover:border-black/10",
        className,
      )}
      style={reduced || !desktop ? undefined : maxTilt > 0 ? transform : undefined}
    >
      <div className="relative h-full">{children}</div>
    </div>
  );
}
