"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Scale, Star } from "lucide-react";
import {
  testimonials,
  testimonialsCtaLabel,
  testimonialsCtaPrompt,
  testimonialsDisclaimer,
  testimonialsEyebrow,
  testimonialsHeading,
  testimonialsIntro,
  testimonialsStarLabel,
} from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn, scrollToId } from "@/lib/utils";

function useCarouselPageSize(): number {
  const [pageSize, setPageSize] = useState(1);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => setPageSize(media.matches ? 2 : 1);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return pageSize;
}

export function Testimonials() {
  const pageSize = useCarouselPageSize();
  const reducedMotion = usePrefersReducedMotion();
  const [page, setPage] = useState(0);
  const statusId = useId();
  const pageCount = Math.max(1, Math.ceil(testimonials.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const visible = testimonials.slice(safePage * pageSize, safePage * pageSize + pageSize);

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  const go = (direction: -1 | 1) => {
    setPage((current) => {
      const next = current + direction;
      if (next < 0) {
        return pageCount - 1;
      }
      if (next >= pageCount) {
        return 0;
      }
      return next;
    });
  };

  const cards = (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {visible.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl border border-black/10 bg-white p-5 shadow-lift md:p-6"
          aria-labelledby={`testimonial-${item.id}`}
        >
          <blockquote className="font-serif text-lg italic leading-7 text-ink-900 md:text-xl">
            “{item.quote}”
          </blockquote>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: item.rating }).map((_, starIndex) => (
                <Star
                  key={`${item.id}-star-${starIndex}`}
                  className="h-4 w-4 fill-lime-500 text-lime-500"
                />
              ))}
            </div>
            <span className="type-eyebrow">{testimonialsStarLabel}</span>
          </div>
          <p id={`testimonial-${item.id}`} className="mt-3 text-sm font-medium text-ink-900">
            {item.initials}
          </p>
          <p className="type-caption mt-1">{item.location}</p>
        </article>
      ))}
    </div>
  );

  const controls = (
    <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:justify-between">
      <p id={statusId} className="text-sm text-black/70" aria-live="polite">
        {safePage + 1} de {pageCount}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="!h-11 !w-11 !px-0"
          aria-label="Reseñas anteriores"
          onClick={() => go(-1)}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="!h-11 !w-11 !px-0"
          aria-label="Reseñas siguientes"
          onClick={() => go(1)}
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
      <div className="flex items-center gap-1.5" role="tablist" aria-label="Páginas de reseñas">
        {Array.from({ length: pageCount }).map((_, itemIndex) => (
          <button
            key={`resenas-page-${itemIndex}`}
            type="button"
            role="tab"
            aria-selected={itemIndex === safePage}
            aria-label={`Mostrar reseñas, página ${itemIndex + 1}`}
            className="relative h-2 w-2 rounded-full"
            onClick={() => setPage(itemIndex)}
          >
            <span className="absolute -inset-5 min-h-11 min-w-11" aria-hidden="true" />
            <span
              className={cn(
                "block h-2 w-2 rounded-full",
                itemIndex === safePage ? "bg-lime-500" : "bg-black/20",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="resenas" aria-labelledby="reviews-heading" className="bg-white py-16 md:py-20">
      <div className="section-x">
        <p className="type-eyebrow">{testimonialsEyebrow}</p>
        <h2 id="reviews-heading" className="type-section mt-3">
          {testimonialsHeading}
        </h2>
        <p className="type-body mt-4 max-w-2xl">{testimonialsIntro}</p>

        <div className="mt-8" aria-describedby={statusId}>
          {reducedMotion ? (
            cards
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={safePage}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.28 }}
              >
                {cards}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {controls}

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3">
          <p className="text-black/75">{testimonialsCtaPrompt}</p>
          <Button variant="primary" onClick={() => scrollToId("booking")}>
            {testimonialsCtaLabel}
          </Button>
        </div>

        <p className="type-caption mt-8 flex max-w-2xl items-start gap-2">
          <Scale className="mt-0.5 h-4 w-4 shrink-0 text-lime-800" aria-hidden="true" />
          <span>{testimonialsDisclaimer}</span>
        </p>
      </div>
    </section>
  );
}
