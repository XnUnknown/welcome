/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",
    images: {
      unoptimized: true, // If using Next.js image optimization, disable it for static export
    },
  };
module.exports = nextConfig;