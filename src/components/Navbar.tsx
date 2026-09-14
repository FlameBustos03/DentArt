"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrandLockup } from "@/components/BrandLockup";
import { NavDisclosure } from "@/components/NavDisclosure";
import { UtilityBar } from "@/components/UtilityBar";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { bookingHref, navLinks, serviciosNavItems } from "@/data/mockData";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const agendarHref = bookingHref(pathname);

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
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/" className="group min-w-0">
            <BrandLockup size="nav" />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-6 xl:flex">
            {navLinks.map((link) =>
              link.id === "servicios" ? (
                <NavDisclosure
                  key={link.id}
                  label={link.label}
                  href={link.href}
                  items={serviciosNavItems}
                />
              ) : (
                <Link
                  key={link.id}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={cn(
                    "text-sm tracking-wide text-ink-900 underline-offset-4 transition-colors hover:text-lime-800 hover:underline",
                    pathname === link.href && "text-lime-800",
                  )}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href={agendarHref} variant="primary" size="sm" className="whitespace-nowrap">
              Agendar
            </ButtonLink>
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
                {navLinks.map((link) =>
                  link.id === "servicios" ? (
                    <NavDisclosure
                      key={link.id}
                      label={link.label}
                      href={link.href}
                      items={serviciosNavItems}
                      variant="mobile"
                      onNavigate={() => setOpen(false)}
                    />
                  ) : (
                    <Link
                      key={link.id}
                      href={link.href}
                      className="border-b border-black/10 pb-3 font-serif text-2xl text-ink-900"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </nav>
              <ButtonLink href={agendarHref} variant="primary" className="mt-6" onClick={() => setOpen(false)}>
                Agendar
              </ButtonLink>
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
