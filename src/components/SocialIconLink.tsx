import type { ReactNode, SVGProps } from "react";
import { cn } from "@/lib/utils";

export type SocialNetwork = "instagram" | "facebook";

export interface SocialIconLinkProps {
  href: string;
  network: SocialNetwork;
  label: string;
  className?: string;
}

function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.35" cy="6.65" r="1.05" fill="currentColor" />
    </svg>
  );
}

function FacebookGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.2 8.4h2.7V5.3h-2.7c-2.5 0-4.5 2-4.5 4.5v1.7H7.5v3.1h2.2V21h3.3v-6.4h2.5l.5-3.1h-3V9.8c0-.8.6-1.4 1.4-1.4Z" />
    </svg>
  );
}

const glyphs: Record<SocialNetwork, (props: SVGProps<SVGSVGElement>) => ReactNode> = {
  instagram: InstagramGlyph,
  facebook: FacebookGlyph,
};

export function SocialIconLink({ href, network, label, className }: SocialIconLinkProps) {
  const Glyph = glyphs[network];

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center text-ink-900 transition-colors hover:text-lime-800",
        className,
      )}
    >
      <Glyph className="h-[22px] w-[22px]" />
    </a>
  );
}
