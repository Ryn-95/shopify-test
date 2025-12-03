/**
 * API Route pour créer et mettre à jour les Draft Orders
 * S'exécute côté serveur où les variables d'environnement sont accessibles
 */

import { NextRequest, NextResponse } from 'next/server'

const adminStoreDomain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const adminAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN

/**
 * Crée une Draft Order
 */
export async function POST(request: NextRequest) {
  if (!adminAccessToken || !adminStoreDomain) {
    return NextResponse.json(
      { error: 'Admin API non configurée' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { lineItems } = body

    if (!lineItems || !Array.isArray(lineItems)) {
      return NextResponse.json(
        { error: 'lineItems requis' },
        { status: 400 }
      )
    }

    // Convertir les variantId de format GraphQL vers format Admin API
    const formattedLineItems = lineItems.map((item: any) => {
      const variantIdMatch = item.variantId.match(/\/(\d+)$/)
      const variantId = variantIdMatch ? variantIdMatch[1] : item.variantId
      
      return {
        variant_id: parseInt(variantId),
        quantity: item.quantity,
      }
    })

    const response = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/draft_orders.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': adminAccessToken,
        },
        body: JSON.stringify({
          draft_order: {
            line_items: formattedLineItems,
            use_customer_default_address: true,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erreur création Draft Order:', errorText)
      return NextResponse.json(
        { error: 'Erreur lors de la création de la Draft Order' },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log(`✅ Draft Order créée: ${data.draft_order.id}`)
    
    return NextResponse.json({ draftOrder: data.draft_order })
  } catch (error: any) {
    console.error('❌ Erreur:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}

/**
 * Met à jour une Draft Order existante
 */
export async function PUT(request: NextRequest) {
  if (!adminAccessToken || !adminStoreDomain) {
    return NextResponse.json(
      { error: 'Admin API non configurée' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { draftOrderId, lineItems } = body

    if (!draftOrderId) {
      return NextResponse.json(
        { error: 'draftOrderId requis' },
        { status: 400 }
      )
    }

    if (!lineItems || !Array.isArray(lineItems)) {
      return NextResponse.json(
        { error: 'lineItems requis' },
        { status: 400 }
      )
    }

    // Convertir les variantId de format GraphQL vers format Admin API
    const formattedLineItems = lineItems.map((item: any) => {
      const variantIdMatch = item.variantId.match(/\/(\d+)$/)
      const variantId = variantIdMatch ? variantIdMatch[1] : item.variantId
      
      return {
        variant_id: parseInt(variantId),
        quantity: item.quantity,
      }
    })

    const response = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/draft_orders/${draftOrderId}.json`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': adminAccessToken,
        },
        body: JSON.stringify({
          draft_order: {
            line_items: formattedLineItems,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erreur mise à jour Draft Order:', errorText)
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de la Draft Order' },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log(`✅ Draft Order mise à jour: ${data.draft_order.id}`)
    
    return NextResponse.json({ draftOrder: data.draft_order })
  } catch (error: any) {
    console.error('❌ Erreur:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}

