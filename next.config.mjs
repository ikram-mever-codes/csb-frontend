/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "img.clerk.com"],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.API_URL || "http://localhost:7000/api/:path*",
      },
    ];
  },
  experimental: {
    optimizeCss: true,
    images: {
      allowFutureImage: true,
    },
  },
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
    };
    return config;
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
