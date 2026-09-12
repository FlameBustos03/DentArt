"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, BookOpen, HeartHandshake } from "lucide-react";
import { medicalDirector, philanthropyPrograms } from "@/data/mockData";
import { TiltCard } from "@/components/ui/TiltCard";

export function DoctorAuthority() {
  return (
    <section id="doctor" aria-labelledby="doctor-heading" className="scroll-mt-24 bg-mist py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-lime-800">Authority & philanthropy</p>
        <h2 id="doctor-heading" className="mt-3 font-serif text-3xl text-ink-900 sm:text-5xl">
          The medical director behind the studio
        </h2>
        <p className="mt-4 max-w-2xl text-black/70">
          Dent Art’s celebrity outcomes are directed by Dr. Elise Moreau—not a borrowed Hollywood
          name. Credentials, books, and community impact are published here because VIP guests
          deserve a dossier, not a slogan.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-black/10 shadow-lift"
          >
            <Image
              src={medicalDirector.portrait.src}
              alt={medicalDirector.portrait.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 36vw, 100vw"
            />
          </motion.figure>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-lime-800">{medicalDirector.title}</p>
            <h3 className="mt-2 font-serif text-3xl text-ink-900">{medicalDirector.name}</h3>
            <p className="mt-2 text-sm text-black/55">{medicalDirector.credentials}</p>
            <p className="mt-5 text-black/70">{medicalDirector.bio}</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-lime-800">
                  <Award className="h-4 w-4" aria-hidden="true" />
                  International awards
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-ink-800">
                  {medicalDirector.awards.map((award) => (
                    <li key={award}>{award}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-lime-800">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Books published
                </h4>
                <ul className="mt-3 space-y-3 text-sm text-ink-800">
                  {medicalDirector.books.map((book) => (
                    <li key={book.title}>
                      <span className="font-medium">
                        {book.title} ({book.year})
                      </span>
                      <span className="mt-1 block text-black/55">{book.note}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs uppercase tracking-[0.14em] text-black/55">
                  Fellowships · {medicalDirector.fellowships.join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="flex items-center gap-2 font-serif text-2xl text-ink-900 sm:text-3xl">
            <HeartHandshake className="h-6 w-6 text-lime-800" aria-hidden="true" />
            Community impact
          </h3>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {philanthropyPrograms.map((program, index) => (
              <motion.li
                key={program.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.07 }}
              >
                <TiltCard className="glass-card rounded-3xl bg-white">
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-[0.16em] text-lime-800">{program.impact}</p>
                    <h4 className="mt-2 font-serif text-xl text-ink-900">{program.name}</h4>
                    <p className="mt-3 text-sm text-black/70">{program.description}</p>
                    <p className="mt-5 text-sm uppercase tracking-[0.14em] text-lime-800">{program.metric}</p>
                  </div>
                </TiltCard>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
