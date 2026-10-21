"use client";

import type { ReactNode } from "react";
import { PRIVACY_NOTICE_HREF } from "@/lib/privacyNotice";

export function PrivacyNoticeLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a
      href={PRIVACY_NOTICE_HREF}
      className={className}
      onClick={(event) => {
        if (window.location.pathname !== "/") {
          return;
        }
        if (window.location.hash === "#aviso-privacidad") {
          event.preventDefault();
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        }
      }}
    >
      {children}
    </a>
  );
}
