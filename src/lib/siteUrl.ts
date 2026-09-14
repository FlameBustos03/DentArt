// Resolved once at build time on the server (used by `metadataBase` and the
// JSON-LD `@id`s/`url`s). Order: explicit override, then the Vercel production
// domain, then the deployment URL (previews), then the local dev server.
// A hard-coded branch preview URL must never be the fallback: it would become
// the canonical organisation URL on production once the branch is merged.
function withProtocol(host: string): string {
  return /^https?:\/\//.test(host) ? host : `https://${host}`;
}

function resolveSiteUrl(): string {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";

  return withProtocol(candidate).replace(/\/$/, "");
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
