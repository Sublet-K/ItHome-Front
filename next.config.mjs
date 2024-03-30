/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false, path: false };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '4000',
        pathname: '/**/**',
      },
    ],
  },
};

export default nextConfig;
