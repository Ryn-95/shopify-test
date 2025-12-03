'use client'

import { useCart } from '@/context/CartContext'
import CartItem from '@/components/CartItem'
import Link from 'next/link'

/**
 * Page panier
 * Affiche tous les items du panier avec possibilité de modifier les quantités
 * et de passer à la caisse
 */
export default function CartPage() {
  const { cart, isLoading } = useCart()

  // Calcul du total du panier
  const calculateTotal = () => {
    if (!cart || !cart.lineItems.length) return 0
    return cart.lineItems.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity
    }, 0)
  }

  const total = calculateTotal()
  const itemCount = cart?.lineItems.length || 0

  /**
   * Redirige vers le checkout Shopify
   */
  const handleCheckout = () => {
    if (!cart?.webUrl) {
      alert('Erreur: URL de checkout introuvable')
      return
    }
    // Redirection vers le checkout Shopify
    window.location.href = cart.webUrl
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Votre Panier
          </h1>
          <p className="text-xl text-gray-600">
            Révisez vos articles avant de passer commande
          </p>
        </div>

      {/* État de chargement */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Chargement du panier...</p>
        </div>
      )}

      {/* Panier vide */}
      {!isLoading && (!cart || cart.lineItems.length === 0) && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Votre panier est vide
          </h2>
          <p className="text-gray-600 mb-6">
            Découvrez nos produits et ajoutez-les à votre panier.
          </p>
          <Link
            href="/"
            className="inline-block bg-gray-900 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Voir les produits
          </Link>
        </div>
      )}

      {/* Panier avec articles */}
      {!isLoading && cart && cart.lineItems.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des articles */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
                Articles ({itemCount})
              </h2>
              <div className="space-y-6">
                {cart.lineItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Résumé et checkout */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-24">
              <h2 className="text-2xl font-extrabold mb-8">
                Résumé de commande
              </h2>

              {/* Sous-total */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-300">
                  <span>Sous-total</span>
                  <span className="font-semibold">{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Livraison</span>
                  <span className="text-sm">Calculée à la caisse</span>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between text-2xl font-extrabold">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>

              {/* Bouton Checkout */}
              <Link
                href="/checkout"
                className="w-full bg-white text-gray-900 py-4 px-6 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 mb-4 shadow-lg hover:shadow-xl transform hover:scale-105 text-center block"
              >
                Passer à la caisse
              </Link>

              {/* Lien continuer les achats */}
              <Link
                href="/"
                className="block text-center text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                ← Continuer les achats
              </Link>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

