"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Siren } from "lucide-react";
import { clinicInfo, emergencyPrefillMessage } from "@/data/mockData";
import { buildWhatsAppUrl } from "@/lib/utils";

export function EmergencyFab() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const whatsappHref = buildWhatsAppUrl(clinicInfo.whatsappNumber, emergencyPrefillMessage);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-label="Emergency contact options"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="w-72 rounded-2xl border border-gold-500/30 bg-ivory-50 p-4 shadow-lift"
          >
            <p className="font-serif text-xl text-navy-900">Emergency triage</p>
            <p className="mt-1 text-sm text-stone-600">
              A clinician reviews pain, trauma, and failed restorations around the clock.
            </p>
            <a
              href={`tel:${clinicInfo.phoneTel}`}
              className="mt-4 flex items-center justify-between rounded-xl bg-navy-900 px-4 py-3 text-sm text-ivory-100"
            >
              Call {clinicInfo.phoneDisplay}
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center justify-center rounded-xl border border-gold-500 bg-gold-500 px-4 py-3 text-sm text-navy-950"
            >
              WhatsApp the on-call desk
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-14 items-center gap-2 rounded-full bg-navy-900 px-5 text-sm uppercase tracking-[0.14em] text-ivory-100 shadow-lift"
      >
        <Siren className="h-5 w-5 text-gold-400" aria-hidden="true" />
        <span className="hidden sm:inline">Emergency</span>
        <span className="sr-only sm:hidden">Open emergency triage</span>
      </button>
    </div>
  );
}
