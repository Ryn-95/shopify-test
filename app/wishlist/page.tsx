'use client'

import Link from 'next/link'
import { useWishlist } from '@/context/WishlistContext'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Mes favoris', href: '/wishlist' }
        ]} />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                Mes favoris
              </h1>
              <p className="text-gray-600">
                {items.length} {items.length === 1 ? 'produit' : 'produits'} sauvegardé{items.length > 1 ? 's' : ''}
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearWishlist}
                className="px-4 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Tout supprimer
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Votre liste de favoris est vide
              </h2>
              <p className="text-gray-600 mb-6">
                Ajoutez des produits à vos favoris pour les retrouver facilement
              </p>
              <Link
                href="/products"
                className="inline-block px-8 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg"
              >
                Découvrir nos produits
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                    title="Retirer des favoris"
                  >
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

