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
    <section id="products" className="py-24 bg-tech-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-display-3 md:text-headline font-display font-bold text-tech-black mb-4 tracking-tight">
            Produits Vedettes
          </h2>
          <p className="text-body md:text-lg text-primary-600 max-w-2xl mx-auto">
            Découvrez notre sélection premium, soigneusement choisie pour vous
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} priority={index < 2} />
            </div>
          ))}
        </div>

        {products.length > 4 && (
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-tech-black text-tech-white font-semibold rounded-2xl transition-all duration-300 hover:bg-primary-800 hover:scale-105 shadow-medium hover:shadow-large"
            >
              Voir tous les produits
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
