/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com", "img.clerk.com"], // Add your image domains here
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*", // API path that your Next.js app will use
  //       destination: process.env.API_URL || "http://localhost:7000/api/:path*",
  //     },
  //   ];
  // },
  experimental: {
    optimizeCss: true,
  },

  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: "all",
      minSize: 30000,
      maxSize: 200000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          minSize: 30000,
          maxSize: 200000,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    };

    return config;
  },
  productionBrowserSourceMaps: true, // Useful for debugging in production
};

export default nextConfig;
