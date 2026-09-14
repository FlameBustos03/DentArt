/** @type {import('next').NextConfig} */

// Clinic-safe CSP in Report-Only. Enforce later after violation review.
// script-src keeps 'unsafe-inline' and 'unsafe-eval' for Next.js 14 hydration
// plus @react-three/fiber / drei; prefer nonce/hash + drop unsafe-eval later.
const securityHeaders = [
  {
    key: "Content-Security-Policy-Report-Only",
    value:
      "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://wa.me https://api.whatsapp.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://images.unsplash.com https://*.google.com https://*.googleapis.com https://*.gstatic.com; font-src 'self' data:; connect-src 'self' https://*.vercel-insights.com https://vitals.vercel-insights.com; worker-src 'self' blob:; child-src 'self' blob:; frame-src https://maps.google.com https://www.google.com; media-src 'self' blob:; manifest-src 'self'; upgrade-insecure-requests",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
