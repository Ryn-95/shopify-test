'use client'

import { useCart } from '@/context/CartContext'
import CartItem from '@/components/CartItem'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

/**
 * Page panier Premium
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

  return (
    <div className="min-h-screen bg-tech-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-tech-black overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-display-2 md:text-display-1 font-display font-bold text-tech-white mb-4 tracking-tight">
              Votre Panier
            </h1>
            <p className="text-body md:text-lg text-tech-medium-gray">
              Révisez vos articles avant de passer commande
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Panier', href: '/cart' }
        ]} />

        {/* État de chargement */}
        {isLoading && (
          <div className="text-center py-24">
            <div className="w-16 h-16 border-4 border-tech-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-primary-600 text-body font-medium">Chargement du panier...</p>
          </div>
        )}

        {/* Panier vide */}
        {!isLoading && (!cart || cart.lineItems.length === 0) && (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-tech-light-gray rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <h2 className="text-headline font-display font-bold text-tech-black mb-3">
              Votre panier est vide
            </h2>
            <p className="text-body text-primary-600 mb-8 max-w-md mx-auto">
              Découvrez nos produits tech premium et ajoutez-les à votre panier.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-tech-black text-tech-white font-semibold rounded-2xl transition-all duration-300 hover:bg-primary-800 hover:scale-105 shadow-medium hover:shadow-large"
            >
              Découvrir les produits
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}

        {/* Panier avec articles */}
        {!isLoading && cart && cart.lineItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
            {/* Liste des articles */}
            <div className="lg:col-span-2 space-y-4">
              {cart.lineItems.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CartItem item={item} />
                </div>
              ))}
            </div>

            {/* Résumé de la commande */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-tech-light-gray rounded-3xl p-8 border border-primary-100">
                <h2 className="text-title font-display font-bold text-tech-black mb-6">
                  Résumé
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-body text-primary-600">
                    <span>Sous-total</span>
                    <span className="font-semibold text-tech-black">
                      {total.toFixed(2)} €
                    </span>
                  </div>
                  <div className="flex justify-between text-body text-primary-600">
                    <span>Livraison</span>
                    <span className="font-semibold text-tech-accent">Gratuite</span>
                  </div>
                  <div className="pt-4 border-t border-primary-200">
                    <div className="flex justify-between">
                      <span className="text-title font-display font-bold text-tech-black">Total</span>
                      <span className="text-headline font-display font-bold text-tech-black">
                        {total.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full block text-center px-8 py-4 bg-tech-black text-tech-white font-semibold rounded-2xl transition-all duration-300 hover:bg-primary-800 hover:scale-105 shadow-medium hover:shadow-large"
                >
                  Passer la commande
                </Link>

                <Link
                  href="/products"
                  className="w-full block text-center mt-4 px-8 py-4 bg-tech-white text-tech-black font-semibold rounded-2xl border-2 border-primary-200 transition-all duration-300 hover:border-tech-black"
                >
                  Continuer les achats
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
