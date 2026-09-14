import { Scale } from "lucide-react";
import { faqs, medicalDisclaimer } from "@/data/mockData";
import { Accordion } from "@/components/ui/Accordion";

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="stack-surface bg-mist py-16 md:py-20">
      <div className="section-x">
        <p className="type-eyebrow">Preguntas frecuentes</p>
        <h2 id="faq-heading" className="type-section mt-3">
          Cinco respuestas claras
        </h2>
        <p className="type-body mt-4 max-w-2xl">
          Horarios, urgencias, seguros aceptados y el alcance del láser —en tono clínico, sin
          promesas de resultado.
        </p>
        <div className="mt-8">
          <Accordion items={faqs} />
        </div>
        <p className="type-caption mt-8 flex max-w-2xl items-start gap-2">
          <Scale className="mt-0.5 h-4 w-4 shrink-0 text-lime-800" aria-hidden="true" />
          <span>{medicalDisclaimer}</span>
        </p>
      </div>
    </section>
  );
}
