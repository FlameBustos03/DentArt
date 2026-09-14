import Image from "next/image";
import type { StaticImageData } from "next/image";
import {
  corporatePlans,
  insurers,
  insurersHelper,
  insurersIntro,
  insurersMicrocopy,
  plansFooter,
  plansIntro,
} from "@/data/mockData";
import { partnerLogoById } from "@/lib/partnerAssets";
import { cn } from "@/lib/utils";

/** ~160×80 tiles; native brand colors; no grayscale / lime overlay. */
function LogoTile({ image }: { image: StaticImageData }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative h-20 w-40 overflow-hidden rounded-2xl border border-black/10 bg-white",
        "motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.03]",
        "motion-reduce:transform-none",
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        className="object-contain p-2.5"
        sizes="160px"
      />
    </div>
  );
}

export function InsurerGrid() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.24em] text-lime-800">Seguros</p>
      <h2 id="insurers-heading" className="mt-3 font-serif text-3xl text-ink-900 sm:text-5xl">
        Seguros dentales
      </h2>
      <p className="mt-4 max-w-2xl text-black/70">{insurersIntro}</p>
      <ul className="mt-10 flex flex-wrap gap-6">
        {insurers.map((insurer) => {
          const logo = partnerLogoById[insurer.id];
          return (
            <li key={insurer.id} className="max-w-[160px]">
              {logo ? (
                <LogoTile image={logo} />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-20 w-40 items-center justify-center rounded-2xl border border-black/10 bg-white px-3 text-center"
                >
                  <span className="text-sm font-semibold tracking-wide text-ink-900">{insurer.name}</span>
                </div>
              )}
              <p className="mt-3 text-sm text-black/70">{insurer.caption}</p>
            </li>
          );
        })}
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
        {corporatePlans.map((plan) => {
          const logo = plan.variant === "logo" ? partnerLogoById[plan.id] : undefined;
          return (
            <li key={plan.id} className="min-w-[10rem]">
              {plan.variant === "badge" ? (
                <div className="flex h-20 items-center" aria-hidden="true">
                  <span className="inline-flex rounded-full border border-lime-800/30 bg-lime-500/20 px-4 py-2 text-sm font-medium text-ink-900">
                    {plan.name}
                  </span>
                </div>
              ) : logo ? (
                <LogoTile image={logo} />
              ) : (
                <div
                  className="flex h-20 w-40 items-center justify-center rounded-2xl border border-dashed border-black/25 bg-mist px-3 text-center"
                  aria-hidden="true"
                >
                  <span className="text-sm font-semibold tracking-wide text-ink-900">{plan.name}</span>
                </div>
              )}
              <p className="mt-3 max-w-[160px] text-sm text-black/70">{plan.note}</p>
            </li>
          );
        })}
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
