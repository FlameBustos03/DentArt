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
    <div className="sede-map mt-5 h-56 rounded-2xl border border-black/10 bg-mist">
      <iframe
        title={`Mapa Dent Art ${location.city}`}
        src={mapSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export function Locations() {
  const { locationId, locations, setLocationId } = useClinicLocation();

  return (
    <section
      id="sedes"
      aria-labelledby="locations-heading"
      className="relative z-0 isolate overflow-x-clip bg-white py-16 md:py-20"
    >
      <div className="section-x">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="type-eyebrow">Sedes</p>
            <h2 id="locations-heading" className="type-section mt-3">
              Poza Rica y Villahermosa
            </h2>
            <p className="type-body mt-4 max-w-2xl">{locationsIntro}</p>
          </div>
          <LocationSwitch />
        </div>

        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {locations.map((location) => {
            const selected = location.id === locationId;
            return (
              <li key={location.id}>
                <article
                  aria-labelledby={`location-${location.id}`}
                  className={cn(
                    "isolate overflow-hidden rounded-3xl border p-6 transition-colors",
                    selected
                      ? "border-lime-800 bg-mist shadow-sm"
                      : "border-black/10 bg-white hover:border-lime-800/40",
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-lime-800">
                      {selected ? "Sede seleccionada" : "Sede"}
                    </p>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setLocationId(location.id)}
                      className={cn(
                        "shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs uppercase tracking-[0.12em] min-h-11 transition-colors",
                        selected
                          ? "border-lime-500 bg-lime-500 text-ink-900"
                          : "border-black/15 text-ink-800 hover:border-lime-800 hover:text-lime-800",
                      )}
                    >
                      Elegir {location.city}
                    </button>
                  </div>
                  <h3 id={`location-${location.id}`} className="type-card mt-2">
                    {location.city}
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
