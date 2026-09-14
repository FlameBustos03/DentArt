import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Hours } from "@/components/Hours";
import { SedeMap } from "@/components/Locations";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { SocialIconLink } from "@/components/SocialIconLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { clinicInfo, getLocationById, socialLinks } from "@/data/mockData";
import { contactoCopy } from "@/data/phase3";
import { buildWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: contactoCopy.metaTitle,
  description: contactoCopy.metaDescription,
};

export default function ContactoPage() {
  const whatsappHref = buildWhatsAppUrl(clinicInfo.whatsappNumber, "Hola Dent Art, quiero información.");

  return (
    <main id="main-content">
      <PageHero eyebrow={contactoCopy.eyebrow} title={contactoCopy.h1} lead={contactoCopy.lead} />

      <Hours
        id="horario"
        heading={contactoCopy.horarioH2}
        headingId="horario-heading"
        variant="contact"
      />

      <section
        id="sedes"
        aria-labelledby="sedes-heading"
        className="section-band hash-target relative z-0 isolate overflow-x-clip bg-mist"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="sedes-heading" className="font-serif text-3xl text-ink-900 sm:text-5xl">
            {contactoCopy.sedesH2}
          </h2>
          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {contactoCopy.locations.map((sede) => {
              const location = getLocationById(sede.id);
              return (
                <li key={sede.id}>
                  <article className="isolate overflow-hidden rounded-card border border-[color:var(--border-subtle)] bg-white p-6 shadow-card">
                    <h3 className="font-serif text-3xl text-ink-900">{sede.heading}</h3>
                    <p className="mt-3 text-[color:var(--text-body)]">{sede.address}</p>
                    <p className="mt-2 text-sm text-[color:var(--text-muted)]">{sede.capacity}</p>
                    <SedeMap location={location} />
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <PageSection id="directo" labelledBy="directo-heading" band="a" className="stack-surface">
        <h2 id="directo-heading" className="font-serif text-3xl text-ink-900 sm:text-5xl">
          {contactoCopy.directoH2}
        </h2>
        <ul className="mt-8 space-y-4 text-ink-900">
          <li className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-lime-800" aria-hidden="true" />
            <a href={`tel:${clinicInfo.phoneTel}`} className="hover:text-lime-800">
              {clinicInfo.phoneDisplay}
            </a>
            <span className="text-[color:var(--text-muted)]">·</span>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-lime-800">
              <MessageCircle className="h-5 w-5 text-lime-800" aria-hidden="true" />
              WhatsApp
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-lime-800" aria-hidden="true" />
            <a href={`mailto:${clinicInfo.email}`} className="hover:text-lime-800">
              {clinicInfo.email}
            </a>
          </li>
        </ul>
        <ul className="mt-6 flex items-center gap-1">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <SocialIconLink href={link.href} network={link.id} label={link.label} />
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={contactoCopy.altBooking.href}>{contactoCopy.altBooking.label}</ButtonLink>
          <ButtonLink href={contactoCopy.altEmergency.href} variant="ghost" target="_blank" rel="noreferrer">
            {contactoCopy.altEmergency.label}
          </ButtonLink>
        </div>
      </PageSection>

      <PageSection id="escribimos" labelledBy="escribimos-heading" band="b" className="stack-surface">
        <ContactForm />
      </PageSection>
    </main>
  );
}
