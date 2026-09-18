import Image from "next/image";
import { BadgeCheck, FileCheck2 } from "lucide-react";
import { clinicalTeams, leadClinician } from "@/data/mockData";
import { Reveal } from "@/components/ui/Reveal";
import type { TeamMember } from "@/types";

function ClinicianRow({ member }: { member: TeamMember }) {
  return (
    <li className="flex items-center gap-3">
      {member.photo ? (
        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-mist">
          <Image
            src={member.photo.src}
            alt={member.photo.alt}
            fill
            className="object-cover object-top"
            sizes="64px"
          />
        </div>
      ) : (
        <div
          className="flex h-20 w-16 shrink-0 items-center justify-center rounded-xl bg-mist"
          aria-hidden="true"
        >
          <span className="font-serif text-lg leading-none text-ink-900">{member.initials}</span>
        </div>
      )}
      <span className="min-w-0">
        <span className="block font-serif text-lg leading-snug text-ink-900">{member.name}</span>
        <span className="type-caption break-words">{member.role}</span>
      </span>
    </li>
  );
}

export function ClinicianProfile() {
  return (
    <article className="overflow-hidden rounded-3xl border border-black/10 bg-mist">
      <div className="grid items-start gap-8 p-6 sm:p-8 lg:grid-cols-[360px_minmax(0,1fr)]">
        <Reveal className="min-w-0">
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
        </Reveal>
        <Reveal delay={0.1} className="min-w-0">
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
        </Reveal>
      </div>
    </article>
  );
}

export function TeamBySede() {
  return (
    <div className="mt-8">
      <Reveal>
        <h3 id="clinical-team-heading" className="type-section text-white">
          Equipo clínico
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-[1.625rem] text-white/85">
          Atención en dos sedes, con el mismo compromiso de cuidado cercano y profesional.
        </p>
      </Reveal>
      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {clinicalTeams.map((team, teamIndex) => (
          <li key={team.locationId} className="min-w-0">
            <Reveal
              delay={teamIndex * 0.1}
              className="card-lift h-full min-w-0 overflow-hidden rounded-2xl border border-black/10 bg-white p-6"
            >
              <p className="type-eyebrow min-w-0 break-words">{team.city}</p>
              <p className="mt-2 text-sm text-ink-800">{team.capacity}</p>
              <p className="type-body mt-3">{team.body}</p>
              <ul className="mt-5 grid gap-3">
                {team.members.map((member) => (
                  <ClinicianRow key={`${team.locationId}-${member.name}`} member={member} />
                ))}
              </ul>
            </Reveal>
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
