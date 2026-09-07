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
  title: "DentArt | Elite Dental Atelier on Fifth Avenue",
  description:
    "DentArt is a premier New York dental atelier for smile design, implants, orthodontics, and concierge family care. Book an elite consultation or request 24/7 emergency triage.",
  keywords: [
    "DentArt",
    "luxury dentist New York",
    "smile design",
    "porcelain veneers",
    "dental implants",
    "emergency dentist",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen font-sans">
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
