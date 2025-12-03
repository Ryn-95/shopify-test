import type { Metadata } from 'next'
import { getAllProducts } from '@/lib/shopify'
import type { Product } from '@/lib/types'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import ProductCard from '@/components/ProductCard'

/**
 * Désactive le cache pour récupérer les produits en temps réel depuis Shopify
 */
export const dynamic = 'force-dynamic'

/**
 * Metadata SEO pour la page d'accueil
 */
export const metadata: Metadata = {
  title: 'JJFYNE - Tech Premium',
  description: 'Découvrez notre collection de produits tech premium. Design minimaliste, performance maximale.',
  openGraph: {
    title: 'JJFYNE - Tech Premium',
    description: 'Découvrez notre collection de produits tech premium.',
  },
}

/**
 * Page d'accueil premium avec design inspiré Apple/Tesla
 */
export default async function HomePage() {
  let products: Product[] = []
  let error: string | null = null

  try {
    // Récupération de tous les produits depuis Shopify
    products = await getAllProducts()
  } catch (err) {
    console.error('Erreur lors du chargement des produits:', err)
    error = 'Impossible de charger les produits. Veuillez réessayer plus tard.'
  }

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      {products.length > 0 && <FeaturedProducts products={products} />}

      {/* Features Section */}
      <Features />

      {/* Testimonials */}
      <Testimonials />

      {/* All Products Section */}
      {products.length > 0 && (
        <section className="py-24 bg-tech-light-gray">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-display-3 md:text-headline font-display font-bold text-tech-black mb-4 tracking-tight">
                Toute Notre Collection
              </h2>
              <p className="text-body md:text-lg text-primary-600 max-w-2xl mx-auto">
                Explorez tous nos produits soigneusement sélectionnés
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-2xl mb-8 max-w-2xl mx-auto">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
