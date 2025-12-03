import type { Metadata } from 'next'
import Link from 'next/link'
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
import ImageHero from '@/components/ImageHero'
import BannerSection from '@/components/BannerSection'

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
 * Page d'accueil premium avec design inspiré Apple/Tesla/Burger King
 * Structure avec multiples sections pour une expérience immersive
 */
export default async function HomePage() {
  let products: Product[] = []
  let error: string | null = null

  try {
    // Récupération de tous les produits depuis Shopify
    const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
    const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    
    if (storeDomain && storefrontAccessToken) {
      products = await getAllProducts()
      console.log(`✅ ${products.length} produits chargés depuis Shopify`)
    } else {
      console.warn('⚠️ Variables d\'environnement Shopify non configurées')
    }
  } catch (err: any) {
    console.error('❌ Erreur lors du chargement des produits:', err)
    error = err.message || 'Impossible de charger les produits. Veuillez réessayer plus tard.'
  }

  return (
    <>
      {/* Hero Section - Grande bannière d'accueil style Apple */}
      <Hero />

      {/* Stats Section - Chiffres clés */}
      <StatsSection />

      {/* Image Hero Section 1 - Style Apple avec image */}
      <ImageHero
        title="L'excellence à portée de main"
        subtitle="Découvrez notre sélection de produits tech premium, soigneusement choisis pour leur qualité exceptionnelle et leur design minimaliste."
        ctaText="Explorer la collection"
        ctaLink="/products"
      />

      {/* Product Showcase - Produits phares en grand format */}
      {products.length > 0 ? (
        <ProductShowcase products={products} />
      ) : (
        <div className="py-32 bg-tech-white text-center">
          <p className="text-primary-600 text-lg">Chargement des produits...</p>
        </div>
      )}

      {/* Banner Section - Style Burger King avec image */}
      <BannerSection
        title="Une expérience premium"
        description="Chaque produit est sélectionné avec soin pour vous offrir une expérience d'utilisation exceptionnelle. Qualité, design et performance réunis."
        bgColor="gray"
        ctaText="Découvrir nos produits"
        ctaLink="/products"
      />

      {/* Why Choose Us - Pourquoi nous choisir */}
      <WhyChooseUs />

      {/* Video Section - Présentation vidéo */}
      <VideoSection />

      {/* Featured Products - Produits vedettes */}
      {products.length > 0 ? (
        <FeaturedProducts products={products} />
      ) : (
        <div className="py-32 bg-tech-white text-center">
          <p className="text-primary-600 text-lg">Aucun produit disponible pour le moment.</p>
        </div>
      )}

      {/* Features Section - Caractéristiques */}
      <Features />

      {/* Image Hero Section 2 - Style Tesla avec image inversée */}
      <ImageHero
        title="Innovation et performance"
        subtitle="Nos produits allient technologie de pointe et design épuré pour une expérience utilisateur optimale."
        reverse={true}
        ctaText="Voir les produits"
        ctaLink="/products"
      />

      {/* Testimonials - Témoignages clients */}
      <Testimonials />

      {/* All Products Section - Collection complète */}
      {products.length > 0 ? (
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
      ) : (
        <section className="py-32 bg-tech-light-gray">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="bg-tech-white rounded-3xl p-12 border border-primary-100">
              <div className="w-24 h-24 bg-tech-light-gray rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="text-headline font-display font-bold text-tech-black mb-3">
                Aucun produit disponible
              </h3>
              <p className="text-body text-primary-600 mb-6">
                {error || 'Les produits seront bientôt disponibles. Revenez plus tard !'}
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-tech-black text-tech-white font-semibold rounded-full hover:bg-primary-800 transition-all duration-300"
              >
                Retour à l'accueil
              </Link>
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
