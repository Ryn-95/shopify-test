/**
 * Route de test pour vérifier la connexion Shopify Admin API
 */

import { NextRequest, NextResponse } from 'next/server'

const adminStoreDomain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const adminAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN

export async function GET(request: NextRequest) {
  try {
    // Vérifier la configuration
    if (!adminAccessToken || !adminStoreDomain) {
      return NextResponse.json({
        success: false,
        error: 'Admin API non configurée',
        config: {
          hasStoreDomain: !!adminStoreDomain,
          hasAccessToken: !!adminAccessToken,
          storeDomain: adminStoreDomain || 'NON DÉFINI',
          accessTokenPrefix: adminAccessToken ? adminAccessToken.substring(0, 10) + '...' : 'NON DÉFINI',
        },
      }, { status: 500 })
    }

    // Tester la connexion en récupérant les produits
    const response = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/products.json?limit=1`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': adminAccessToken,
        },
      }
    )

    const responseText = await response.text()
    
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: 'Erreur de connexion à Shopify',
        status: response.status,
        response: responseText.substring(0, 500),
      }, { status: response.status })
    }

    const data = JSON.parse(responseText)
    
    return NextResponse.json({
      success: true,
      message: 'Connexion Shopify Admin API réussie',
      config: {
        storeDomain: adminStoreDomain,
        accessTokenPrefix: adminAccessToken.substring(0, 10) + '...',
      },
      test: {
        productsCount: data.products?.length || 0,
        firstProduct: data.products?.[0]?.title || 'Aucun produit',
      },
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Erreur serveur',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    }, { status: 500 })
  }
}

