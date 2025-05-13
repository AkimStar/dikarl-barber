/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Disable cache for both client and server
    config.cache = false;
    
    // Ensure proper chunk loading
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false
        }
      }
    };
    
    return config;
  },
  // Disable static optimization to prevent hydration issues
  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig;