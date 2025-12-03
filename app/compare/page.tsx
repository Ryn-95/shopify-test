'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCompare } from '@/context/CompareContext'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function ComparePage() {
  const { products, removeFromCompare, clearCompare } = useCompare()

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Accueil', href: '/' },
            { label: 'Comparer', href: '/compare' }
          ]} />

          <div className="mt-8 text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Aucun produit à comparer
            </h2>
            <p className="text-gray-600 mb-6">
              Ajoutez jusqu'à 4 produits pour les comparer côte à côte
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg"
            >
              Découvrir nos produits
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Comparer', href: '/compare' }
        ]} />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                Comparer les produits
              </h1>
              <p className="text-gray-600">
                {products.length} {products.length === 1 ? 'produit' : 'produits'} sélectionné{products.length > 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={clearCompare}
              className="px-4 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Tout supprimer
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Produit
                  </th>
                  {products.map((product) => (
                    <th key={product.id} className="px-6 py-4 text-center relative">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Retirer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="flex flex-col items-center">
                        {product.images[0] && (
                          <div className="relative w-32 h-32 mb-3">
                            <Image
                              src={product.images[0].src}
                              alt={product.images[0].alt || product.title}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <Link
                          href={`/product/${product.handle}`}
                          className="font-semibold text-gray-900 hover:text-gray-700"
                        >
                          {product.title}
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Prix</td>
                  {products.map((product) => (
                    <td key={product.id} className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-gray-900">
                        {parseFloat(product.variants[0]?.price || '0').toFixed(2)} €
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Description</td>
                  {products.map((product) => (
                    <td key={product.id} className="px-6 py-4 text-center text-sm text-gray-600">
                      {product.description ? (
                        <p className="line-clamp-3">{product.description}</p>
                      ) : (
                        <span className="text-gray-400">Aucune description</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Disponibilité</td>
                  {products.map((product) => (
                    <td key={product.id} className="px-6 py-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
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
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Variantes</td>
                  {products.map((product) => (
                    <td key={product.id} className="px-6 py-4 text-center text-sm text-gray-600">
                      {product.variants.length} {product.variants.length === 1 ? 'variante' : 'variantes'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Action</td>
                  {products.map((product) => (
                    <td key={product.id} className="px-6 py-4 text-center">
                      <Link
                        href={`/product/${product.handle}`}
                        className="inline-block px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                      >
                        Voir le produit
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

