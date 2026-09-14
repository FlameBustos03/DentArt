"use client";

import { useClinicLocation } from "@/components/LocationProvider";
import type { LocationId } from "@/types";
import { cn } from "@/lib/utils";

export interface LocationSwitchProps {
  className?: string;
  tone?: "hero" | "light" | "dark";
}

export function LocationSwitch({ className, tone = "light" }: LocationSwitchProps) {
  const { locationId, locations, setLocationId } = useClinicLocation();
  const dark = tone === "hero" || tone === "dark";

  return (
    <div
      role="radiogroup"
      aria-label="Sede"
      className={cn(
        "inline-flex rounded-full border p-1",
        dark ? "border-white/20 bg-black/30" : "border-black/10 bg-white",
        className,
      )}
    >
      {locations.map((location) => {
        const selected = location.id === locationId;
        return (
          <button
            key={location.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setLocationId(location.id as LocationId)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm transition-colors",
              selected
                ? dark
                  ? "bg-lime-500 text-ink-900"
                  : "bg-lime-500 text-ink-900"
                : dark
                  ? "text-white/85 hover:text-white"
                  : "text-ink-800 hover:text-ink-900",
            )}
          >
            {location.city}
          </button>
        );
      })}
    </div>
  );
}
