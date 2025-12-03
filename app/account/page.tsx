'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import Breadcrumbs from '@/components/Breadcrumbs'

interface Order {
  id: string
  name: string
  total_price: string
  currency: string
  created_at: string
  financial_status: string
  fulfillment_status: string
}

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile')

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (isAuthenticated && user) {
      loadOrders()
    }
  }, [isAuthenticated, user])

  const loadOrders = async () => {
    try {
      setOrdersLoading(true)
      const response = await fetch(`/api/customer/${user?.id}/orders`)
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error)
    } finally {
      setOrdersLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Mon compte', href: '/account' }
        ]} />

        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
              <h1 className="text-3xl font-extrabold mb-2">Mon compte</h1>
              <p className="text-gray-300">
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.email}
              </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'profile'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Profil
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'orders'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Commandes ({orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'addresses'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Adresses
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="p-8">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations personnelles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                        <p className="text-gray-900">{user.firstName || 'Non renseigné'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <p className="text-gray-900">{user.lastName || 'Non renseigné'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                        <p className="text-gray-900">{user.phone || 'Non renseigné'}</p>
                      </div>
                    </div>
                    <Link
                      href="/account/edit"
                      className="mt-4 inline-block px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Modifier mon profil
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistiques</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Commandes totales</p>
                        <p className="text-2xl font-bold text-gray-900">{user.ordersCount || 0}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Total dépensé</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {parseFloat(user.totalSpent || '0').toFixed(2)} €
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <button
                      onClick={() => {
                        logout()
                        router.push('/')
                      }}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Se déconnecter
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Historique des commandes</h2>
                  {ordersLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                      <p className="mt-4 text-gray-600">Chargement des commandes...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400 mb-4"
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
                      <p className="text-gray-600 mb-4">Aucune commande pour le moment</p>
                      <Link
                        href="/products"
                        className="inline-block px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Découvrir nos produits
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">Commande {order.name}</h3>
                              <p className="text-sm text-gray-600">
                                {new Date(order.created_at).toLocaleDateString('fr-FR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">
                                {parseFloat(order.total_price).toFixed(2)} {order.currency}
                              </p>
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  order.financial_status === 'paid'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {order.financial_status === 'paid' ? 'Payée' : 'En attente'}
                              </span>
                            </div>
                          </div>
                          <Link
                            href={`/account/orders/${order.id}`}
                            className="text-gray-900 hover:text-gray-600 font-medium text-sm"
                          >
                            Voir les détails →
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Adresses de livraison</h2>
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">Gestion des adresses à venir</p>
                    <p className="text-sm text-gray-500">
                      Cette fonctionnalité sera disponible prochainement
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

