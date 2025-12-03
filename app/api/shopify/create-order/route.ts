/**
 * API Route pour créer une commande Shopify depuis Stripe
 * S'exécute côté serveur où les variables d'environnement sont accessibles
 */

import { NextRequest, NextResponse } from 'next/server'

const adminStoreDomain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const adminAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN

/**
 * Crée une commande Shopify depuis les données Stripe
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
    const { lineItems, customerEmail, customerName, totalAmount, currency, stripeSessionId } = body

    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json(
        { error: 'lineItems requis' },
        { status: 400 }
      )
    }

    console.log('📦 Création d\'une commande Shopify depuis Stripe...')
    console.log(`   Email client: ${customerEmail || 'Non fourni'}`)
    console.log(`   Nombre d'articles: ${lineItems.length}`)
    console.log(`   Total: ${totalAmount} ${currency}`)

    // Convertir les line items au format Shopify
    const formattedLineItems = lineItems.map((item: any) => {
      // Extraire le variant ID (peut être au format GraphQL ou numérique)
      let variantId = item.variantId
      if (typeof variantId === 'string' && variantId.includes('/')) {
        const match = variantId.match(/\/(\d+)$/)
        variantId = match ? match[1] : variantId
      }
      
      return {
        variant_id: parseInt(variantId),
        quantity: item.quantity,
        price: item.price || undefined, // Prix unitaire si disponible
      }
    })

    // Préparer les données de la commande
    const orderData: any = {
      order: {
        line_items: formattedLineItems,
        total_price: totalAmount.toString(),
        currency: currency || 'EUR',
        financial_status: 'paid', // Le paiement a été effectué via Stripe
        fulfillment_status: null, // À traiter
        note: `Paiement effectué via Stripe Checkout. Session ID: ${stripeSessionId || 'N/A'}`,
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

