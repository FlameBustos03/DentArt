function withProtocol(host: string): string {
  return /^https?:\/\//.test(host) ? host : `https://${host}`;
}

function resolveSiteOrigin(): string {
  // Explicit override first; then the Vercel system variables, which are
  // always the production domain (or the current deployment's URL) and never
  // a branch preview that disappears when the branch is deleted.
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  return withProtocol(candidate).replace(/\/+$/, "");
}

/** Absolute origin (no trailing slash) used for canonical/JSON-LD URLs. */
export const siteOrigin = resolveSiteOrigin();
