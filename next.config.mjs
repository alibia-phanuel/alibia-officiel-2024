/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  images: {
    domains: ["images.pexels.com"],
  },
};

export default nextConfig;
