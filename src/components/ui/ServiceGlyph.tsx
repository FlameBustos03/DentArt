"use client";

import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

export interface ServiceGlyphProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
}

export function ServiceGlyph({ icon: Icon, className }: ServiceGlyphProps) {
  return (
    <span
      className={cn(
        "service-glyph relative isolate flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mist",
        className,
      )}
    >
      <Icon className="h-5 w-5 text-lime-800" aria-hidden="true" />
    </span>
  );
}
