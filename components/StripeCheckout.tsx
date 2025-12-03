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
 * Composant Stripe Checkout qui redirige vers l'interface Stripe
 * Au lieu d'afficher un formulaire intégré, redirige vers Stripe Checkout
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

      // Préparer les line items depuis le panier
      const lineItems = cart?.lineItems.map((item) => ({
        title: item.title,
        variantTitle: item.variantTitle,
        variantId: item.variantId, // Important pour créer la commande Shopify
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

      // Rediriger vers Stripe Checkout
      window.location.href = data.url
    } catch (error: any) {
      console.error('❌ Erreur lors de la création de la session Checkout:', error)
      showToast(error.message || 'Erreur lors de l\'initialisation du paiement', 'error')
      setIsLoading(false)
    }
  }

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">
          ⚠️ Stripe n'est pas configuré. Ajoutez NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY dans .env.local
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full py-4 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Redirection vers Stripe...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Payer {amount.toFixed(2)} € avec Stripe</span>
          </>
        )}
      </button>

      <p className="text-sm text-gray-600 text-center">
        Vous serez redirigé vers l'interface sécurisée de Stripe pour finaliser votre paiement.
      </p>

      {process.env.NODE_ENV === 'development' && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
          <p className="font-semibold mb-2">💡 Mode Test Stripe</p>
          <p>Sur la page Stripe, utilisez une carte de test :</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li><strong>Succès :</strong> 4242 4242 4242 4242</li>
            <li><strong>3D Secure :</strong> 4000 0025 0000 3155</li>
            <li><strong>Date :</strong> N'importe quelle date future</li>
            <li><strong>CVC :</strong> N'importe quel 3 chiffres</li>
          </ul>
        </div>
      )}
    </div>
  )
}

