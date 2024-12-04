import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
