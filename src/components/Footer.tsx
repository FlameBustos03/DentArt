import { Clock, Mail, MapPin, MessageCircle, Phone, Scale } from "lucide-react";
import { BrandLockup } from "@/components/BrandLockup";
import { SocialLinks } from "@/components/SocialLinks";
import {
  clinicHoursLabel,
  clinicHoursNote,
  clinicInfo,
  conciergePrefillMessage,
  locations,
  medicalDisclaimer,
} from "@/data/mockData";
import { buildWhatsAppUrl } from "@/lib/utils";

export function Footer() {
  const whatsappHref = buildWhatsAppUrl(clinicInfo.whatsappNumber, conciergePrefillMessage);

  return (
    <footer id="contact" className="scroll-mt-24 bg-ink-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4">
        <div>
          <BrandLockup size="nav" wordmarkClassName="text-white" />
          <p className="mt-3 text-sm italic text-lime-400">{clinicInfo.slogan}</p>
          <p className="mt-3 max-w-sm text-white/80">{clinicInfo.tagline}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-lime-500" aria-hidden="true" />
              <a href={`tel:${clinicInfo.phoneTel}`} className="hover:text-lime-400">
                {clinicInfo.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="mt-0.5 h-4 w-4 text-lime-500" aria-hidden="true" />
              <a href={whatsappHref} className="hover:text-lime-400" target="_blank" rel="noreferrer">
                WhatsApp {clinicInfo.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-lime-500" aria-hidden="true" />
              <a href={`mailto:${clinicInfo.email}`} className="hover:text-lime-400">
                {clinicInfo.email}
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.22em] text-lime-400">Redes</p>
            <SocialLinks className="mt-3" tone="dark" />
          </div>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.22em] text-lime-400">Horario</h2>
          <p className="mt-4 flex items-start gap-2 text-sm">
            <Clock className="mt-0.5 h-4 w-4 text-lime-500" aria-hidden="true" />
            <span>
              <span className="block text-white">{clinicHoursLabel}</span>
              <span className="text-white/75">{clinicHoursNote}</span>
            </span>
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {clinicInfo.hours.map((row) => (
              <li key={row.days} className="text-white/80">
                <span className="block text-white">{row.days}</span>
                {row.hours}
              </li>
            ))}
          </ul>
        </div>

        <div>
          {/* Dental Box — reserved shop column. Empty until merch IA lands. */}
          <h2 className="text-xs uppercase tracking-[0.22em] text-lime-400">Tienda</h2>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.22em] text-lime-400">Sedes</h2>
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
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-white/70 sm:px-6">
          <p>© {new Date().getFullYear()} Dent Art. Todos los derechos reservados.</p>
          <p className="flex max-w-4xl items-start gap-2">
            <Scale className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime-500" aria-hidden="true" />
            <span>{medicalDisclaimer}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
