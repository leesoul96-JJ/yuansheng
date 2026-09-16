import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/yuansheng',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;