"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import { motion } from "framer-motion";
import { Check, Layers, SmilePlus, Sparkles, Zap } from "lucide-react";
import { serviceGroups, serviceModalRows } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ServiceGlyph } from "@/components/ui/ServiceGlyph";
import { TiltCard } from "@/components/ui/TiltCard";
import { scrollToId } from "@/lib/utils";

const GROUP_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  estetica: Sparkles,
  general: SmilePlus,
  protesis: Layers,
  laser: Zap,
};

export function ServicesCatalog() {
  const [open, setOpen] = useState(false);

  return (
    <section id="servicios" aria-labelledby="services-heading" className="bg-mist py-16 md:py-20">
      <div className="section-x">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="type-eyebrow"
        >
          Servicios
        </motion.p>
        <motion.h2
          id="services-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="type-section mt-3"
        >
          Estética, general, prótesis y láser
        </motion.h2>
        <p className="type-body mt-4 max-w-2xl">
          Tratamientos agrupados para que elijas con claridad. El láser apoya el tratamiento; no
          sustituye el diagnóstico.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {serviceGroups.map((group, index) => {
            const Icon = GROUP_ICONS[group.id] ?? Sparkles;
            return (
              <motion.li
                key={group.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.06 }}
              >
                <TiltCard className="h-full rounded-2xl bg-white">
                  <div className="p-5 md:p-4">
                    <div className="flex items-center gap-3">
                      <ServiceGlyph icon={Icon} />
                      <h3 className="type-card">{group.name}</h3>
                    </div>
                    <ul className="mt-5 space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[15px] text-black/70">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-800" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {group.note ? <p className="type-caption mt-5">{group.note}</p> : null}
                  </div>
                </TiltCard>
              </motion.li>
            );
          })}
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
              <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                <span className="type-eyebrow sm:w-56 sm:shrink-0">{row.group}</span>
                <span className="text-ink-900">{row.name}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="type-caption mt-4">El láser no sustituye el diagnóstico clínico.</p>
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
