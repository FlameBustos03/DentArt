import { socialLinks } from "@/data/mockData";
import { cn } from "@/lib/utils";

export interface SocialLinksProps {
  className?: string;
  tone?: "light" | "dark";
  /** Show only the network name; the handle stays available to screen readers. */
  compact?: boolean;
}

export function SocialLinks({ className, tone = "dark", compact = false }: SocialLinksProps) {
  const linkClass = tone === "dark" ? "text-link-dark" : "text-link";

  return (
    <ul
      className={cn(
        "flex items-center gap-x-4 gap-y-2 text-sm",
        compact ? "flex-nowrap" : "flex-wrap",
        className,
      )}
    >
      {socialLinks.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            {link.label}
            <span className={cn("ml-1", compact ? "sr-only" : "opacity-70")}>{link.handle}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
