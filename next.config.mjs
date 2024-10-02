import MillionLint from "@million/lint";
import { execSync } from "child_process";
function getCommitHash() {
  return execSync("git rev-parse --short HEAD").toString().trim();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default nextConfig;
// export default MillionLint.next({
//   rsc: true
// })(nextConfig);
