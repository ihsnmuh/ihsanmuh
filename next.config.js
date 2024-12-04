/** @type {import('next').NextConfig} */

require('./checkEnvVars.ts')();

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
