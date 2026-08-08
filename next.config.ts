import type { NextConfig } from "next";

const securityHeaders = [
  // Clickjacking protection — auth forms and account settings should
  // never render inside a third-party frame.
  { key: "X-Frame-Options", value: "DENY" },
  // Stops browsers from MIME-sniffing a response away from its declared
  // Content-Type (a classic vector for reflected-content XSS).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Sends no Referer header cross-origin, and only the origin (not full
  // path/query) same-origin — avoids leaking session-bearing URLs.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Explicitly opt out of browser features this app never uses.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // M2.5 perf pass: named lucide-react imports are already tree-shakeable,
  // but this makes Next resolve each icon to its own module explicitly
  // rather than relying on the barrel file, trimming a little more from
  // the shared client chunk across the ~40 icons used app-wide.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
