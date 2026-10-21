import { PRIVACY_NOTICE_VERSION } from "@/lib/privacyNotice";

/**
 * Cookie choice for this browser.
 *
 * Stored at `dentart.cookie-consent` as JSON:
 * `{ version, choice, timestamp, categories }`.
 *
 * - `version` must equal `PRIVACY_NOTICE_VERSION`. A different version, or
 *   storage that throws or does not match this shape, is treated as "no
 *   choice" and the banner is shown again.
 * - `choice: "accepted"` sets `categories.analytics` to true.
 *   `choice: "rejected"` sets it to false.
 * - `categories.necessary` is always true. Technical cookies do not wait
 *   for the banner.
 *
 * Nothing in the site loads Google Analytics, a Meta Pixel, or any other
 * optional tag. `<ConsentGate category="analytics">` is the only place those
 * scripts should be mounted later, and it stays closed until Accept is
 * stored for the current notice version.
 */
export const COOKIE_CONSENT_STORAGE_KEY = "dentart.cookie-consent";

export type CookieConsentChoice = "accepted" | "rejected";

export type CookieConsentCategory = "necessary" | "analytics";

export type CookieConsentRecord = {
  version: string;
  choice: CookieConsentChoice;
  /** ISO-8601 instant of the visitor's choice. */
  timestamp: string;
  categories: {
    necessary: true;
    analytics: boolean;
  };
};

export function allowsCategory(
  record: CookieConsentRecord | null,
  category: CookieConsentCategory,
): boolean {
  if (category === "necessary") {
    return true;
  }
  return record?.categories.analytics === true && record.version === PRIVACY_NOTICE_VERSION;
}

export function parseCookieConsent(raw: string | null): CookieConsentRecord | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    const record = parsed as Partial<CookieConsentRecord>;
    if (record.version !== PRIVACY_NOTICE_VERSION) {
      return null;
    }
    if (record.choice !== "accepted" && record.choice !== "rejected") {
      return null;
    }
    if (typeof record.timestamp !== "string" || record.timestamp.length === 0) {
      return null;
    }

    const analytics = record.categories?.analytics;
    const necessary = record.categories?.necessary;
    if (necessary !== true || typeof analytics !== "boolean") {
      return null;
    }
    if (analytics !== (record.choice === "accepted")) {
      return null;
    }

    return {
      version: record.version,
      choice: record.choice,
      timestamp: record.timestamp,
      categories: { necessary: true, analytics },
    };
  } catch {
    return null;
  }
}

export function createCookieConsent(choice: CookieConsentChoice, now = new Date()): CookieConsentRecord {
  return {
    version: PRIVACY_NOTICE_VERSION,
    choice,
    timestamp: now.toISOString(),
    categories: {
      necessary: true,
      analytics: choice === "accepted",
    },
  };
}

/** Returns null when storage is missing, unreadable, or for another notice version. */
export function readCookieConsent(): CookieConsentRecord | null {
  try {
    return parseCookieConsent(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function writeCookieConsent(choice: CookieConsentChoice, now = new Date()): CookieConsentRecord {
  const record = createCookieConsent(choice, now);
  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Private mode or a blocked store: keep the choice in memory for this
    // visit. The next load has nothing to read, so the banner returns.
  }
  return record;
}
