/// <reference types="next/image-types/global" />

// Static imports give the brand PNGs content-hashed URLs
// (/_next/static/media/<name>.<hash>.png), so swapping the file in
// public/brand/ can never be served from a stale optimizer/CDN/browser cache
// of a previous export. next/image keeps the alpha channel when it transcodes
// these to WebP/AVIF, so optimization stays on.
import lockup from "../../public/brand/dent-art-lockup.png";
import butterflyD from "../../public/brand/dent-art-butterfly-d.png";

/** Full lockup: butterfly-D + wordmark + slogan, transparent background (1125x422). */
export const brandLockupImage = lockup;

/** Left 38% crop of the lockup (the butterfly-D only), transparent background (427x422). */
export const brandButterflyImage = butterflyD;
