import { About } from "@/components/About";
import { BookingForm } from "@/components/BookingForm";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { Hours } from "@/components/Hours";
import { Insurers } from "@/components/Insurers";
import { Locations } from "@/components/Locations";
import { ServicesCatalog } from "@/components/ServicesCatalog";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <ServicesCatalog />
      <Testimonials />
      <Team />
      <Insurers />
      <Locations />
      <Hours />
      <FAQ />
      <BookingForm />
    </main>
  );
}
