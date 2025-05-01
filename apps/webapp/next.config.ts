import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api",
        destination: process.env.NEXT_PUBLIC_SERVER_HOST ?? 'http://localhost:3001',
      },
    ];
  }
};

export default nextConfig;
