import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // M2.5 perf pass: named lucide-react imports are already tree-shakeable,
  // but this makes Next resolve each icon to its own module explicitly
  // rather than relying on the barrel file, trimming a little more from
  // the shared client chunk across the ~40 icons used app-wide.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
