/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Configuration pour les images Shopify
    domains: ['cdn.shopify.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.shopifycdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
    ],
  },
  // Optimisations SEO et performance
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig

