"use client";

import { useId, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Siren } from "lucide-react";
import { useCookieConsent } from "@/components/CookieConsentProvider";
import { useClinicLocation } from "@/components/LocationProvider";
import { clinicInfo, emergencyPrefillMessage } from "@/data/mockData";
import { buildWhatsAppUrl } from "@/lib/utils";

const HERO_EMERGENCY_ID = "hero-emergency";
/** The closed chip is a 56px circle; below sm the label is screen-reader only. */
const FAB_SIZE_PX = 56;
const FAB_INSET_PX = 16;
const NARROW_FAB_QUERY = "(max-width: 390px)";

function intersects(
  a: { left: number; right: number; top: number; bottom: number },
  b: { left: number; right: number; top: number; bottom: number },
) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function readBannerHeight() {
  const banner = document.querySelector<HTMLElement>('[aria-label="Aviso de cookies"]');
  return banner?.offsetHeight ?? 0;
}

function readSafeAreaBottom() {
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:fixed;visibility:hidden;pointer-events:none;padding-bottom:env(safe-area-inset-bottom,0px)";
  document.body.appendChild(probe);
  const value = Number.parseFloat(getComputedStyle(probe).paddingBottom) || 0;
  probe.remove();
  return value;
}

/**
 * Closed-chip box matching the FAB's bottom formula. Banner height already
 * includes its safe-area padding, so a visible banner wins over the inset.
 */
function predictedChipBox(bannerHeight: number, safeArea: number) {
  const fabRight = window.innerWidth - FAB_INSET_PX;
  const fabBottom = window.innerHeight - FAB_INSET_PX - Math.max(bannerHeight, safeArea);
  return {
    left: fabRight - FAB_SIZE_PX,
    right: fabRight,
    top: fabBottom - FAB_SIZE_PX,
    bottom: fabBottom,
  };
}

/**
 * On a 320–390px screen the fixed chip sits on the right end of the hero
 * WhatsApp button. Hide it only while those rectangles intersect, with the
 * banner up or dismissed. Wider screens keep the chip.
 */
function useHeroFabClearance(bannerVisible: boolean, open: boolean) {
  const [suppressed, setSuppressed] = useState(false);

  useLayoutEffect(() => {
    const narrow = window.matchMedia(NARROW_FAB_QUERY);
    let safeArea = readSafeAreaBottom();

    const measure = () => {
      const hero = document.getElementById(HERO_EMERGENCY_ID);
      if (!hero || !narrow.matches) {
        setSuppressed(false);
        return;
      }
      const heroRect = hero.getBoundingClientRect();
      const bannerHeight = readBannerHeight();
      const chipOverlaps = intersects(heroRect, predictedChipBox(bannerHeight, safeArea));
      let next = chipOverlaps;
      if (!chipOverlaps && open) {
        const fab = document.querySelector<HTMLElement>("[data-emergency-fab]");
        const fabRect = fab?.getBoundingClientRect();
        const panelTop = window.innerHeight - FAB_INSET_PX - Math.max(bannerHeight, safeArea) - FAB_SIZE_PX - 280;
        next = fabRect ? intersects(heroRect, fabRect) : heroRect.bottom > panelTop && heroRect.top < window.innerHeight;
      }
      setSuppressed((current) => (current === next ? current : next));
    };

    const onResize = () => {
      safeArea = readSafeAreaBottom();
      measure();
    };

    measure();
    const hero = document.getElementById(HERO_EMERGENCY_ID);
    const observer = hero ? new IntersectionObserver(measure, { threshold: [0, 0.25, 0.5, 1] }) : null;
    if (hero && observer) observer.observe(hero);
    const frame = requestAnimationFrame(measure);
    narrow.addEventListener("change", onResize);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      narrow.removeEventListener("change", onResize);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", onResize);
    };
  }, [bannerVisible, open]);

  return suppressed;
}

export function EmergencyFab() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const { location } = useClinicLocation();
  const { bannerVisible } = useCookieConsent();
  const suppressed = useHeroFabClearance(bannerVisible, open);

  useLayoutEffect(() => {
    if (suppressed) setOpen(false);
  }, [suppressed]);
  const whatsappHref = buildWhatsAppUrl(
    clinicInfo.whatsappNumber,
    `${emergencyPrefillMessage} ${location.city}.`,
  );

  // First render stays visible so SSR and hydration match; layout effect
  // hides the chip before paint when it would cover the hero button.
  if (suppressed) {
    return null;
  }

  // z-30: above the cookie banner (z-20) and below the sticky header (z-40),
  // so the mobile drawer and the z-50 modals cover the chip. A non-zero
  // offset already includes the banner's safe-area padding; max() keeps the
  // inset when the offset is 0px.
  return (
    <div
      data-emergency-fab
      className="fixed z-30 flex flex-col items-end gap-3"
      style={{
        right: "max(1rem, env(safe-area-inset-right, 0px))",
        bottom: "calc(1rem + max(var(--cookie-banner-offset, 0px), env(safe-area-inset-bottom, 0px)))",
      }}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-label="Opciones de urgencia"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="w-72 rounded-2xl border border-lime-500/40 bg-white p-4 shadow-lift"
          >
            <p className="font-serif text-xl text-ink-900">Urgencia</p>
            <p className="mt-1 text-sm text-black/70">
              WhatsApp o llamada al {clinicInfo.phoneDisplay}. Si hay trauma grave o compromiso de
              vía aérea, acude a urgencias hospitalarias.
            </p>
            <a
              href={`tel:${clinicInfo.phoneTel}`}
              className="mt-4 flex items-center justify-between rounded-xl bg-ink-900 px-4 py-3 text-sm text-white"
            >
              Llamar {clinicInfo.phoneDisplay}
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center justify-center rounded-xl border border-lime-600 bg-lime-500 px-4 py-3 text-sm text-ink-900"
            >
              WhatsApp de urgencia
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-14 w-14 items-center justify-center gap-0 rounded-full bg-lime-500 text-sm uppercase tracking-[0.12em] text-ink-900 sm:w-auto sm:gap-2 sm:px-5"
      >
        <Siren className="h-5 w-5 text-ink-900" aria-hidden="true" />
        <span className="hidden sm:inline">Urgencia</span>
        <span className="sr-only sm:hidden">Abrir opciones de urgencia</span>
      </button>
    </div>
  );
}
