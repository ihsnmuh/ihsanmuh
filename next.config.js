/** @type {import('next').NextConfig} */

// Only check env vars if not in Docker build
if (process.env.NODE_ENV !== 'production' || !process.env.DOCKER_BUILD) {
  require('./checkEnvVars.ts')();
}

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
