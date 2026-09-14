import type { Metadata } from "next";
import { InsurerGrid, PartnerRow } from "@/components/Insurers";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { segurosCopy } from "@/data/phase3";

export const metadata: Metadata = {
  title: segurosCopy.metaTitle,
  description: segurosCopy.metaDescription,
};

export default function SegurosPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow={segurosCopy.eyebrow}
        title={segurosCopy.h1}
        lead={segurosCopy.lead}
        primaryCta={segurosCopy.primaryCta}
        secondaryCta={segurosCopy.secondaryCta}
      />

      <PageSection id="aseguradoras" labelledBy="aseguradoras-heading" band="a">
        <InsurerGrid
          heading={segurosCopy.aseguradorasH2}
          headingId="aseguradoras-heading"
          showEyebrow={false}
          intro=""
        />
      </PageSection>

      <PageSection id="planes" labelledBy="planes-heading" band="b">
        <PartnerRow
          heading={segurosCopy.planesH2}
          headingId="planes-heading"
          headingAs="h2"
          className="mt-0"
        />
      </PageSection>

      <PageSection id="como-usar" labelledBy="como-usar-heading" band="a">
        <h2 id="como-usar-heading" className="font-serif text-3xl text-ink-900 sm:text-5xl">
          {segurosCopy.comoUsarH2}
        </h2>
        <ol className="mt-8 max-w-2xl space-y-5">
          {segurosCopy.steps.map((step, index) => (
            <li key={step} className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist text-sm font-medium text-ink-900">
                {index + 1}
              </span>
              <p className="pt-1 text-[color:var(--text-body)]">{step}</p>
            </li>
          ))}
        </ol>
      </PageSection>
    </main>
  );
}
