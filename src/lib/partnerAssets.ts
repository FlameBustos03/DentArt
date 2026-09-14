/// <reference types="next/image-types/global" />

// Official partner lockups in `public/partners/*.png`. Static imports give
// content-hashed URLs (see brandAssets.ts); the data layer in
// src/data/mockData.ts attaches these to each insurer / corporate plan, so
// that file stays the single place to add, swap or remove a partner logo.
import dentalia from "../../public/partners/dentalia.png";
import dentegra from "../../public/partners/dentegra.png";
import homeDepot from "../../public/partners/home-depot.png";
import liverpool from "../../public/partners/liverpool.png";

/** Dentegra Seguros Dentales, transparent background (960x519). */
export const dentegraLogo = dentegra;

/** Dentalia, transparent background (727x401). */
export const dentaliaLogo = dentalia;

/** The Home Depot orange square, opaque (1024x1024). */
export const homeDepotLogo = homeDepot;

/** Liverpool magenta lockup, opaque (2502x734). */
export const liverpoolLogo = liverpool;
