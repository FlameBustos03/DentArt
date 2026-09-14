import type { FAQItem, PageCta, ServiceGroup } from "@/types";
import { BOOKING_HREF, clinicInfo } from "@/data/mockData";

export const nosotrosCopy = {
  metaTitle: "Nosotros | Dent Art — Atrévete a Sonreír",
  metaDescription:
    "Conoce la historia de Dent Art: más de 16 años de atención dental cercana en Poza Rica y Villahermosa.",
  eyebrow: "Nosotros",
  h1: "Más de 16 años acompañando sonrisas",
  lead: "Dent Art nació con una idea simple: que cada persona se sienta escuchada, segura y bien cuidada al sentarse en el sillón dental.",
  historiaH2: "Nuestra historia",
  historiaBody: [
    "Empezamos en Poza Rica, Veracruz, con un consultorio pensado para familias. Con el tiempo sumamos capacidad clínica — hoy contamos con dos unidades dentales y equipo de rayos X individual y panorámico en esa sede — y abrimos nuestra segunda sede en Villahermosa, Tabasco, para acercar la misma atención a más personas.",
    "Hoy seguimos con el mismo compromiso: criterio clínico, trato cercano y planes claros, sin promesas vacías.",
  ],
  sedesH2: "Dos sedes, un mismo cuidado",
  sedes: [
    {
      city: "Poza Rica",
      detail: "Cipres #204, Col. Chapultepec · 2 unidades · 2 doctores · RX individual y panorámico",
    },
    {
      city: "Villahermosa",
      detail: "Ermitaño 9, mz 22, Valle del Jaguar · 1 unidad · 1 doctor",
    },
  ],
  clinicianH2: "Quién te atiende",
  clinicianBlurb: [
    "La Dra. Claudia Solis lidera Dent Art con un enfoque cercano en estética dental y diseño de sonrisa. Prioriza escucharte, explicar opciones con claridad y construir un plan realista según tu salud bucal. Los resultados varían de persona a persona; el plan se define después de la evaluación profesional.",
  ],
  primaryCta: { label: "Agendar cita", href: BOOKING_HREF } satisfies PageCta,
  secondaryCta: { label: "Ver sedes", href: "/contacto#sedes" } satisfies PageCta,
};

export const serviciosCopy = {
  metaTitle: "Servicios dentales | Dent Art",
  metaDescription:
    "Estética, odontología general, prótesis, ortodoncia y láser en Dent Art. Poza Rica y Villahermosa.",
  eyebrow: "Servicios",
  h1: "Tratamientos pensados para ti",
  lead: "Desde limpiezas preventivas hasta diseño de sonrisa y rehabilitación. Te explicamos opciones claras, sin promesas vacías.",
  jumpLabel: "En esta página",
  footPrompt: "¿Dudas sobre un tratamiento?",
  footCta: { label: "Agendar", href: BOOKING_HREF } satisfies PageCta,
};

export const servicePageGroups: ServiceGroup[] = [
  {
    id: "estetica",
    name: "Estética dental",
    items: ["Diseño de sonrisa", "Carillas", "Blanqueamiento"],
    treatments: [
      {
        name: "Diseño de sonrisa",
        benefit: "Planificamos tu sonrisa con criterio clínico y naturalidad.",
        body: "Evaluamos proporciones, color y función para proponer un plan a tu medida. El objetivo es armonía y comodidad, no un resultado genérico.",
      },
      {
        name: "Carillas",
        benefit: "Mejora la forma y el color de tus dientes de forma conservadora cuando está indicada.",
        body: "Indicadas según evaluación clínica. Te explicamos materiales, cuidados y expectativas realistas antes de decidir.",
      },
      {
        name: "Blanqueamiento",
        benefit: "Aclara el tono de tus dientes bajo supervisión profesional.",
        body: "Protocolo controlado en consultorio. La respuesta varía según cada persona; primero evaluamos si es adecuado para ti.",
      },
    ],
  },
  {
    id: "general",
    name: "Odontología general",
    items: ["Limpieza", "Resinas", "Amalgamas", "Incrustaciones"],
    treatments: [
      {
        name: "Limpieza dental",
        benefit: "Cuida tu salud bucal y ayuda a prevenir problemas comunes.",
        body: "Remoción de placa y sarro, con recomendaciones de higiene personalizadas.",
      },
      {
        name: "Resinas",
        benefit: "Restaura dientes dañados con un aspecto más natural.",
        body: "Para caries o fracturas menores cuando el diente puede conservarse.",
      },
      {
        name: "Amalgamas",
        benefit: "Opción durable de restauración cuando está clínicamente indicada.",
        body: "Te orientamos sobre alternativas según el caso y tus preferencias.",
      },
      {
        name: "Incrustaciones",
        benefit: "Refuerza dientes con daño moderado conservando más estructura.",
        body: "Alternativa entre resina y corona en casos seleccionados.",
      },
    ],
  },
  {
    id: "protesis",
    name: "Prótesis y ortodoncia",
    items: ["Brackets", "Ortopedia", "Prótesis", "Puentes"],
    treatments: [
      {
        name: "Brackets",
        benefit: "Corrige la posición dental para mejorar función y estética.",
        body: "Plan según diagnóstico. Controles claros y expectativas realistas de tiempo — sin plazos fijos sin valoración.",
      },
      {
        name: "Ortopedia maxilar",
        benefit: "Guía el crecimiento y la relación de maxilares en etapas indicadas.",
        body: "Especialmente relevante en pacientes jóvenes cuando la evaluación lo sugiere.",
      },
      {
        name: "Prótesis totales, parciales y flexibles",
        benefit: "Recupera masticación y sonrisa cuando faltan dientes.",
        body: "Opciones removibles adaptadas a tu anatomía y estilo de vida.",
      },
      {
        name: "Puentes fijos y removibles",
        benefit: "Reemplaza dientes ausentes con soporte fijo o removible.",
        body: "La mejor opción depende de pilares, hueso y hábitos; te presentamos pros y contras.",
      },
    ],
  },
  {
    id: "laser",
    name: "Odontología con láser",
    items: ["Terapéutico", "Blanqueamiento", "Anestesia"],
    treatments: [
      {
        name: "Láser terapéutico, blanqueamiento y apoyo en anestesia",
        benefit: "Tecnología de apoyo para mayor confort en procedimientos seleccionados.",
        body: "Usamos láser como complemento en protocolos terapéuticos, blanqueamiento y apoyo anestésico cuando está indicado.",
      },
    ],
    disclaimer:
      "El láser es un complemento del plan de tratamiento. No sustituye el diagnóstico ni la evaluación profesional. La indicación y el protocolo se definen caso por caso.",
  },
];

export const pacientesCopy = {
  metaTitle: "Para pacientes | Dent Art",
  metaDescription: "Cómo preparar tu primera cita en Dent Art: qué traer, horarios y preguntas frecuentes.",
  eyebrow: "Pacientes",
  h1: "Tu visita, paso a paso",
  lead: "Queremos que llegues tranquilo y preparado. Aquí va lo esencial para tu primera cita o tu siguiente control.",
  primeraH2: "¿Qué espero en mi primera cita?",
  primeraBody:
    "Una conversación sobre tu motivo de consulta, revisión clínica y, si hace falta, estudios de imagen. Te explicamos hallazgos y opciones en lenguaje claro, sin presión para decidir en el momento.",
  queTraerH2: "¿Qué conviene traer?",
  queTraer: [
    "Identificación oficial",
    "Datos de tu seguro o plan empresarial (si aplica)",
    "Estudios o radiografías previas (si las tienes)",
    "Lista de medicamentos o alergias relevantes",
    "Preguntas que quieras resolver en la consulta",
  ],
  tipsH2: "Tips rápidos",
  tips: [
    "Llega unos minutos antes para registro.",
    "Si usas Dentalia, Dentegra u otro convenio, indícalo al agendar.",
    "Urgencias: escríbenos por WhatsApp al 782 210 8172.",
  ],
  faqH2: "Preguntas frecuentes",
  primaryCta: { label: "Agendar mi cita", href: BOOKING_HREF } satisfies PageCta,
  secondaryCta: { label: "Ver seguros", href: "/seguros" } satisfies PageCta,
};

export const pacientesFaqs: FAQItem[] = [
  {
    id: "cita-previa",
    category: "procedures",
    question: "¿Necesito cita previa?",
    answer:
      "Sí, recomendamos agendar para asegurar tu espacio. Puedes hacerlo desde la web (/#booking) o por WhatsApp.",
  },
  {
    id: "ninos",
    category: "procedures",
    question: "¿Atienden niños?",
    answer:
      "Trabajamos con Dentegra en odontopediatría y ofrecemos un trato cuidadoso para pacientes jóvenes. La evaluación define el plan adecuado.",
  },
  {
    id: "duracion",
    category: "procedures",
    question: "¿Cuánto dura la primera cita?",
    answer:
      "Varía según el motivo y si se requieren estudios. En la recepción te orientamos sobre tiempos estimados.",
  },
  {
    id: "cambiar",
    category: "procedures",
    question: "¿Puedo cambiar o cancelar?",
    answer: "Sí. Avisa con anticipación por teléfono o WhatsApp para liberar el horario.",
  },
];

export const segurosCopy = {
  metaTitle: "Seguros y planes | Dent Art",
  metaDescription: "Dentegra, Dentalia y planes empresariales en Dent Art. Coberturas según plan vigente.",
  eyebrow: "Seguros",
  h1: "Seguros dentales y planes empresariales",
  lead: "Trabajamos con aseguradoras y convenios de empresa para facilitar tu atención. Las coberturas dependen del plan vigente.",
  aseguradorasH2: "Aseguradoras",
  planesH2: "Planes empresariales",
  comoUsarH2: "¿Cómo aprovecho mi convenio?",
  steps: [
    "Agenda tu cita e indica tu aseguradora o empresa.",
    "Trae identificación y datos de tu plan.",
    "En recepción te orientamos sobre pasos y documentación.",
  ],
  primaryCta: { label: "Agendar con mi seguro", href: BOOKING_HREF } satisfies PageCta,
  secondaryCta: {
    label: "WhatsApp 782 210 8172",
    href: `https://wa.me/${clinicInfo.whatsappNumber}`,
    external: true,
  } satisfies PageCta,
};

export const contactoCopy = {
  metaTitle: "Contacto y sedes | Dent Art",
  metaDescription:
    "Horarios, direcciones en Poza Rica y Villahermosa, WhatsApp y formulario de contacto Dent Art.",
  eyebrow: "Contacto",
  h1: "Habla con nosotros",
  lead: "Estamos en Poza Rica y Villahermosa — mismo horario en ambas sedes. Elige el canal que te quede más fácil.",
  horarioH2: "Horario",
  weekdayHours: "Lunes a viernes: 10:00–13:00 y 16:00–19:00",
  saturdayHours: "Sábados: 10:00–13:00",
  sedesH2: "Nuestras sedes",
  directoH2: "Contacto directo",
  locations: [
    {
      id: "poza-rica" as const,
      heading: "Poza Rica, Veracruz",
      address: "Cipres #204, Col. Chapultepec, Poza Rica",
      capacity: "2 unidades dentales · 2 doctores · RX individual y panorámico",
    },
    {
      id: "villahermosa" as const,
      heading: "Villahermosa, Tabasco",
      address: "Ermitaño 9, mz 22, Valle del Jaguar, Villahermosa",
      capacity: "1 unidad dental · 1 doctor",
    },
  ],
  formTitle: "Escríbenos",
  formIntro: "Déjanos tus datos y te contactamos para orientar tu cita.",
  fields: {
    name: { label: "Nombre", placeholder: "Tu nombre" },
    phone: {
      label: "Teléfono / WhatsApp",
      placeholder: "10 dígitos",
      hint: "Preferimos WhatsApp para confirmar",
    },
    email: { label: "Correo", placeholder: "tunombre@email.com", hint: "Opcional" },
    sede: { label: "Sede de preferencia" },
    motivo: { label: "Motivo de consulta", placeholder: "Ej. limpieza, brackets, urgencia" },
    seguro: {
      label: "¿Tienes seguro o plan?",
      placeholder: "Dentegra, Dentalia, empresa…",
      hint: "Según plan vigente",
    },
    mensaje: { label: "Mensaje", placeholder: "Cuéntanos brevemente" },
  },
  sedeOptions: [
    { value: "poza-rica" as const, label: "Poza Rica" },
    { value: "villahermosa" as const, label: "Villahermosa" },
    { value: "indistinto" as const, label: "Indistinto" },
  ],
  submit: "Enviar",
  errorTitle: "No pudimos enviar",
  errorBody: "Intenta de nuevo o escríbenos al 782 210 8172.",
  privacy: "Al enviar, aceptas que Dent Art use estos datos solo para contactarte sobre tu consulta.",
  successTitle: "Continúa por WhatsApp o llamada",
  successBody:
    "Este formulario web aún no envía el mensaje a la clínica. Para que el equipo lo reciba, continúa por WhatsApp o llama al 782 210 8172.",
  successWhatsApp: "Abrir WhatsApp",
  successCall: "Llamar 782 210 8172",
  altBooking: { label: "Agendar en línea", href: BOOKING_HREF } satisfies PageCta,
  altEmergency: {
    label: "Emergencia WhatsApp",
    href: `https://wa.me/${clinicInfo.whatsappNumber}`,
    external: true,
  } satisfies PageCta,
};
