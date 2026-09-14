import { clinicInfo, leadClinician, locations, socialLinks } from "@/data/mockData";
import { brandLockupImage } from "@/lib/brandAssets";
import { absoluteUrl } from "@/lib/siteUrl";
import type { ClinicLocation, OpeningHoursRule } from "@/types";

const ORG_ID = absoluteUrl("/#organization");
const CLINICIAN_ID = absoluteUrl("/#claudia");
const LOCKUP = absoluteUrl(brandLockupImage.src);

const openingHoursSpecification = clinicInfo.schedule.map((rule: OpeningHoursRule) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: rule.days,
  opens: rule.opens,
  closes: rule.closes,
}));

function sedeId(location: ClinicLocation): string {
  return absoluteUrl(`/#${location.id}`);
}

function sedeNode(location: ClinicLocation) {
  const [streetAddress] = location.addressLines;

  return {
    "@type": "DentalClinic",
    "@id": sedeId(location),
    name: `${clinicInfo.name} ${location.city}`,
    parentOrganization: { "@id": ORG_ID },
    url: absoluteUrl("/#sedes"),
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: "MX",
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`,
    telephone: clinicInfo.phoneTel,
    email: clinicInfo.email,
    openingHoursSpecification,
    image: LOCKUP,
  };
}

const [jobTitle] = leadClinician.role.split(" · ");

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DentalClinic",
      "@id": ORG_ID,
      name: clinicInfo.name,
      alternateName: `${clinicInfo.name} — ${clinicInfo.slogan}`,
      description: clinicInfo.tagline,
      url: absoluteUrl("/"),
      logo: LOCKUP,
      image: LOCKUP,
      telephone: clinicInfo.phoneTel,
      email: clinicInfo.email,
      slogan: clinicInfo.slogan,
      medicalSpecialty: "Dentistry",
      sameAs: socialLinks.map((link) => link.href),
      openingHoursSpecification,
      department: locations.map((location) => ({ "@id": sedeId(location) })),
      employee: [{ "@id": CLINICIAN_ID }],
    },
    ...locations.map(sedeNode),
    {
      "@type": "Person",
      "@id": CLINICIAN_ID,
      name: leadClinician.name,
      jobTitle,
      worksFor: { "@id": ORG_ID },
      image: absoluteUrl(leadClinician.photo.src),
      url: absoluteUrl("/#equipo"),
    },
  ],
};

export function JsonLd() {
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
