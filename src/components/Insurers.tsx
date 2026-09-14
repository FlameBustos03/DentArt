import {
  corporatePlans,
  insurers,
  insurersHelper,
  insurersIntro,
  insurersMicrocopy,
  plansFooter,
  plansIntro,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

export function InsurerGrid() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.24em] text-lime-800">Seguros</p>
      <h2 id="insurers-heading" className="mt-3 font-serif text-3xl text-ink-900 sm:text-5xl">
        Seguros dentales
      </h2>
      <p className="mt-4 max-w-2xl text-black/70">{insurersIntro}</p>
      <ul className="mt-10 flex flex-wrap gap-6">
        {insurers.map((insurer) => (
          <li key={insurer.id} className="max-w-[160px]">
            <div
              role="img"
              aria-label={insurer.name}
              className={cn(
                "flex h-20 w-40 items-center justify-center rounded-2xl border border-black/10 bg-white px-3 text-center",
                "grayscale transition-[filter] duration-300 hover:grayscale-0",
                "motion-reduce:grayscale-0 motion-reduce:transition-none",
              )}
            >
              <span className="text-sm font-semibold tracking-wide text-ink-900">{insurer.name}</span>
            </div>
            <p className="mt-3 text-sm text-black/70">{insurer.caption}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-2xl text-sm text-black/70">{insurersMicrocopy}</p>
      <p className="mt-2 max-w-2xl text-sm text-black/55">{insurersHelper}</p>
    </div>
  );
}

export function PartnerRow() {
  return (
    <div className="mt-16">
      <h3 id="planes-heading" className="font-serif text-3xl text-ink-900 sm:text-4xl">
        Planes empresariales
      </h3>
      <p className="mt-3 max-w-2xl text-black/70">{plansIntro}</p>
      <ul className="mt-8 flex flex-wrap items-stretch gap-6">
        {corporatePlans.map((plan) => (
          <li key={plan.id} className="min-w-[10rem]">
            {plan.variant === "badge" ? (
              <div className="flex h-20 items-center">
                <span className="inline-flex rounded-full border border-lime-800/30 bg-lime-500/20 px-4 py-2 text-sm font-medium text-ink-900">
                  {plan.name}
                </span>
              </div>
            ) : (
              <div
                className="flex h-20 w-40 items-center justify-center rounded-2xl border border-dashed border-black/25 bg-mist px-3 text-center"
                aria-label={plan.name}
              >
                <span className="text-sm font-semibold tracking-wide text-ink-900">{plan.name}</span>
              </div>
            )}
            <p className="mt-3 max-w-[160px] text-sm text-black/70">{plan.note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-2xl text-sm text-black/70">{plansFooter}</p>
    </div>
  );
}

export function Insurers() {
  return (
    <section id="seguros" aria-labelledby="insurers-heading" className="bg-mist py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <InsurerGrid />
        <PartnerRow />
      </div>
    </section>
  );
}
