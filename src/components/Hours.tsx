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
      className="stack-surface bg-mist pt-16 pb-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-lime-800">Horarios</p>
        <h2 id="hours-heading" className="mt-3 font-serif text-3xl text-ink-900 sm:text-5xl">
          Horarios y urgencias
        </h2>
        <p className="mt-4 max-w-2xl text-black/70">{locationsIntro}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-black/10 bg-white p-6">
            <p className="flex items-start gap-2 text-ink-900">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-lime-800" aria-hidden="true" />
              <span className="font-serif text-2xl">{clinicHoursLabel}</span>
            </p>
          </article>
          <article className="rounded-3xl border border-black/10 bg-white p-6">
            <p className="flex items-start gap-2 text-sm text-ink-800">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-lime-800" aria-hidden="true" />
              <span>
                Tel/WA:{" "}
                <a href={`tel:${clinicInfo.phoneTel}`} className="hover:text-lime-800">
                  {clinicInfo.phoneDisplay}
                </a>
                {" · "}
                <a href={`mailto:${clinicInfo.email}`} className="hover:text-lime-800">
                  {clinicInfo.email}
                </a>
              </span>
            </p>
            <p className="mt-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-lime-800 hover:underline"
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
