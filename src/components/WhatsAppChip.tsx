import { MessageCircle } from "lucide-react";
import { clinicInfo } from "@/data/mockData";

/** Mobile-only sticky WhatsApp chip. Secondary to Agendar; does not replace `/#booking`. */
export function WhatsAppChip() {
  return (
    <a
      href={`https://wa.me/${clinicInfo.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`WhatsApp ${clinicInfo.phoneDisplay}`}
      className="fixed bottom-4 left-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-lime-500 text-ink-900 shadow-lime md:hidden"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
