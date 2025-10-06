import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["yt3.ggpht.com", "i.ytimg.com"],
    remotePatterns: [
      { protocol: "https", hostname: "yt3.ggpht.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
  },
  // Set custom port (optional - can also be set via CLI)
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
