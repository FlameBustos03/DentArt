import { clinicHoursLabel, trustBadges } from "@/data/mockData";
import { Reveal } from "@/components/ui/Reveal";

export function TrustStrip() {
  return (
    <section aria-label="Confianza" className="bg-white py-8 md:py-10">
      <Reveal className="section-x" y={10}>
        <ul className="flex flex-wrap items-center gap-3">
          {trustBadges.map((badge) => (
            <li
              key={badge.id}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink-900 shadow-sm"
            >
              {badge.value}
            </li>
          ))}
          <li className="text-sm text-black/70">{clinicHoursLabel}</li>
        </ul>
      </Reveal>
    </section>
  );
}
