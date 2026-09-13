"use client";

import { useLayoutEffect, type RefObject } from "react";

const EXCLUSION_PX = 24;

interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

function overlaps(a: Box, b: Box): boolean {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function boxAt(x: number, y: number, width: number, height: number): Box {
  return { left: x, top: y, right: x + width, bottom: y + height };
}

/**
 * Parks the decorative butterfly in the hero's ambient edge and keeps a 24px
 * gap from slogan, body copy, CTAs, and the credentials card.
 */
export function useAmbientEdgeSlot(
  slotRef: RefObject<HTMLElement | null>,
  layoutKey: string,
) {
  useLayoutEffect(() => {
    const slot = slotRef.current;
    if (!slot) {
      return;
    }

    const section = slot.closest("section");
    if (!section) {
      return;
    }

    const place = () => {
      const sectionRect = section.getBoundingClientRect();
      const width = slot.offsetWidth || 80;
      const height = slot.offsetHeight || 80;
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const edge = desktop ? 24 : 16;
      const preferredTop = desktop ? 88 : 20;

      let x = Math.max(edge, sectionRect.width - width - edge);
      let y = preferredTop;

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

      const resolve = (candidate: Box) =>
        excludes.find((exclude) => overlaps(candidate, exclude));

      for (let pass = 0; pass < 8; pass += 1) {
        const hit = resolve(boxAt(x, y, width, height));
        if (!hit) {
          break;
        }

        const above = hit.top - height;
        if (above >= 8 && !resolve(boxAt(x, above, width, height))) {
          y = above;
          continue;
        }

        const rightOf = hit.right;
        if (rightOf + width <= sectionRect.width - 8 && !resolve(boxAt(rightOf, y, width, height))) {
          x = rightOf;
          continue;
        }

        x = Math.max(8, sectionRect.width - width - 8);
        y = 8;
      }

      slot.style.right = "auto";
      slot.style.left = `${Math.round(x)}px`;
      slot.style.top = `${Math.round(y)}px`;
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(section);
    window.addEventListener("resize", place);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [slotRef, layoutKey]);
}
