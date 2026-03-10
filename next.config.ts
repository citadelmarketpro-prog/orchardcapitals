import type { NextConfig } from "next";
import path from "path";

const backendOrigin = process.env.BACKEND_ORIGIN || "http://localhost:8001";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        tailwindcss: path.resolve(__dirname, "node_modules/tailwindcss"),
      },
    },
  },
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendOrigin}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
    ],
  },
};

export default nextConfig;
