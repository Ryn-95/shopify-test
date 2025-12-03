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
    // Filtrer les produits pour exclure le produit actuel
    const filtered = products.filter((p) => p.id !== currentProductId)

    // Pour l'instant, on prend simplement des produits aléatoires
    // Dans un vrai système, vous pourriez utiliser :
    // - Des produits de la même collection
    // - Des produits avec des tags similaires
    // - Des produits avec un prix similaire
    // - Des produits souvent achetés ensemble (analytics)
    const shuffled = [...filtered].sort(() => 0.5 - Math.random())
    setRecommendations(shuffled.slice(0, limit))
  }, [products, currentProductId, limit])

  if (recommendations.length === 0) {
    return null
  }

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Produits similaires
          </h2>
          <p className="text-gray-600">
            Vous pourriez aussi aimer ces produits
          </p>
        </div>
        <Link
          href="/products"
          className="text-gray-900 hover:text-gray-700 font-medium"
        >
          Voir tout →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

