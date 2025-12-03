import { getAllCollections } from '@/lib/shopify-collections'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function CollectionsPage() {
  let collections: any[] = []
  let error: string | null = null

  try {
    collections = await getAllCollections()
  } catch (err) {
    console.error('Erreur lors du chargement des collections:', err)
    error = 'Impossible de charger les collections'
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
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-display-2 md:text-display-1 font-display font-bold text-tech-white mb-6 tracking-tight">
              Nos Collections
            </h1>
            <p className="text-body md:text-lg text-tech-medium-gray leading-relaxed">
              Explorez nos collections tech premium soigneusement organisées
            </p>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-24 bg-tech-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumbs items={[
            { label: 'Accueil', href: '/' },
            { label: 'Collections', href: '/collections' }
          ]} />

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
                <p className="text-body font-medium text-gray-900 leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          {collections.length === 0 && !error && (
            <div className="text-center py-24">
              <div className="w-24 h-24 bg-tech-light-gray rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-body text-primary-600 font-medium">Aucune collection disponible.</p>
            </div>
          )}

          {collections.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {collections.map((collection, index) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="group bg-tech-white rounded-3xl overflow-hidden border border-primary-100 hover:border-primary-200 hover:shadow-large transition-all duration-500 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image */}
                  {collection.image ? (
                    <div className="aspect-[4/3] relative overflow-hidden bg-tech-light-gray">
                      <Image
                        src={collection.image.src}
                        alt={collection.image.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-tech-light-gray flex items-center justify-center">
                      <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-title font-display font-semibold text-tech-black mb-2 group-hover:text-tech-accent transition-colors">
                      {collection.title}
                    </h2>
                    {collection.description && (
                      <p className="text-body text-primary-600 mb-4 line-clamp-2">
                        {collection.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-caption font-semibold text-primary-500">
                        {collection.productsCount || 0} produit{collection.productsCount > 1 ? 's' : ''}
                      </span>
                      <span className="text-tech-accent font-semibold group-hover:translate-x-1 transition-transform duration-300 flex items-center">
                        Voir
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
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
