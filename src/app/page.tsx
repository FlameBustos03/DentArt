import { About } from "@/components/About";
import { BookingForm } from "@/components/BookingForm";
import { EmergencyFab } from "@/components/EmergencyFab";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Insurers } from "@/components/Insurers";
import { Locations } from "@/components/Locations";
import { Navbar } from "@/components/Navbar";
import { ServicesCatalog } from "@/components/ServicesCatalog";
import { Team } from "@/components/Team";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <ServicesCatalog />
        <Team />
        <Insurers />
        <Locations />
        <FAQ />
        <BookingForm />
      </main>
      <Footer />
      <EmergencyFab />
    </>
  );
}
