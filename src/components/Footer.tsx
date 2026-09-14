import { Clock, Mail, MapPin, MessageCircle, Phone, Scale } from "lucide-react";
import { BrandLockup } from "@/components/BrandLockup";
import { SocialLinks } from "@/components/SocialLinks";
import {
  clinicHoursNote,
  clinicInfo,
  conciergePrefillMessage,
  footerSitemap,
  locations,
  medicalDisclaimer,
} from "@/data/mockData";
import { buildWhatsAppUrl } from "@/lib/utils";

export function Footer() {
  const whatsappHref = buildWhatsAppUrl(clinicInfo.whatsappNumber, conciergePrefillMessage);

  return (
    <footer id="contact" className="bg-ink-900 pb-24 text-white">
      <div className="section-x grid gap-10 py-16 lg:grid-cols-4">
        <div>
          <BrandLockup size="nav" />
          <p className="mt-3 max-w-sm text-white/80">{clinicInfo.tagline}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-lime-500" aria-hidden="true" />
              <a href={`tel:${clinicInfo.phoneTel}`} className="text-link-dark">
                {clinicInfo.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="mt-0.5 h-4 w-4 text-lime-500" aria-hidden="true" />
              <a href={whatsappHref} className="text-link-dark" target="_blank" rel="noreferrer">
                WhatsApp {clinicInfo.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-lime-500" aria-hidden="true" />
              <a href={`mailto:${clinicInfo.email}`} className="text-link-dark">
                {clinicInfo.email}
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <p className="type-eyebrow-dark">Redes</p>
            <SocialLinks className="mt-3" tone="dark" />
          </div>
        </div>

        <div>
          <h2 className="type-eyebrow-dark">Horario</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {clinicInfo.hours.map((row) => (
              <li key={row.days} className="flex items-start gap-2 text-white/80">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-lime-500" aria-hidden="true" />
                <span>
                  <span className="block text-white">{row.days}</span>
                  {row.hours}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-white/75">{clinicHoursNote}</p>
        </div>

        <div>
          <h2 className="type-eyebrow-dark">Mapa del sitio</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {footerSitemap.map((link) => (
              <li key={link.id}>
                <a href={link.href} className="text-link-dark inline-flex min-h-11 items-center">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="type-eyebrow-dark">Sedes</h2>
          <ul className="mt-4 space-y-5 text-sm">
            {locations.map((location) => (
              <li key={location.id} className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime-500" aria-hidden="true" />
                <span>
                  <span className="block text-white">{location.city}</span>
                  {location.addressLines.map((line) => (
                    <span key={line} className="block text-white/80">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="section-x flex flex-col gap-3 py-6 text-xs text-white/70">
          <p>
            © {new Date().getFullYear()} Dent Art · Todos los derechos reservados
          </p>
          <p className="flex max-w-4xl items-start gap-2">
            <Scale className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime-400" aria-hidden="true" />
            <span>{medicalDisclaimer}</span>
          </p>
          <p>
            <a href={`tel:${clinicInfo.phoneTel}`} className="text-link-dark">
              {clinicInfo.phoneDisplay}
            </a>
            {" · "}
            <a href={`mailto:${clinicInfo.email}`} className="text-link-dark">
              {clinicInfo.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
