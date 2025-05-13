/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Disable cache for both client and server
    config.cache = false;
    return config;
  }
}

module.exports = nextConfig