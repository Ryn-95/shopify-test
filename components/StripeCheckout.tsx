'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useToast } from './ToastProvider'

interface StripeCheckoutProps {
  amount: number
  currency?: string
  onSuccess?: (sessionId: string) => void
}

/**
 * Composant Stripe Checkout Premium
 * Redirige vers l'interface Stripe
 */
export default function StripeCheckout({ amount, currency = 'eur', onSuccess }: StripeCheckoutProps) {
  const { cart } = useCart()
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    if (!amount || amount <= 0) {
      showToast('Montant invalide', 'error')
      return
    }

    setIsLoading(true)

    try {
      console.log('💳 Création de la session Stripe Checkout...')

      const lineItems = cart?.lineItems.map((item) => ({
        title: item.title,
        variantTitle: item.variantTitle,
        variantId: item.variantId,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })) || []

      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: currency.toLowerCase(),
          lineItems,
          metadata: {
            cartId: cart?.id || '',
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }))
        console.error('❌ Erreur API:', errorData)
        throw new Error(errorData.error || `Erreur HTTP ${response.status}`)
      }

      const data = await response.json()

      if (!data.url) {
        console.error('❌ Pas d\'URL dans la réponse:', data)
        throw new Error('URL de redirection non reçue')
      }

      console.log('✅ Session Checkout créée, redirection vers Stripe...')
      window.location.href = data.url
    } catch (error: any) {
      console.error('❌ Erreur lors de la création de la session Checkout:', error)
      showToast(error.message || 'Erreur lors de l\'initialisation du paiement', 'error')
      setIsLoading(false)
    }
  }

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
        <p className="text-yellow-800 text-body font-medium">
          ⚠️ Stripe n&apos;est pas configuré. Ajoutez NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY dans .env.local
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full py-4 px-6 bg-tech-black text-tech-white font-semibold rounded-2xl hover:bg-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-medium hover:shadow-large flex items-center justify-center gap-2 hover:scale-105 disabled:hover:scale-100"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-tech-white border-t-transparent rounded-full animate-spin"></div>
            <span>Redirection vers Stripe...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5z" />
            </svg>
            <span>Payer {amount.toFixed(2)} € avec Stripe</span>
          </>
        )}
      </button>

      <p className="text-caption text-primary-600 text-center">
        Vous serez redirigé vers l&apos;interface sécurisée de Stripe pour finaliser votre paiement.
      </p>

      {process.env.NODE_ENV === 'development' && (
        <div className="p-4 bg-tech-accent/10 border border-tech-accent/20 rounded-2xl text-caption text-tech-accent">
          <p className="font-semibold mb-2">💡 Mode Test Stripe</p>
          <p>Sur la page Stripe, utilisez une carte de test :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Succès :</strong> 4242 4242 4242 4242</li>
            <li><strong>3D Secure :</strong> 4000 0025 0000 3155</li>
            <li><strong>Date :</strong> N&apos;importe quelle date future</li>
            <li><strong>CVC :</strong> N&apos;importe quel 3 chiffres</li>
          </ul>
        </div>
      )}
    </div>
  )
}
