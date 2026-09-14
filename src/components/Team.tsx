import Image from "next/image";
import { UserRound } from "lucide-react";
import { clinicalTeams, leadClinician } from "@/data/mockData";

export function ClinicianProfile() {
  return (
    <article className="overflow-hidden rounded-3xl border border-black/10 bg-mist">
      <div className="grid items-start gap-8 p-6 sm:p-8 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="relative h-[420px] w-full max-w-[360px] overflow-hidden rounded-2xl bg-white">
          <Image
            src={leadClinician.photo.src}
            alt={leadClinician.photo.alt}
            width={leadClinician.photo.width}
            height={leadClinician.photo.height}
            className="h-full w-full object-cover object-top"
            sizes="360px"
          />
        </div>
        <div className="min-w-0">
          <p className="type-eyebrow">{leadClinician.eyebrow}</p>
          <h2 id="team-heading" className="type-section mt-2">
            {leadClinician.name}
          </h2>
          <p className="mt-2 text-sm text-ink-800">{leadClinician.role}</p>
          <div className="type-body mt-5 space-y-4">
            {leadClinician.blurb.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function TeamBySede() {
  return (
    <div className="mt-8">
      <h3 id="clinical-team-heading" className="type-section">
        Equipo clínico
      </h3>
      <p className="type-body mt-3 max-w-2xl">
        Atención en dos sedes, con el mismo compromiso de cuidado cercano y profesional.
      </p>
      <ul className="mt-8 grid gap-6 lg:grid-cols-2">
        {clinicalTeams.map((team) => (
          <li key={team.locationId} className="card-lift rounded-2xl border border-black/10 bg-white p-6">
            <h4 className="type-card">{team.city}</h4>
            <p className="mt-2 text-sm text-ink-800">{team.summary}</p>
            <p className="mt-1 text-sm text-black/65">{team.address}</p>
            <ul className="mt-5 grid gap-3">
              {Array.from({ length: team.unnamedCount }, (_, index) => (
                <li
                  key={`${team.locationId}-${index}`}
                  className="flex items-center gap-3 rounded-2xl border border-black/10 bg-mist px-4 py-3"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-lime-800">
                    <UserRound className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-serif text-lg text-ink-900">{team.unnamedLabel}</span>
                    <span className="type-caption">Equipo clínico · {team.city}</span>
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Team() {
  return (
    <section id="equipo" aria-labelledby="team-heading" className="bg-white pb-16 pt-16 md:pt-20">
      <div className="section-x">
        <ClinicianProfile />
        <TeamBySede />
      </div>
    </section>
  );
}
