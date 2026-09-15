"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before the entrance starts (used to stagger siblings). */
  delay?: number;
  /** Distance in px the block rises while fading in. */
  y?: number;
  /** Portion of the element that must be visible before revealing. */
  amount?: number;
}

/**
 * Scroll-triggered fade-up. Follows the ServicesCatalog pattern: under
 * prefers-reduced-motion the content renders in place with no transition.
 */
export function Reveal({ children, className, delay = 0, y = 16, amount = 0.2 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
