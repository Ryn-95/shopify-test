'use client'

import Link from 'next/link'
import { useWishlist } from '@/context/WishlistContext'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()

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
              Mes favoris
            </h1>
            <p className="text-body md:text-lg text-tech-medium-gray">
              {items.length} {items.length === 1 ? 'produit' : 'produits'} sauvegardé{items.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Mes favoris', href: '/wishlist' }
        ]} />

        <div className="mt-12">
          {items.length > 0 && (
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-title font-display font-semibold text-tech-black">
                  Produits favoris
                </h2>
              </div>
              <button
                onClick={clearWishlist}
                className="px-4 py-2 text-red-500 hover:text-red-600 font-semibold transition-colors rounded-xl hover:bg-red-50"
              >
                Tout supprimer
              </button>
            </div>
          )}

          {items.length === 0 ? (
            <div className="text-center py-24 bg-tech-light-gray rounded-3xl border border-primary-100">
              <div className="w-24 h-24 bg-tech-white rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h2 className="text-headline font-display font-bold text-tech-black mb-3">
                Votre liste de favoris est vide
              </h2>
              <p className="text-body text-primary-600 mb-8 max-w-md mx-auto">
                Ajoutez des produits à vos favoris pour les retrouver facilement
              </p>
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-tech-black text-tech-white font-semibold rounded-2xl hover:bg-primary-800 transition-all duration-300 hover:scale-105 shadow-medium hover:shadow-large"
              >
                Découvrir nos produits
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((product, index) => (
                <div key={product.id} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <ProductCard product={product} />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-4 right-4 z-10 p-2.5 bg-tech-white/90 backdrop-blur-md rounded-full shadow-medium hover:bg-red-50 transition-all duration-300"
                    title="Retirer des favoris"
                  >
                    <svg
                      className="w-5 h-5 text-red-500"
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
