/**
 * Configuration Stripe
 * Utilise les clés API Stripe depuis les variables d'environnement
 */

import Stripe from 'stripe'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

// Créer l'instance Stripe seulement si la clé secrète est disponible
export const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
      typescript: true,
    })
  : null

if (!STRIPE_SECRET_KEY) {
  console.warn('⚠️ STRIPE_SECRET_KEY manquante dans .env.local - Stripe ne fonctionnera pas')
}

if (!STRIPE_PUBLISHABLE_KEY) {
  console.warn('⚠️ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY manquante dans .env.local')
}

