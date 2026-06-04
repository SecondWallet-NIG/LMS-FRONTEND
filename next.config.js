/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  // appDir: true,
  eslint: {
    // Lint in dev/PR via `npm run lint`; skip during Docker `next build` (CI has 100+ warnings).
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["cdn-icons-png.flaticon.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
