/** @type {import('next').NextConfig} */

require('./checkEnvVars.ts')();

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // MDX + syntax highlighting can create large page-data JSON for static blog pages.
    // Keep the page static, but raise the warning threshold.
    largePageDataBytes: 256 * 1024,
  },
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
