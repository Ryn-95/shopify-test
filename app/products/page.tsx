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
    <div className="min-h-screen bg-tech-white">
      {/* Hero Section Premium */}
      <section className="relative py-32 bg-tech-black overflow-hidden">
        {/* Subtle grid pattern */}
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
            <h1 className="text-display-2 md:text-display-1 font-display font-bold text-tech-white mb-6 tracking-tight">
              Tous Nos Produits
            </h1>
            <p className="text-body md:text-lg text-tech-medium-gray leading-relaxed">
              Explorez notre collection complète de produits tech premium soigneusement sélectionnés
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-tech-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumbs items={[
            { label: 'Accueil', href: '/' },
            { label: 'Produits', href: '/products' }
          ]} />

          {products.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 bg-tech-light-gray rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-primary-600 text-lg font-medium">Aucun produit disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
              {/* Filtres */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <ProductFilters products={products} onFilter={setFilteredProducts} />
                </div>
              </div>

              {/* Produits */}
              <div className="lg:col-span-3">
                <div className="mb-8 flex items-center justify-between">
                  <p className="text-body text-primary-600 font-medium">
                    {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} affiché{filteredProducts.length > 1 ? 's' : ''}
                  </p>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-24 bg-tech-white rounded-3xl border border-primary-100">
                    <p className="text-primary-600 text-lg font-medium">Aucun produit ne correspond aux filtres sélectionnés.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="animate-fade-in"
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
