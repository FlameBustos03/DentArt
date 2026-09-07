"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { certifications, clinicInfo, heroImages, trustBadges } from "@/data/mockData";
import { Button } from "@/components/ui/Button";

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
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Fifth Avenue · By appointment
          </p>
          <h1
            id="hero-heading"
            className="max-w-xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl"
          >
            The quiet authority of a perfectly composed smile.
          </h1>
          <p className="mt-6 max-w-lg text-base text-ivory-200/90 sm:text-lg">
            DentArt is New York’s private dental atelier—where reconstructive medicine, smile
            architecture, and concierge hospitality meet. Arrive as a patient. Leave as a reference.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="gold" size="lg" onClick={() => scrollToId("booking")}>
              Book Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => scrollToId("emergency")}>
              24/7 Emergency Triage
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
          className="self-end rounded-3xl border border-white/15 bg-white/8 p-6 backdrop-blur-md"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-gold-300">Clinical credentials</p>
          <p className="mt-2 font-serif text-2xl">{clinicInfo.tagline}</p>
          <ul className="mt-5 space-y-3">
            {certifications.map((item) => (
              <li key={item.id} className="flex items-center gap-3 text-sm text-ivory-100/90">
                <Shield className="h-4 w-4 text-gold-400" aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </section>
  );
}

function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
