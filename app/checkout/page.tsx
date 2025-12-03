'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/components/ToastProvider'
import StripeCheckout from '@/components/StripeCheckout'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export default function CheckoutPage() {
  const { cart, isLoading } = useCart()
  const { showToast } = useToast()
  const searchParams = useSearchParams()
  const [useStripe, setUseStripe] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur a annulé le paiement
    const canceled = searchParams.get('canceled')
    if (canceled === 'true') {
      showToast('Paiement annulé', 'info')
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!cart || cart.lineItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Votre panier est vide
          </h1>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Découvrir nos produits
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Panier', href: '/cart' },
          { label: 'Paiement', href: '/checkout' }
        ]} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Résumé de la commande */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
                Détails de la commande
              </h2>

              {/* Liste des produits */}
              <div className="space-y-4 mb-8">
                {cart.lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4 border-b border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      {item.image && (
                        <img
                          src={item.image.src}
                          alt={item.image.alt || item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.variantTitle}</p>
                        <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {(parseFloat(item.price) * item.quantity).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-semibold">{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Livraison</span>
                  <span className="text-sm text-gray-500">Gratuite</span>
                </div>
                <div className="flex justify-between items-center text-xl font-extrabold pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de paiement */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sticky top-24">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
                Paiement
              </h2>

              {/* Toggle Stripe / Shopify */}
              <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setUseStripe(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    useStripe
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Stripe
                </button>
                <button
                  onClick={() => setUseStripe(false)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    !useStripe
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Shopify
                </button>
              </div>

              {useStripe ? (
                <StripeCheckout amount={total} />
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">
                    Vous serez redirigé vers le checkout Shopify sécurisé.
                  </p>
                  <a
                    href={cart.webUrl}
                    className="w-full py-4 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg text-center block"
                  >
                    Payer avec Shopify
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

