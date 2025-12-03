/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Configuration pour les images Shopify et Unsplash
    domains: ['cdn.shopify.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.shopifycdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Optimisations SEO et performance
  compress: true,
  poweredByHeader: false,
  typescript: {
    // Ignorer les erreurs TypeScript pendant le build (pour Vercel)
    ignoreBuildErrors: false,
  },
  eslint: {
    // Ignorer les erreurs ESLint pendant le build (pour Vercel)
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
