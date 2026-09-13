"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
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
import { HeroButterfly } from "@/components/hero/HeroButterfly";
import { HeroDepthCards } from "@/components/hero/HeroDepthCards";
import type { PointerNorm } from "@/components/hero/types";
import { Button } from "@/components/ui/Button";
import { scrollToId } from "@/lib/utils";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pointerRef = useRef<PointerNorm>({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const [visible, setVisible] = useState(true);
  const [awake, setAwake] = useState(true);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      scrollRef.current = progress;
      node.style.setProperty("--hero-scroll", progress.toFixed(3));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.08 },
    );

    observer.observe(node);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    idleTimerRef.current = setTimeout(() => setAwake(false), 1800);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }
    const rect = node.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    pointerRef.current = { x, y };
    node.style.setProperty("--hero-px", x.toFixed(3));
    node.style.setProperty("--hero-py", y.toFixed(3));
    setAwake((current) => (current ? current : true));
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => setAwake(false), 1800);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-ink-900 text-white"
    >
      <Image
        src={heroImages.portrait.src}
        alt={heroImages.portrait.alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink-veil" />
      <div className="hero-ambient" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      <HeroDepthCards />
      <HeroButterfly pointerRef={pointerRef} scrollRef={scrollRef} visible={visible} awake={awake} />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative z-10"
        >
          <p className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-lime-400">
            <Sparkles className="h-4 w-4 text-lime-500" aria-hidden="true" />
            Poza Rica, Veracruz · VIP Smile Studio
          </p>
          <h1
            id="hero-heading"
            data-hero-exclude
            className="max-w-[16ch] font-serif text-4xl italic leading-tight text-lime-400 sm:max-w-2xl sm:text-5xl lg:text-7xl"
          >
            {clinicInfo.slogan}
          </h1>
          <p
            data-hero-exclude
            className="mt-5 max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Transforming Smiles, Redefining Confidence
          </p>
          <p data-hero-exclude className="mt-6 max-w-lg text-base text-white/85 sm:text-lg">
            Dent Art is Poza Rica’s private dental studio—Hollywood-grade ceramics, concierge
            hospitality, and reconstructive medicine under one roof. Arrive as a guest. Leave as a
            reference.
          </p>
          <div data-hero-exclude className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" size="lg" onClick={() => scrollToId("booking")}>
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
                className="rounded-full border border-lime-500/40 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur"
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
          data-hero-exclude
          className="glass-dark relative z-10 self-end rounded-3xl p-6"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-lime-400">Clinical credentials</p>
          <p className="mt-2 font-serif text-2xl text-white">{clinicInfo.tagline}</p>
          <ul className="mt-5 space-y-3">
            {certifications.map((item) => (
              <li key={item.id} className="flex items-center gap-3 text-sm text-white/90">
                <Shield className="h-4 w-4 text-lime-500" aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-ink-900/55 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <p className="mb-3 text-center text-[10px] uppercase tracking-[0.32em] text-lime-400 sm:text-left">
            Media trust bar
          </p>
          <ul
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
            aria-label="As featured in national media"
          >
            {mediaOutlets.map((outlet, index) => (
              <motion.li
                key={outlet.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center"
              >
                <span className="block font-serif text-lg tracking-wide text-white sm:text-xl">
                  {outlet.name}
                </span>
                <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-white/70">
                  {outlet.caption}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
