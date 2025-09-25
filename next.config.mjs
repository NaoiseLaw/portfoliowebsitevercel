/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.magicui.design" },
      { protocol: "https", hostname: "cdn.llm.report" },
      { protocol: "https", hostname: "pub-83c5db439b40468498f97946200806f7.r2.dev" },
    ],
  },
};

export default nextConfig;
