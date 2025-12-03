'use client'

/**
 * Page Admin pour voir les statistiques de panier
 * Affiche les paniers créés et les produits ajoutés
 */

import { useEffect, useState } from 'react'

interface CartStats {
  totalCarts: number
  totalItems: number
  totalValue: number
  recentCarts: Array<{
    id: string
    items: number
    value: number
    createdAt: string
  }>
}

export default function AdminPage() {
  const [stats, setStats] = useState<CartStats>({
    totalCarts: 0,
    totalItems: 0,
    totalValue: 0,
    recentCarts: [],
  })

  useEffect(() => {
    // Récupérer les statistiques depuis localStorage
    const loadStats = () => {
      const cartsData = localStorage.getItem('shopify_carts_stats')
      if (cartsData) {
        try {
          const parsed = JSON.parse(cartsData)
          setStats(parsed)
        } catch (e) {
          console.error('Erreur lors du chargement des stats:', e)
        }
      }
    }

    loadStats()
    
    // Écouter les changements de panier
    const handleStorageChange = () => {
      loadStats()
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Statistiques de Panier
        </h1>
        <p className="text-gray-600">
          Suivi des paniers créés sur votre site
        </p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paniers créés</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalCarts}
              </p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Articles ajoutés</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalItems}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valeur totale</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalValue.toFixed(2)} €
              </p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des paniers récents */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Paniers récents
          </h2>
        </div>
        
        {stats.recentCarts.length === 0 ? (
          <div className="p-12 text-center">
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun panier pour le moment
            </h3>
            <p className="text-gray-600">
              Les paniers créés sur votre site apparaîtront ici
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {stats.recentCarts.map((cart, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Panier #{index + 1}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {cart.items} article(s) • {new Date(cart.createdAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {cart.value.toFixed(2)} €
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Note importante */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Note importante
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Les paniers créés via l'API Storefront ne sont pas automatiquement 
                visibles dans Shopify Admin. Cette page suit les paniers créés sur 
                votre site localement. Pour voir les commandes complétées, allez 
                dans Shopify → Commandes après qu'un client ait complété le checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

