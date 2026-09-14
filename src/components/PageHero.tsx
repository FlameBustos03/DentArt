import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pageHeroTrustLine } from "@/data/mockData";
import { cn } from "@/lib/utils";

export interface PageHeroCta {
  label: string;
  href: string;
  external?: boolean;
}

export interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead: string;
  titleId?: string;
  primaryCta?: PageHeroCta;
  secondaryCta?: PageHeroCta;
  hairline?: boolean;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  lead,
  titleId = "page-hero-heading",
  primaryCta,
  secondaryCta,
  hairline = true,
  children,
}: PageHeroProps) {
  return (
    <header className="bg-mist">
      <div className="section-band mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-lime-800">{eyebrow}</p>
        <h1
          id={titleId}
          className="mt-3 font-serif text-[30px] leading-9 text-ink-900 sm:text-4xl sm:leading-[48px] md:text-[40px] md:leading-[48px]"
        >
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-[26px] text-[color:var(--text-body)]">{lead}</p>
        <p className="mt-3 text-sm text-[color:var(--text-muted)]">{pageHeroTrustLine}</p>
        {primaryCta || secondaryCta ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {primaryCta ? (
              <ButtonLink href={primaryCta.href} className="w-full sm:w-auto" variant="primary">
                {primaryCta.label}
              </ButtonLink>
            ) : null}
            {secondaryCta ? (
              <ButtonLink
                href={secondaryCta.href}
                className="w-full sm:w-auto"
                variant="ghost"
                {...(secondaryCta.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {secondaryCta.label}
              </ButtonLink>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
      {hairline ? <div className="lime-hairline h-px w-full" aria-hidden="true" /> : null}
    </header>
  );
}

export function PageHeroActions({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mt-8 flex flex-col gap-3 sm:flex-row", className)}>{children}</div>;
}
