import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { ServiceGroup } from "@/components/ServiceGroup";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { servicePageGroups, serviciosCopy } from "@/data/phase3";

export const metadata: Metadata = {
  title: serviciosCopy.metaTitle,
  description: serviciosCopy.metaDescription,
};

const JUMP_ITEMS = [
  { id: "estetica", label: "Estética" },
  { id: "general", label: "General" },
  { id: "protesis", label: "Prótesis" },
  { id: "laser", label: "Láser" },
] as const;

const BANDS: Record<string, "a" | "b"> = {
  estetica: "a",
  general: "b",
  protesis: "a",
  laser: "b",
};

export default function ServiciosPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow={serviciosCopy.eyebrow} title={serviciosCopy.h1} lead={serviciosCopy.lead} />

      <nav
        aria-label={serviciosCopy.jumpLabel}
        className="sticky z-30 h-12 border-b border-[color:var(--border-subtle)] bg-mist"
        style={{ top: "var(--header-offset)" }}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center gap-5 overflow-x-auto px-4 text-sm sm:px-6">
          {JUMP_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap text-ink-900 underline-offset-4 hover:text-lime-800 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {servicePageGroups.map((group) => (
        <PageSection
          key={group.id}
          id={group.id}
          labelledBy={`${group.id}-heading`}
          band={BANDS[group.id] ?? "a"}
          hash="subnav"
        >
          <ServiceGroup group={group} variant="expanded" />
        </PageSection>
      ))}

      <PageSection id="servicios-cta" labelledBy="servicios-cta-heading" band="a">
        <h2 id="servicios-cta-heading" className="font-serif text-3xl text-ink-900 sm:text-4xl">
          {serviciosCopy.footPrompt}
        </h2>
        <div className="mt-8">
          <ButtonLink href={serviciosCopy.footCta.href}>{serviciosCopy.footCta.label}</ButtonLink>
        </div>
      </PageSection>
    </main>
  );
}
