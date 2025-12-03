/**
 * API Route pour récupérer un panier Shopify depuis son ID
 */

import { NextRequest, NextResponse } from 'next/server'
import { getCheckout } from '@/lib/shopify'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cartId = searchParams.get('cartId')

    if (!cartId) {
      return NextResponse.json(
        { error: 'cartId requis' },
        { status: 400 }
      )
    }

    console.log('📦 Récupération du panier:', cartId)
    
    const cart = await getCheckout(cartId)

    if (!cart) {
      return NextResponse.json(
        { error: 'Panier non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({ cart })
  } catch (error: any) {
    console.error('❌ Erreur lors de la récupération du panier:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}

