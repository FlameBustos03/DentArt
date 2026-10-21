"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentRecord,
} from "@/lib/cookieConsent";

export type CookieConsentValue = {
  /** False until the client has read localStorage. Matches the server render. */
  ready: boolean;
  /** Null when the visitor has not chosen, or the stored choice is unusable. */
  consent: CookieConsentRecord | null;
  bannerVisible: boolean;
  accept: () => void;
  reject: () => void;
};

const CookieConsentContext = createContext<CookieConsentValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<CookieConsentRecord | null>(null);

  // useLayoutEffect so the banner decision lands before paint: the server
  // and the first client render both hide it (no hydration mismatch), and
  // the visitor does not see a flash of the page without the banner.
  useLayoutEffect(() => {
    setConsent(readCookieConsent());
    setReady(true);
  }, []);

  const accept = useCallback(() => {
    setConsent(writeCookieConsent("accepted"));
  }, []);

  const reject = useCallback(() => {
    setConsent(writeCookieConsent("rejected"));
  }, []);

  const value = useMemo<CookieConsentValue>(
    () => ({
      ready,
      consent: ready ? consent : null,
      bannerVisible: ready && consent === null,
      accept,
      reject,
    }),
    [accept, consent, ready, reject],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent(): CookieConsentValue {
  const value = useContext(CookieConsentContext);
  if (!value) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return value;
}
