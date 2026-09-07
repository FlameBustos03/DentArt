import { BookingForm } from "@/components/BookingForm";
import { EmergencyFab } from "@/components/EmergencyFab";
import { EmergencySection } from "@/components/EmergencySection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ServicesCatalog } from "@/components/ServicesCatalog";
import { SmileVisualizer } from "@/components/SmileVisualizer";
import { Testimonials } from "@/components/Testimonials";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <SmileVisualizer />
        <ServicesCatalog />
        <EmergencySection />
        <BookingForm />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <EmergencyFab />
    </>
  );
}
