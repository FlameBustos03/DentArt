"use client";

import { MapPin, Shield } from "lucide-react";

export function HeroDepthCards() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
      aria-hidden="true"
    >
      <article className="hero-depth-card hero-depth-card--far absolute right-8 top-24 w-52 rounded-2xl px-4 py-3">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-lime-400">
          <MapPin className="h-3.5 w-3.5" />
          Dos sedes
        </p>
        <p className="mt-1 font-serif text-lg text-white">Poza Rica y Villahermosa</p>
      </article>
      <article className="hero-depth-card hero-depth-card--near absolute right-16 top-56 w-56 rounded-2xl px-4 py-3">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-lime-400">
          <Shield className="h-3.5 w-3.5" />
          Más de 16 años
        </p>
        <p className="mt-1 font-serif text-lg text-white">Cuidado definido en consulta</p>
      </article>
    </div>
  );
}
