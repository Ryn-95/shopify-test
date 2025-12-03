import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProductByHandle } from '@/lib/shopify'
import type { Product } from '@/lib/types'
import ProductVariantSelector from '@/components/ProductVariantSelector'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductReviews from '@/components/ProductReviews'
import ProductRecommendations from '@/components/ProductRecommendations'

/**
 * Désactive le cache pour récupérer les produits en temps réel depuis Shopify
 */
export const dynamic = 'force-dynamic'

/**
 * Génère les metadata SEO pour chaque produit
 */
export async function generateMetadata({
  params,
}: {
  params: { handle: string }
}): Promise<Metadata> {
  try {
    const product = await getProductByHandle(params.handle)

    return {
      title: product.title,
      description: product.description || `Découvrez ${product.title} sur JJFYNE`,
      openGraph: {
        title: product.title,
        description: product.description || `Découvrez ${product.title}`,
        images: product.images[0] ? [{ url: product.images[0].src }] : [],
      },
    }
  } catch {
    return {
      title: 'Produit introuvable',
    }
  }
}

/**
 * Page produit détaillée Premium
 */
export default async function ProductPage({
  params,
}: {
  params: { handle: string }
}) {
  let product: Product | null = null

  try {
    product = await getProductByHandle(params.handle)
  } catch (error) {
    console.error('Erreur lors du chargement du produit:', error)
    notFound()
  }

  if (!product) {
    notFound()
  }

  // Structured data JSON-LD pour le SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images.map((img) => img.src),
    offers: {
      '@type': 'Offer',
      price: product.variants[0]?.price || '0',
      priceCurrency: 'EUR',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  }

  const firstImage = product.images[0]

  return (
    <>
      {/* Structured data JSON-LD pour le SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-tech-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: 'Accueil', href: '/' },
            { label: 'Produits', href: '/products' },
            { label: product.title, href: `/product/${product.handle}` }
          ]} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
            {/* Images du produit */}
            <div className="space-y-4">
              {firstImage ? (
                <div className="aspect-square relative bg-tech-light-gray rounded-3xl overflow-hidden shadow-large group">
                  <Image
                    src={firstImage.src}
                    alt={firstImage.alt || product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-tech-light-gray rounded-3xl flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12.75v-.008z" />
                  </svg>
                </div>
              )}

              {/* Galerie d'images supplémentaires */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(1, 5).map((image) => (
                    <div
                      key={image.id}
                      className="aspect-square relative bg-tech-light-gray rounded-2xl overflow-hidden group cursor-pointer border-2 border-transparent hover:border-tech-accent transition-all duration-300"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt || product.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 1024px) 25vw, 12.5vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Informations du produit */}
            <div className="space-y-8">
              <div>
                <h1 className="text-display-3 md:text-headline font-display font-bold text-tech-black mb-6 tracking-tight">
                  {product.title}
                </h1>
                {product.variants[0] && (
                  <div className="mb-8">
                    <p className="text-headline font-display font-bold text-tech-black">
                      {parseFloat(product.variants[0].price).toFixed(2)} €
                      {product.variants[0].compareAtPrice && (
                        <span className="ml-4 text-title text-primary-500 line-through font-normal">
                          {parseFloat(product.variants[0].compareAtPrice).toFixed(2)} €
                        </span>
                      )}
                    </p>
                    {product.variants[0].compareAtPrice && (
                      <p className="text-sm text-tech-accent font-semibold mt-2">
                        Économisez {((parseFloat(product.variants[0].compareAtPrice) - parseFloat(product.variants[0].price)) / parseFloat(product.variants[0].compareAtPrice) * 100).toFixed(0)}%
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="prose prose-sm max-w-none">
                  <h2 className="text-title font-display font-semibold text-tech-black mb-4">
                    Description
                  </h2>
                  <div
                    className="text-body text-primary-600 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionHtml || product.description,
                    }}
                  />
                </div>
              )}

              {/* Sélecteur de variantes et bouton Ajouter au panier */}
              <div className="pt-8 border-t border-primary-100">
                <ProductVariantSelector product={product} />
              </div>

              {/* Disponibilité */}
              <div className="pt-6 border-t border-primary-100">
                <div className="flex items-center space-x-3">
                  {product.availableForSale ? (
                    <>
                      <div className="w-3 h-3 bg-tech-accent rounded-full animate-pulse"></div>
                      <span className="text-tech-accent font-semibold text-body">En stock</span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-red-600 font-semibold text-body">Indisponible</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Avis clients */}
          <div className="mt-24">
            <ProductReviews productId={product.id} productHandle={product.handle} />
          </div>

          {/* Produits similaires */}
          <div className="mt-24">
            <ProductRecommendations
              currentProductId={product.id}
              currentProductHandle={product.handle}
            />
          </div>
        </div>
      </div>
    </>
  )
}
