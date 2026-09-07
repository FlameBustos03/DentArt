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
  title: "DentArt | Celebrity VIP Smile Atelier on Fifth Avenue",
  description:
    "DentArt Celebrity VIP Edition — Hollywood-grade cosmetic dentistry in Manhattan. Porcelain veneers, Invisalign, All-on-4, Zoom! whitening, and 24/7 VIP concierge. Transforming Smiles, Redefining Confidence.",
  keywords: [
    "DentArt",
    "celebrity dentist New York",
    "VIP cosmetic dentistry",
    "porcelain veneers",
    "Invisalign",
    "All-on-4 dental implants",
    "Zoom whitening",
    "VIP sedation dentistry",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen font-sans text-ink-900">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
        <p className="sr-only">
          {clinicInfo.name} VIP concierge line {clinicInfo.phoneDisplay}
        </p>
      </body>
    </html>
  );
}
