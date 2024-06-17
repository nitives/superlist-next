import { execSync } from "child_process";

function getCommitHash() {
  return execSync("git rev-parse --short HEAD").toString().trim();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_COMMIT_HASH: getCommitHash(),
  },
};

export default nextConfig;
