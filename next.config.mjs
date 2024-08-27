/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
      // Adjust performance budget for assets
      config.performance = {
        maxEntrypointSize: 500000, // 500 KB
        maxAssetSize: 500000, // 500 KB
      };
      return config;
    },
  };
  
  export default nextConfig;
  