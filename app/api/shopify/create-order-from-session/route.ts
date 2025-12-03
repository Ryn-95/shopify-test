/**
 * API Route pour créer une commande Shopify depuis une session Stripe Checkout
 * Appelée directement depuis la page de succès après le paiement
 */

import { NextRequest, NextResponse } from 'next/server'

const adminStoreDomain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const adminAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN

/**
 * Crée une commande Shopify depuis une session Stripe Checkout
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
    const { sessionId, lineItems, customerEmail, customerName, totalAmount, currency } = body

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId requis' },
        { status: 400 }
      )
    }

    console.log('📦 Création d\'une commande Shopify depuis session Stripe...')
    console.log(`   Session ID: ${sessionId}`)
    console.log(`   Email client: ${customerEmail || 'Non fourni'}`)
    console.log(`   Nombre d'articles: ${lineItems?.length || 0}`)
    console.log(`   Total: ${totalAmount} ${currency}`)

    // Si pas de lineItems, essayer de récupérer depuis le localStorage côté client
    if (!lineItems || lineItems.length === 0) {
      return NextResponse.json(
        { error: 'lineItems requis' },
        { status: 400 }
      )
    }

    // Convertir les line items au format Shopify
    const formattedLineItems = lineItems.map((item: any) => {
      let variantId = item.variantId
      
      // Si c'est un ID GraphQL (gid://shopify/ProductVariant/123), extraire le nombre
      if (typeof variantId === 'string' && variantId.includes('/')) {
        const match = variantId.match(/\/(\d+)$/)
        variantId = match ? match[1] : variantId
      }
      
      // S'assurer que c'est un nombre valide
      const numericVariantId = parseInt(variantId)
      if (isNaN(numericVariantId)) {
        console.warn('⚠️ Variant ID invalide:', variantId, 'pour item:', item)
        // Essayer de récupérer le premier variant du produit si disponible
        // Pour l'instant, on utilise 1 comme fallback (sera géré par Shopify)
        return {
          variant_id: 1, // Fallback - Shopify gérera l'erreur si nécessaire
          quantity: item.quantity,
          price: item.price || undefined,
        }
      }
      
      return {
        variant_id: numericVariantId,
        quantity: item.quantity,
        price: item.price || undefined,
      }
    })

    // Préparer les données de la commande
    const orderData: any = {
      order: {
        line_items: formattedLineItems,
        total_price: totalAmount.toString(),
        currency: currency || 'EUR',
        financial_status: 'paid',
        fulfillment_status: null,
        note: `Paiement effectué via Stripe Checkout. Session ID: ${sessionId}`,
        tags: ['stripe', 'stripe-checkout'],
      },
    }

    // Ajouter les informations client si disponibles
    if (customerEmail) {
      orderData.order.email = customerEmail
    }

    if (customerName) {
      const nameParts = customerName.split(' ')
      orderData.order.customer = {
        first_name: nameParts[0] || '',
        last_name: nameParts.slice(1).join(' ') || '',
        email: customerEmail || '',
      }
    }

    // Créer la commande dans Shopify
    const response = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/orders.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': adminAccessToken,
        },
        body: JSON.stringify(orderData),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erreur création commande Shopify:', errorText)
      return NextResponse.json(
        { error: 'Erreur lors de la création de la commande Shopify', details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log(`✅ Commande Shopify créée: ${data.order.name}`)
    console.log(`   ID: ${data.order.id}`)
    console.log(`   Total: ${data.order.total_price} ${data.order.currency_code}`)
    console.log(`   Statut financier: ${data.order.financial_status}`)
    
    return NextResponse.json({
      success: true,
      order: data.order,
    })
  } catch (error: any) {
    console.error('❌ Erreur lors de la création de la commande Shopify:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}

