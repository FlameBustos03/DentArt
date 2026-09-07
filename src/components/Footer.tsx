import { Clock, Mail, MapPin, MessageCircle, Phone, Scale } from "lucide-react";
import { clinicInfo, conciergePrefillMessage, doctors } from "@/data/mockData";
import { buildWhatsAppUrl } from "@/lib/utils";

export function Footer() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(clinicInfo.mapQuery)}&z=15&output=embed`;
  const whatsappHref = buildWhatsAppUrl(clinicInfo.whatsappNumber, conciergePrefillMessage);

  return (
    <footer id="contact" className="scroll-mt-24 bg-navy-950 text-ivory-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr_1.1fr]">
        <div>
          <p className="font-serif text-3xl">DentArt</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-gold-300">
            Celebrity VIP Edition
          </p>
          <p className="mt-3 max-w-sm text-ivory-200/80">{clinicInfo.tagline}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-gold-400" aria-hidden="true" />
              <a href={`tel:${clinicInfo.phoneTel}`} className="hover:text-gold-300">
                VIP Concierge · {clinicInfo.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="mt-0.5 h-4 w-4 text-teal-300" aria-hidden="true" />
              <a
                href={whatsappHref}
                className="hover:text-gold-300"
                target="_blank"
                rel="noreferrer"
              >
                Direct WhatsApp concierge
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-gold-400" aria-hidden="true" />
              <a href={`mailto:${clinicInfo.email}`} className="hover:text-gold-300">
                {clinicInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-gold-400" aria-hidden="true" />
              <span>
                {clinicInfo.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.22em] text-gold-300">Hours</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {clinicInfo.hours.map((row) => (
              <li key={row.days} className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-gold-400" aria-hidden="true" />
                <span>
                  <span className="block text-ivory-100">{row.days}</span>
                  <span className="text-ivory-200/75">{row.hours}</span>
                </span>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-xs uppercase tracking-[0.22em] text-gold-300">Attending clinicians</h3>
          <ul className="mt-3 space-y-2 text-sm text-ivory-200/85">
            {doctors.map((doctor) => (
              <li key={doctor.id}>
                <span className="text-ivory-100">{doctor.name}</span>
                <span className="block text-ivory-200/70">{doctor.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.22em] text-gold-300">Location</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="DentArt clinic map"
              src={mapSrc}
              className="h-56 w-full grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(clinicInfo.mapQuery)}`}
            className="mt-3 inline-block text-sm text-gold-300 hover:text-gold-200"
            target="_blank"
            rel="noreferrer"
          >
            Open interactive directions
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-ivory-200/70 sm:flex-row sm:items-start sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} DentArt Atelier. All rights reserved.</p>
          <p className="flex max-w-xl items-start gap-2">
            <Scale className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-400" aria-hidden="true" />
            <span>
              Legal notice: DentArt is a private fee-for-service practice. Content is educational and
              not a substitute for in-person diagnosis or emergency-room trauma care. HIPAA-aware
              concierge communications. Results vary. Celebrity-grade hospitality does not imply
              endorsement by any named media outlet.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
