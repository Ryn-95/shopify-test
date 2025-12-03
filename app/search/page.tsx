'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useProducts } from '@/components/ProductsProvider'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const { products } = useProducts()
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts([])
      return
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description?.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [query, products])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Recherche', href: '/search' }
        ]} />

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Résultats de recherche
          </h1>
          {query && (
            <p className="text-xl text-gray-600">
              Recherche pour : <span className="font-semibold">"{query}"</span>
            </p>
          )}
        </div>

        {!query ? (
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-gray-600 text-lg">Entrez un terme de recherche</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              Aucun produit trouvé pour "{query}"
            </p>
            <p className="text-gray-500">Essayez avec d'autres mots-clés</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-8">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

