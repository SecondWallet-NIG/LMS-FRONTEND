/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  // appDir: true,
  experimental: {
    appDir: true,
  },
  future: { webpack5: true },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  images: {
    domains: ["cdn-icons-png.flaticon.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
