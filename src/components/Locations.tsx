"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useClinicLocation } from "@/components/LocationProvider";
import { LocationSwitch } from "@/components/LocationSwitch";
import { clinicHoursLabel, clinicInfo, locationsIntro } from "@/data/mockData";
import type { ClinicLocation } from "@/types";
import { cn } from "@/lib/utils";

export function SedeMap({ location }: { location: ClinicLocation }) {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&z=15&hl=es&output=embed`;

  return (
    <div className="mt-5">
      <p className="text-sm text-[color:var(--text-body)]">{location.mapTitle}</p>
      <div className="sede-map mt-2 h-56 md:h-64">
        <iframe
          title={location.mapTitle}
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

export function Locations({
  id = "sedes",
  heading = "Poza Rica y Villahermosa",
  headingId = "locations-heading",
  intro = locationsIntro,
  showSwitch = true,
  showCapacity = false,
  interactive = true,
  className,
}: {
  id?: string;
  heading?: string;
  headingId?: string;
  intro?: string;
  showSwitch?: boolean;
  showCapacity?: boolean;
  interactive?: boolean;
  className?: string;
}) {
  const { locationId, locations, setLocationId } = useClinicLocation();

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("relative z-0 isolate overflow-x-clip bg-white py-20", className)}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {showSwitch ? (
              <p className="text-xs uppercase tracking-[0.24em] text-lime-800">Sedes</p>
            ) : null}
            <h2
              id={headingId}
              className={cn(
                "font-serif text-3xl text-ink-900 sm:text-5xl",
                showSwitch && "mt-3",
              )}
            >
              {heading}
            </h2>
            {intro ? <p className="mt-4 max-w-2xl text-black/70">{intro}</p> : null}
          </div>
          {showSwitch ? <LocationSwitch /> : null}
        </div>

        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {locations.map((location) => {
            const selected = interactive && location.id === locationId;
            return (
              <li key={location.id}>
                <article
                  aria-labelledby={`location-${location.id}`}
                  className={cn(
                    "isolate overflow-hidden rounded-card border p-6 transition-colors duration-fast ease-out",
                    selected
                      ? "border-lime-800 bg-mist shadow-card"
                      : "border-[color:var(--border-subtle)] bg-white shadow-card hover:border-lime-800/40",
                  )}
                >
                  {interactive ? (
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-lime-800">
                        {selected ? "Sede seleccionada" : "Sede"}
                      </p>
                      <button
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setLocationId(location.id)}
                        className={cn(
                          "shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs uppercase tracking-[0.14em] transition-colors",
                          selected
                            ? "border-lime-500 bg-lime-500 text-ink-900"
                            : "border-black/15 text-ink-800 hover:border-lime-800 hover:text-lime-800",
                        )}
                      >
                        Elegir {location.city}
                      </button>
                    </div>
                  ) : null}
                  <h3 id={`location-${location.id}`} className="mt-2 font-serif text-3xl text-ink-900">
                    {location.city}, {location.region}
                  </h3>
                  <p className="mt-3 flex items-start gap-2 text-black/75">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime-800" aria-hidden="true" />
                    <span>
                      {location.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </p>
                  {showCapacity ? (
                    <p className="mt-3 text-sm text-[color:var(--text-body)]">{location.teamCapacity}</p>
                  ) : null}
                  <p className="mt-3 flex items-start gap-2 text-sm text-black/70">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-lime-800" aria-hidden="true" />
                    <span className="text-ink-900">{clinicHoursLabel}</span>
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-sm text-ink-800">
                    <Phone className="h-4 w-4 text-lime-800" aria-hidden="true" />
                    {clinicInfo.phoneDisplay}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-ink-800">
                    <Mail className="h-4 w-4 text-lime-800" aria-hidden="true" />
                    {clinicInfo.email}
                  </p>
                  <SedeMap location={location} />
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
