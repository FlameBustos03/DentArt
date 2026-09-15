import { Phone } from "lucide-react";
import { SocialIconLink } from "@/components/SocialIconLink";
import { clinicInfo, socialLinks } from "@/data/mockData";
import { cn } from "@/lib/utils";

export interface UtilityBarProps {
  className?: string;
}

export function UtilityBar({ className }: UtilityBarProps) {
  return (
    <div className={cn("h-11 overflow-visible border-b border-black/5 bg-mist", className)}>
      <div className="section-x flex h-full max-w-6xl items-center justify-between">
        <a
          href={`tel:${clinicInfo.phoneTel}`}
          className="type-utility inline-flex min-h-11 items-center gap-2 transition-colors hover:text-lime-800"
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
