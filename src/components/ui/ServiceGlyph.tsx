"use client";

import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

export interface ServiceGlyphProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
}

export function ServiceGlyph({ icon: Icon, className }: ServiceGlyphProps) {
  return (
    <span className={cn("service-glyph relative isolate flex h-12 w-12 shrink-0", className)}>
      <span
        aria-hidden="true"
        className="service-glyph-plate absolute inset-0 rotate-6 rounded-2xl bg-lime-500/25"
      />
      <span
        aria-hidden="true"
        className="service-glyph-plate absolute inset-0 -rotate-3 rounded-2xl border border-lime-500/30 bg-ink-900/5"
      />
      <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-lime-500/55 bg-white shadow-lime">
        <Icon className="h-5 w-5 text-lime-600" aria-hidden="true" />
      </span>
    </span>
  );
}
