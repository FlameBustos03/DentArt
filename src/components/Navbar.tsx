"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
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
          <a href="#main-content" className="group flex min-w-0 items-center gap-2">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full sm:h-11 sm:w-11 lg:h-12 lg:w-12">
              {/* The mark PNG is an opaque square with charcoal corners; the round mask + zoom shows only the badge. */}
              <Image
                src="/dent-art-mark.png"
                alt=""
                fill
                className="scale-110 object-cover"
                sizes="(min-width: 1024px) 48px, (min-width: 640px) 44px, 40px"
                priority
              />
            </span>
            <span className="leading-tight">
              <span className="block text-xl font-semibold tracking-tight text-ink-900">Dent Art</span>
              <span className="hidden text-[11px] italic text-black/70 sm:block">{clinicInfo.slogan}</span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-sm tracking-wide text-ink-900 underline-offset-4 transition-colors hover:text-lime-800 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${clinicInfo.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-2 text-sm text-ink-900 hover:border-lime-800"
            >
              <Phone className="h-4 w-4 text-lime-800" aria-hidden="true" />
              <span className="font-medium">Concierge</span>
              <span className="hidden text-black/60 xl:inline">{clinicInfo.phoneDisplay}</span>
            </a>
            <Button variant="primary" size="sm" onClick={() => scrollToId("booking")}>
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
              className="absolute inset-0 bg-ink-900/50"
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
              className="absolute right-0 top-0 flex h-full w-[min(22rem,92vw)] flex-col bg-white px-6 py-5 shadow-lift"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="text-2xl font-semibold text-ink-900">Menu</p>
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
                    className="border-b border-black/10 pb-3 font-serif text-2xl text-ink-900"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <p className="mt-6 italic text-black/70">{clinicInfo.slogan}</p>
              <a
                href={`tel:${clinicInfo.phoneTel}`}
                className="mt-4 inline-flex items-center gap-2 text-ink-900 hover:text-lime-800"
              >
                <Phone className="h-4 w-4 text-lime-800" aria-hidden="true" />
                Concierge · {clinicInfo.phoneDisplay}
              </a>
              <Button
                variant="primary"
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
