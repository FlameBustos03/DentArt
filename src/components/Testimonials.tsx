"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { testimonials } from "@/data/mockData";
import type { Testimonial } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [videoItem, setVideoItem] = useState<Testimonial | null>(null);
  const statusId = useId();
  const active = testimonials[index];

  const go = (direction: -1 | 1) => {
    setIndex((current) => {
      const next = current + direction;
      if (next < 0) {
        return testimonials.length - 1;
      }
      if (next >= testimonials.length) {
        return 0;
      }
      return next;
    });
  };

  return (
    <section
      id="celebrity-smiles"
      aria-labelledby="reviews-heading"
      className="scroll-mt-24 bg-navy-900 py-20 text-ivory-100"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-gold-300">Celebrity & patient voices</p>
        <h2 id="reviews-heading" className="mt-3 font-serif text-3xl sm:text-5xl">
          Verified smiles, private screenings
        </h2>
        <p className="mt-4 max-w-2xl text-ivory-200/85">
          Star reviews from named patients sit beside confidential talent testimonials. Identities
          stay withheld unless a guest authorizes a private viewing at consultation.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p id={statusId} className="text-sm text-ivory-200/80" aria-live="polite">
            Story {index + 1} of {testimonials.length}
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="!px-3"
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="!px-3"
              aria-label="Next testimonial"
              onClick={() => go(1)}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="glass-dark mt-6 grid gap-6 rounded-3xl p-5 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"
            aria-labelledby={`testimonial-${active.id}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-800 sm:aspect-[16/11] lg:aspect-[4/5]">
              <Image
                src={active.image.src}
                alt={active.image.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 36vw, 100vw"
              />
              {active.kind === "video" ? (
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center bg-navy-950/25"
                  onClick={() => setVideoItem(active)}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-400 bg-navy-950/80">
                    <Play className="h-6 w-6 text-gold-300" aria-hidden="true" />
                  </span>
                  <span className="sr-only">
                    Open private video testimonial for {active.name}
                    {active.duration ? `, duration ${active.duration}` : ""}
                  </span>
                </button>
              ) : null}
              {active.kind === "video" && active.duration ? (
                <span className="absolute bottom-3 right-3 rounded-full bg-navy-950/80 px-3 py-1 text-xs uppercase tracking-[0.14em] text-ivory-100">
                  {active.duration}
                </span>
              ) : null}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-teal-300">
                {active.kind === "video" ? "Video testimonial" : "Verified patient review"}
              </p>
              <h3 id={`testimonial-${active.id}`} className="mt-2 font-serif text-3xl">
                {active.name}
              </h3>
              <p className="mt-1 text-sm text-ivory-200/75">
                {active.treatment} · {active.location}
              </p>
              <div
                className="mt-4 flex items-center gap-1"
                aria-label={`${active.rating} out of 5 stars`}
              >
                {Array.from({ length: active.rating }).map((_, starIndex) => (
                  <Star
                    key={`${active.id}-star-${starIndex}`}
                    className="h-4 w-4 fill-gold-500 text-gold-500"
                    aria-hidden="true"
                  />
                ))}
                {active.verified ? (
                  <span className="ml-2 text-xs uppercase tracking-[0.14em] text-gold-300">
                    Verified
                  </span>
                ) : null}
              </div>
              <blockquote className="mt-5 text-lg leading-relaxed text-ivory-100/95">
                “{active.quote}”
              </blockquote>
              {active.kind === "video" ? (
                <Button
                  variant="gold"
                  size="sm"
                  className="mt-6"
                  onClick={() => setVideoItem(active)}
                >
                  Request private screening
                </Button>
              ) : null}
            </div>
          </motion.article>
        </AnimatePresence>

        <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Testimonial slides">
          {testimonials.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={`Show testimonial ${itemIndex + 1}: ${item.name}`}
              className={cn(
                "h-2.5 rounded-full transition-all",
                itemIndex === index ? "w-8 bg-gold-400" : "w-2.5 bg-white/30 hover:bg-white/60",
              )}
              onClick={() => setIndex(itemIndex)}
            />
          ))}
        </div>
      </div>

      <Modal
        open={Boolean(videoItem)}
        title={videoItem ? `Private screening · ${videoItem.name}` : "Private screening"}
        onClose={() => setVideoItem(null)}
      >
        {videoItem ? (
          <div className="space-y-4 text-stone-600">
            <div className="flex aspect-video items-center justify-center rounded-2xl bg-navy-900 text-ivory-100">
              <div className="px-6 text-center">
                <Play className="mx-auto h-10 w-10 text-gold-300" aria-hidden="true" />
                <p className="mt-3 font-serif text-2xl">Screening reserved</p>
                <p className="mt-2 text-sm text-ivory-200/80">
                  {videoItem.duration ? `Runtime ${videoItem.duration}` : "Private runtime"}
                </p>
              </div>
            </div>
            <p>{videoItem.privacyNote}</p>
            <p>
              DentArt does not stream talent identities on a public page. Book a VIP consultation to
              request a confidential viewing in-suite or over encrypted video.
            </p>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
