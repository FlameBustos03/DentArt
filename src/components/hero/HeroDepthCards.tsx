"use client";

import { Shield, Sparkles } from "lucide-react";

export function HeroDepthCards() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      <article className="hero-depth-card hero-depth-card--far absolute left-[46%] top-24 w-52 rounded-2xl px-4 py-3">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-lime-400">
          <Sparkles className="h-3.5 w-3.5" />
          Atelier ceramics
        </p>
        <p className="mt-1 font-serif text-lg text-white">Camera-ready light-play</p>
      </article>
      <article className="hero-depth-card hero-depth-card--near absolute bottom-36 right-8 w-56 rounded-2xl px-4 py-3">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-lime-400">
          <Shield className="h-3.5 w-3.5" />
          Concierge medicine
        </p>
        <p className="mt-1 font-serif text-lg text-white">24/7 VIP triage</p>
      </article>
    </div>
  );
}
