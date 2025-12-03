import { NextResponse } from 'next/server'

/**
 * Route de debug pour vérifier les variables d'environnement sur Vercel
 * Accès: /api/debug-env
 */
export async function GET() {
  const envVars = {
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ? '✅ Définie' : '❌ Non définie',
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN 
      ? `✅ Définie (${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN.substring(0, 10)}...)` 
      : '❌ Non définie',
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN ? '✅ Définie' : '❌ Non définie',
    SHOPIFY_ADMIN_API_ACCESS_TOKEN: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN 
      ? `✅ Définie (${process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN.substring(0, 10)}...)` 
      : '❌ Non définie',
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY 
      ? `✅ Définie (${process.env.STRIPE_SECRET_KEY.substring(0, 10)}...)` 
      : '❌ Non définie',
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
      ? `✅ Définie (${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.substring(0, 10)}...)` 
      : '❌ Non définie',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || '❌ Non définie',
    NODE_ENV: process.env.NODE_ENV || 'non défini',
  }

  return NextResponse.json({
    message: 'Variables d\'environnement Vercel',
    variables: envVars,
    timestamp: new Date().toISOString(),
  }, { status: 200 })
}

