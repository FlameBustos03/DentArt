import type { Metadata } from "next";
import { EmergencyFab } from "@/components/EmergencyFab";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PrivacyNotice } from "@/components/PrivacyNotice";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | Dent Art",
  description:
    "Aviso de privacidad integral de DentArt (Dra. Claudia Solís): datos que recabamos, finalidades, derechos ARCO y cómo revocar el consentimiento.",
};

export default function AvisoDePrivacidadPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-white">
        <article className="section-x py-16 md:py-20">
          <PrivacyNotice level={1} />
        </article>
      </main>
      <Footer />
      <EmergencyFab />
    </>
  );
}
