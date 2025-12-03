'use client'

import type { Product } from '@/lib/types'
import ProductCard from './ProductCard'
import Link from 'next/link'

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  // Prendre les 4 premiers produits comme produits vedettes
  const featuredProducts = products.slice(0, 4)

  if (featuredProducts.length === 0) {
    return null
  }

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Produits Vedettes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos produits les plus populaires, soigneusement sélectionnés pour vous
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {products.length > 4 && (
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-xl"
            >
              Voir tous les produits
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

