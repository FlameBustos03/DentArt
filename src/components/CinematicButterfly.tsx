"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const SESSION_KEY = "dentart-cinematic-butterfly";
const DURATION = 2.4;
/** Matches `motion-safe:duration-300` on the BrandLockup image. */
const LOCKUP_FADE_MS = 320;
const EXCLUSION_PX = 24;

interface Point {
  x: number;
  y: number;
}

interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface CinematicButterflyProps {
  targetRef: RefObject<HTMLElement | null>;
  onSettled: () => void;
}

function overlaps(a: Box, b: Box): boolean {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function boxAt(x: number, y: number, width: number, height: number): Box {
  return { left: x, top: y, right: x + width, bottom: y + height };
}

/**
 * Layout box of `el` relative to `section`, walking the offsetParent chain.
 * Unlike getBoundingClientRect this ignores CSS transforms, so measuring while
 * the hero copy is still mid fly-in (translateY) yields the resting position.
 */
function layoutBox(el: HTMLElement, section: HTMLElement): Box {
  let left = 0;
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && node !== section) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  if (!node) {
    const rect = el.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    left = rect.left - sectionRect.left;
    top = rect.top - sectionRect.top;
  }
  return { left, top, right: left + el.offsetWidth, bottom: top + el.offsetHeight };
}

function readSeen(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen(): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Storage may be unavailable (privacy mode); the flight simply replays next load.
  }
}

function ambientStart(section: HTMLElement, width: number, height: number, excludes: Box[]): Point {
  const sectionRect = section.getBoundingClientRect();
  const desktop = window.matchMedia("(min-width: 1024px)").matches;
  const edge = desktop ? 24 : 16;
  const minY = 16;
  let x = Math.max(edge, sectionRect.width - width - edge);
  let y = desktop ? 88 : 32;

  const resolve = (candidate: Box) => excludes.find((exclude) => overlaps(candidate, exclude));

  for (let pass = 0; pass < 8; pass += 1) {
    const hit = resolve(boxAt(x, y, width, height));
    if (!hit) {
      break;
    }
    const rightOf = hit.right;
    if (rightOf + width <= sectionRect.width - 8 && !resolve(boxAt(rightOf, y, width, height))) {
      x = rightOf;
      continue;
    }
    const above = hit.top - height;
    if (above >= minY && !resolve(boxAt(x, above, width, height))) {
      y = above;
      continue;
    }
    x = Math.max(edge, sectionRect.width - width - edge);
    y = Math.max(minY, desktop ? 88 : 32);
  }

  return { x, y };
}

function pathClearsExcludes(
  start: Point,
  mid: Point,
  end: Point,
  excludes: Box[],
  width: number,
  height: number,
): boolean {
  for (let i = 0; i <= 12; i += 1) {
    const t = i / 12;
    const inv = 1 - t;
    const x = inv * inv * start.x + 2 * inv * t * mid.x + t * t * end.x;
    const y = inv * inv * start.y + 2 * inv * t * mid.y + t * t * end.y;
    const fly = boxAt(x, y, width, height);
    if (excludes.some((exclude) => overlaps(fly, exclude))) {
      return false;
    }
  }
  return true;
}

export function CinematicButterfly({ targetRef, onSettled }: CinematicButterflyProps) {
  const [flight, setFlight] = useState<{
    start: Point;
    mid: Point;
    end: Point;
    width: number;
    height: number;
  } | null>(null);
  const [landed, setLanded] = useState(false);
  const landTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (landTimer.current !== undefined) {
        window.clearTimeout(landTimer.current);
      }
    };
  }, []);

  // A passive effect (not a layout effect) so the dock ref, which sits later in
  // the tree, is already attached when we measure.
  useEffect(() => {
    const settle = () => {
      onSettled();
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;

    if (reduced || !desktop || readSeen()) {
      settle();
      return;
    }

    const target = targetRef.current;
    const section = target?.closest("section");
    if (!target || !section) {
      settle();
      return;
    }

    const targetBox = layoutBox(target, section);
    const width = Math.max(64, targetBox.right - targetBox.left);
    const height = Math.max(64, targetBox.bottom - targetBox.top);
    const excludes = Array.from(section.querySelectorAll<HTMLElement>("[data-hero-exclude]")).map(
      (el) => {
        const box = layoutBox(el, section);
        return {
          left: box.left - EXCLUSION_PX,
          top: box.top - EXCLUSION_PX,
          right: box.right + EXCLUSION_PX,
          bottom: box.bottom + EXCLUSION_PX,
        };
      },
    );

    const start = ambientStart(section, width, height, excludes);
    const end = { x: targetBox.left, y: targetBox.top };

    let mid: Point = {
      x: (start.x + end.x) / 2,
      y: Math.min(start.y, end.y) - 48,
    };

    for (let lift = 0; lift < 6 && !pathClearsExcludes(start, mid, end, excludes, width, height); lift += 1) {
      mid = { x: mid.x, y: Math.max(8, mid.y - 36) };
    }

    if (!pathClearsExcludes(start, mid, end, excludes, width, height)) {
      mid = { x: (start.x + end.x) / 2, y: 12 };
    }

    setFlight({ start, mid, end, width, height });
  }, [onSettled, targetRef]);

  // Once landed the lockup's own butterfly takes over; unmount so the two never
  // stack (a sub-pixel mismatch would otherwise read as a blurred double mark).
  if (!flight || landed) {
    return null;
  }

  // Above the hero copy (z-10): the flyer must stay visible while it crosses
  // the plate to dock, otherwise it slides underneath and vanishes. The
  // rounding matches the plate's corners so the docked crop is seamless.
  return (
    <motion.div
      className="pointer-events-none absolute z-20 overflow-hidden rounded-2xl"
      style={{ width: flight.width, height: flight.height }}
      initial={{ left: flight.start.x, top: flight.start.y, opacity: 1 }}
      animate={{
        left: [flight.start.x, flight.mid.x, flight.end.x],
        top: [flight.start.y, flight.mid.y, flight.end.y],
      }}
      transition={{ duration: DURATION, times: [0, 0.42, 1], ease: [0.22, 0.72, 0.18, 1] }}
      onAnimationComplete={() => {
        markSeen();
        onSettled();
        // Keep the flyer for the lockup's fade-in so the mark never dips.
        landTimer.current = window.setTimeout(() => setLanded(true), LOCKUP_FADE_MS);
      }}
      aria-hidden="true"
    >
      <span className="relative block h-full w-full">
        <Image
          src="/brand/dent-art-butterfly-d.png"
          alt=""
          fill
          className="object-contain object-left"
          sizes="200px"
          priority
        />
      </span>
    </motion.div>
  );
}
