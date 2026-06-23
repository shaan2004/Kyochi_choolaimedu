import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Reduce minimum cache TTL for optimized images
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Limit device sizes to avoid generating too many variants
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [70, 75],
  },
  // Experimental: enable package import tree-shaking for lucide-react
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
