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
    <div className="grid gap-6 md:grid-cols-2">
      {visible.map((item) => (
        <article
          key={item.id}
          className="rounded-3xl border border-black/10 bg-white p-6"
          aria-labelledby={`testimonial-${item.id}`}
        >
          <h3 id={`testimonial-${item.id}`} className="font-serif text-3xl text-ink-900">
            {item.initials} · {item.location}
          </h3>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: item.rating }).map((_, starIndex) => (
                <Star
                  key={`${item.id}-star-${starIndex}`}
                  className="h-4 w-4 fill-lime-500 text-lime-500"
                />
              ))}
            </div>
            <span className="text-xs uppercase tracking-[0.14em] text-lime-800">
              {testimonialsStarLabel}
            </span>
          </div>
          <blockquote className="mt-5 text-lg leading-relaxed text-black/80">
            “{item.quote}”
          </blockquote>
        </article>
      ))}
    </div>
  );

  return (
    <section id="resenas" aria-labelledby="reviews-heading" className="bg-mist py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-lime-800">{testimonialsEyebrow}</p>
        <h2 id="reviews-heading" className="mt-3 font-serif text-3xl text-ink-900 sm:text-5xl">
          {testimonialsHeading}
        </h2>
        <p className="mt-4 max-w-2xl text-black/70">{testimonialsIntro}</p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p id={statusId} className="text-sm text-black/70" aria-live="polite">
            {safePage + 1} de {pageCount}
          </p>
          <div className="flex gap-2">
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
        </div>

        <div className="mt-6" aria-describedby={statusId}>
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

        <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Páginas de reseñas">
          {Array.from({ length: pageCount }).map((_, itemIndex) => (
            <button
              key={`resenas-page-${itemIndex}`}
              type="button"
              role="tab"
              aria-selected={itemIndex === safePage}
              aria-label={`Mostrar reseñas, página ${itemIndex + 1}`}
              className={cn(
                "h-2.5 rounded-full transition-all",
                itemIndex === safePage ? "w-8 bg-lime-500" : "w-2.5 bg-black/20 hover:bg-black/40",
              )}
              onClick={() => setPage(itemIndex)}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3">
          <p className="text-black/75">{testimonialsCtaPrompt}</p>
          <span className="hidden text-black/40 sm:inline" aria-hidden="true">
            ·
          </span>
          <Button variant="primary" onClick={() => scrollToId("booking")}>
            {testimonialsCtaLabel}
          </Button>
        </div>

        <p className="mt-8 flex max-w-3xl items-start gap-2 text-sm text-black/65">
          <Scale className="mt-0.5 h-4 w-4 shrink-0 text-lime-800" aria-hidden="true" />
          <span>{testimonialsDisclaimer}</span>
        </p>
      </div>
    </section>
  );
}
