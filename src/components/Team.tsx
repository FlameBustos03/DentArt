import Image from "next/image";
import { BadgeCheck, FileCheck2, UserRound } from "lucide-react";
import { clinicalTeams, leadClinician } from "@/data/mockData";

export function ClinicianProfile() {
  return (
    <article className="overflow-hidden rounded-3xl border border-black/10 bg-mist">
      <div className="grid items-start gap-8 p-6 sm:p-8 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="min-w-0">
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
          <a
            href={leadClinician.cedula.src}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex max-w-[360px] items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 transition-colors hover:border-lime-800/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-lime-800">
              <FileCheck2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-ink-900">
                Cédula profesional {leadClinician.cedula.number}
              </span>
              <span className="type-caption block">Cirujano Dentista · SEP — ver documento</span>
            </span>
          </a>
        </div>
        <div className="min-w-0">
          <p className="type-eyebrow">{leadClinician.eyebrow}</p>
          <h2 id="team-heading" className="type-section mt-2">
            {leadClinician.name}
          </h2>
          <p className="mt-2 text-sm text-ink-800">{leadClinician.role}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {leadClinician.credentials.map((credential) => (
              <li
                key={credential}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs leading-tight text-ink-800"
              >
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-lime-800" aria-hidden="true" />
                {credential}
              </li>
            ))}
          </ul>
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
      <h3 id="clinical-team-heading" className="type-section text-white">
        Equipo clínico
      </h3>
      <p className="mt-3 max-w-2xl text-base leading-[1.625rem] text-white/85">
        Atención en dos sedes, con el mismo compromiso de cuidado cercano y profesional.
      </p>
      <ul className="mt-8 grid gap-6 lg:grid-cols-2">
        {clinicalTeams.map((team) => (
          <li key={team.locationId} className="card-lift min-w-0 overflow-hidden rounded-2xl border border-black/10 bg-white p-6">
            <h4 className="type-card min-w-0 break-words">{team.city}</h4>
            <p className="mt-2 text-sm text-ink-800">{team.summary}</p>
            <p className="mt-1 text-sm text-black/65">{team.address}</p>
            <ul className="mt-5 grid gap-3">
              {team.members.map((member) => (
                <li
                  key={`${team.locationId}-${member.name}`}
                  className="flex items-center gap-3 rounded-2xl border border-black/10 bg-mist px-4 py-3"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-lime-800">
                    <UserRound className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-serif text-lg leading-snug text-ink-900">{member.name}</span>
                    <span className="type-caption break-words">{member.role}</span>
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
    <section id="equipo" aria-labelledby="team-heading" className="bg-ink-900 pb-16 pt-16 text-white md:pt-20">
      <div className="section-x">
        <ClinicianProfile />
        <TeamBySede />
      </div>
    </section>
  );
}
