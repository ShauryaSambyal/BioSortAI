/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Editorial photography is pulled straight from Unsplash.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
