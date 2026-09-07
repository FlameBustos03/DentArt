"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import {
  certifications,
  clinicInfo,
  heroImages,
  mediaOutlets,
  trustBadges,
} from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { scrollToId } from "@/lib/utils";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-navy-950 text-ivory-100"
    >
      <Image
        src={heroImages.portrait.src}
        alt={heroImages.portrait.alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy-veil" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ivory-100 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-gold-300">
            <Sparkles className="h-4 w-4 text-teal-300" aria-hidden="true" />
            Fifth Avenue · Celebrity VIP Atelier
          </p>
          <h1
            id="hero-heading"
            className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl"
          >
            Transforming Smiles, Redefining Confidence
          </h1>
          <p className="mt-6 max-w-lg text-base text-ivory-200/90 sm:text-lg">
            DentArt is Manhattan’s private dental atelier—Hollywood-grade ceramics, Four Seasons
            hospitality, and reconstructive medicine under one concierge roof. Arrive as a guest.
            Leave as a reference.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="gold" size="lg" onClick={() => scrollToId("booking")}>
              Schedule Virtual Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => scrollToId("emergency")}>
              24/7 VIP Emergency
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-3">
            {trustBadges.map((badge) => (
              <li
                key={badge.id}
                className="rounded-full border border-gold-400/40 bg-white/5 px-4 py-2 text-sm text-ivory-100 backdrop-blur"
              >
                {badge.value}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="glass-dark self-end rounded-3xl p-6"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-gold-300">Clinical credentials</p>
          <p className="mt-2 font-serif text-2xl">{clinicInfo.tagline}</p>
          <ul className="mt-5 space-y-3">
            {certifications.map((item) => (
              <li key={item.id} className="flex items-center gap-3 text-sm text-ivory-100/90">
                <Shield className="h-4 w-4 text-teal-300" aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>

      <div className="relative border-t border-white/10 bg-navy-950/55 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <p className="mb-3 text-center text-[10px] uppercase tracking-[0.32em] text-gold-300 sm:text-left">
            Media trust bar
          </p>
          <ul
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
            aria-label="As featured in national media"
          >
            {mediaOutlets.map((outlet) => (
              <li
                key={outlet.id}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center"
              >
                <span className="block font-serif text-lg tracking-wide text-ivory-100 sm:text-xl">
                  {outlet.name}
                </span>
                <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-ivory-200/70">
                  {outlet.caption}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
