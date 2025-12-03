'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/components/ToastProvider'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export default function CheckoutPage() {
  const { cart, isLoading, clearCart } = useCart()
  const { showToast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (searchParams.get('canceled') === 'true') {
      showToast('Paiement annulé. Vous pouvez réessayer.', 'info')
    }
  }, [searchParams, showToast])

  // Calcul du total
  const calculateTotal = () => {
    if (!cart || !cart.lineItems.length) return 0
    return cart.lineItems.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity
    }, 0)
  }

  const total = calculateTotal()

  const handleStripeCheckout = async () => {
    if (!cart || cart.lineItems.length === 0) {
      showToast('Votre panier est vide.', 'error')
      return
    }

    setIsRedirecting(true)
    try {
      const lineItems = cart.lineItems.map(item => ({
        title: item.title,
        variantTitle: item.variantTitle,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        variantId: item.variantId,
      }))

      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'eur',
          lineItems: lineItems,
          metadata: {
            cartId: cart.id,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la création de la session de paiement Stripe.')
      }

      const data = await response.json()
      if (data.url) {
        router.push(data.url)
      } else {
        throw new Error('URL de session Stripe non reçue.')
      }
    } catch (error: any) {
      console.error('Erreur lors du checkout Stripe:', error)
      showToast(error.message || 'Erreur lors de la redirection vers Stripe.', 'error')
      setIsRedirecting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tech-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-tech-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-body text-primary-600 font-medium">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!cart || cart.lineItems.length === 0) {
    return (
      <div className="min-h-screen bg-tech-white py-24 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-tech-light-gray rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <h1 className="text-headline font-display font-bold text-tech-black mb-4">
            Votre panier est vide
          </h1>
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-tech-black text-tech-white font-semibold rounded-2xl hover:bg-primary-800 hover:scale-105 transition-all duration-300 shadow-medium hover:shadow-large"
          >
            Découvrir nos produits
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-tech-light-gray py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Panier', href: '/cart' },
          { label: 'Paiement', href: '/checkout' }
        ]} />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Résumé de la commande */}
          <div className="lg:col-span-2">
            <div className="bg-tech-white rounded-3xl shadow-medium border border-primary-100 p-8">
              <h2 className="text-headline font-display font-bold text-tech-black mb-8">
                Détails de la commande
              </h2>

              {/* Liste des produits */}
              <div className="space-y-4 mb-8">
                {cart.lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-6 border-b border-primary-100 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      {item.image && (
                        <div className="w-20 h-20 relative rounded-2xl overflow-hidden bg-tech-light-gray">
                          <img
                            src={item.image.src}
                            alt={item.image.alt || item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-title font-display font-semibold text-tech-black">{item.title}</h3>
                        <p className="text-caption text-primary-600">{item.variantTitle}</p>
                        <p className="text-caption text-primary-500 mt-1">Quantité: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-headline font-display font-bold text-tech-black">
                        {(parseFloat(item.price) * item.quantity).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-primary-200 pt-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-body text-primary-600">Sous-total</span>
                  <span className="text-body font-semibold text-tech-black">{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-body text-primary-600">Livraison</span>
                  <span className="text-caption text-tech-accent font-semibold">Gratuite</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-primary-200">
                  <span className="text-title font-display font-bold text-tech-black">Total</span>
                  <span className="text-headline font-display font-bold text-tech-black">{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de paiement */}
          <div className="lg:col-span-1">
            <div className="bg-tech-white rounded-3xl shadow-medium border border-primary-100 p-8 sticky top-24">
              <h2 className="text-headline font-display font-bold text-tech-black mb-6">
                Paiement
              </h2>

              <p className="text-body text-primary-600 mb-6">
                Vous serez redirigé vers le checkout Stripe sécurisé.
              </p>
              
              <button
                onClick={handleStripeCheckout}
                disabled={isRedirecting}
                className="w-full py-4 px-6 bg-tech-black text-tech-white font-semibold rounded-2xl hover:bg-primary-800 transition-all duration-300 shadow-medium hover:shadow-large text-center block disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105"
              >
                {isRedirecting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Redirection...
                  </span>
                ) : (
                  `Payer ${total.toFixed(2)} € avec Stripe`
                )}
              </button>

              <Link
                href="/cart"
                className="w-full block text-center mt-4 px-6 py-3 bg-tech-light-gray text-tech-black font-semibold rounded-2xl border-2 border-primary-200 hover:border-tech-black transition-all duration-300"
              >
                Retour au panier
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
