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
    const formattedLineItems = lineItems.map((item: any, index: number) => {
      let variantId = item.variantId
      
      console.log(`📦 Item ${index + 1}: variantId=${variantId}, quantity=${item.quantity}, price=${item.price}`)
      
      // Si c'est un ID GraphQL (gid://shopify/ProductVariant/123), extraire le nombre
      if (typeof variantId === 'string') {
        // Format GraphQL: gid://shopify/ProductVariant/123456789
        if (variantId.includes('ProductVariant/')) {
          const match = variantId.match(/ProductVariant\/(\d+)/)
          if (match) {
            variantId = match[1]
            console.log(`   → Extrait depuis GraphQL: ${variantId}`)
          }
        }
        // Format avec slash: /123456789 ou 123456789
        else if (variantId.includes('/')) {
          const match = variantId.match(/\/(\d+)$/)
          if (match) {
            variantId = match[1]
            console.log(`   → Extrait depuis format slash: ${variantId}`)
          }
        }
      }
      
      // S'assurer que c'est un nombre valide
      const numericVariantId = parseInt(variantId)
      if (isNaN(numericVariantId) || numericVariantId <= 0) {
        console.error(`❌ Variant ID invalide: "${variantId}" (type: ${typeof variantId}) pour item:`, item)
        throw new Error(`Variant ID invalide pour "${item.title || 'produit'}": ${variantId}. Veuillez vérifier que le produit existe dans Shopify.`)
      }
      
      const formattedItem = {
        variant_id: numericVariantId,
        quantity: item.quantity || 1,
        price: item.price ? parseFloat(item.price).toFixed(2) : undefined,
      }
      
      console.log(`   ✅ Formaté: variant_id=${formattedItem.variant_id}, quantity=${formattedItem.quantity}, price=${formattedItem.price || 'non spécifié'}`)
      
      return formattedItem
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
    console.log('📤 Envoi de la requête à Shopify Admin API...')
    console.log(`   URL: https://${adminStoreDomain}/admin/api/2024-01/orders.json`)
    console.log(`   Line items:`, JSON.stringify(formattedLineItems, null, 2))
    console.log(`   Order data:`, JSON.stringify(orderData, null, 2))
    
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

    const responseText = await response.text()
    console.log(`📥 Réponse Shopify (status ${response.status}):`, responseText.substring(0, 500))

    if (!response.ok) {
      console.error('❌ Erreur création commande Shopify:')
      console.error(`   Status: ${response.status}`)
      console.error(`   Response: ${responseText}`)
      
      let errorDetails = responseText
      try {
        const errorJson = JSON.parse(responseText)
        errorDetails = errorJson.errors || errorJson.error || responseText
      } catch (e) {
        // Garder le texte brut si ce n'est pas du JSON
      }
      
      return NextResponse.json(
        { 
          error: 'Erreur lors de la création de la commande Shopify', 
          details: errorDetails,
          status: response.status,
        },
        { status: response.status }
      )
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error('❌ Erreur parsing réponse JSON:', e)
      throw new Error('Réponse invalide de Shopify')
    }

    console.log(`✅ Commande Shopify créée avec succès!`)
    console.log(`   Numéro: ${data.order.name}`)
    console.log(`   ID: ${data.order.id}`)
    console.log(`   Total: ${data.order.total_price} ${data.order.currency_code}`)
    console.log(`   Statut financier: ${data.order.financial_status}`)
    console.log(`   Email: ${data.order.email || 'Non fourni'}`)
    
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

