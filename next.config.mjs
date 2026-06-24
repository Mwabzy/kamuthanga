/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local media lives in /public/properties/<slug>/. No remote loaders needed for v1.
    formats: ["image/webp"],
  },
};

export default nextConfig;
