import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { clinicInfo, doctors } from "@/data/mockData";

export function Footer() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(clinicInfo.mapQuery)}&z=15&output=embed`;

  return (
    <footer id="contact" className="bg-navy-950 text-ivory-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr_1.1fr]">
        <div>
          <p className="font-serif text-3xl">DentArt</p>
          <p className="mt-3 max-w-sm text-ivory-200/80">{clinicInfo.tagline}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-gold-400" aria-hidden="true" />
              <a href={`tel:${clinicInfo.phoneTel}`} className="hover:text-gold-300">
                {clinicInfo.phoneDisplay}
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
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-ivory-200/70 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} DentArt Atelier. All rights reserved.</p>
          <p>HIPAA-aware concierge practice · Not a substitute for emergency-room trauma care.</p>
        </div>
      </div>
    </footer>
  );
}
