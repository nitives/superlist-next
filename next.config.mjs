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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.flixhq.to",
      },
    ],
  },
};

export default nextConfig;
