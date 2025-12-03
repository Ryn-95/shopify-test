import { getCollectionByHandle, getCollectionProducts } from '@/lib/shopify-collections'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function CollectionPage({
  params,
}: {
  params: { handle: string }
}) {
  let collection = null
  let products = []
  let error: string | null = null

  try {
    collection = await getCollectionByHandle(params.handle)
    products = await getCollectionProducts(params.handle)
  } catch (err) {
    console.error('Erreur:', err)
    notFound()
  }

  if (!collection) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[
            { label: 'Accueil', href: '/' },
            { label: 'Collections', href: '/collections' },
            { label: collection.title, href: `/collections/${collection.handle}` }
          ]} />

          <div className="max-w-3xl mx-auto text-center mt-8 animate-slide-up">
            {collection.image && (
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden">
                <Image
                  src={collection.image.src}
                  alt={collection.image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              {collection.title}
            </h1>
            {collection.description && (
              <div
                className="text-xl text-gray-300 leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: collection.descriptionHtml || collection.description }}
              />
            )}
            <p className="text-lg text-gray-400 mt-4">
              {collection.productsCount} produit{collection.productsCount > 1 ? 's' : ''} disponible{collection.productsCount > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Aucun produit dans cette collection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => {
                // Mapper le produit au format attendu par ProductCard
                const mappedProduct = {
                  id: product.id,
                  title: product.title,
                  handle: product.handle,
                  description: product.description || '',
                  descriptionHtml: product.descriptionHtml,
                  images: product.images,
                  variants: product.variants,
                  availableForSale: product.availableForSale,
                }
                return (
                  <div
                    key={product.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ProductCard product={mappedProduct} />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

