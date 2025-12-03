import type { Metadata } from 'next'
import { getAllProducts } from '@/lib/shopify'
import type { Product } from '@/lib/types'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import StatsSection from '@/components/StatsSection'
import VideoSection from '@/components/VideoSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import ProductShowcase from '@/components/ProductShowcase'
import NewsletterSection from '@/components/NewsletterSection'
import CTASection from '@/components/CTASection'
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
 * Page d'accueil premium avec design inspiré Apple
 * Structure avec multiples sections pour une expérience immersive
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
      {/* Hero Section - Grande bannière d'accueil */}
      <Hero />

      {/* Stats Section - Chiffres clés */}
      <StatsSection />

      {/* Product Showcase - Produits phares en grand format */}
      {products.length > 0 && <ProductShowcase products={products} />}

      {/* Why Choose Us - Pourquoi nous choisir */}
      <WhyChooseUs />

      {/* Video Section - Présentation vidéo */}
      <VideoSection />

      {/* Featured Products - Produits vedettes */}
      {products.length > 0 && <FeaturedProducts products={products} />}

      {/* Features Section - Caractéristiques */}
      <Features />

      {/* Testimonials - Témoignages clients */}
      <Testimonials />

      {/* All Products Section - Collection complète */}
      {products.length > 0 && (
        <section className="py-32 bg-tech-light-gray">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20 animate-fade-in">
              <h2 className="text-display-2 md:text-display-1 font-display font-bold text-tech-black mb-6 tracking-tight">
                Toute Notre Collection
              </h2>
              <p className="text-body md:text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed">
                Explorez tous nos produits soigneusement sélectionnés pour répondre à tous vos besoins tech
              </p>
            </div>

            {error && (
              <div className="relative overflow-hidden bg-gradient-to-br from-red-50/50 to-orange-50/50 backdrop-blur-sm border border-red-200/50 rounded-2xl p-6 mb-8 max-w-2xl mx-auto shadow-lg shadow-red-100/20 animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-50"></div>
                <div className="relative flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-body font-medium text-tech-black leading-relaxed">{error}</p>
                </div>
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

      {/* Newsletter Section - Inscription newsletter */}
      <NewsletterSection />

      {/* CTA Section - Call to action final */}
      <CTASection />
    </>
  )
}
