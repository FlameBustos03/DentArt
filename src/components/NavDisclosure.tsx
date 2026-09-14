"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { NavLink } from "@/types";
import { cn } from "@/lib/utils";

export interface NavDisclosureProps {
  label: string;
  href: string;
  items: NavLink[];
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}

export function NavDisclosure({
  label,
  href,
  items,
  variant = "desktop",
  onNavigate,
}: NavDisclosureProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const panelId = useId();
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }

      const focusable = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
      if (focusable.length === 0) {
        return;
      }

      const index = focusable.findIndex((node) => node === document.activeElement);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const next = index < 0 ? 0 : (index + 1) % focusable.length;
        focusable[next].focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        const next = index < 0 ? focusable.length - 1 : (index - 1 + focusable.length) % focusable.length;
        focusable[next].focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        focusable[0].focus();
      } else if (event.key === "End") {
        event.preventDefault();
        focusable[focusable.length - 1].focus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggle = () => setOpen((value) => !value);

  const onButtonKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      window.requestAnimationFrame(() => itemRefs.current[0]?.focus());
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      window.requestAnimationFrame(() => {
        const last = itemRefs.current.filter(Boolean).at(-1);
        last?.focus();
      });
    }
  };

  const panel = (
    <ul className={cn(variant === "desktop" ? "min-w-[12.5rem] py-2" : "flex flex-col gap-2 pt-2")}>
      {items.map((item, index) => (
        <li key={item.id}>
          <Link
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            href={item.href}
            className={cn(
              variant === "desktop"
                ? "block whitespace-nowrap px-4 py-2 text-sm text-ink-900 hover:bg-mist hover:text-lime-800"
                : "block border-b border-[color:var(--border-subtle)] pb-2 font-serif text-xl text-ink-900",
            )}
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={wrapRef} className={cn("relative", variant === "mobile" && "w-full")}>
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          "inline-flex items-center gap-1 text-ink-900 transition-colors hover:text-lime-800",
          variant === "desktop" &&
            "text-sm tracking-wide underline-offset-4 hover:underline",
          variant === "mobile" && "w-full justify-between border-b border-black/10 pb-3 font-serif text-2xl",
          active && "text-lime-800",
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={toggle}
        onKeyDown={onButtonKeyDown}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-panel ease-out motion-reduce:transition-none",
            open && "rotate-180 motion-reduce:rotate-0",
          )}
          aria-hidden="true"
        />
      </button>
      {variant === "desktop" ? (
        <AnimatePresence>
          {open ? (
            <motion.div
              id={panelId}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.16, ease: [0, 0, 0.2, 1] }}
              className="absolute left-0 top-full z-50 mt-3 w-56 rounded-card border border-[color:var(--border-subtle)] bg-white shadow-card"
            >
              {panel}
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : open ? (
        <div id={panelId}>{panel}</div>
      ) : (
        <div id={panelId} hidden>
          {panel}
        </div>
      )}
    </div>
  );
}
