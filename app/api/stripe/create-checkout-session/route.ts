import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

/**
 * Crée une session Stripe Checkout (redirection vers Stripe)
 */
export async function POST(request: NextRequest) {
  try {
    console.log('📝 Création d\'une session Stripe Checkout...')
    
    if (!stripe) {
      console.error('❌ Stripe n\'est pas configuré')
      return NextResponse.json(
        { error: 'Stripe n\'est pas configuré. Vérifiez STRIPE_SECRET_KEY dans .env.local' },
        { status: 500 }
      )
    }

    const body = await request.json()
    console.log('📦 Données reçues:', { amount: body.amount, currency: body.currency })
    
    const { amount, currency = 'eur', metadata, lineItems } = body

    if (!amount || amount <= 0) {
      console.error('❌ Montant invalide:', amount)
      return NextResponse.json(
        { error: 'Montant invalide' },
        { status: 400 }
      )
    }

    // Construire l'URL de base
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                    'http://localhost:4000')

    console.log('💳 Création de la session Checkout avec Stripe...')
    
    // Créer la session Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems && lineItems.length > 0 
        ? lineItems.map((item: any) => {
            // Extraire le variant ID (peut être au format GraphQL ou numérique)
            let variantId = item.variantId
            if (typeof variantId === 'string' && variantId.includes('/')) {
              const match = variantId.match(/\/(\d+)$/)
              variantId = match ? match[1] : variantId
            }

            return {
              price_data: {
                currency: currency.toLowerCase(),
                product_data: {
                  name: item.title || 'Produit',
                  description: item.variantTitle || '',
                  images: item.image ? [item.image.src] : [],
                  metadata: {
                    variant_id: variantId?.toString() || '',
                  },
                },
                unit_amount: Math.round(parseFloat(item.price) * 100), // Stripe utilise les centimes
              },
              quantity: item.quantity || 1,
            }
          })
        : [
            {
              price_data: {
                currency: currency.toLowerCase(),
                product_data: {
                  name: 'Commande',
                },
                unit_amount: Math.round(amount * 100), // Stripe utilise les centimes
              },
              quantity: 1,
            },
          ],
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout?canceled=true`,
      metadata: {
        ...metadata,
        cartId: metadata?.cartId || '',
      },
      locale: 'fr',
    })

    console.log('✅ Session Checkout créée:', session.id)

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error: any) {
    console.error('❌ Erreur lors de la création de la session Checkout:', error)
    console.error('   Type:', error.constructor.name)
    console.error('   Message:', error.message)
    console.error('   Stack:', error.stack)
    
    return NextResponse.json(
      { 
        error: error.message || 'Erreur serveur',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

