import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: `1GB`,
    },
  },
};

export default nextConfig;
