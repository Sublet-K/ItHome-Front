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
  env: {
    PASSWORD:'1253ys5697@',
    USERNAME:'evan',
    NEXT_PUBLIC_BACKEND_URL:'https://localhost:4000',
    NEXT_PUBLIC_GOOGLE_CLIENT_ID:"206318961864-8s7ldu05gvpb28h3nepem9fdpfgut07n.apps.googleusercontent.com",
    NEXT_PUBLIC_KAKAO_CLIENT_ID:"09bf01a9ff1495578ebe3b1dc2fb47b3",
    NEXT_PUBLIC_NAVER_CLIENT_ID:"lGRf0bdS4VJox6O3SDdb",
    NEXT_PUBLIC_KAKAO_REDIRECT_URI:'https://localhost:3000/oauth/kakao',
    NEXT_PUBLIC_NAVER_REDIRECT_URI:'https://localhost:3000',
    NEXT_PUBLIC_KAKAO_JS:"0a1100664012f98b0971df87496e5ca8",
    NEXT_PUBLIC_KAKAO_INTEGRITY:'sha384-l+xbElFSnPZ2rOaPrU//2FF5B4LB8FiX5q4fXYTlfcG4PGpMkE1vcL7kNXI6Cci0',
    NEXT_PUBLIC_TEST_BACKEND_URL:'https://localhost:4000',
    FRONTEND_PORT:"3000",
  },
};

export default nextConfig;
