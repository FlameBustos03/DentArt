import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { Accordion } from "@/components/ui/Accordion";
import { pacientesCopy, pacientesFaqs } from "@/data/phase3";

export const metadata: Metadata = {
  title: pacientesCopy.metaTitle,
  description: pacientesCopy.metaDescription,
};

export default function PacientesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow={pacientesCopy.eyebrow}
        title={pacientesCopy.h1}
        lead={pacientesCopy.lead}
        primaryCta={pacientesCopy.primaryCta}
        secondaryCta={pacientesCopy.secondaryCta}
      />

      <PageSection id="primera-visita" labelledBy="primera-visita-heading" band="a">
        <h2 id="primera-visita-heading" className="font-serif text-3xl text-ink-900 sm:text-5xl">
          {pacientesCopy.primeraH2}
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-[color:var(--text-body)]">{pacientesCopy.primeraBody}</p>
      </PageSection>

      <PageSection id="que-traer" labelledBy="que-traer-heading" band="b">
        <h2 id="que-traer-heading" className="font-serif text-3xl text-ink-900 sm:text-5xl">
          {pacientesCopy.queTraerH2}
        </h2>
        <ul className="mt-8 max-w-2xl space-y-3">
          {pacientesCopy.queTraer.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink-900">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-lime-800" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="tips" labelledBy="tips-heading" band="a">
        <h2 id="tips-heading" className="font-serif text-3xl text-ink-900 sm:text-5xl">
          {pacientesCopy.tipsH2}
        </h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {pacientesCopy.tips.map((tip) => (
            <li
              key={tip}
              className="rounded-card border border-[color:var(--border-subtle)] bg-white p-6 shadow-card"
            >
              <p className="text-[color:var(--text-body)]">{tip}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="faq-pacientes" labelledBy="faq-pacientes-heading" band="b">
        <h2 id="faq-pacientes-heading" className="font-serif text-3xl text-ink-900 sm:text-5xl">
          {pacientesCopy.faqH2}
        </h2>
        <div className="mt-8">
          <Accordion items={pacientesFaqs} />
        </div>
      </PageSection>
    </main>
  );
}
