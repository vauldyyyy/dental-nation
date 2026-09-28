/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  experimental: { optimizePackageImports: ["framer-motion"] },
  async redirects() {
    return [
      { source: "/services-4", destination: "/treatments", permanent: true },
      { source: "/contact-5", destination: "/contact", permanent: true },
      { source: "/blog", destination: "/advice", permanent: true },
      { source: "/post/what-to-expect-during-an-routine-dental-extraction", destination: "/advice/what-to-expect-during-a-routine-dental-extraction", permanent: true },
      { source: "/post/do-you-really-need-a-crown-after-a-root-canal", destination: "/advice/do-you-really-need-a-crown-after-a-root-canal", permanent: true },
      { source: "/post/do-i-really-need-a-root-canal-7-signs-your-tooth-may-need-one", destination: "/advice/seven-signs-you-may-need-a-root-canal", permanent: true },
    ];
  },
};
export default nextConfig;
