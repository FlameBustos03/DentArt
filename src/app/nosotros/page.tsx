import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { ClinicianProfile } from "@/components/Team";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { nosotrosCopy } from "@/data/phase3";

export const metadata: Metadata = {
  title: nosotrosCopy.metaTitle,
  description: nosotrosCopy.metaDescription,
};

export default function NosotrosPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow={nosotrosCopy.eyebrow}
        title={nosotrosCopy.h1}
        lead={nosotrosCopy.lead}
        primaryCta={nosotrosCopy.primaryCta}
        secondaryCta={nosotrosCopy.secondaryCta}
      />

      <PageSection id="historia" labelledBy="historia-heading" band="a">
        <h2 id="historia-heading" className="font-serif text-3xl text-ink-900 sm:text-5xl">
          {nosotrosCopy.historiaH2}
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-lg text-[color:var(--text-body)]">
          {nosotrosCopy.historiaBody.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </PageSection>

      <PageSection id="sedes-resumen" labelledBy="sedes-resumen-heading" band="b">
        <h2 id="sedes-resumen-heading" className="font-serif text-3xl text-ink-900 sm:text-5xl">
          {nosotrosCopy.sedesH2}
        </h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {nosotrosCopy.sedes.map((sede) => (
            <li key={sede.city}>
              <article className="card-lift border border-[color:var(--border-subtle)] bg-white p-6 motion-reduce:hover:border-lime-800/40">
                <h3 className="flex items-start gap-2 font-serif text-2xl text-ink-900">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-lime-800" aria-hidden="true" />
                  {sede.city}
                </h3>
                <p className="mt-3 text-[color:var(--text-body)]">{sede.detail}</p>
              </article>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="quien-te-atiende" labelledBy="quien-te-atiende-heading" band="a">
        <h2 id="quien-te-atiende-heading" className="font-serif text-3xl text-ink-900 sm:text-5xl">
          {nosotrosCopy.clinicianH2}
        </h2>
        <div className="mt-8">
          <ClinicianProfile
            headingId="clinician-name"
            nameAs="p"
            showEyebrow={false}
            blurb={nosotrosCopy.clinicianBlurb}
          />
        </div>
      </PageSection>
    </main>
  );
}
