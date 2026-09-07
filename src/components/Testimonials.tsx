"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { testimonials } from "@/data/mockData";

export function Testimonials() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="bg-ivory-100 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-gold-600">Verified outcomes</p>
        <h2 id="reviews-heading" className="mt-3 font-serif text-3xl text-navy-900 sm:text-5xl">
          Patient letters, not slogans
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-ivory-300 bg-ivory-50 p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-serif text-xl text-navy-900">{item.name}</h3>
                  <p className="text-sm text-stone-500">
                    {item.treatment} · {item.location}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star
                    key={`${item.id}-star-${index}`}
                    className="h-4 w-4 fill-gold-500 text-gold-500"
                    aria-hidden="true"
                  />
                ))}
                {item.verified ? (
                  <span className="ml-2 text-xs uppercase tracking-[0.14em] text-gold-700">
                    Verified
                  </span>
                ) : null}
              </div>
              <blockquote className="mt-4 text-stone-600">“{item.quote}”</blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
