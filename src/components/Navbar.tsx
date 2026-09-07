"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { clinicInfo, navLinks } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { cn, scrollToId } from "@/lib/utils";

export interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const drawer = document.getElementById(drawerId);
      if (!drawer) {
        return;
      }

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const menuButton = menuButtonRef.current;

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [open, drawerId]);

  return (
    <header className={cn("sticky top-0 z-40", className)}>
      <div className="glass-nav">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#main-content" className="group flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-500/50 bg-navy-900 font-serif text-lg text-gold-300">
              D
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-xl text-navy-900">DentArt</span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-teal-600">
                Celebrity VIP Edition
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-sm tracking-wide text-navy-800 transition-colors hover:text-teal-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${clinicInfo.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-white/40 px-3.5 py-2 text-sm text-navy-900 backdrop-blur hover:border-teal-500 hover:text-teal-600"
            >
              <Phone className="h-4 w-4 text-gold-600" aria-hidden="true" />
              <span className="font-medium">VIP Concierge</span>
              <span className="hidden text-stone-500 xl:inline">{clinicInfo.phoneDisplay}</span>
            </a>
            <Button variant="gold" size="sm" onClick={() => scrollToId("booking")}>
              Book VIP Consultation
            </Button>
          </div>

          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="sm"
            className="!px-2.5 xl:hidden"
            aria-expanded={open}
            aria-controls={drawerId}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 z-50 xl:hidden">
            <motion.button
              type="button"
              aria-label="Close navigation overlay"
              className="absolute inset-0 bg-navy-950/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id={drawerId}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="absolute right-0 top-0 flex h-full w-[min(22rem,92vw)] flex-col bg-ivory-50 px-6 py-5 shadow-lift"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="font-serif text-2xl text-navy-900">VIP Menu</p>
                <Button
                  ref={closeButtonRef}
                  variant="ghost"
                  size="sm"
                  className="!px-2.5"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Close navigation menu</span>
                </Button>
              </div>
              <nav aria-label="Mobile primary" className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="border-b border-ivory-300 pb-3 font-serif text-2xl text-navy-900"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <a
                href={`tel:${clinicInfo.phoneTel}`}
                className="mt-8 inline-flex items-center gap-2 text-navy-800"
              >
                <Phone className="h-4 w-4 text-gold-600" aria-hidden="true" />
                VIP Concierge · {clinicInfo.phoneDisplay}
              </a>
              <Button
                variant="gold"
                className="mt-4"
                onClick={() => {
                  setOpen(false);
                  scrollToId("booking");
                }}
              >
                Book VIP Consultation
              </Button>
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
