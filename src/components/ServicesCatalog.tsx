"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { serviceGroups, serviceModalRows } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TiltCard } from "@/components/ui/TiltCard";
import { scrollToId } from "@/lib/utils";

export function ServicesCatalog() {
  const [open, setOpen] = useState(false);

  return (
    <section id="servicios" aria-labelledby="services-heading" className="bg-mist py-20">
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

        <div className="mt-10 flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => setOpen(true)}>
            Ver catálogo
          </Button>
          <Button variant="ghost" onClick={() => scrollToId("booking")}>
            Agendar cita
          </Button>
        </div>
      </div>

      <Modal open={open} title="Catálogo de servicios" onClose={() => setOpen(false)}>
        <ol className="divide-y divide-black/10 text-sm">
          {serviceModalRows.map((row, index) => (
            <li key={`${row.group}-${row.name}`} className="flex items-baseline gap-3 py-2.5">
              <span className="w-6 shrink-0 text-black/40">{index + 1}</span>
              <span className="w-40 shrink-0 text-xs uppercase tracking-[0.14em] text-lime-800">
                {row.group}
              </span>
              <span className="text-ink-900">{row.name}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-black/65">
          El láser no sustituye el diagnóstico clínico.
        </p>
        <Button
          variant="primary"
          className="mt-6"
          onClick={() => {
            setOpen(false);
            scrollToId("booking");
          }}
        >
          Agendar cita
        </Button>
      </Modal>
    </section>
  );
}
