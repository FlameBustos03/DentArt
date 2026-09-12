"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Gem, HeartPulse, Layers, Scan, Sparkles, Sun } from "lucide-react";
import { services } from "@/data/mockData";
import type { Service, ServiceIconName } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ServiceGlyph } from "@/components/ui/ServiceGlyph";
import { TiltCard } from "@/components/ui/TiltCard";
import { scrollToId } from "@/lib/utils";

const ICONS: Record<ServiceIconName, typeof Gem> = {
  "smile-design": Sparkles,
  veneers: Gem,
  whitening: Sun,
  implants: Layers,
  sedation: HeartPulse,
};

const SPECIALTIES = [
  { id: "orthodontics", label: "Orthodontics", icon: Scan },
  { id: "aesthetic", label: "Aesthetic Dentistry", icon: Sparkles },
  { id: "whitening", label: "Whitening", icon: Sun },
  { id: "implants", label: "Implants", icon: Layers },
] as const;

export function ServicesCatalog() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 bg-mist py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.24em] text-lime-800"
        >
          Concierge catalog
        </motion.p>
        <motion.h2
          id="services-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-3 font-serif text-3xl text-ink-900 sm:text-5xl"
        >
          Studio treatments, written as medicine
        </motion.h2>
        <p className="mt-4 max-w-2xl text-black/70">
          Five VIP pathways: smile architecture, porcelain, Zoom! luminosity, All-on-4 reconstruction,
          and medically staffed sedation—never a menu of upsells.
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SPECIALTIES.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.05 }}
            >
              <TiltCard className="rounded-2xl">
                <div className="flex items-center gap-3 rounded-2xl border border-lime-500/25 bg-white px-3 py-3">
                  <ServiceGlyph icon={item.icon} />
                  <p className="font-serif text-sm text-ink-900 sm:text-base">{item.label}</p>
                </div>
              </TiltCard>
            </motion.li>
          ))}
        </ul>

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
                className={index === 0 ? "md:col-span-2 xl:col-span-1" : undefined}
              >
                <TiltCard className="glass-card rounded-3xl bg-white shadow-sm">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-lime-800">{service.tagline}</p>
                        <h3 className="mt-2 font-serif text-2xl text-ink-900">{service.name}</h3>
                      </div>
                      <ServiceGlyph icon={Icon} />
                    </div>
                    <p className="mt-4 text-black/70">{service.description}</p>
                    <ul className="mt-5 space-y-2">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-ink-800">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-800" aria-hidden="true" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center justify-between gap-3">
                      <p className="text-sm text-black/55">From {service.startingAt}</p>
                      <Button variant="ghost" size="sm" onClick={() => setActive(service)}>
                        Learn Treatment Details
                      </Button>
                    </div>
                  </div>
                </TiltCard>
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
          <div className="space-y-4 text-black/70">
            <p>{active.description}</p>
            <p className="text-sm uppercase tracking-[0.16em] text-ink-800">
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
              variant="primary"
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
