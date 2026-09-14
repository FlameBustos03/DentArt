import type {
  BookingDate,
  Certification,
  ClinicInfo,
  ClinicLocation,
  ClinicalTeam,
  ConsultationModeOption,
  CorporatePlan,
  Doctor,
  FAQItem,
  Insurer,
  LeadClinician,
  LocationId,
  MediaOutlet,
  NavLink,
  PhilanthropyProgram,
  QuizChoice,
  QuizGoal,
  QuizImprovement,
  QuizRecommendation,
  Service,
  ServiceGroup,
  Testimonial,
  TimeSlot,
  TreatmentOption,
  TrustBadge,
  VisualizerCase,
} from "@/types";

export const DEFAULT_LOCATION_ID: LocationId = "poza-rica";

export const clinicHoursLabel =
  "Lun–Vie 10:00–13:00 y 16:00–19:00 · Sáb 10:00–13:00";

export const clinicHoursNote = "Mismo horario en ambas sedes.";

export const locationsIntro =
  "Encuéntranos en Poza Rica y Villahermosa — mismo horario en ambas sedes.";

export const locations: ClinicLocation[] = [
  {
    id: "poza-rica",
    city: "Poza Rica",
    region: "Veracruz",
    addressLines: ["Cipres #204, Col. Chapultepec", "Poza Rica, Veracruz"],
    mapQuery: "Cipres 204 Colonia Chapultepec, Poza Rica, Veracruz, Mexico",
    mapTitle: "Mapa: Poza Rica — Dent Art",
    teamCapacity: "Equipo de dos doctores",
  },
  {
    id: "villahermosa",
    city: "Villahermosa",
    region: "Tabasco",
    addressLines: ["Ermitaño 9, mz 22, Valle del Jaguar", "Villahermosa, Tabasco"],
    mapQuery: "Ermitaño 9 manzana 22 Valle del Jaguar, Villahermosa, Tabasco, Mexico",
    mapTitle: "Mapa: Villahermosa — Dent Art",
    teamCapacity: "Un doctor",
  },
];

export function getLocationById(id: LocationId): ClinicLocation {
  return locations.find((location) => location.id === id) ?? locations[0];
}

export const clinicInfo: ClinicInfo = {
  name: "Dent Art",
  slogan: "Atrévete a Sonreír",
  tagline: "Atención dental cercana y profesional en Poza Rica y Villahermosa.",
  phoneDisplay: "782 210 8172",
  phoneTel: "+527822108172",
  whatsappNumber: "527822108172",
  email: "DentArt@gmail.com",
  addressLines: ["Cipres #204, Col. Chapultepec", "Poza Rica, Veracruz"],
  mapQuery: "Cipres 204 Colonia Chapultepec, Poza Rica, Veracruz, Mexico",
  hours: [
    { days: "Lun–Vie", hours: "10:00–13:00 y 16:00–19:00" },
    { days: "Sáb", hours: "10:00–13:00" },
  ],
};

export const BOOKING_HREF = "/#booking";

export function bookingHref(pathname: string): string {
  return pathname === "/" ? "#booking" : BOOKING_HREF;
}

export const navLinks: NavLink[] = [
  { id: "inicio", label: "Inicio", href: "/" },
  { id: "nosotros", label: "Nosotros", href: "/nosotros" },
  { id: "servicios", label: "Servicios", href: "/servicios" },
  { id: "pacientes", label: "Pacientes", href: "/pacientes" },
  { id: "seguros", label: "Seguros", href: "/seguros" },
  { id: "contacto", label: "Contacto", href: "/contacto" },
];

export const serviciosNavItems: NavLink[] = [
  { id: "todos", label: "Todos", href: "/servicios" },
  { id: "estetica", label: "Estética", href: "/servicios#estetica" },
  { id: "general", label: "General", href: "/servicios#general" },
  { id: "protesis", label: "Prótesis", href: "/servicios#protesis" },
  { id: "laser", label: "Láser", href: "/servicios#laser" },
];

export const footerSitemap: NavLink[] = [
  { id: "inicio", label: "Inicio", href: "/" },
  { id: "nosotros", label: "Nosotros", href: "/nosotros" },
  { id: "servicios", label: "Servicios", href: "/servicios" },
  { id: "pacientes", label: "Pacientes", href: "/pacientes" },
  { id: "seguros", label: "Seguros", href: "/seguros" },
  { id: "contacto", label: "Contacto", href: "/contacto" },
  { id: "booking", label: "Agendar", href: BOOKING_HREF },
];

export const testimonialsEyebrow = "Pacientes Dent Art";
export const testimonialsHeading = "Lo que dicen quienes ya nos visitaron";
export const testimonialsIntro =
  "Historias reales de atención cercana en Poza Rica y Villahermosa. Cada sonrisa empieza con una buena conversación.";
export const testimonialsStarLabel = "Experiencia en consulta";
export const testimonialsCtaPrompt = "¿Listo para tu próxima cita?";
export const testimonialsCtaLabel = "Agendar";
export const testimonialsDisclaimer =
  "Las opiniones reflejan experiencias individuales y no garantizan resultados. La información del sitio es general y no sustituye la consulta odontológica profesional. Resultados varían según cada paciente.";

export const pageHeroTrustLine = "+16 años · Poza Rica y Villahermosa";

export const trustBadges: TrustBadge[] = [
  {
    id: "trust",
    label: "Confianza",
    value: "+16 años · Poza Rica y Villahermosa · Dentegra",
  },
];

export const brandMarkAlt = "Dent Art — Atrévete a Sonreír";

export const heroSubhead =
  "Atención dental cercana y profesional en Poza Rica y Villahermosa. Más de 16 años acompañando sonrisas con estética, prevención y tratamientos personalizados, siempre definidos en consulta.";

export const clinicalTeams: ClinicalTeam[] = [
  {
    locationId: "poza-rica" as const,
    city: "Poza Rica",
    summary: "2 unidades · 2 doctores · RX individual y panorámico",
    address: "Cipres #204, Col. Chapultepec",
    unnamedCount: 2,
    unnamedLabel: "Doctor",
  },
  {
    locationId: "villahermosa" as const,
    city: "Villahermosa",
    summary: "1 unidad · 1 doctor",
    address: "Ermitaño 9, mz 22, Valle del Jaguar",
    unnamedCount: 1,
    unnamedLabel: "Doctor",
  },
];

export const serviceModalRows = [
  { group: "Estética", name: "Diseño de sonrisa" },
  { group: "Estética", name: "Carillas" },
  { group: "Estética", name: "Blanqueamiento" },
  { group: "General", name: "Limpieza" },
  { group: "General", name: "Resinas" },
  { group: "General", name: "Amalgamas e incrustaciones" },
  { group: "Prótesis y ortodoncia", name: "Brackets" },
  { group: "Prótesis y ortodoncia", name: "Ortopedia" },
  { group: "Prótesis y ortodoncia", name: "Prótesis y puentes" },
  { group: "Láser", name: "Terapéutico" },
  { group: "Láser", name: "Blanqueamiento" },
  { group: "Láser", name: "Anestesia" },
] as const;

export const leadClinician: LeadClinician = {
  name: "Dra. Claudia Solis",
  eyebrow: "Quién te atiende",
  role: "Estética dental y diseño de sonrisa · Dent Art",
  blurb: [
    "La Dra. Claudia Solis lidera Dent Art con un enfoque cercano en estética dental y diseño de sonrisa. En cada consulta prioriza escucharte, explicar opciones con claridad y construir un plan realista según tu salud bucal y lo que buscas lograr.",
    "Con más de 16 años de trayectoria de Dent Art acompañando a familias en Poza Rica y Villahermosa, su práctica combina criterio clínico, prevención y tratamientos personalizados — siempre sin promesas vacías. El objetivo es que te sientas informado, seguro y acompañado en cada paso.",
    "Si es tu primera visita, espera una conversación sobre tu motivo de consulta, una revisión cuidadosa y recomendaciones claras. Los resultados varían de persona a persona; el plan se define después de la evaluación profesional.",
  ],
  photo: {
    src: "/team/dra-claudia-solis.webp",
    alt: "Dra. Claudia Solis, odontóloga de Dent Art, enfoque en estética dental y diseño de sonrisa.",
    width: 360,
    height: 420,
  },
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "estetica",
    name: "Estética",
    items: ["Diseño de sonrisa", "Carillas", "Blanqueamiento"],
  },
  {
    id: "general",
    name: "Odontología general",
    items: ["Limpieza", "Resinas", "Amalgamas", "Incrustaciones"],
  },
  {
    id: "protesis",
    name: "Prótesis y ortodoncia",
    items: ["Brackets", "Ortopedia", "Prótesis", "Puentes"],
  },
  {
    id: "laser",
    name: "Láser",
    items: ["Terapéutico", "Blanqueamiento", "Anestesia"],
    note: "El láser no sustituye el diagnóstico clínico.",
  },
];

export const insurers: Insurer[] = [
  {
    id: "dentegra",
    name: "Dentegra",
    caption: "Incluye odontopediatría · Pregunta por tu cobertura al agendar.",
    logoSrc: "/partners/dentegra.png",
  },
  {
    id: "dentalia",
    name: "Dentalia",
    caption: "Aceptamos Dentalia · Las prestaciones incluidas dependen de tu plan vigente.",
    logoSrc: "/partners/dentalia.png",
  },
];

export const insurersIntro =
  "Trabajamos con aseguradoras dentales para facilitar tu atención.";

export const insurersMicrocopy =
  "Pregunta por tu cobertura al agendar. Las coberturas dependen del plan vigente.";

export const insurersHelper =
  "No todas las prestaciones están incluidas en todos los planes.";

export const corporatePlans: CorporatePlan[] = [
  {
    id: "home-depot",
    name: "Home Depot",
    note: "Home Depot — según convenio vigente",
    variant: "logo",
    logoSrc: "/partners/home-depot.png",
  },
  {
    id: "liverpool",
    name: "Liverpool",
    note: "Liverpool — según convenio vigente",
    variant: "logo",
    logoSrc: "/partners/liverpool.png",
  },
  {
    id: "sector-petrolero",
    name: "Sector Petrolero",
    note: "Sector Petrolero — según convenio vigente",
    variant: "badge",
  },
];

export const plansIntro =
  "También atendemos planes dentales de empresa, sujetos a vigencia y condiciones de cada convenio.";

export const plansFooter =
  "Al agendar, indícanos tu empresa o plan para orientarte sobre requisitos y cobertura.";

export const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@__dentart",
    href: "https://www.instagram.com/__dentart/",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "Dent Art — Atrévete a Sonreír",
    href: "https://www.facebook.com/Dent-Art-Atrévete-a-Sonreir-562773417196892/",
  },
] as const;

export const medicalDisclaimer =
  "La información de este sitio es de carácter general e informativo sobre servicios odontológicos de Dent Art. No sustituye la consulta, diagnóstico ni tratamiento profesional. Los resultados varían según cada paciente. Coberturas de seguros y planes empresariales sujetas a vigencia y condiciones del plan. Ante urgencia dental, contacta al consultorio (782 210 8172) o a servicios de emergencia locales.";

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
    id: "consult-estetica",
    name: "Consulta de estética",
    specialty: "Estética",
    durationMinutes: 60,
    summary: "Diseño de sonrisa, carillas o blanqueamiento.",
  },
  {
    id: "consult-general",
    name: "Odontología general",
    specialty: "General",
    durationMinutes: 45,
    summary: "Limpieza, resinas, amalgamas o incrustaciones.",
  },
  {
    id: "consult-protesis",
    name: "Prótesis y ortodoncia",
    specialty: "Rehabilitación",
    durationMinutes: 60,
    summary: "Brackets, ortopedia, prótesis o puentes.",
  },
  {
    id: "consult-laser",
    name: "Evaluación con láser",
    specialty: "Láser",
    durationMinutes: 40,
    summary: "Uso terapéutico, blanqueamiento o anestesia. No sustituye el diagnóstico.",
  },
  {
    id: "consult-emergency",
    name: "Urgencia dental",
    specialty: "Urgencias",
    durationMinutes: 30,
    summary: "Dolor, trauma o restauración fracturada.",
  },
];

export const consultationModes: ConsultationModeOption[] = [
  {
    id: "in-clinic",
    label: "Presencial",
    description: "Consulta en la sede seleccionada, con exploración clínica.",
    durationNote: "El diagnóstico se confirma en silla",
  },
  {
    id: "virtual",
    label: "Virtual",
    description:
      "Orientación a distancia para agendar y resolver dudas. No sustituye la exploración presencial.",
    durationNote: "El plan de tratamiento se define en clínica",
  },
];

const WEEKDAY_SLOT_TIMES = ["10:00", "11:00", "12:00", "16:00", "17:00", "18:00"] as const;
const SATURDAY_SLOT_TIMES = ["10:00", "11:00", "12:00"] as const;

function buildSlots(seed: number, times: readonly string[], notBeforeHour: number): TimeSlot[] {
  // Slots that already passed today are dropped, not flagged `available: false`:
  // the form renders unavailable slots as "Ocupado", which is the wrong story
  // for a time that has simply gone by.
  return times.flatMap((time, index) => {
    if (Number(time.slice(0, 2)) <= notBeforeHour) {
      return [];
    }
    return [{ id: `slot-${seed}-${index}`, time, available: (seed + index) % 5 !== 0 }];
  });
}

/** `notBeforeHour` drops slots that already passed when the date is today. */
function formatBookingDate(date: Date, times: readonly string[], notBeforeHour: number): BookingDate {
  const iso = date.toISOString().slice(0, 10);
  const weekday = date.toLocaleDateString("es-MX", { weekday: "short" });
  const label = date.toLocaleDateString("es-MX", { day: "numeric", month: "short" });
  const seed = date.getDate() + date.getMonth();
  return { iso, label, weekday, slots: buildSlots(seed, times, notBeforeHour) };
}

export function getUpcomingBookingDates(count = 10): BookingDate[] {
  const dates: BookingDate[] = [];
  const now = new Date();
  const cursor = new Date(now);
  cursor.setHours(12, 0, 0, 0);

  while (dates.length < count) {
    const day = cursor.getDay();
    if (day !== 0) {
      const times = day === 6 ? SATURDAY_SLOT_TIMES : WEEKDAY_SLOT_TIMES;
      const isToday = cursor.toDateString() === now.toDateString();
      const entry = formatBookingDate(new Date(cursor), times, isToday ? now.getHours() : -1);
      if (entry.slots.some((slot) => slot.available)) {
        dates.push(entry);
      }
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

export const testimonials: Testimonial[] = [
  {
    id: "mr-poza-rica",
    initials: "M.R.",
    location: "Poza Rica",
    quote:
      "Me explicaron cada paso con calma. Salí entendiendo mi plan y sin presión para decidir en el momento.",
    rating: 5,
  },
  {
    id: "al-villahermosa",
    initials: "A.L.",
    location: "Villahermosa",
    quote: "El trato fue cercano desde la recepción. Me sentí escuchada y eso hizo toda la diferencia.",
    rating: 5,
  },
  {
    id: "jc-poza-rica",
    initials: "J.C.",
    location: "Poza Rica",
    quote:
      "Buena organización de horarios y atención clara. Resolvieron mis dudas sobre el tratamiento antes de empezar.",
    rating: 5,
  },
  {
    id: "sp-villahermosa",
    initials: "S.P.",
    location: "Villahermosa",
    quote:
      "Ambiente profesional y amable. Me gustó que hablaran en lenguaje sencillo, sin tecnicismos de más.",
    rating: 5,
  },
  {
    id: "lg-poza-rica",
    initials: "L.G.",
    location: "Poza Rica",
    quote:
      "Llevé a mi hijo y se sintió tranquilo. El equipo fue paciente y muy cuidadoso en todo momento.",
    rating: 5,
  },
  {
    id: "rh-villahermosa",
    initials: "R.H.",
    location: "Villahermosa",
    quote:
      "Agendar por WhatsApp fue fácil. En la cita me orientaron sobre opciones y tiempos de forma realista.",
    rating: 5,
  },
];

export const faqs: FAQItem[] = [
  {
    id: "agendar",
    category: "procedures",
    question: "¿Cómo agendo una cita?",
    answer:
      "Usa el formulario de esta página o escríbenos por WhatsApp al 782 210 8172. Indica la sede (Poza Rica o Villahermosa) y el motivo de consulta. Confirmamos horario según disponibilidad.",
  },
  {
    id: "urgencia",
    category: "procedures",
    question: "¿Qué hago si es una urgencia?",
    answer:
      "Llama o manda WhatsApp al 782 210 8172. Valoramos dolor, trauma o una restauración fracturada y te indicamos si puedes acudir a la sede o si conviene un servicio de urgencias hospitalario.",
  },
  {
    id: "seguros",
    category: "insurance",
    question: "¿Aceptan Dentegra o Dentalia?",
    answer:
      "Sí. Dentegra (incluida odontopediatría) y Dentalia son aseguradoras aceptadas. Las coberturas dependen del plan vigente; pregunta por la tuya al agendar. También revisamos planes empresariales (Home Depot, Liverpool y sector petrolero) según vigencia.",
  },
  {
    id: "laser",
    category: "procedures",
    question: "¿El láser dental sustituye el diagnóstico?",
    answer:
      "No. El láser terapéutico, de blanqueamiento o de anestesia es un apoyo al tratamiento. El diagnóstico y el plan se definen en la exploración clínica, no por el uso del láser.",
  },
  {
    id: "horarios",
    category: "procedures",
    question: "¿Cuál es el horario de las dos sedes?",
    answer:
      "El mismo en Poza Rica y Villahermosa, salvo aviso: lun–vie 10:00–13:00 y 16:00–19:00; sáb 10:00–13:00.",
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
  "Hola Dent Art, necesito atención de urgencia. Mi sede de preferencia es:";

export const bookingPrefillMessage =
  "Hola Dent Art, quiero agendar una cita. Mi sede de preferencia es:";

export const conciergePrefillMessage =
  "Hola Dent Art, necesito ayuda para agendar o confirmar una cita.";
