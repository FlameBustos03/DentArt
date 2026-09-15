/// <reference types="next/image-types/global" />

import type { StaticImageData } from "next/image";
import dentalia from "../../public/partners/dentalia.png";
import dentegra from "../../public/partners/dentegra.png";
import homeDepot from "../../public/partners/home-depot.png";
import liverpool from "../../public/partners/liverpool.png";
import sectorPetrolero from "../../public/partners/sector-petrolero.webp";

/** Official partner lockups in `public/partners/*.png` (static import = content-hashed URL). */
export const partnerLogoById: Record<string, StaticImageData> = {
  dentegra,
  dentalia,
  "home-depot": homeDepot,
  liverpool,
  "sector-petrolero": sectorPetrolero,
};
