"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Gem, HeartPulse, Layers, Sparkles, Sun } from "lucide-react";
import { services } from "@/data/mockData";
import type { Service, ServiceIconName } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { scrollToId } from "@/lib/utils";

const ICONS: Record<ServiceIconName, typeof Gem> = {
  "smile-design": Sparkles,
  veneers: Gem,
  whitening: Sun,
  implants: Layers,
  sedation: HeartPulse,
};

export function ServicesCatalog() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 bg-ivory-100 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-teal-600">Luxury concierge catalog</p>
        <h2 id="services-heading" className="mt-3 font-serif text-3xl text-navy-900 sm:text-5xl">
          Atelier treatments, written as medicine
        </h2>
        <p className="mt-4 max-w-2xl text-stone-600">
          Five VIP pathways: smile architecture, porcelain, Zoom! luminosity, All-on-4 reconstruction,
          and medically staffed sedation—never a menu of upsells.
        </p>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.li
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className={`glass-card rounded-3xl p-6 shadow-sm transition-shadow hover:shadow-lift ${
                  index === 0 ? "md:col-span-2 xl:col-span-1" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gold-600">{service.tagline}</p>
                    <h3 className="mt-2 font-serif text-2xl text-navy-900">{service.name}</h3>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/40 bg-white">
                    <Icon className="h-5 w-5 text-teal-600" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 text-stone-600">{service.description}</p>
                <ul className="mt-5 space-y-2">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-navy-800">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <p className="text-sm text-stone-500">From {service.startingAt}</p>
                  <Button variant="ghost" size="sm" onClick={() => setActive(service)}>
                    Learn Treatment Details
                  </Button>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <Modal
        open={Boolean(active)}
        title={active?.name ?? "Service details"}
        onClose={() => setActive(null)}
      >
        {active ? (
          <div className="space-y-4 text-stone-600">
            <p>{active.description}</p>
            <p className="text-sm uppercase tracking-[0.16em] text-navy-800">
              Visit length · {active.duration}
            </p>
            <ul className="space-y-3">
              {active.details.map((detail) => (
                <li key={detail} className="leading-relaxed">
                  {detail}
                </li>
              ))}
            </ul>
            <Button
              variant="gold"
              onClick={() => {
                setActive(null);
                scrollToId("booking");
              }}
            >
              Reserve this specialty
            </Button>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
