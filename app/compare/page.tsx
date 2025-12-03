'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCompare } from '@/context/CompareContext'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function ComparePage() {
  const { products, removeFromCompare, clearCompare } = useCompare()

  return (
    <div className="min-h-screen bg-tech-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-tech-black overflow-hidden">
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
            <h1 className="text-display-2 md:text-display-1 font-display font-bold text-tech-white mb-4 tracking-tight">
              Comparer les produits
            </h1>
            <p className="text-body md:text-lg text-tech-medium-gray">
              {products.length} {products.length === 1 ? 'produit' : 'produits'} sélectionné{products.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Comparer', href: '/compare' }
        ]} />

        <div className="mt-12">
          {products.length === 0 ? (
            <div className="text-center py-24 bg-tech-light-gray rounded-3xl border border-primary-100">
              <div className="w-24 h-24 bg-tech-white rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h2 className="text-headline font-display font-bold text-tech-black mb-3">
                Aucun produit à comparer
              </h2>
              <p className="text-body text-primary-600 mb-8 max-w-md mx-auto">
                Ajoutez jusqu&apos;à 4 produits pour les comparer côte à côte
              </p>
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-tech-black text-tech-white font-semibold rounded-2xl hover:bg-primary-800 transition-all duration-300 hover:scale-105 shadow-medium hover:shadow-large"
              >
                Découvrir nos produits
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-title font-display font-semibold text-tech-black">
                    Comparaison
                  </h2>
                </div>
                <button
                  onClick={clearCompare}
                  className="px-4 py-2 text-red-500 hover:text-red-600 font-semibold transition-colors rounded-xl hover:bg-red-50"
                >
                  Tout supprimer
                </button>
              </div>

              <div className="bg-tech-white rounded-3xl shadow-medium border border-primary-100 overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-tech-light-gray border-b border-primary-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-caption font-semibold text-tech-black">
                        Produit
                      </th>
                      {products.map((product) => (
                        <th key={product.id} className="px-6 py-4 text-center relative min-w-[200px]">
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="absolute top-2 right-2 p-1.5 text-primary-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                            title="Retirer"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <div className="flex flex-col items-center">
                            {product.images[0] && (
                              <div className="relative w-32 h-32 mb-4 rounded-2xl overflow-hidden bg-tech-light-gray">
                                <Image
                                  src={product.images[0].src}
                                  alt={product.images[0].alt || product.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <Link
                              href={`/product/${product.handle}`}
                              className="font-display font-semibold text-tech-black hover:text-tech-accent transition-colors text-body"
                            >
                              {product.title}
                            </Link>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary-100">
                    <tr>
                      <td className="px-6 py-4 text-caption font-semibold text-tech-black">Prix</td>
                      {products.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-center">
                          <span className="text-headline font-display font-bold text-tech-black">
                            {parseFloat(product.variants[0]?.price || '0').toFixed(2)} €
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-tech-light-gray">
                      <td className="px-6 py-4 text-caption font-semibold text-tech-black">Description</td>
                      {products.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-center text-body text-primary-600">
                          {product.description ? (
                            <p className="line-clamp-3">{product.description}</p>
                          ) : (
                            <span className="text-primary-400">Aucune description</span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-caption font-semibold text-tech-black">Disponibilité</td>
                      {products.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-center">
                          <span
                            className={`inline-block px-3 py-1.5 rounded-full text-caption font-semibold ${
                              product.availableForSale
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {product.availableForSale ? 'En stock' : 'Rupture de stock'}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-tech-light-gray">
                      <td className="px-6 py-4 text-caption font-semibold text-tech-black">Variantes</td>
                      {products.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-center text-body text-primary-600">
                          {product.variants.length} {product.variants.length === 1 ? 'variante' : 'variantes'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-caption font-semibold text-tech-black">Action</td>
                      {products.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-center">
                          <Link
                            href={`/product/${product.handle}`}
                            className="inline-block px-6 py-2.5 bg-tech-black text-tech-white rounded-2xl hover:bg-primary-800 transition-all duration-300 text-caption font-semibold shadow-soft hover:shadow-medium hover:scale-105"
                          >
                            Voir le produit
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
