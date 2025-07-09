/** @type {import('next').NextConfig} */

require('./checkEnvVars.ts')();

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
