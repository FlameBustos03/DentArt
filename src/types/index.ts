export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface TrustBadge {
  id: string;
  label: string;
  value: string;
}

export type VisualizerCategory = "Smile Design" | "Orthodontics" | "Veneers";

export interface VisualizerCase {
  id: string;
  title: string;
  category: VisualizerCategory;
  description: string;
  beforeImage: ImageAsset;
  afterImage: ImageAsset;
  treatmentDuration: string;
}

export type ServiceIconName =
  | "implants"
  | "whitening"
  | "general"
  | "pediatric";

export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: ServiceIconName;
  benefits: string[];
  duration: string;
  startingAt: string;
  details: string[];
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface BookingDate {
  iso: string;
  label: string;
  weekday: string;
  slots: TimeSlot[];
}

export interface TreatmentOption {
  id: string;
  name: string;
  specialty: string;
  durationMinutes: number;
  summary: string;
}

export type ContactPreference = "phone" | "email" | "whatsapp";

export interface BookingFormData {
  treatmentId: string;
  dateIso: string;
  slotId: string;
  fullName: string;
  email: string;
  phone: string;
  contactPreference: ContactPreference;
  notes: string;
}

export interface BookingFieldErrors {
  treatmentId?: string;
  dateIso?: string;
  slotId?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  contactPreference?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  quote: string;
  rating: number;
  verified: boolean;
  location: string;
  image: ImageAsset;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "financing" | "procedures" | "insurance";
}

export interface ClinicHours {
  days: string;
  hours: string;
}

export interface ClinicInfo {
  name: string;
  tagline: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsappNumber: string;
  email: string;
  addressLines: string[];
  mapQuery: string;
  hours: ClinicHours[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  credentials: string;
}

export interface Certification {
  id: string;
  label: string;
}
