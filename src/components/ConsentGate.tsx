"use client";

import type { ReactNode } from "react";
import { useCookieConsent } from "@/components/CookieConsentProvider";
import { allowsCategory, type CookieConsentCategory } from "@/lib/cookieConsent";

export interface ConsentGateProps {
  category: CookieConsentCategory;
  children: ReactNode;
}

/**
 * Renders `children` only when the visitor has allowed `category`.
 *
 * Dent Art does not load analytics or advertising pixels. When Google
 * Analytics or a Meta Pixel is added, mount it only inside this gate so it
 * cannot run before Aceptar:
 *
 * ```tsx
 * <ConsentGate category="analytics">
 *   <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXX" strategy="afterInteractive" />
 * </ConsentGate>
 * ```
 *
 * ```tsx
 * <ConsentGate category="analytics">
 *   <Script id="meta-pixel" strategy="afterInteractive">{`fbq('init', '…')`}</Script>
 * </ConsentGate>
 * ```
 *
 * `necessary` renders immediately and does not wait for the banner.
 * Rechazar, a missing choice, another `PRIVACY_NOTICE_VERSION`, or
 * unreadable storage all keep `analytics` closed. Before the client has
 * read storage, optional categories render nothing.
 */
export function ConsentGate({ category, children }: ConsentGateProps) {
  const { ready, consent } = useCookieConsent();

  if (category === "necessary") {
    return children;
  }

  if (!ready || !allowsCategory(consent, category)) {
    return null;
  }

  return children;
}
