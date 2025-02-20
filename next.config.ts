import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removing the experimental optimization as it's causing conflicts
  // with @chakra-ui/next-js internal imports
};

export default nextConfig;
