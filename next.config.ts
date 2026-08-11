import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "video.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "insync-development.s3.eu-central-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
