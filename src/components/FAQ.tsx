import { Scale } from "lucide-react";
import { faqs, medicalDisclaimer } from "@/data/mockData";
import { Accordion } from "@/components/ui/Accordion";

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="stack-surface bg-white pt-16 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-lime-800">Preguntas frecuentes</p>
        <h2 id="faq-heading" className="mt-3 font-serif text-3xl text-ink-900 sm:text-5xl">
          Cinco respuestas claras
        </h2>
        <p className="mt-4 max-w-2xl text-black/70">
          Horarios, urgencias, seguros aceptados y el alcance del láser —en tono clínico, sin
          promesas de resultado.
        </p>
        <div className="mt-8">
          <Accordion items={faqs} />
        </div>
        <p className="mt-8 flex max-w-3xl items-start gap-2 text-sm text-black/65">
          <Scale className="mt-0.5 h-4 w-4 shrink-0 text-lime-800" aria-hidden="true" />
          <span>{medicalDisclaimer}</span>
        </p>
      </div>
    </section>
  );
}
