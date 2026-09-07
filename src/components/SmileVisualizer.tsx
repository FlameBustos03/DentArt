"use client";

import { useCallback, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { visualizerCases } from "@/data/mockData";
import type { VisualizerCase } from "@/types";
import { cn } from "@/lib/utils";

export function SmileVisualizer() {
  const [activeId, setActiveId] = useState(visualizerCases[0].id);
  const [position, setPosition] = useState(52);
  const activeCase = visualizerCases.find((item) => item.id === activeId) ?? visualizerCases[0];

  const updateFromClientX = useCallback((clientX: number, target: HTMLElement) => {
    const bounds = target.getBoundingClientRect();
    const next = ((clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(96, Math.max(4, next)));
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    target.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX, target);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      updateFromClientX(event.clientX, event.currentTarget);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((value) => Math.max(4, value - 4));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((value) => Math.min(96, value + 4));
    }
    if (event.key === "Home") {
      event.preventDefault();
      setPosition(4);
    }
    if (event.key === "End") {
      event.preventDefault();
      setPosition(96);
    }
  };

  return (
    <section id="visualizer" aria-labelledby="visualizer-heading" className="bg-ivory-100 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-gold-600">Interactive atelier</p>
        <h2
          id="visualizer-heading"
          className="mt-3 max-w-2xl font-serif text-3xl text-navy-900 sm:text-5xl"
        >
          Before & after smile visualizer
        </h2>
        <p className="mt-4 max-w-2xl text-stone-600">
          Drag or use arrow keys to reveal the finished composition. Cases represent typical
          DentArt outcomes in smile design, orthodontics, and veneers.
        </p>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Treatment cases">
          {visualizerCases.map((item) => (
            <CaseTab
              key={item.id}
              item={item}
              selected={item.id === activeId}
              onSelect={() => {
                setActiveId(item.id);
                setPosition(52);
              }}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div
            role="slider"
            tabIndex={0}
            aria-label={`${activeCase.category} before and after comparison`}
            aria-valuemin={4}
            aria-valuemax={96}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(position)} percent after revealed`}
            className="relative aspect-[16/11] cursor-ew-resize overflow-hidden rounded-3xl border border-ivory-300 bg-navy-900 shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onKeyDown={onKeyDown}
          >
            <Image
              src={activeCase.afterImage.src}
              alt={activeCase.afterImage.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                src={activeCase.beforeImage.src}
                alt={activeCase.beforeImage.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
            <div
              className="absolute inset-y-0 z-10 w-px bg-gold-300"
              style={{ left: `${position}%` }}
              aria-hidden="true"
            >
              <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold-300 bg-navy-900 text-xs uppercase tracking-widest text-ivory-100">
                Drag
              </span>
            </div>
            <span className="absolute left-4 top-4 rounded-full bg-navy-950/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-ivory-100">
              Before
            </span>
            <span className="absolute right-4 top-4 rounded-full bg-gold-500/90 px-3 py-1 text-xs uppercase tracking-[0.18em] text-navy-950">
              After
            </span>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-600">{activeCase.category}</p>
            <h3 className="mt-2 font-serif text-3xl text-navy-900">{activeCase.title}</h3>
            <p className="mt-4 text-stone-600">{activeCase.description}</p>
            <p className="mt-6 text-sm uppercase tracking-[0.16em] text-navy-800">
              Typical course · {activeCase.treatmentDuration}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CaseTabProps {
  item: VisualizerCase;
  selected: boolean;
  onSelect: () => void;
}

function CaseTab({ item, selected, onSelect }: CaseTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-colors",
        selected
          ? "border-navy-900 bg-navy-900 text-ivory-100"
          : "border-ivory-300 bg-ivory-50 text-navy-800 hover:border-gold-500",
      )}
      onClick={onSelect}
    >
      {item.category}
    </button>
  );
}
