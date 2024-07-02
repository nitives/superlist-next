import { execSync } from "child_process";

function getCommitHash() {
  return execSync("git rev-parse --short HEAD").toString().trim();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    NEXT_PUBLIC_COMMIT_HASH: getCommitHash(),
  },
  images: {
    domains: ["image.tmdb.org", "img.flixhq.to"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.flixhq.to",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default nextConfig;
