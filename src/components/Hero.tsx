"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BrandLockup } from "@/components/BrandLockup";
import { CinematicButterfly } from "@/components/CinematicButterfly";
import { HeroDepthCards } from "@/components/hero/HeroDepthCards";
import { LocationSwitch } from "@/components/LocationSwitch";
import { useClinicLocation } from "@/components/LocationProvider";
import { Button } from "@/components/ui/Button";
import {
  clinicInfo,
  emergencyPrefillMessage,
  heroSubhead,
  heroImages,
} from "@/data/mockData";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Hero() {
  const dockRef = useRef<HTMLSpanElement>(null);
  const [lockupVisible, setLockupVisible] = useState(false);
  const onSettled = useCallback(() => setLockupVisible(true), []);
  const reducedMotion = usePrefersReducedMotion();
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
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-mist to-transparent" />

      <HeroDepthCards />
      <CinematicButterfly targetRef={dockRef} onSettled={onSettled} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.55 }}
          className="relative z-10 max-w-3xl"
        >
          <h1 id="hero-heading">
            <BrandLockup dockRef={dockRef} showLockup={lockupVisible} size="hero" />
          </h1>
          <p data-hero-exclude className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
            {heroSubhead}
          </p>
          <LocationSwitch tone="hero" className="mt-6 w-full sm:w-auto" />
          <div data-hero-exclude className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => scrollToId("booking")}
            >
              Agendar cita
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-lime-500/80 px-7 py-3.5 text-center text-xs uppercase tracking-[0.12em] text-white hover:bg-white/10 sm:w-auto sm:text-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Emergencia por WhatsApp ({clinicInfo.phoneDisplay})
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
