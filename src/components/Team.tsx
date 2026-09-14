import { leadClinician, locations, unnamedClinicians } from "@/data/mockData";

export function Team() {
  const pozaRica = locations.find((location) => location.id === "poza-rica");
  const villahermosa = locations.find((location) => location.id === "villahermosa");

  return (
    <section id="equipo" aria-labelledby="team-heading" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-lime-800">Quién te atiende</p>
        <h2 id="team-heading" className="mt-3 font-serif text-3xl text-ink-900 sm:text-5xl">
          Quién te atiende
        </h2>

        <article className="mt-10 max-w-xl rounded-3xl border border-black/10 bg-mist p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-lime-800">{leadClinician.focus}</p>
          <h3 className="mt-2 font-serif text-3xl text-ink-900">{leadClinician.name}</h3>
          <p className="mt-4 text-black/70">{leadClinician.blurb}</p>
        </article>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {unnamedClinicians.map((clinician) => (
            <li key={clinician.id} className="rounded-2xl border border-black/10 bg-white px-5 py-4">
              <p className="text-xs uppercase tracking-[0.16em] text-lime-800">{clinician.sede}</p>
              <p className="mt-2 font-serif text-xl text-ink-900">{clinician.role}</p>
              <p className="mt-2 text-sm text-black/55">Sin nombre publicado.</p>
            </li>
          ))}
        </ul>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          <li className="text-sm text-black/70">
            <span className="font-medium text-ink-900">Poza Rica · </span>
            {pozaRica?.teamCapacity ?? "Equipo de dos doctores"}
          </li>
          <li className="text-sm text-black/70">
            <span className="font-medium text-ink-900">Villahermosa · </span>
            {villahermosa?.teamCapacity ?? "Un doctor"}
          </li>
        </ul>
      </div>
    </section>
  );
}
