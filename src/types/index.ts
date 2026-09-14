import type { StaticImageData } from "next/image";

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

export interface MediaOutlet {
  id: string;
  name: string;
  caption: string;
}

export type VisualizerCategory =
  | "Porcelain Veneers"
  | "Invisalign"
  | "Full Mouth Rehabilitation";

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
  | "smile-design"
  | "veneers"
  | "whitening"
  | "implants"
  | "sedation";

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

export type ConsultationMode = "in-clinic" | "virtual";

export type LocationId = "poza-rica" | "villahermosa";

export interface ClinicLocation {
  id: LocationId;
  city: string;
  region: string;
  addressLines: string[];
  mapQuery: string;
  teamCapacity: string;
}

export interface ServiceGroup {
  id: string;
  name: string;
  items: string[];
  note?: string;
}

export interface Insurer {
  id: string;
  name: string;
  caption: string;
  /** Official lockup (static import). Omit to render the name on a plain tile. */
  logo?: StaticImageData;
}

export interface CorporatePlan {
  id: string;
  name: string;
  note: string;
  variant: "logo" | "badge";
  /** Official lockup for `variant: "logo"`. Omit to render a dashed placeholder. */
  logo?: StaticImageData;
}

export interface ClinicalTeam {
  locationId: LocationId;
  city: string;
  summary: string;
  address: string;
  unnamedCount: number;
  unnamedLabel: string;
}

export interface LeadClinician {
  name: string;
  eyebrow: string;
  role: string;
  blurb: string[];
  photo: ImageAsset;
}

export interface BookingFormData {
  treatmentId: string;
  locationId: LocationId;
  consultationMode: ConsultationMode | "";
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
  locationId?: string;
  consultationMode?: string;
  dateIso?: string;
  slotId?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  contactPreference?: string;
}

export interface Testimonial {
  id: string;
  initials: string;
  location: string;
  quote: string;
  rating: number;
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
  slogan: string;
  tagline: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsappNumber: string;
  email: string;
  addressLines: string[];
  mapQuery: string;
  hours: ClinicHours[];
}

export interface PublishedBook {
  title: string;
  year: string;
  note: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  portrait: ImageAsset;
  awards: string[];
  books: PublishedBook[];
  fellowships: string[];
}

export interface PhilanthropyProgram {
  id: string;
  name: string;
  impact: string;
  description: string;
  metric: string;
}

export interface Certification {
  id: string;
  label: string;
}

export type QuizImprovement = "whitening" | "alignment" | "veneers" | "implants";

export type QuizGoal = "celebrity" | "natural" | "function";

export interface QuizChoice<T extends string> {
  id: T;
  label: string;
  description: string;
}

export interface QuizRecommendation {
  title: string;
  summary: string;
  protocol: string;
  recommendedServiceId: string;
  recommendedServiceName: string;
}

export interface QuizLead {
  fullName: string;
  email: string;
  phone: string;
}

export interface QuizLeadErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

export interface ConsultationModeOption {
  id: ConsultationMode;
  label: string;
  description: string;
  durationNote: string;
}
