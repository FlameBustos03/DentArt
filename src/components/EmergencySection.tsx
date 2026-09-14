"use client";

import { Phone } from "lucide-react";
import { clinicInfo, emergencyPrefillMessage } from "@/data/mockData";
import { buildWhatsAppUrl } from "@/lib/utils";

export function EmergencySection() {
  const whatsappHref = buildWhatsAppUrl(clinicInfo.whatsappNumber, emergencyPrefillMessage);

  return (
    <section
      id="emergency"
      aria-labelledby="emergency-heading"
      className="border-y border-lime-500/25 bg-ink-800 py-16 text-white"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-lime-400">Always on call</p>
          <h2 id="emergency-heading" className="mt-3 font-serif text-3xl sm:text-4xl">
            24/7 VIP emergency
          </h2>
          <p className="mt-3 max-w-xl text-white/85">
            Fractured ceramics, swelling, avulsed teeth, or post-surgical pain—reach a Dent Art
            clinician without waiting for morning hours. Pre-filled WhatsApp reaches the on-call desk.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:min-w-[16rem]">
          <a
            href={`tel:${clinicInfo.phoneTel}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-lime-600/30 bg-lime-500 px-7 py-3.5 text-sm uppercase tracking-[0.16em] text-ink-900 shadow-lime"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {clinicInfo.phoneDisplay}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-lime-500/80 px-7 py-3.5 text-sm uppercase tracking-[0.16em] text-white hover:bg-white/10"
          >
            WhatsApp VIP emergency
          </a>
        </div>
      </div>
    </section>
  );
}
