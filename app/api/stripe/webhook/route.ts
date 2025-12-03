import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

/**
 * Webhook Stripe pour gérer les événements de paiement
 * Crée automatiquement une commande Shopify après un paiement réussi
 */
export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe n\'est pas configuré' },
      { status: 500 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: 'Signature ou secret manquant' },
      { status: 400 }
    )
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('❌ Erreur de vérification webhook:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Gérer les événements
  switch (event.type) {
    case 'checkout.session.completed':
      // Événement pour Stripe Checkout (redirection)
      const session = event.data.object as any
      console.log('✅ Session Checkout complétée:', session.id)
      
      try {
        // Récupérer les détails complets de la session
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items', 'customer'],
        })

        console.log('📦 Création de la commande Shopify...')
        console.log(`   Email client: ${fullSession.customer_details?.email || 'Non fourni'}`)
        console.log(`   Nombre d'articles: ${fullSession.line_items?.data?.length || 0}`)

        // Préparer les line items pour Shopify
        const lineItems = fullSession.line_items?.data?.map((item: any) => {
          // Extraire le variant ID depuis les metadata du product_data
          let variantId = item.price?.product_data?.metadata?.variant_id || 
                         item.price?.metadata?.variant_id || 
                         item.metadata?.variant_id
          
          if (!variantId) {
            console.warn('⚠️ Variant ID non trouvé dans metadata pour:', item.price?.product_data?.name)
            console.warn('   Metadata disponibles:', JSON.stringify(item.price?.product_data?.metadata || {}))
            // Essayer d'utiliser le premier variant disponible (fallback)
            variantId = '1'
          }

          return {
            variantId: variantId,
            quantity: item.quantity,
            price: (item.amount_total / 100).toFixed(2), // Convertir de centimes en euros
          }
        }) || []

        // Créer la commande dans Shopify directement
        const adminStoreDomain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
        const adminAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN

        if (!adminAccessToken || !adminStoreDomain) {
          console.error('❌ Admin API non configurée - Impossible de créer la commande Shopify')
        } else {
          // Convertir les line items au format Shopify
          const formattedLineItems = lineItems.map((item: any) => {
            let variantId = item.variantId
            if (typeof variantId === 'string' && variantId.includes('/')) {
              const match = variantId.match(/\/(\d+)$/)
              variantId = match ? match[1] : variantId
            }
            
            return {
              variant_id: parseInt(variantId),
              quantity: item.quantity,
              price: item.price || undefined,
            }
          })

          // Préparer les données de la commande
          const orderData: any = {
            order: {
              line_items: formattedLineItems,
              total_price: (fullSession.amount_total / 100).toFixed(2),
              currency: fullSession.currency?.toUpperCase() || 'EUR',
              financial_status: 'paid',
              fulfillment_status: null,
              note: `Paiement effectué via Stripe Checkout. Session ID: ${session.id}`,
              tags: ['stripe', 'stripe-checkout'],
            },
          }

          // Ajouter les informations client si disponibles
          if (fullSession.customer_details?.email) {
            orderData.order.email = fullSession.customer_details.email
          }

          if (fullSession.customer_details?.name) {
            const nameParts = fullSession.customer_details.name.split(' ')
            orderData.order.customer = {
              first_name: nameParts[0] || '',
              last_name: nameParts.slice(1).join(' ') || '',
              email: fullSession.customer_details.email || '',
            }
          }

          try {
            // Créer la commande dans Shopify
            const shopifyResponse = await fetch(
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

            if (shopifyResponse.ok) {
              const shopifyData = await shopifyResponse.json()
              console.log(`✅ Commande Shopify créée: ${shopifyData.order.name}`)
              console.log(`   ID: ${shopifyData.order.id}`)
              console.log(`   Total: ${shopifyData.order.total_price} ${shopifyData.order.currency_code}`)
            } else {
              const errorText = await shopifyResponse.text()
              console.error('❌ Erreur lors de la création de la commande Shopify:', errorText)
            }
          } catch (error: any) {
            console.error('❌ Erreur lors de la création de la commande Shopify:', error)
          }
        }
      } catch (error: any) {
        console.error('❌ Erreur lors de la création de la commande:', error)
        console.error('   Message:', error.message)
        console.error('   Stack:', error.stack)
      }
      break

    case 'payment_intent.succeeded':
      // Événement pour Payment Intent (ancien système intégré)
      const paymentIntent = event.data.object as any
      console.log('✅ Paiement réussi (Payment Intent):', paymentIntent.id)
      
      // Note: Pour Payment Intent, vous devriez avoir les données du panier dans metadata
      // Ici on ne fait rien car on utilise maintenant Stripe Checkout
      break

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as any
      console.log('❌ Paiement échoué:', failedPayment.id)
      break

    default:
      console.log(`ℹ️ Événement non géré: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

