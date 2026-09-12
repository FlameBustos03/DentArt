export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function scrollToId(id: string): void {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  // Move the sequential-focus starting point with the viewport so keyboard and
  // screen-reader users continue from the destination, not from the trigger.
  if (target.hasAttribute("tabindex")) {
    target.focus({ preventScroll: true });
  }
}

/**
 * A dialog/drawer should hand focus back to its opener only when focus is still
 * inside it (or was dropped to body on unmount). If an action inside the dialog
 * already moved focus elsewhere—e.g. a CTA that scrolls to another section—
 * restoring to the opener would pull keyboard users back off-screen.
 */
export function shouldRestoreFocus(container: HTMLElement | null): boolean {
  const active = document.activeElement;
  if (!active || active === document.body) {
    return true;
  }
  return Boolean(container?.contains(active));
}

export function buildWhatsAppUrl(phoneDigits: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneDigits}?text=${encoded}`;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}
