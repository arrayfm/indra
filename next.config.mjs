/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.sanity.io',
      },
      {
        hostname: 'image.mux.com', // Mux image URLs
      },
      {
        hostname: 'i.ytimg.com', // YouTube image URLs
      },
      {
        hostname: 'vumbnail.com', // Vimeo image URLs
      },
    ],
  },
  experimental: {
    turbopack: false,
  },
}

export default nextConfig
