'use client'

import { useEffect, useState } from 'react'
import { useProducts } from '@/components/ProductsProvider'
import type { Product } from '@/lib/types'
import ProductCard from './ProductCard'
import Link from 'next/link'

interface ProductRecommendationsProps {
  currentProductId: string
  currentProductHandle: string
  limit?: number
}

export default function ProductRecommendations({
  currentProductId,
  currentProductHandle,
  limit = 4,
}: ProductRecommendationsProps) {
  const { products } = useProducts()
  const [recommendations, setRecommendations] = useState<Product[]>([])

  useEffect(() => {
    const filtered = products.filter((p) => p.id !== currentProductId)
    const shuffled = [...filtered].sort(() => 0.5 - Math.random())
    setRecommendations(shuffled.slice(0, limit))
  }, [products, currentProductId, limit])

  if (recommendations.length === 0) {
    return null
  }

  return (
    <section className="mt-24 border-t border-primary-100 pt-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-headline font-display font-bold text-tech-black mb-2 tracking-tight">
            Produits similaires
          </h2>
          <p className="text-body text-primary-600">
            Vous pourriez aussi aimer ces produits
          </p>
        </div>
        <Link
          href="/products"
          className="text-tech-accent hover:text-tech-accent-hover font-semibold text-body transition-colors inline-flex items-center"
        >
          Voir tout
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}
