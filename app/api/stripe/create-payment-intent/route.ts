import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

/**
 * Crée un Payment Intent Stripe pour le checkout
 */
export async function POST(request: NextRequest) {
  try {
    console.log('📝 Création d\'un Payment Intent...')
    
    if (!stripe) {
      console.error('❌ Stripe n\'est pas configuré')
      return NextResponse.json(
        { error: 'Stripe n\'est pas configuré. Vérifiez STRIPE_SECRET_KEY dans .env.local' },
        { status: 500 }
      )
    }

    const body = await request.json()
    console.log('📦 Données reçues:', { amount: body.amount, currency: body.currency })
    
    const { amount, currency = 'eur', metadata } = body

    if (!amount || amount <= 0) {
      console.error('❌ Montant invalide:', amount)
      return NextResponse.json(
        { error: 'Montant invalide' },
        { status: 400 }
      )
    }

    console.log('💳 Création du Payment Intent avec Stripe...')
    
    // Créer le Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe utilise les centimes
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: metadata || {},
    })

    console.log('✅ Payment Intent créé:', paymentIntent.id)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error: any) {
    console.error('❌ Erreur lors de la création du Payment Intent:', error)
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

