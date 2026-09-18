import Image from "next/image";
import { clinicalTeams, leadClinician } from "@/data/mockData";
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
        <span className="text-sm text-black/65">{member.role}</span>
      </span>
    </li>
  );
}

export function ClinicianProfile({
  headingId = "team-heading",
  nameAs = "h2",
  blurb = leadClinician.blurb,
  showEyebrow = true,
}: {
  headingId?: string;
  nameAs?: "h2" | "h3" | "p";
  blurb?: string[];
  showEyebrow?: boolean;
}) {
  const NameTag = nameAs;

  return (
    <article className="overflow-hidden rounded-card border border-[color:var(--border-subtle)] bg-mist">
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
          {showEyebrow ? (
            <p className="text-xs uppercase tracking-[0.18em] text-lime-800">{leadClinician.eyebrow}</p>
          ) : null}
          <NameTag id={headingId} className="mt-2 font-serif text-3xl text-ink-900 sm:text-4xl">
            {leadClinician.name}
          </NameTag>
          <p className="mt-2 text-sm text-ink-800">{leadClinician.role}</p>
          <div className="mt-5 space-y-4 text-black/70">
            {blurb.map((paragraph, index) => (
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
    <div className="mt-14">
      <h3 id="clinical-team-heading" className="font-serif text-3xl text-ink-900 sm:text-4xl">
        Equipo clínico
      </h3>
      <p className="mt-3 max-w-2xl text-black/70">
        Atención en dos sedes, con el mismo compromiso de cuidado cercano y profesional.
      </p>
      <ul className="mt-8 grid gap-6 lg:grid-cols-2">
        {clinicalTeams.map((team) => (
          <li key={team.locationId} className="min-w-0 rounded-3xl border border-black/10 bg-white p-6">
            <h4 className="min-w-0 break-words font-serif text-2xl text-ink-900">{team.city}</h4>
            <p className="mt-2 text-sm text-ink-800">{team.capacity}</p>
            <p className="mt-3 text-black/70">{team.body}</p>
            <ul className="mt-5 grid gap-3">
              {team.members.map((member) => (
                <ClinicianRow key={`${team.locationId}-${member.name}`} member={member} />
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
    <section id="equipo" aria-labelledby="team-heading" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ClinicianProfile />
        <TeamBySede />
      </div>
    </section>
  );
}
