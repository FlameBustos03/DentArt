import { Phone } from "lucide-react";
import { SocialIconLink } from "@/components/SocialIconLink";
import { clinicInfo, socialLinks } from "@/data/mockData";
import { cn } from "@/lib/utils";

export interface UtilityBarProps {
  className?: string;
}

export function UtilityBar({ className }: UtilityBarProps) {
  return (
    <div className={cn("h-9 overflow-visible border-b border-black/5 bg-mist", className)}>
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href={`tel:${clinicInfo.phoneTel}`}
          className="inline-flex items-center gap-2 text-sm text-ink-900 transition-colors hover:text-lime-800"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{clinicInfo.phoneDisplay}</span>
        </a>

        <ul className="flex items-center">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <SocialIconLink href={link.href} network={link.id} label={link.label} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
