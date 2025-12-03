/**
 * Script de test pour vérifier la configuration Stripe
 * Teste la création d'un Payment Intent
 */

require('dotenv').config({ path: '.env.local' })

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

console.log('🧪 Test de configuration Stripe...\n')

// Vérifier les variables d'environnement
if (!STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY manquante dans .env.local')
  process.exit(1)
}

if (!STRIPE_PUBLISHABLE_KEY) {
  console.error('❌ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY manquante dans .env.local')
  process.exit(1)
}

console.log('✅ Variables d\'environnement trouvées')
console.log(`   Secret Key: ${STRIPE_SECRET_KEY.substring(0, 12)}...`)
console.log(`   Publishable Key: ${STRIPE_PUBLISHABLE_KEY.substring(0, 12)}...`)
console.log('')

// Tester la création d'un Payment Intent
async function testPaymentIntent() {
  try {
    const Stripe = require('stripe')
    const stripe = new Stripe(STRIPE_SECRET_KEY)

    console.log('🧪 Test de création d\'un Payment Intent...')
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10000, // 100.00 EUR en centimes
      currency: 'eur',
      metadata: {
        test: 'true',
      },
    })

    console.log('✅ Payment Intent créé avec succès !')
    console.log(`   ID: ${paymentIntent.id}`)
    console.log(`   Montant: ${paymentIntent.amount / 100} ${paymentIntent.currency.toUpperCase()}`)
    console.log(`   Statut: ${paymentIntent.status}`)
    console.log(`   Client Secret: ${paymentIntent.client_secret.substring(0, 20)}...`)
    console.log('')
    console.log('🎉 Stripe est correctement configuré !')
    console.log('   Vous pouvez maintenant tester sur votre site : http://localhost:3000/checkout')
    
  } catch (error) {
    console.error('❌ Erreur lors de la création du Payment Intent:', error.message)
    
    if (error.type === 'StripeAuthenticationError') {
      console.error('\n💡 La clé secrète Stripe est invalide')
      console.error('   Vérifiez votre STRIPE_SECRET_KEY dans .env.local')
    } else if (error.type === 'StripeInvalidRequestError') {
      console.error('\n💡 Erreur dans la requête')
      console.error('   Détails:', error.message)
    }
    
    process.exit(1)
  }
}

testPaymentIntent()

