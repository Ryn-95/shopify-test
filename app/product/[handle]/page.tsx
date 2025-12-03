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
 * Page produit détaillée
 * Affiche toutes les informations d'un produit avec sélection de variantes
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Produits', href: '/products' },
          { label: product.title, href: `/product/${product.handle}` }
        ]} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images du produit */}
          <div className="space-y-4">
            {firstImage ? (
              <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={firstImage.src}
                  alt={firstImage.alt || product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}

            {/* Galerie d'images supplémentaires (si disponibles) */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((image) => (
                  <div
                    key={image.id}
                    className="aspect-square relative bg-gray-100 rounded-md overflow-hidden"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt || product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12.5vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Informations du produit */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {product.title}
              </h1>
              {product.variants[0] && (
                <div className="mb-6">
                  <p className="text-4xl font-bold text-gray-900">
                    {parseFloat(product.variants[0].price).toFixed(2)} €
                    {product.variants[0].compareAtPrice && (
                      <span className="ml-4 text-2xl text-gray-400 line-through">
                        {parseFloat(product.variants[0].compareAtPrice).toFixed(2)} €
                      </span>
                    )}
                  </p>
                  {product.variants[0].compareAtPrice && (
                    <p className="text-sm text-green-600 font-semibold mt-2">
                      Économisez {((parseFloat(product.variants[0].compareAtPrice) - parseFloat(product.variants[0].price)) / parseFloat(product.variants[0].compareAtPrice) * 100).toFixed(0)}%
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Description
                </h2>
                <div
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: product.descriptionHtml || product.description,
                  }}
                />
              </div>
            )}

            {/* Sélecteur de variantes et bouton Ajouter au panier */}
            <ProductVariantSelector product={product} />

            {/* Disponibilité */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                {product.availableForSale ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-semibold text-lg">En stock</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-semibold text-lg">Indisponible</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Avis clients */}
        <ProductReviews productId={product.id} productHandle={product.handle} />

        {/* Produits similaires */}
        <ProductRecommendations
          currentProductId={product.id}
          currentProductHandle={product.handle}
        />
      </div>
    </>
  )
}

