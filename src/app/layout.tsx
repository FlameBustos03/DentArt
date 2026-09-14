import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { EmergencyFab } from "@/components/EmergencyFab";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { LocationProvider } from "@/components/LocationProvider";
import { Navbar } from "@/components/Navbar";
import { WhatsAppChip } from "@/components/WhatsAppChip";
import { clinicInfo } from "@/data/mockData";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dent Art | Atrévete a Sonreír",
  description:
    "Atención dental cercana y profesional en Poza Rica y Villahermosa. Más de 16 años acompañando sonrisas con estética, prevención y tratamientos personalizados.",
  keywords: [
    "Dent Art",
    "dentista Poza Rica",
    "dentista Villahermosa",
    "Atrévete a Sonreír",
    "Dentegra",
    "Dentalia",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-white font-sans text-ink-900">
        <JsonLd />
        <a className="skip-link" href="#main-content">
          Ir al contenido principal
        </a>
        <LocationProvider>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppChip />
          <EmergencyFab />
          <p className="sr-only">
            {clinicInfo.name} · {clinicInfo.phoneDisplay}
          </p>
        </LocationProvider>
      </body>
    </html>
  );
}
