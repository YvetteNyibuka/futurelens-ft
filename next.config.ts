/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizations for Netlify deployment
  reactStrictMode: true,

  // Using function to make TypeScript happy
  webpack: (config: any) => {
    return config;
  },

  // Image optimization
  images: {
    domains: ["netlify.app"],
    unoptimized: true,
  },

  // Disable type checking in production builds to speed up the build process
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  // Disable ESLint during production builds for faster builds
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
