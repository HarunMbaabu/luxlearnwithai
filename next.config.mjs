/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during build
  },
  experimental: {
    serverExternalPackages: ["pg"],
  },
};

export default nextConfig;
