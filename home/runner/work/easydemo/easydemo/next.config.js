/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
       {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
       {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com'
       }
    ],
  },
};

module.exports = nextConfig;
