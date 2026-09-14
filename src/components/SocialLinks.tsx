import { socialLinks } from "@/data/mockData";
import { cn } from "@/lib/utils";

export interface SocialLinksProps {
  className?: string;
  tone?: "light" | "dark";
  compact?: boolean;
}

export function SocialLinks({ className, tone = "dark", compact = false }: SocialLinksProps) {
  const linkClass =
    tone === "dark" ? "text-white/85 hover:text-lime-400" : "text-ink-800 hover:text-lime-800";

  return (
    <ul className={cn("flex flex-wrap items-center gap-x-4 gap-y-2 text-sm", className)}>
      {socialLinks.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            {compact ? link.label : `${link.label} ${link.handle}`}
          </a>
        </li>
      ))}
    </ul>
  );
}
