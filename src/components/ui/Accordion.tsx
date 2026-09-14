"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { FAQItem } from "@/types";
import { cn } from "@/lib/utils";

export interface AccordionProps {
  items: FAQItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={cn(
        "divide-y divide-[color:var(--border-subtle)] rounded-card border border-[color:var(--border-subtle)] bg-white shadow-card",
        className,
      )}
    >
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span className="font-serif text-lg text-ink-900 sm:text-xl">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-lime-800 transition-transform duration-panel ease-out motion-reduce:transition-none",
                    isOpen && "rotate-180 motion-reduce:rotate-0",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {reduced ? (
              isOpen ? (
                <div id={panelId} role="region" aria-labelledby={buttonId}>
                  <p className="px-5 pb-5 text-[color:var(--text-body)] sm:px-6">{item.answer}</p>
                </div>
              ) : null
            ) : (
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.16, ease: [0, 0, 0.2, 1] }}
                  >
                    <p className="px-5 pb-5 text-[color:var(--text-body)] sm:px-6">{item.answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </div>
  );
}
