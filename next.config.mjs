/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "img.clerk.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:7000/api/:path*",
      },
    ];
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
