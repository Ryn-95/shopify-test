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
 * Page d'accueil minimaliste style Apple avec images
 */
export default async function HomePage() {
  let products: Product[] = []
  let error: string | null = null
  let debugInfo: string | null = null

  try {
    const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
    const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    
    if (storeDomain && storefrontAccessToken) {
      products = await getAllProducts()
      console.log(`✅ ${products.length} produit(s) récupéré(s) depuis Shopify`)
      
      if (products.length > 0) {
        console.log('📦 Premier produit:', products[0].title)
        console.log('🖼️ Images du premier produit:', products[0].images?.length || 0)
      } else {
        debugInfo = 'Aucun produit trouvé dans votre boutique Shopify. Vérifiez que vous avez des produits publiés.'
      }
    } else {
      debugInfo = 'Variables d\'environnement Shopify non configurées. Vérifiez votre fichier .env.local'
      console.warn('⚠️ Variables d\'environnement Shopify non configurées')
    }
  } catch (err: any) {
    console.error('❌ Erreur lors du chargement des produits:', err)
    error = err.message || 'Impossible de charger les produits. Veuillez réessayer plus tard.'
    debugInfo = `Erreur: ${err.message}`
  }

  // Récupérer les images des produits pour les sections - Utiliser toutes les images disponibles
  const featuredProductImage = products.length > 0 ? products[0]?.images?.[0]?.src : undefined
  const heroImage1 = products.length > 0 ? products[0]?.images?.[0]?.src : undefined
  const heroImage2 = products.length > 1 
    ? products[1]?.images?.[0]?.src 
    : (products.length > 0 ? products[0]?.images?.[1]?.src : undefined)
  const heroImage3 = products.length > 2 
    ? products[2]?.images?.[0]?.src 
    : (products.length > 0 ? products[0]?.images?.[2]?.src : undefined)

  return (
    <>
      {/* Hero Section - Minimaliste avec image */}
      <Hero featuredImage={featuredProductImage} />

      {/* Stats Section */}
      <StatsSection />

      {/* Image Hero Section 1 - Avec image produit */}
      <ImageHero
        title="L'excellence à portée de main"
        subtitle="Découvrez notre sélection de produits tech premium, soigneusement choisis pour leur qualité exceptionnelle."
        imageUrl={heroImage1}
        ctaText="Explorer la collection"
        ctaLink="/products"
      />

      {/* Product Showcase */}
      {products.length > 0 && <ProductShowcase products={products} />}

      {/* Banner Section - Avec image produit */}
      <BannerSection
        title="Une expérience premium"
        description="Chaque produit est sélectionné avec soin pour vous offrir une expérience d'utilisation exceptionnelle."
        imageUrl={heroImage2}
        bgColor="white"
        ctaText="Découvrir nos produits"
        ctaLink="/products"
      />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Video Section - Avec image thumbnail */}
      <VideoSection thumbnailImage={heroImage3 || heroImage2} />

      {/* Featured Products */}
      {products.length > 0 && <FeaturedProducts products={products} />}

      {/* Features Section */}
      <Features />

      {/* Image Hero Section 2 - Avec image produit */}
      <ImageHero
        title="Innovation et performance"
        subtitle="Nos produits allient technologie de pointe et design épuré pour une expérience utilisateur optimale."
        imageUrl={heroImage1}
        reverse={true}
        ctaText="Voir les produits"
        ctaLink="/products"
      />

      {/* Testimonials */}
      <Testimonials />

      {/* All Products Section */}
      {products.length > 0 ? (
        <section className="py-16 lg:py-20 bg-tech-white border-t border-primary-100">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-light text-tech-black mb-3 tracking-tight">
                Toute Notre Collection
              </h2>
              <p className="text-sm md:text-base text-primary-600 max-w-xl mx-auto leading-relaxed font-light">
                Explorez tous nos produits soigneusement sélectionnés
              </p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 text-center">
                <strong>Erreur:</strong> {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 lg:py-20 bg-tech-white border-t border-primary-100">
          <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
            <div className="p-8">
              <h3 className="text-xl font-display font-light text-tech-black mb-3">
                Aucun produit disponible
              </h3>
              <p className="text-sm text-primary-600 mb-4 font-light">
                {error || debugInfo || 'Les produits seront bientôt disponibles. Revenez plus tard !'}
              </p>
              
              {/* Instructions de debug */}
              <div className="mt-6 p-4 bg-tech-light-gray rounded-lg text-left text-xs text-primary-600 space-y-2">
                <p><strong>Pour afficher vos produits Shopify :</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Vérifiez que votre fichier <code className="bg-white px-1 rounded">.env.local</code> contient :</li>
                  <li className="ml-4">
                    <code>NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=votre-store.myshopify.com</code>
                  </li>
                  <li className="ml-4">
                    <code>NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=votre-token</code>
                  </li>
                  <li>Vérifiez que vous avez des produits publiés dans votre boutique Shopify</li>
                  <li>Redémarrez le serveur après avoir modifié .env.local</li>
                </ol>
              </div>
              
              <Link
                href="/"
                className="inline-flex items-center text-sm text-tech-black hover:text-primary-700 transition-colors font-medium mt-6"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
