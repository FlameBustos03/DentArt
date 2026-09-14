"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { BrandLockup } from "@/components/BrandLockup";
import { CinematicButterfly } from "@/components/CinematicButterfly";
import { LocationSwitch } from "@/components/LocationSwitch";
import { useClinicLocation } from "@/components/LocationProvider";
import { Button } from "@/components/ui/Button";
import {
  clinicHoursLabel,
  clinicInfo,
  emergencyPrefillMessage,
  heroSubhead,
  heroImages,
  trustBadges,
} from "@/data/mockData";
import { buildWhatsAppUrl, scrollToId } from "@/lib/utils";

export function Hero() {
  const dockRef = useRef<HTMLSpanElement>(null);
  const [lockupVisible, setLockupVisible] = useState(false);
  const onSettled = useCallback(() => setLockupVisible(true), []);
  const { location } = useClinicLocation();
  const whatsappHref = buildWhatsAppUrl(
    clinicInfo.whatsappNumber,
    `${emergencyPrefillMessage} ${location.city}.`,
  );

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-ink-900 text-white"
    >
      <Image
        src={heroImages.portrait.src}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink-veil" />
      <div className="hero-ambient" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />

      <CinematicButterfly targetRef={dockRef} onSettled={onSettled} />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 max-w-3xl"
        >
          <LocationSwitch tone="hero" className="mb-6" />
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-500/40 bg-white/5 px-4 py-2 text-sm text-white">
            <MapPin className="h-4 w-4 text-lime-400" aria-hidden="true" />
            <span>
              {location.city} · {location.addressLines[0]}
            </span>
          </p>

          <h1 id="hero-heading">
            <BrandLockup
              dockRef={dockRef}
              showLockup={lockupVisible}
              size="hero"
              plate
            />
          </h1>
          <p data-hero-exclude className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
            {heroSubhead}
          </p>
          <div data-hero-exclude className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" size="lg" onClick={() => scrollToId("booking")}>
              Agendar cita
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-lime-500/80 px-7 py-3.5 text-sm uppercase tracking-[0.16em] text-white hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Emergencia por WhatsApp ({clinicInfo.phoneDisplay})
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-3">
            {trustBadges.map((badge) => (
              <li
                key={badge.id}
                className="rounded-full border border-lime-500/40 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur"
              >
                {badge.value}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-white/70">{clinicHoursLabel}</p>
        </motion.div>
      </div>
    </section>
  );
}
