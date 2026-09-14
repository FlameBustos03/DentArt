import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
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
    "Dent Art VIP smile studio in Poza Rica, Veracruz. Porcelain veneers, Invisalign, All-on-4, Zoom! whitening, and 24/7 concierge care. Atrévete a Sonreír.",
  keywords: [
    "Dent Art",
    "dentist Poza Rica",
    "VIP cosmetic dentistry",
    "porcelain veneers",
    "Invisalign",
    "All-on-4 dental implants",
    "Zoom whitening",
    "VIP sedation dentistry",
    "Atrévete a Sonreír",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-white font-sans text-ink-900">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
        <p className="sr-only">
          {clinicInfo.name} concierge line {clinicInfo.phoneDisplay}
        </p>
      </body>
    </html>
  );
}
