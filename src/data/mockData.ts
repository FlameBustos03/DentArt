import type {
  BookingDate,
  Certification,
  ClinicInfo,
  ConsultationModeOption,
  Doctor,
  FAQItem,
  MediaOutlet,
  NavLink,
  PhilanthropyProgram,
  QuizChoice,
  QuizGoal,
  QuizImprovement,
  QuizRecommendation,
  Service,
  Testimonial,
  TimeSlot,
  TreatmentOption,
  TrustBadge,
  VisualizerCase,
} from "@/types";

export const clinicInfo: ClinicInfo = {
  name: "Dent Art",
  slogan: "Atrévete a Sonreír",
  tagline: "VIP smile studio in Poza Rica, Veracruz",
  phoneDisplay: "+52 782 210 8172",
  phoneTel: "+527822108172",
  whatsappNumber: "527822108172",
  email: "concierge@dentart.mx",
  addressLines: ["Cipres #204 Col. Chapultepec", "Poza Rica, Veracruz, México"],
  mapQuery: "Cipres 204 Colonia Chapultepec, Poza Rica, Veracruz, Mexico",
  hours: [
    { days: "Monday — Friday", hours: "9:00 AM – 7:00 PM" },
    { days: "Saturday", hours: "9:00 AM – 2:00 PM · VIP by request" },
    { days: "Sunday", hours: "24/7 VIP emergency triage only" },
  ],
};

export const navLinks: NavLink[] = [
  { id: "services", label: "Services", href: "#services" },
  { id: "celebrity-smiles", label: "Celebrity Smiles", href: "#celebrity-smiles" },
  { id: "before-after", label: "Before/After", href: "#before-after" },
  { id: "quiz", label: "Virtual Quiz", href: "#quiz" },
  { id: "faq", label: "FAQ", href: "#faq" },
];

export const trustBadges: TrustBadge[] = [
  { id: "rating", label: "Rating", value: "5.0 ★ Top Cosmetic Dentist" },
  { id: "smiles", label: "Outcomes", value: "15,000+ Smiles Created" },
];

export const mediaOutlets: MediaOutlet[] = [
  { id: "tv", name: "As Seen On TV", caption: "National broadcast features" },
  { id: "oprah", name: "Oprah", caption: "Wellness & beauty desk" },
  { id: "doctors", name: "The Doctors", caption: "Clinical makeover segments" },
  { id: "forbes", name: "Forbes", caption: "Private-practice leadership" },
];

export const certifications: Certification[] = [
  { id: "aacd", label: "AACD Accredited Fellow" },
  { id: "ada", label: "ADA Member Practice" },
  { id: "invisalign", label: "Invisalign Diamond Plus" },
  { id: "sedation", label: "Board-Certified VIP Sedation" },
  { id: "aaid", label: "AAID Diplomate · All-on-4" },
];

export const medicalDirector: Doctor = {
  id: "moreau",
  name: "Dr. Elise Moreau, DMD, FAAID",
  title: "Medical Director & Smile Architect",
  credentials: "Harvard School of Dental Medicine · AACD Accredited Fellow",
  bio: "Dr. Elise Moreau directs Dent Art’s VIP studio in Poza Rica with a reconstructive-first philosophy: facial proportion, enamel conservation, and camera-ready light-play without theatrical dentistry. Her private suite hosts talent, founders, and families who expect concierge hospitality with hospital-grade planning. She publishes, teaches digital smile design, and funds pro-bono reconstructions through the Moreau Smile Access Fund.",
  portrait: {
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
    alt: "Dr. Elise Moreau, Dent Art medical director, in a white clinical coat",
    width: 1200,
    height: 1500,
  },
  awards: [
    "International Academy of Aesthetic Dentistry Gold Medal",
    "Revista Odontología Estética — Cosmetic Dentistry, eight consecutive years",
    "American Academy of Cosmetic Dentistry Accredited Fellow",
    "Global Smile Foundation Humanitarian Laureate",
    "American Academy of Implant Dentistry Diplomate",
  ],
  books: [
    {
      title: "The Architecture of a Smile",
      year: "2021",
      note: "Proportion mapping for natural-looking veneer design",
    },
    {
      title: "Quiet Luxury in Cosmetic Medicine",
      year: "2024",
      note: "Camera-ready dentistry without the red-carpet cliché",
    },
  ],
  fellowships: [
    "American Academy of Cosmetic Dentistry",
    "International Congress of Oral Implantologists",
    "Academy of Laser Dentistry",
  ],
};

export const doctors: Doctor[] = [
  medicalDirector,
  {
    id: "vale",
    name: "Dr. Julian Vale, DDS",
    title: "Implant & Full-Mouth Rehabilitation Lead",
    credentials: "UPenn · ICOI Diplomate · All-on-4 surgical director",
    bio: "Dr. Vale plans guided full-arch reconstructions for patients who cannot pause public life for a temporary denture.",
    portrait: {
      src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
      alt: "Dr. Julian Vale, implant and reconstructive lead",
      width: 800,
      height: 1000,
    },
    awards: ["ICOI Diplomate", "AO Surgical Excellence Citation"],
    books: [],
    fellowships: ["ICOI", "Academy of Osseointegration"],
  },
  {
    id: "cho",
    name: "Dr. Mina Cho, DDS",
    title: "Alignment, Airway & Family Care",
    credentials: "Columbia · AAPD Fellow · Invisalign Diamond",
    bio: "Dr. Cho directs discreet alignment and growth-guided care for talent families and executives who decline visible hardware.",
    portrait: {
      src: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
      alt: "Dr. Mina Cho, alignment and family care lead",
      width: 800,
      height: 1000,
    },
    awards: ["Invisalign Diamond Plus", "AAPD Fellow"],
    books: [],
    fellowships: ["AAPD"],
  },
];

export const philanthropyPrograms: PhilanthropyProgram[] = [
  {
    id: "smile-access",
    name: "Moreau Smile Access Fund",
    impact: "Pro-bono reconstructions",
    description:
      "Full-mouth restorations for survivors of trauma and domestic violence—planned to the same ceramic protocol as our VIP atelier, never a lesser material set.",
    metric: "2,400 smiles restored",
  },
  {
    id: "craniofacial",
    name: "Children’s Craniofacial Atelier",
    impact: "Pediatric partnership",
    description:
      "Annual surgical-restorative weeks with a Veracruz craniofacial clinic, covering anesthesia, ceramics, and a year of follow-up for each child.",
    metric: "180 families hosted yearly",
  },
  {
    id: "veterans",
    name: "Veterans All-on-4 Grant",
    impact: "Service-connected care",
    description:
      "Guided full-arch implant grants for veterans whose dental trauma is not fully covered by existing benefits—quietly administered, never publicized without consent.",
    metric: "96 arches completed",
  },
];

export const visualizerCases: VisualizerCase[] = [
  {
    id: "veneers",
    title: "Porcelain Veneer Atelier",
    category: "Porcelain Veneers",
    description:
      "Hand-layered feldspathic veneers that restore translucency, length, and light-play while preserving healthy enamel—designed for still photography and 4K close-ups.",
    beforeImage: {
      src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80",
      alt: "Close-up of teeth before porcelain veneer treatment",
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
  {
    id: "invisalign",
    title: "Invisalign Diamond Protocol",
    category: "Invisalign",
    description:
      "Precision clear-aligner therapy guided by 3D facial analysis to refine bite, midline, and arch form without visible hardware—ideal for camera schedules.",
    beforeImage: {
      src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1400&q=80",
      alt: "Patient smile before Invisalign alignment",
      width: 1400,
      height: 933,
    },
    afterImage: {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=80",
      alt: "Patient smile after Invisalign alignment",
      width: 1400,
      height: 933,
    },
    treatmentDuration: "6–14 months",
  },
  {
    id: "rehab",
    title: "Full Mouth Rehabilitation",
    category: "Full Mouth Rehabilitation",
    description:
      "Staged implant, ceramic, and bite reconstruction mapped to facial photographs so the finished architecture reads as born, not built.",
    beforeImage: {
      src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=80",
      alt: "Clinical view before full mouth rehabilitation",
      width: 1400,
      height: 933,
    },
    afterImage: {
      src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1400&q=80",
      alt: "Restored smile after full mouth rehabilitation",
      width: 1400,
      height: 933,
    },
    treatmentDuration: "3–6 visits",
  },
];

export const services: Service[] = [
  {
    id: "smile-design",
    name: "Cosmetic Smile Design",
    tagline: "Editorial proportion, still yours",
    description:
      "Digital smile design with facial-photo protocol, enamel contouring, and a written aesthetic brief before a single tooth is prepared.",
    icon: "smile-design",
    benefits: ["Camera-tested mock-ups", "Enamel-first planning", "Private suite photography"],
    duration: "90-minute architecture visit",
    startingAt: "$1,200 consult",
    details: [
      "We map midline, incisal edge, and gingival frame against your portraits—not a stock smile library.",
      "A reversible mock-up lets you approve the composition in daylight and studio light before ceramics are milled.",
      "VIP guests receive a written shade and proportion dossier for any future repairs worldwide.",
    ],
  },
  {
    id: "veneers",
    name: "Porcelain Veneers & Lumineers",
    tagline: "Translucency that survives close-ups",
    description:
      "Minimal-prep Lumineers and layered porcelain veneers calibrated for red-carpet lighting, still photography, and everyday conversation.",
    icon: "veneers",
    benefits: ["Minimal enamel reduction", "Hand-layered ceramics", "Night-guard atelier finish"],
    duration: "10–14 days, two visits",
    startingAt: "$2,400 / tooth",
    details: [
      "Feldspathic and lithium-disilicate options are chosen by how light should travel through the edge—not by a shade tab alone.",
      "Lumineers are reserved for cases where enamel can be fully conserved; we will decline them if longevity would suffer.",
      "Every case is scanned so a single future chip can be matched without remaking the full set.",
    ],
  },
  {
    id: "whitening",
    name: "Zoom! Advanced Whitening",
    tagline: "Luminosity without sensitivity theater",
    description:
      "Physician-supervised Zoom! whitening isolated from existing ceramics, sealed against sensitivity, and shade-mapped to your veneers.",
    icon: "whitening",
    benefits: ["In-chair Zoom! protocol", "Desensitizing enamel seal", "Event-week maintenance trays"],
    duration: "60–90 minutes",
    startingAt: "$850",
    details: [
      "Restorations are isolated first so whitening never leaves a patchwork of mismatched porcelain.",
      "A medical-grade desensitizing protocol is applied before and after peroxide exposure.",
      "Take-home trays are milled to your scan for discreet maintenance before premieres and campaigns.",
    ],
  },
  {
    id: "implants",
    name: "Dental Implants & All-on-4",
    tagline: "Permanent architecture, same-day presence",
    description:
      "CBCT-guided implants and All-on-4 full-arch rehabilitation with ceramic provisionals so you never leave without teeth.",
    icon: "implants",
    benefits: ["Same-day provisionals when indicated", "Straumann & Nobel systems", "Lifetime implant warranty program"],
    duration: "90–180 minutes per stage",
    startingAt: "$3,800 / implant",
    details: [
      "Every implant case begins with a full-mouth 3D scan, occlusion analysis, and facial-photo protocol.",
      "All-on-4 pathways are reserved for qualifying bone and bite; we will recommend staged grafting when it protects the result.",
      "Sedation, platelet-rich fibrin, and discreet recovery suites are available for international and talent guests.",
    ],
  },
  {
    id: "sedation",
    name: "VIP Sedation Dentistry",
    tagline: "Medically staffed calm, clinical control",
    description:
      "Oral, nitrous, and IV sedation with a dedicated anesthesia provider—designed for dental anxiety, long reconstructive visits, and private schedules.",
    icon: "sedation",
    benefits: ["Board-certified anesthesia", "Private recovery lounge", "Written comfort plan before you sit"],
    duration: "Matched to treatment length",
    startingAt: "$650 comfort protocol",
    details: [
      "You will never be rushed into a chair without a written comfort plan and a named clinician responsible for it.",
      "IV sedation is reserved for medically screened guests and staffed independently from the operating dentist.",
      "A concierge coordinates fasting, escort, and post-visit privacy so you leave through a discreet elevator when requested.",
    ],
  },
];

export const treatmentOptions: TreatmentOption[] = [
  {
    id: "consult-smile",
    name: "VIP Smile Architecture",
    specialty: "Cosmetic Smile Design",
    durationMinutes: 60,
    summary: "Photography, digital preview, and a written aesthetic brief.",
  },
  {
    id: "consult-veneers",
    name: "Veneers & Lumineers Studio",
    specialty: "Porcelain Veneers",
    durationMinutes: 75,
    summary: "Enamel mapping, mock-up, and ceramic material selection.",
  },
  {
    id: "consult-whitening",
    name: "Zoom! Luminosity Consult",
    specialty: "Whitening",
    durationMinutes: 45,
    summary: "Shade strategy isolated from existing restorations.",
  },
  {
    id: "consult-implant",
    name: "Implants & All-on-4",
    specialty: "Implants",
    durationMinutes: 75,
    summary: "CBCT review and surgical-restorative mapping.",
  },
  {
    id: "consult-sedation",
    name: "Sedation Comfort Planning",
    specialty: "VIP Sedation",
    durationMinutes: 40,
    summary: "Medical screening and a named anesthesia protocol.",
  },
  {
    id: "consult-emergency",
    name: "Same-Day VIP Emergency",
    specialty: "Triage",
    durationMinutes: 30,
    summary: "Pain, trauma, or failed restoration—around the clock.",
  },
];

export const consultationModes: ConsultationModeOption[] = [
  {
    id: "in-clinic",
    label: "In-Clinic VIP",
    description:
      "Arrive at the Poza Rica suite for photography, imaging, and a private briefing with your attending clinician.",
    durationNote: "90-minute atelier visit · discreet elevator available",
  },
  {
    id: "virtual",
    label: "Virtual Consultation",
    description:
      "A encrypted video architecture session with photo protocol sent in advance—ideal for international and on-set guests.",
    durationNote: "45-minute secure video · same written plan as in-suite",
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
      "I expected a cosmetic clinic. I received a medical brief, a shade story, and a smile that still looks like mine—just finished for camera.",
    rating: 5,
    verified: true,
    location: "Poza Rica, Veracruz",
    kind: "review",
    image: {
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      alt: "Portrait of Amelia Hart",
      width: 400,
      height: 400,
    },
  },
  {
    id: "talent-a",
    name: "Confidential talent · film",
    treatment: "Full Mouth Rehabilitation",
    quote:
      "Production could not see a temporary denture. Dent Art staged All-on-4 provisionals between call times. The private screening of my testimonial is available at consultation.",
    rating: 5,
    verified: true,
    location: "Ciudad de México / Poza Rica",
    kind: "video",
    duration: "2:14",
    privacyNote: "Identity withheld by request. Full screening reserved for VIP consultation guests.",
    image: {
      src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      alt: "Soft-focus portrait placeholder for a confidential film talent testimonial",
      width: 800,
      height: 800,
    },
  },
  {
    id: "theo",
    name: "Theo Lang",
    treatment: "All-on-4 Implants",
    quote:
      "The guided surgery was quieter than my last filling. I left with teeth that day and a plan I could actually understand.",
    rating: 5,
    verified: true,
    location: "Tampico, Tamaulipas",
    kind: "review",
    image: {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      alt: "Portrait of Theo Lang",
      width: 400,
      height: 400,
    },
  },
  {
    id: "talent-b",
    name: "Confidential talent · television",
    treatment: "Invisalign + Zoom! Whitening",
    quote:
      "No metal, no lectures, no leaked paparazzi dental visits. The virtual consult happened in a hotel suite. The result is quietly expensive-looking.",
    rating: 5,
    verified: true,
    location: "Undisclosed",
    kind: "video",
    duration: "1:48",
    privacyNote: "Broadcast identity withheld. Request a private viewing when you book.",
    image: {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      alt: "Soft-focus portrait placeholder for a confidential television talent testimonial",
      width: 800,
      height: 800,
    },
  },
  {
    id: "nola",
    name: "Nola Reyes",
    treatment: "VIP Sedation + Veneers",
    quote:
      "I have avoided dentists for twelve years. They wrote a comfort plan, named the anesthesiologist, and I woke up to a smile I recognized.",
    rating: 5,
    verified: true,
    location: "Xalapa, Veracruz",
    kind: "review",
    image: {
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      alt: "Portrait of Nola Reyes",
      width: 400,
      height: 400,
    },
  },
];

export const faqs: FAQItem[] = [
  {
    id: "financing-plans",
    category: "financing",
    question: "Do you offer financing for veneers, implants, or All-on-4?",
    answer:
      "Yes. Qualified patients may use in-house staged payments or third-party medical financing (typically 0–24 months). Your VIP concierge reviews options privately after the clinical plan is written—never during the exam.",
  },
  {
    id: "financing-deposit",
    category: "financing",
    question: "What is required to reserve a VIP consultation?",
    answer:
      "Consultations require a $250 scheduling hold, applied in full to treatment. Virtual architecture sessions carry the same hold. Same-day emergency triage is billed to insurance when possible; uninsured emergency visits begin at $295.",
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
    question: "Is implant, veneer, or Zoom! treatment painful?",
    answer:
      "Most patients describe pressure, not pain. We offer local anesthesia, oral sedation, and IV sedation with a dedicated anesthesia provider. You will never be rushed into a chair without a written comfort plan.",
  },
  {
    id: "procedures-virtual",
    category: "procedures",
    question: "Can I start with a virtual consultation?",
    answer:
      "Yes. Encrypted video sessions follow the same photography protocol as in-suite visits. We mail a written plan, then reserve chair time only when you are ready to proceed—ideal for international and on-set guests.",
  },
  {
    id: "insurance-ppo",
    category: "insurance",
    question: "Do you accept dental insurance?",
    answer:
      "We are a fee-for-service VIP atelier that files out-of-network PPO claims as a courtesy. Many plans reimburse a portion of exams, imaging, and reconstructive codes. We provide a pre-estimate before you commit.",
  },
  {
    id: "insurance-hsa",
    category: "insurance",
    question: "Can I use HSA or FSA funds?",
    answer:
      "Yes. Medically necessary and many cosmetic-restorative treatments are eligible. We itemize superbills for HSA/FSA administrators and can split payment methods at checkout.",
  },
];

export const quizImprovements: Array<QuizChoice<QuizImprovement>> = [
  {
    id: "whitening",
    label: "Teeth Whitening",
    description: "Luminosity, stain lift, and event-week brightness.",
  },
  {
    id: "alignment",
    label: "Alignment",
    description: "Crowding, spacing, and bite without visible hardware.",
  },
  {
    id: "veneers",
    label: "Veneers",
    description: "Shape, length, chips, and camera-ready symmetry.",
  },
  {
    id: "implants",
    label: "Implants",
    description: "Missing teeth, failing bridges, or full-arch rebuild.",
  },
];

export const quizGoals: Array<QuizChoice<QuizGoal>> = [
  {
    id: "celebrity",
    label: "Celebrity Smile",
    description: "Editorial presence for camera, stage, or stills—without looking fabricated.",
  },
  {
    id: "natural",
    label: "Subtle Natural Look",
    description: "Quiet refinement friends notice, photographers cannot date.",
  },
  {
    id: "function",
    label: "Functionality",
    description: "Comfort, chewing, speech, and long-term joint health first.",
  },
];

const QUIZ_RESULTS: Record<`${QuizImprovement}-${QuizGoal}`, QuizRecommendation> = {
  "whitening-celebrity": {
    title: "Zoom! VIP luminosity + enamel architecture",
    summary:
      "A supervised Zoom! protocol isolated from ceramics, then a smile-design overlay so brightness matches proportion on camera.",
    protocol: "Virtual shade mapping this week · in-chair Zoom! before your next appearance.",
    recommendedServiceId: "whitening",
    recommendedServiceName: "Zoom! Advanced Whitening",
  },
  "whitening-natural": {
    title: "Calibrated whitening, not a bleach jump",
    summary:
      "We lift stain within your natural chroma so teeth never outrun your skin tone or existing porcelain.",
    protocol: "45-minute virtual consult · Zoom! or tray protocol selected after enamel review.",
    recommendedServiceId: "whitening",
    recommendedServiceName: "Zoom! Advanced Whitening",
  },
  "whitening-function": {
    title: "Enamel health, then brightness",
    summary:
      "Sensitivity, erosion, and restoration mismatches are solved before peroxide. Function leads; luminosity follows.",
    protocol: "Comfort screening first · whitening only when enamel is ready.",
    recommendedServiceId: "whitening",
    recommendedServiceName: "Zoom! Advanced Whitening",
  },
  "alignment-celebrity": {
    title: "Invisalign Diamond + finishing ceramics",
    summary:
      "Discreet alignment to camera midlines, with optional veneer finishing for edges that still photographs demand.",
    protocol: "3D preview at consult · aligners staged around production calendars.",
    recommendedServiceId: "smile-design",
    recommendedServiceName: "Cosmetic Smile Design",
  },
  "alignment-natural": {
    title: "Invisalign, unannounced",
    summary:
      "Arch form and bite refined without hardware or a sudden ‘new teeth’ moment. Ideal for executives and on-air talent.",
    protocol: "Virtual bite analysis · Diamond-protocol aligners if you are a candidate.",
    recommendedServiceId: "smile-design",
    recommendedServiceName: "Cosmetic Smile Design",
  },
  "alignment-function": {
    title: "Bite correction before cosmetics",
    summary:
      "Joint comfort, chewing efficiency, and airway screening come first. Aesthetics are sequenced only after the bite is stable.",
    protocol: "Functional exam (virtual or in-suite) · alignment plan with night-guard protocol.",
    recommendedServiceId: "smile-design",
    recommendedServiceName: "Cosmetic Smile Design",
  },
  "veneers-celebrity": {
    title: "Full porcelain smile design",
    summary:
      "Layered veneers designed for 4K close-ups and still photography—translucent, not opaque, and still recognizably you.",
    protocol: "Digital mock-up at VIP consult · 10–14 day atelier if you approve the composition.",
    recommendedServiceId: "veneers",
    recommendedServiceName: "Porcelain Veneers & Lumineers",
  },
  "veneers-natural": {
    title: "Minimal-prep Lumineers pathway",
    summary:
      "Where enamel allows, we conserve structure with Lumineers or ultra-thin porcelain. We will decline if longevity would suffer.",
    protocol: "Enamel mapping first · material chosen only after conservation review.",
    recommendedServiceId: "veneers",
    recommendedServiceName: "Porcelain Veneers & Lumineers",
  },
  "veneers-function": {
    title: "Restorative veneers, medically led",
    summary:
      "Chips, wear, and failing bonding are rebuilt to protect bite and speech. Beauty is the byproduct of correct architecture.",
    protocol: "Occlusal analysis + mock-up · ceramics only after the bite is rehearsed.",
    recommendedServiceId: "veneers",
    recommendedServiceName: "Porcelain Veneers & Lumineers",
  },
  "implants-celebrity": {
    title: "All-on-4 with ceramic artistry",
    summary:
      "Full-arch reconstruction with same-day provisionals so public life never sees a gap. Final ceramics follow facial-photo protocol.",
    protocol: "CBCT review (virtual records accepted) · surgical-restorative mapping in-suite.",
    recommendedServiceId: "implants",
    recommendedServiceName: "Dental Implants & All-on-4",
  },
  "implants-natural": {
    title: "Single-tooth and aesthetic-zone implants",
    summary:
      "Ceramic abutments and emergence-profile grafting so a single replacement disappears next to natural teeth.",
    protocol: "Guided planning visit · provisional in the aesthetic zone whenever biology allows.",
    recommendedServiceId: "implants",
    recommendedServiceName: "Dental Implants & All-on-4",
  },
  "implants-function": {
    title: "Full mouth rehabilitation",
    summary:
      "Staged implants, bite reconstruction, and ceramics sequenced for chewing, speech, and joint health—then for photographs.",
    protocol: "Reconstructive consult with Dr. Vale · written staging before any surgery.",
    recommendedServiceId: "implants",
    recommendedServiceName: "Dental Implants & All-on-4",
  },
};

export function getQuizRecommendation(
  improvement: QuizImprovement,
  goal: QuizGoal,
): QuizRecommendation {
  return QUIZ_RESULTS[`${improvement}-${goal}`];
}

export const heroImages = {
  portrait: {
    src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=2000&q=80",
    alt: "Sunlit Dent Art VIP treatment suite with tailored cabinetry and clinical lighting",
    width: 2000,
    height: 1333,
  },
  editorial: {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
    alt: "Quiet reception lounge with white seating and lime-accented clinical finishes",
    width: 1600,
    height: 1066,
  },
};

export const emergencyPrefillMessage =
  "Hola Dent Art, necesito atención de emergencia 24/7. Hello Dent Art, I need 24/7 emergency triage. Please advise the soonest clinical review.";

export const bookingPrefillMessage =
  "Hola Dent Art, me gustaría agendar una consulta VIP. Hello Dent Art, I would like to reserve a VIP consultation.";

export const conciergePrefillMessage =
  "Hola Dent Art, necesito ayuda con mi cita y llegada. Hello Dent Art, I would like assistance with scheduling and arrival details.";
