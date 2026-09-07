import type {
  BookingDate,
  Certification,
  ClinicInfo,
  Doctor,
  FAQItem,
  NavLink,
  Service,
  Testimonial,
  TimeSlot,
  TreatmentOption,
  TrustBadge,
  VisualizerCase,
} from "@/types";

export const clinicInfo: ClinicInfo = {
  name: "DentArt",
  tagline: "Elite smile architecture on Fifth Avenue",
  phoneDisplay: "+1 (212) 555-0184",
  phoneTel: "+12125550184",
  whatsappNumber: "12125550184",
  email: "concierge@dentart.clinic",
  addressLines: ["718 Fifth Avenue, Suite 1200", "New York, NY 10019"],
  mapQuery: "718 Fifth Avenue, New York, NY 10019",
  hours: [
    { days: "Monday — Thursday", hours: "7:30 AM – 7:00 PM" },
    { days: "Friday", hours: "8:00 AM – 5:00 PM" },
    { days: "Saturday", hours: "9:00 AM – 2:00 PM" },
    { days: "Sunday", hours: "Emergency triage only" },
  ],
};

export const navLinks: NavLink[] = [
  { id: "services", label: "Services", href: "#services" },
  { id: "visualizer", label: "Smile Studio", href: "#visualizer" },
  { id: "booking", label: "Booking", href: "#booking" },
  { id: "reviews", label: "Reviews", href: "#reviews" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const trustBadges: TrustBadge[] = [
  { id: "rating", label: "Google Rating", value: "5.0 ★ Google Rating" },
  { id: "smiles", label: "Outcomes", value: "10,000+ Transformed Smiles" },
];

export const certifications: Certification[] = [
  { id: "aacd", label: "AACD Accredited" },
  { id: "ada", label: "ADA Member Practice" },
  { id: "invisalign", label: "Invisalign Diamond" },
  { id: "sedation", label: "Board-Certified Sedation" },
];

export const doctors: Doctor[] = [
  {
    id: "moreau",
    name: "Dr. Elise Moreau, DMD",
    title: "Medical Director, Smile Architecture",
    credentials: "Harvard School of Dental Medicine · AACD",
  },
  {
    id: "vale",
    name: "Dr. Julian Vale, DDS",
    title: "Implant & Reconstructive Lead",
    credentials: "UPenn · ICOI Diplomate",
  },
  {
    id: "cho",
    name: "Dr. Mina Cho, DDS",
    title: "Pediatric & Family Care",
    credentials: "Columbia · AAPD Fellow",
  },
];

export const visualizerCases: VisualizerCase[] = [
  {
    id: "smile-design",
    title: "Editorial Smile Design",
    category: "Smile Design",
    description:
      "Digital smile design with proportion mapping, enamel contouring, and layered ceramic artistry for a camera-ready, still-natural result.",
    beforeImage: {
      src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=80",
      alt: "Patient smile before comprehensive smile design",
      width: 1400,
      height: 933,
    },
    afterImage: {
      src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1400&q=80",
      alt: "Patient smile after comprehensive smile design",
      width: 1400,
      height: 933,
    },
    treatmentDuration: "2–3 visits",
  },
  {
    id: "orthodontics",
    title: "Invisible Alignment",
    category: "Orthodontics",
    description:
      "Precision clear-aligner therapy guided by 3D facial analysis to refine bite, midline, and arch form without visible hardware.",
    beforeImage: {
      src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1400&q=80",
      alt: "Patient smile before orthodontic alignment",
      width: 1400,
      height: 933,
    },
    afterImage: {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=80",
      alt: "Patient smile after orthodontic alignment",
      width: 1400,
      height: 933,
    },
    treatmentDuration: "6–14 months",
  },
  {
    id: "veneers",
    title: "Porcelain Veneer Atelier",
    category: "Veneers",
    description:
      "Hand-layered feldspathic veneers that restore translucency, length, and light-play while preserving healthy enamel.",
    beforeImage: {
      src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80",
      alt: "Close-up of teeth before porcelain veneers",
      width: 1400,
      height: 933,
    },
    afterImage: {
      src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
      alt: "Confident smile after porcelain veneer placement",
      width: 1400,
      height: 933,
    },
    treatmentDuration: "10–14 days",
  },
];

export const services: Service[] = [
  {
    id: "implants",
    name: "Dental Implants",
    tagline: "Permanent architecture for missing teeth",
    description:
      "Titanium and ceramic implant systems planned with CBCT and guided surgery for a result that feels like your own dentition.",
    icon: "implants",
    benefits: [
      "Same-day provisional teeth when indicated",
      "Bone-preserving digital planning",
      "Lifetime implant warranty program",
    ],
    duration: "90–180 minutes per stage",
    startingAt: "$3,800 / implant",
    details: [
      "Every implant case begins with a full-mouth 3D scan, occlusion analysis, and facial-photo protocol so restoration follows your bone and smile line—not a generic template.",
      "We place premium Straumann and Nobel Biocare fixtures, with ceramic options for the aesthetic zone.",
      "Sedation, platelet-rich fibrin, and same-day provisionals are available for qualifying patients.",
    ],
  },
  {
    id: "whitening",
    name: "Whitening Atelier",
    tagline: "Luminosity without sensitivity theater",
    description:
      "Physician-supervised whitening calibrated to enamel thickness, existing restorations, and your preferred shade map.",
    icon: "whitening",
    benefits: [
      "In-chair and custom tray protocols",
      "Desensitizing enamel seal",
      "Shade-matched to ceramics",
    ],
    duration: "60–90 minutes",
    startingAt: "$650",
    details: [
      "We isolate restorations first so whitening never leaves a patchwork of mismatched porcelain.",
      "A medical-grade desensitizing protocol is applied before and after peroxide exposure.",
      "Take-home trays are milled to your scan for discreet maintenance before events.",
    ],
  },
  {
    id: "general",
    name: "General Dentistry",
    tagline: "Preventive care with atelier precision",
    description:
      "Comprehensive exams, biomimetic restorations, and quiet hygiene visits designed for patients who expect more than a cleaning.",
    icon: "general",
    benefits: [
      "Microscope-assisted restorations",
      "Mercury-free, biomimetic fillings",
      "Concierge recall scheduling",
    ],
    duration: "45–75 minutes",
    startingAt: "$295 exam",
    details: [
      "Your first visit includes periodontal charting, low-dose imaging, oral cancer screening, and a written treatment narrative—never a surprise list at checkout.",
      "Restorations are layered to mimic enamel and dentin, preserving as much natural tooth as possible.",
      "We coordinate with your physician when airway, reflux, or medications affect oral health.",
    ],
  },
  {
    id: "pediatric",
    name: "Pediatric Care",
    tagline: "Gentle first visits, lifelong confidence",
    description:
      "A calm, design-forward suite for children and teens—preventive coaching, growth-guided orthodontics, and trauma-ready care.",
    icon: "pediatric",
    benefits: [
      "Tell-show-do without rush",
      "Growth and airway screening",
      "Parents remain welcome in-suite",
    ],
    duration: "30–50 minutes",
    startingAt: "$220 well visit",
    details: [
      "Dr. Cho’s suite is paced for first visits: no abrupt instruments, no surprise restraints, and time to ask every question.",
      "We monitor jaw growth, tonsil/airway signs, and enamel risk so small issues never become surgical ones.",
      "Sports guards and teen aligner consults are scheduled around school, not the other way around.",
    ],
  },
];

export const treatmentOptions: TreatmentOption[] = [
  {
    id: "consult-smile",
    name: "Elite Smile Consultation",
    specialty: "Smile Design",
    durationMinutes: 60,
    summary: "Photography, digital preview, and a written plan.",
  },
  {
    id: "consult-implant",
    name: "Implant & Reconstruction",
    specialty: "Implants",
    durationMinutes: 75,
    summary: "CBCT review and surgical-restorative mapping.",
  },
  {
    id: "consult-ortho",
    name: "Alignment Assessment",
    specialty: "Orthodontics",
    durationMinutes: 45,
    summary: "Bite analysis and aligner candidacy.",
  },
  {
    id: "consult-general",
    name: "Comprehensive New Patient",
    specialty: "General Dentistry",
    durationMinutes: 75,
    summary: "Exam, imaging, and concierge hygiene plan.",
  },
  {
    id: "consult-pediatric",
    name: "Pediatric Welcome Visit",
    specialty: "Pediatric Care",
    durationMinutes: 40,
    summary: "Gentle exam and parent briefing.",
  },
  {
    id: "consult-emergency",
    name: "Same-Day Emergency",
    specialty: "Triage",
    durationMinutes: 30,
    summary: "Pain, trauma, or failed restoration.",
  },
];

const SLOT_TIMES = ["8:00 AM", "9:30 AM", "11:00 AM", "1:00 PM", "2:30 PM", "4:00 PM"] as const;

function buildSlots(seed: number): TimeSlot[] {
  return SLOT_TIMES.map((time, index) => ({
    id: `slot-${seed}-${index}`,
    time,
    available: (seed + index) % 5 !== 0,
  }));
}

function formatBookingDate(date: Date): BookingDate {
  const iso = date.toISOString().slice(0, 10);
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const seed = date.getDate() + date.getMonth();
  return { iso, label, weekday, slots: buildSlots(seed) };
}

export function getUpcomingBookingDates(count = 10): BookingDate[] {
  const dates: BookingDate[] = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);

  while (dates.length < count) {
    const day = cursor.getDay();
    if (day !== 0) {
      dates.push(formatBookingDate(new Date(cursor)));
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

export const testimonials: Testimonial[] = [
  {
    id: "amelia",
    name: "Amelia Hart",
    treatment: "Porcelain Veneers",
    quote:
      "I expected a cosmetic clinic. I received a medical brief, a shade story, and a smile that still looks like mine—just finished.",
    rating: 5,
    verified: true,
    location: "Upper East Side",
    image: {
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      alt: "Portrait of Amelia Hart",
      width: 400,
      height: 400,
    },
  },
  {
    id: "theo",
    name: "Theo Lang",
    treatment: "Full-Arch Implants",
    quote:
      "The guided surgery was quieter than my last filling. I left with teeth that day and a plan I could actually understand.",
    rating: 5,
    verified: true,
    location: "Tribeca",
    image: {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      alt: "Portrait of Theo Lang",
      width: 400,
      height: 400,
    },
  },
  {
    id: "nola",
    name: "Nola Reyes",
    treatment: "Pediatric Care",
    quote:
      "My daughter asked to come back. That has never happened at a dental office. Dr. Cho treated her like a person, not a schedule slot.",
    rating: 5,
    verified: true,
    location: "Park Slope",
    image: {
      src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
      alt: "Portrait of Nola Reyes",
      width: 400,
      height: 400,
    },
  },
  {
    id: "marcus",
    name: "Marcus Ellison",
    treatment: "Invisalign + Whitening",
    quote:
      "Board meetings, no metal, no lectures. They aligned the plan to my calendar and the result is quietly expensive-looking.",
    rating: 5,
    verified: true,
    location: "Greenwich",
    image: {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      alt: "Portrait of Marcus Ellison",
      width: 400,
      height: 400,
    },
  },
];

export const faqs: FAQItem[] = [
  {
    id: "financing-plans",
    category: "financing",
    question: "Do you offer financing for veneers or implants?",
    answer:
      "Yes. Qualified patients may use in-house staged payments or third-party medical financing (typically 0–24 months). Your concierge coordinator reviews options privately after the clinical plan is written—never during the exam.",
  },
  {
    id: "financing-deposit",
    category: "financing",
    question: "What is required to reserve an elite care appointment?",
    answer:
      "Consultations require a $150 scheduling hold, applied in full to treatment. Same-day emergency triage is billed to insurance when possible; uninsured emergency visits begin at $295.",
  },
  {
    id: "procedures-veneers",
    category: "procedures",
    question: "How long do porcelain veneers last?",
    answer:
      "With night-guard protection and routine hygiene, our feldspathic and lithium-disilicate veneers commonly last 12–20 years. We photograph and scan every case so future repairs match the original atelier work.",
  },
  {
    id: "procedures-pain",
    category: "procedures",
    question: "Is implant or veneer treatment painful?",
    answer:
      "Most patients describe pressure, not pain. We offer local anesthesia, oral sedation, and IV sedation with a dedicated anesthesia provider. You will never be rushed into a chair without a written comfort plan.",
  },
  {
    id: "insurance-ppo",
    category: "insurance",
    question: "Do you accept dental insurance?",
    answer:
      "We are a fee-for-service atelier that files out-of-network PPO claims as a courtesy. Many plans reimburse a portion of exams, imaging, and reconstructive codes. We provide a pre-estimate before you commit.",
  },
  {
    id: "insurance-hsa",
    category: "insurance",
    question: "Can I use HSA or FSA funds?",
    answer:
      "Yes. Medically necessary and many cosmetic-restorative treatments are eligible. We itemize superbills for HSA/FSA administrators and can split payment methods at checkout.",
  },
];

export const heroImages = {
  portrait: {
    src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=2000&q=80",
    alt: "Sunlit DentArt treatment suite with tailored cabinetry and clinical lighting",
    width: 2000,
    height: 1333,
  },
  editorial: {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
    alt: "Quiet reception lounge with ivory seating and warm stone finishes",
    width: 1600,
    height: 1066,
  },
};

export const emergencyPrefillMessage =
  "Hello DentArt, I need 24/7 emergency triage. Please advise the soonest clinical review.";

export const bookingPrefillMessage =
  "Hello DentArt, I would like to reserve an Elite Care consultation.";
