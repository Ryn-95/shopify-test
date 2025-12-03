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
  let products: any[] = []
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
    <div className="min-h-screen bg-tech-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-tech-black overflow-hidden">
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
          <Breadcrumbs items={[
            { label: 'Accueil', href: '/' },
            { label: 'Collections', href: '/collections' },
            { label: collection.title, href: `/collections/${collection.handle}` }
          ]} />

          <div className="max-w-3xl mx-auto text-center mt-12 animate-fade-in">
            {collection.image && (
              <div className="relative w-32 h-32 mx-auto mb-8 rounded-3xl overflow-hidden bg-tech-light-gray">
                <Image
                  src={collection.image.src}
                  alt={collection.image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h1 className="text-display-2 md:text-display-1 font-display font-bold text-tech-white mb-6 tracking-tight">
              {collection.title}
            </h1>
            {collection.description && (
              <div
                className="text-body md:text-lg text-tech-medium-gray leading-relaxed prose prose-sm prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: collection.descriptionHtml || collection.description }}
              />
            )}
            <p className="text-body text-tech-medium-gray mt-6">
              {collection.productsCount || products.length} produit{collection.productsCount > 1 ? 's' : ''} disponible{collection.productsCount > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-tech-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 bg-tech-white rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-body text-primary-600 font-medium">Aucun produit dans cette collection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: any, index: number) => {
                const mappedProduct = {
                  id: product.id,
                  title: product.title,
                  handle: product.handle,
                  description: product.description || '',
                  descriptionHtml: product.descriptionHtml,
                  images: product.images,
                  variants: product.variants,
                  options: product.options,
                  priceRange: product.priceRange,
                  availableForSale: product.availableForSale,
                }
                return (
                  <div
                    key={product.id}
                    className="animate-fade-in"
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
