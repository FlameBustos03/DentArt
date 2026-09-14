import {
  clinicInfo,
  clinicOpeningHours,
  leadClinician,
  locations,
  socialLinks,
} from "@/data/mockData";
import { brandLockupImage } from "@/lib/brandAssets";
import { siteOrigin } from "@/lib/siteOrigin";
import type { ClinicLocation } from "@/types";

const LOCKUP = `${siteOrigin}${brandLockupImage.src}`;
const CLAUDIA_PHOTO = `${siteOrigin}${leadClinician.photo.src}`;
const ORG_ID = `${siteOrigin}/#organization`;
const CLAUDIA_ID = `${siteOrigin}/#claudia`;
const DENTISTRY = "https://schema.org/Dentistry";

const openingHoursSpecification = clinicOpeningHours.map((entry) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: entry.days,
  opens: entry.opens,
  closes: entry.closes,
}));

function sedeId(location: ClinicLocation): string {
  return `${siteOrigin}/#${location.id}`;
}

// schema.org has no DentalClinic type: a dental practice is `Dentist`, a
// LocalBusiness (Place + Organization), which is where address, hours and
// hasMap belong. Dentist/Physician are business types, so the clinician is a
// Person. The brand node has no single address, so it is a MedicalOrganization
// (not a LocalBusiness, for which Google requires an address).
function sedeNode(location: ClinicLocation) {
  return {
    "@type": "Dentist",
    "@id": sedeId(location),
    name: `${clinicInfo.name} ${location.city}`,
    parentOrganization: { "@id": ORG_ID },
    medicalSpecialty: DENTISTRY,
    url: `${siteOrigin}/#sedes`,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.addressLines[0],
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

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": ORG_ID,
      name: clinicInfo.name,
      alternateName: `${clinicInfo.name} — ${clinicInfo.slogan}`,
      url: `${siteOrigin}/`,
      logo: LOCKUP,
      image: LOCKUP,
      telephone: clinicInfo.phoneTel,
      email: clinicInfo.email,
      slogan: clinicInfo.slogan,
      medicalSpecialty: DENTISTRY,
      sameAs: socialLinks.map((link) => link.href),
      department: locations.map((location) => ({ "@id": sedeId(location) })),
      location: locations.map((location) => ({ "@id": sedeId(location) })),
      employee: [{ "@id": CLAUDIA_ID }],
    },
    ...locations.map(sedeNode),
    {
      "@type": "Person",
      "@id": CLAUDIA_ID,
      name: leadClinician.name,
      jobTitle: leadClinician.role.split(" · ")[0],
      worksFor: { "@id": ORG_ID },
      image: CLAUDIA_PHOTO,
      url: `${siteOrigin}/#equipo`,
    },
  ],
};

export function JsonLd() {
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
