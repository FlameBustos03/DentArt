"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { serviceGroups } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { scrollToId } from "@/lib/utils";

export function ServicesCatalog() {
  return (
    <section id="servicios" aria-labelledby="services-heading" className="scroll-mt-24 bg-mist py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.24em] text-lime-800"
        >
          Servicios
        </motion.p>
        <motion.h2
          id="services-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-3 font-serif text-3xl text-ink-900 sm:text-5xl"
        >
          Estética, general, prótesis y láser
        </motion.h2>
        <p className="mt-4 max-w-2xl text-black/70">
          Tratamientos agrupados para que elijas con claridad. El láser apoya el tratamiento; no
          sustituye el diagnóstico.
        </p>

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {serviceGroups.map((group, index) => (
            <motion.li
              key={group.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.06 }}
            >
              <TiltCard className="glass-card h-full rounded-3xl bg-white shadow-sm">
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-lime-800" aria-hidden="true" />
                    <h3 className="font-serif text-2xl text-ink-900">{group.name}</h3>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-800">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-800" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {group.note ? <p className="mt-5 text-sm text-black/65">{group.note}</p> : null}
                </div>
              </TiltCard>
            </motion.li>
          ))}
        </ul>

        <div className="mt-10">
          <Button variant="primary" onClick={() => scrollToId("booking")}>
            Agendar cita
          </Button>
        </div>
      </div>
    </section>
  );
}
