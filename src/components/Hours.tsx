import { Clock, MessageCircle, Phone } from "lucide-react";
import {
  clinicHoursLabel,
  clinicInfo,
  conciergePrefillMessage,
  locationsIntro,
} from "@/data/mockData";
import { buildWhatsAppUrl } from "@/lib/utils";

export function Hours() {
  const whatsappHref = buildWhatsAppUrl(clinicInfo.whatsappNumber, conciergePrefillMessage);

  return (
    <section
      id="horarios"
      aria-labelledby="hours-heading"
      className="stack-surface bg-white py-16 md:py-20"
    >
      <div className="section-x">
        <p className="type-eyebrow">Horarios</p>
        <h2 id="hours-heading" className="type-section mt-3">
          Horarios y urgencias
        </h2>
        <p className="type-body mt-4 max-w-2xl">{locationsIntro}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="card-lift rounded-2xl border border-black/10 bg-mist p-6">
            <p className="flex items-start gap-2 text-ink-900">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-lime-800" aria-hidden="true" />
              <span className="type-card">{clinicHoursLabel}</span>
            </p>
          </article>
          <article className="card-lift rounded-2xl border border-black/10 bg-mist p-6">
            <p className="flex items-start gap-2 text-sm text-ink-800">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-lime-800" aria-hidden="true" />
              <span>
                Tel/WA:{" "}
                <a href={`tel:${clinicInfo.phoneTel}`} className="text-link">
                  {clinicInfo.phoneDisplay}
                </a>
                {" · "}
                <a href={`mailto:${clinicInfo.email}`} className="text-link">
                  {clinicInfo.email}
                </a>
              </span>
            </p>
            <p className="mt-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="text-link inline-flex min-h-11 items-center gap-2 text-sm"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp {clinicInfo.phoneDisplay}
              </a>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
