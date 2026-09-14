import { socialLinks } from "@/data/mockData";
import { cn } from "@/lib/utils";

export interface SocialLinksProps {
  className?: string;
  tone?: "light" | "dark";
}

export function SocialLinks({ className, tone = "dark" }: SocialLinksProps) {
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
            {link.label}
            <span className="ml-1 text-current/70">{link.handle}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
