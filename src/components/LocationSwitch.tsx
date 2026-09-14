"use client";

import { useRef, type KeyboardEvent } from "react";
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
  const buttonRefs = useRef<Partial<Record<LocationId, HTMLButtonElement | null>>>({});

  // Radio-group keyboard contract: arrows move selection, Tab enters/leaves the group.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % locations.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + locations.length) % locations.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = locations.length - 1;
    }
    if (nextIndex === null) {
      return;
    }
    event.preventDefault();
    const next = locations[nextIndex];
    setLocationId(next.id);
    buttonRefs.current[next.id]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Sede"
      className={cn(
        "flex w-full rounded-full border p-1 sm:inline-flex sm:w-auto",
        dark ? "border-white/20 bg-black/30" : "border-black/10 bg-white",
        className,
      )}
    >
      {locations.map((location, index) => {
        const selected = location.id === locationId;
        return (
          <button
            key={location.id}
            ref={(node) => {
              buttonRefs.current[location.id] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => setLocationId(location.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "min-h-11 min-w-[44px] flex-1 rounded-full px-3.5 py-1.5 text-sm transition-colors sm:flex-none",
              selected
                ? "bg-lime-500 text-ink-900"
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
