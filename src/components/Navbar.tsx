"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrandLockup } from "@/components/BrandLockup";
import { UtilityBar } from "@/components/UtilityBar";
import { navLinks } from "@/data/mockData";
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
      <UtilityBar />

      <div className="glass-nav">
        <div className="section-x flex h-16 items-center justify-between gap-3">
          <a href="#main-content" className="group min-w-0">
            <BrandLockup size="nav" />
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-8 xl:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="type-nav underline-offset-4 hover:text-lime-800 motion-safe:hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              className="whitespace-nowrap"
              onClick={() => scrollToId("booking")}
            >
              Agendar cita
            </Button>
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
              <span className="sr-only">Abrir menú</span>
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 z-50 xl:hidden">
            <motion.button
              type="button"
              aria-label="Cerrar menú"
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
              aria-label="Navegación"
              className="absolute right-0 top-0 flex h-full w-[min(22rem,92vw)] flex-col bg-mist px-6 py-5 shadow-lift"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="text-2xl font-semibold text-ink-900">Menú</p>
                <Button
                  ref={closeButtonRef}
                  variant="ghost"
                  size="sm"
                  className="!px-2.5"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Cerrar menú</span>
                </Button>
              </div>
              <nav aria-label="Navegación móvil" className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="flex min-h-11 items-center border-b border-black/10 pb-3 font-serif text-2xl text-ink-900 hover:text-lime-800"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <Button
                variant="primary"
                className="mt-6"
                onClick={() => {
                  setOpen(false);
                  scrollToId("booking");
                }}
              >
                Agendar cita
              </Button>
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
