/** @type {import('next').NextConfig} */
const nextConfig = {
  // El magazine se sirve como subdirectorio de horsesuite.app (/magazine).
  // basePath hace que TODAS las rutas, assets, <Link> y API routes vivan bajo /magazine.
  basePath: "/magazine",
  async redirects() {
    return [
      {
        source: "/criadores",
        destination: "/yeguadas",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
