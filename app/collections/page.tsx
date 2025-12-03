import { getAllCollections } from '@/lib/shopify-collections'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function CollectionsPage() {
  let collections = []
  let error: string | null = null

  try {
    collections = await getAllCollections()
  } catch (err) {
    console.error('Erreur lors du chargement des collections:', err)
    error = 'Impossible de charger les collections'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Nos Collections
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Explorez nos collections soigneusement organisées
            </p>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[
            { label: 'Accueil', href: '/' },
            { label: 'Collections', href: '/collections' }
          ]} />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-8">
              <p>{error}</p>
            </div>
          )}

          {collections.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Aucune collection disponible.</p>
            </div>
          )}

          {collections.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection, index) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image */}
                  {collection.image ? (
                    <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <Image
                        src={collection.image.src}
                        alt={collection.image.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {collection.title}
                    </h2>
                    {collection.description && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {collection.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500">
                        {collection.productsCount} produit{collection.productsCount > 1 ? 's' : ''}
                      </span>
                      <span className="text-gray-900 font-semibold group-hover:translate-x-1 transition-transform duration-200">
                        Voir →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

