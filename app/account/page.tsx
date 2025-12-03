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
      <div className="min-h-screen flex items-center justify-center bg-tech-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-tech-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-body text-primary-600 font-medium">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-tech-white py-12 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Mon compte', href: '/account' }
        ]} />

        <div className="mt-12">
          <div className="bg-tech-white rounded-3xl shadow-medium border border-primary-100 overflow-hidden">
            {/* Header */}
            <div className="bg-tech-black text-tech-white p-8">
              <h1 className="text-headline font-display font-bold mb-2">Mon compte</h1>
              <p className="text-body text-tech-medium-gray">
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.email}
              </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-primary-100">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-6 py-4 text-caption font-semibold border-b-2 transition-all duration-300 ${
                    activeTab === 'profile'
                      ? 'border-tech-black text-tech-black'
                      : 'border-transparent text-primary-600 hover:text-tech-black hover:border-primary-200'
                  }`}
                >
                  Profil
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-6 py-4 text-caption font-semibold border-b-2 transition-all duration-300 ${
                    activeTab === 'orders'
                      ? 'border-tech-black text-tech-black'
                      : 'border-transparent text-primary-600 hover:text-tech-black hover:border-primary-200'
                  }`}
                >
                  Commandes ({orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`px-6 py-4 text-caption font-semibold border-b-2 transition-all duration-300 ${
                    activeTab === 'addresses'
                      ? 'border-tech-black text-tech-black'
                      : 'border-transparent text-primary-600 hover:text-tech-black hover:border-primary-200'
                  }`}
                >
                  Adresses
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="p-8">
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-title font-display font-semibold text-tech-black mb-6">Informations personnelles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-caption font-semibold text-primary-600 mb-2">Email</label>
                        <p className="text-body text-tech-black font-medium">{user.email}</p>
                      </div>
                      <div>
                        <label className="block text-caption font-semibold text-primary-600 mb-2">Prénom</label>
                        <p className="text-body text-tech-black font-medium">{user.firstName || 'Non renseigné'}</p>
                      </div>
                      <div>
                        <label className="block text-caption font-semibold text-primary-600 mb-2">Nom</label>
                        <p className="text-body text-tech-black font-medium">{user.lastName || 'Non renseigné'}</p>
                      </div>
                      <div>
                        <label className="block text-caption font-semibold text-primary-600 mb-2">Téléphone</label>
                        <p className="text-body text-tech-black font-medium">{user.phone || 'Non renseigné'}</p>
                      </div>
                    </div>
                    <Link
                      href="/account/edit"
                      className="mt-6 inline-flex items-center px-6 py-3 bg-tech-black text-tech-white font-semibold rounded-2xl hover:bg-primary-800 transition-all duration-300 shadow-soft hover:shadow-medium hover:scale-105"
                    >
                      Modifier mon profil
                    </Link>
                  </div>

                  <div className="border-t border-primary-100 pt-8">
                    <h2 className="text-title font-display font-semibold text-tech-black mb-6">Statistiques</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-tech-light-gray rounded-2xl p-6 border border-primary-100">
                        <p className="text-caption text-primary-600 mb-2">Commandes totales</p>
                        <p className="text-headline font-display font-bold text-tech-black">{user.ordersCount || 0}</p>
                      </div>
                      <div className="bg-tech-light-gray rounded-2xl p-6 border border-primary-100">
                        <p className="text-caption text-primary-600 mb-2">Total dépensé</p>
                        <p className="text-headline font-display font-bold text-tech-black">
                          {parseFloat(user.totalSpent || '0').toFixed(2)} €
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-primary-100 pt-8">
                    <button
                      onClick={() => {
                        logout()
                        router.push('/')
                      }}
                      className="px-6 py-3 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600 transition-all duration-300 shadow-soft hover:shadow-medium"
                    >
                      Se déconnecter
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-title font-display font-semibold text-tech-black mb-8">Historique des commandes</h2>
                  {ordersLoading ? (
                    <div className="text-center py-24">
                      <div className="w-12 h-12 border-4 border-tech-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-body text-primary-600 font-medium">Chargement des commandes...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-24">
                      <div className="w-24 h-24 bg-tech-light-gray rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                      </div>
                      <p className="text-body text-primary-600 mb-6 font-medium">Aucune commande pour le moment</p>
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
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-primary-100 rounded-2xl p-6 hover:border-primary-200 hover:shadow-soft transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-display font-semibold text-tech-black text-title">Commande {order.name}</h3>
                              <p className="text-caption text-primary-600 mt-1">
                                {new Date(order.created_at).toLocaleDateString('fr-FR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-display font-bold text-tech-black text-headline">
                                {parseFloat(order.total_price).toFixed(2)} {order.currency}
                              </p>
                              <span
                                className={`inline-block px-3 py-1.5 text-caption rounded-full font-semibold mt-2 ${
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
                            className="text-tech-accent hover:text-tech-accent-hover font-semibold text-caption transition-colors inline-flex items-center"
                          >
                            Voir les détails
                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <h2 className="text-title font-display font-semibold text-tech-black mb-8">Adresses de livraison</h2>
                  <div className="text-center py-24">
                    <div className="w-24 h-24 bg-tech-light-gray rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <p className="text-body text-primary-600 mb-2 font-medium">Gestion des adresses à venir</p>
                    <p className="text-caption text-primary-500">
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
