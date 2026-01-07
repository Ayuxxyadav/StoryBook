/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    remotePatterns: [
      // Pinterest
      {
        protocol: "https",
        hostname: "**.pinimg.com",
      },

      // Google images (gstatic)
      {
        protocol: "https",
        hostname: "**.gstatic.com",
      },

      // Googleusercontent (very common)
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;