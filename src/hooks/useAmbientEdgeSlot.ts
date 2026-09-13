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
 * Layout-space box of `el` relative to `section`, padded by the exclusion gap.
 * Uses the offsetParent chain instead of getBoundingClientRect so Framer's
 * entrance transforms (translateY 18–24px) don't skew the measurement taken
 * before the animation settles.
 */
function exclusionBox(el: HTMLElement, section: HTMLElement): Box {
  let left = 0;
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && node !== section) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }

  if (node !== section) {
    const rect = el.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    left = rect.left - sectionRect.left;
    top = rect.top - sectionRect.top;
  }

  return {
    left: left - EXCLUSION_PX,
    top: top - EXCLUSION_PX,
    right: left + el.offsetWidth + EXCLUSION_PX,
    bottom: top + el.offsetHeight + EXCLUSION_PX,
  };
}

/**
 * Parks the decorative butterfly in the hero's ambient edge and keeps a 24px
 * gap from the eyebrow, slogan, body copy, CTAs, and the credentials card.
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
      const sectionWidth = section.clientWidth;
      const width = slot.offsetWidth || 80;
      const height = slot.offsetHeight || 80;
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const edge = desktop ? 24 : 16;
      const minY = 12;
      const preferredTop = desktop ? 88 : 32;

      let x = Math.max(edge, sectionWidth - width - edge);
      let y = preferredTop;

      const excludes = Array.from(
        section.querySelectorAll<HTMLElement>("[data-hero-exclude]"),
      ).map((el) => exclusionBox(el, section));

      const resolve = (candidate: Box) =>
        excludes.find((exclude) => overlaps(candidate, exclude));

      for (let pass = 0; pass < 8; pass += 1) {
        const hit = resolve(boxAt(x, y, width, height));
        if (!hit) {
          break;
        }

        const rightOf = hit.right;
        if (rightOf + width <= sectionWidth - 8 && !resolve(boxAt(rightOf, y, width, height))) {
          x = rightOf;
          continue;
        }

        const above = hit.top - height;
        if (above >= minY && !resolve(boxAt(x, above, width, height))) {
          y = above;
          continue;
        }

        // No collision-free slot: hug the top edge so the mark sits as far from
        // the copy as the section allows instead of parking on top of it.
        x = Math.max(edge, sectionWidth - width - edge);
        y = Math.max(minY, Math.min(preferredTop, above));
        break;
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
