/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false, path: false };
    return config;
  },
};

export default nextConfig;
