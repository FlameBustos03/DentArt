import { insurers, insurersMicrocopy } from "@/data/mockData";

export function Insurers() {
  return (
    <section id="seguros" aria-labelledby="insurers-heading" className="scroll-mt-24 bg-mist py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-lime-800">Seguros</p>
        <h2 id="insurers-heading" className="mt-3 font-serif text-3xl text-ink-900 sm:text-5xl">
          Dentegra y Dentalia, aceptadas
        </h2>
        <p className="mt-4 max-w-2xl text-black/70">{insurersMicrocopy}</p>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {insurers.map((insurer) => (
            <li key={insurer.id} className="rounded-3xl border border-lime-500/25 bg-white p-6">
              <h3 className="font-serif text-2xl text-ink-900">{insurer.name}</h3>
              <p className="mt-3 text-sm text-black/70">{insurer.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
