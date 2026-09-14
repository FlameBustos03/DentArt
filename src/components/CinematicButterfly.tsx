"use client";

import { useLayoutEffect, useState, type RefObject } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { brandMarkAlt } from "@/data/mockData";

const SESSION_KEY = "dentart-cinematic-butterfly";
const DURATION = 2.4;
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

  useLayoutEffect(() => {
    const settle = () => {
      onSettled();
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const seen = sessionStorage.getItem(SESSION_KEY) === "1";

    if (reduced || !desktop || seen) {
      settle();
      return;
    }

    const target = targetRef.current;
    const section = target?.closest("section");
    if (!target || !section) {
      settle();
      return;
    }

    const sectionRect = section.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const width = Math.max(64, targetRect.width);
    const height = Math.max(64, targetRect.height);
    const excludes = Array.from(section.querySelectorAll<HTMLElement>("[data-hero-exclude]")).map(
      (el) => {
        const rect = el.getBoundingClientRect();
        return {
          left: rect.left - sectionRect.left - EXCLUSION_PX,
          top: rect.top - sectionRect.top - EXCLUSION_PX,
          right: rect.right - sectionRect.left + EXCLUSION_PX,
          bottom: rect.bottom - sectionRect.top + EXCLUSION_PX,
        };
      },
    );

    const start = ambientStart(section, width, height, excludes);
    const end = {
      x: targetRect.left - sectionRect.left,
      y: targetRect.top - sectionRect.top,
    };

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

  if (!flight) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none absolute z-[5]"
      style={{ width: flight.width, height: flight.height }}
      initial={{ left: flight.start.x, top: flight.start.y, opacity: 1 }}
      animate={{
        left: [flight.start.x, flight.mid.x, flight.end.x],
        top: [flight.start.y, flight.mid.y, flight.end.y],
      }}
      transition={{ duration: DURATION, times: [0, 0.42, 1], ease: [0.22, 0.72, 0.18, 1] }}
      onAnimationComplete={() => {
        sessionStorage.setItem(SESSION_KEY, "1");
        onSettled();
      }}
      aria-hidden="true"
    >
      <span className="relative block h-full w-full">
        <Image
          src="/brand/dent-art-butterfly-d.png"
          alt=""
          fill
          unoptimized
          className="bg-transparent object-contain object-left"
          style={{ backgroundColor: "transparent" }}
          sizes="200px"
        />
      </span>
      <span className="sr-only">{brandMarkAlt}</span>
    </motion.div>
  );
}
