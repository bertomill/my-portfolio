/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'cdn-images-1.medium.com'
    ],
  },
}

module.exports = nextConfig 