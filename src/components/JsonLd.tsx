const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dentart-julian-b1.vercel.app"
).replace(/\/$/, "");

const LOCKUP = `${SITE_ORIGIN}/brand/dent-art-lockup.png`;
const CLAUDIA_PHOTO = `${SITE_ORIGIN}/team/dra-claudia-solis.webp`;
const ORG_ID = `${SITE_ORIGIN}/#organization`;
const POZA_RICA_ID = `${SITE_ORIGIN}/#poza-rica`;
const VILLAHERMOSA_ID = `${SITE_ORIGIN}/#villahermosa`;
const CLAUDIA_ID = `${SITE_ORIGIN}/#claudia`;
const ARLETTE_ID = `${SITE_ORIGIN}/#arlette`;

const TELEPHONE = "+52-782-210-8172";
const EMAIL = "DentArt@gmail.com";

const openingHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "13:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "16:00",
    closes: "19:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "10:00",
    closes: "13:00",
  },
];

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DentalClinic",
      "@id": ORG_ID,
      name: "Dent Art",
      alternateName: "Dent Art — Atrévete a Sonreír",
      url: `${SITE_ORIGIN}/`,
      logo: LOCKUP,
      image: LOCKUP,
      telephone: TELEPHONE,
      email: EMAIL,
      slogan: "Atrévete a Sonreír",
      openingHoursSpecification,
      department: [{ "@id": POZA_RICA_ID }, { "@id": VILLAHERMOSA_ID }],
      location: [{ "@id": POZA_RICA_ID }, { "@id": VILLAHERMOSA_ID }],
      employee: [{ "@id": CLAUDIA_ID }, { "@id": ARLETTE_ID }],
    },
    {
      "@type": "DentalClinic",
      "@id": POZA_RICA_ID,
      name: "Dent Art Poza Rica",
      parentOrganization: { "@id": ORG_ID },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Cipres #204, Col. Chapultepec",
        addressLocality: "Poza Rica",
        addressRegion: "Veracruz",
        addressCountry: "MX",
      },
      telephone: TELEPHONE,
      email: EMAIL,
      openingHoursSpecification,
      image: LOCKUP,
      employee: [{ "@id": CLAUDIA_ID }, { "@id": ARLETTE_ID }],
    },
    {
      "@type": "DentalClinic",
      "@id": VILLAHERMOSA_ID,
      name: "Dent Art Villahermosa",
      parentOrganization: { "@id": ORG_ID },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ermitaño 9, mz 22, Valle del Jaguar",
        addressLocality: "Villahermosa",
        addressRegion: "Tabasco",
        addressCountry: "MX",
      },
      telephone: TELEPHONE,
      email: EMAIL,
      openingHoursSpecification,
      image: LOCKUP,
      employee: [{ "@id": CLAUDIA_ID }],
    },
    {
      "@type": ["Dentist", "Physician"],
      "@id": CLAUDIA_ID,
      name: "Dra. Claudia Solís",
      jobTitle: "Estética dental y diseño de sonrisa",
      worksFor: { "@id": ORG_ID },
      image: CLAUDIA_PHOTO,
      url: `${SITE_ORIGIN}/#equipo`,
    },
    {
      "@type": ["Dentist", "Physician"],
      "@id": ARLETTE_ID,
      name: "Dra. Arlette Aquino",
      jobTitle: "Odontología general",
      worksFor: { "@id": POZA_RICA_ID },
      url: `${SITE_ORIGIN}/#equipo`,
    },
  ],
};

export function JsonLd() {
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
