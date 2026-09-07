"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Baby, Check, Gem, Sparkles, Stethoscope } from "lucide-react";
import { services } from "@/data/mockData";
import type { Service, ServiceIconName } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

const ICONS: Record<ServiceIconName, typeof Gem> = {
  implants: Gem,
  whitening: Sparkles,
  general: Stethoscope,
  pediatric: Baby,
};

export function ServicesCatalog() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section id="services" aria-labelledby="services-heading" className="bg-ivory-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-gold-600">Care menu</p>
        <h2 id="services-heading" className="mt-3 font-serif text-3xl text-navy-900 sm:text-5xl">
          Elite services, written as medicine
        </h2>
        <p className="mt-4 max-w-2xl text-stone-600">
          Four practices under one atelier: reconstructive implants, luminosity, comprehensive
          dentistry, and pediatric confidence.
        </p>

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
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
                className="rounded-3xl border border-ivory-300 bg-ivory-100 p-6 shadow-sm transition-shadow hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gold-600">{service.tagline}</p>
                    <h3 className="mt-2 font-serif text-2xl text-navy-900">{service.name}</h3>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/40 bg-white">
                    <Icon className="h-5 w-5 text-gold-600" aria-hidden="true" />
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
                    View details
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
                document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
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
