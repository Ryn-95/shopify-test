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
              Résultats de recherche
            </h1>
            {query && (
              <p className="text-body md:text-lg text-tech-medium-gray">
                Recherche pour : <span className="font-semibold text-tech-white">&quot;{query}&quot;</span>
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Recherche', href: '/search' }
        ]} />

        {!query ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-tech-light-gray rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <p className="text-body text-primary-600 font-medium">Entrez un terme de recherche</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-tech-light-gray rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <p className="text-body text-primary-600 mb-2 font-medium">
              Aucun produit trouvé pour &quot;{query}&quot;
            </p>
            <p className="text-caption text-primary-500">Essayez avec d&apos;autres mots-clés</p>
          </div>
        ) : (
          <>
            <p className="text-body text-primary-600 mb-8 font-medium">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          </>
        )}
      </div>
    </div>
  )
}
