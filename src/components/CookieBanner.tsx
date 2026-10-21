"use client";

import { useLayoutEffect, useRef } from "react";
import { PrivacyNoticeLink } from "@/components/PrivacyNoticeLink";
import { useCookieConsent } from "@/components/CookieConsentProvider";

const CHOICE_BUTTON =
  "inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-ink-900 bg-white px-4 py-2 text-sm font-medium text-ink-900 hover:bg-mist";

/** Tells the emergency chip how far to sit above this banner. */
export const COOKIE_BANNER_OFFSET_PROPERTY = "--cookie-banner-offset";

/**
 * Fixed bottom notice. Not a dialog: no focus trap, no autofocus, and it
 * does not block the page. Both choices use the same button styles.
 */
export function CookieBanner() {
  const { bannerVisible, accept, reject } = useCookieConsent();
  const regionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const region = regionRef.current;
    if (!bannerVisible || !region) {
      document.documentElement.style.removeProperty(COOKIE_BANNER_OFFSET_PROPERTY);
      return;
    }

    const apply = () => {
      document.documentElement.style.setProperty(COOKIE_BANNER_OFFSET_PROPERTY, `${region.offsetHeight}px`);
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(region);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty(COOKIE_BANNER_OFFSET_PROPERTY);
    };
  }, [bannerVisible]);

  if (!bannerVisible) {
    return null;
  }

  return (
    <div
      ref={regionRef}
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-ink-900 bg-white text-ink-900 shadow-lift"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        paddingLeft: "env(safe-area-inset-left, 0px)",
        paddingRight: "env(safe-area-inset-right, 0px)",
      }}
    >
      <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="min-w-0 text-sm leading-6 text-ink-900">
          Este sitio solo usa cookies técnicas para funcionar. No hay analítica ni píxeles. Aceptar o
          rechazar guarda tu elección sobre cookies opcionales.{" "}
          <PrivacyNoticeLink className="inline-flex min-h-11 items-center font-medium text-lime-800 underline decoration-2 underline-offset-4">
            Aviso de Privacidad
          </PrivacyNoticeLink>
        </p>
        <div className="grid min-w-0 grid-cols-2 gap-2 sm:w-72 sm:shrink-0">
          <button type="button" className={CHOICE_BUTTON} onClick={accept}>
            Aceptar
          </button>
          <button type="button" className={CHOICE_BUTTON} onClick={reject}>
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}
