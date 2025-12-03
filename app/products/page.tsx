'use client'

import { useState, useEffect } from 'react'
import { useProducts } from '@/components/ProductsProvider'
import ProductCard from '@/components/ProductCard'
import ProductFilters from '@/components/ProductFilters'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Product } from '@/lib/types'

export default function ProductsPage() {
  const { products } = useProducts()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Tous Nos Produits
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Explorez notre collection complète de produits soigneusement sélectionnés
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[
            { label: 'Accueil', href: '/' },
            { label: 'Produits', href: '/products' }
          ]} />

          {products.length === 0 ? (
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <p className="text-gray-600 text-lg">Aucun produit disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filtres */}
              <div className="lg:col-span-1">
                <ProductFilters products={products} onFilter={setFilteredProducts} />
              </div>

              {/* Produits */}
              <div className="lg:col-span-3">
                <div className="mb-8 flex items-center justify-between">
                  <p className="text-gray-600">
                    {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} affiché{filteredProducts.length > 1 ? 's' : ''}
                  </p>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">Aucun produit ne correspond aux filtres sélectionnés.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
