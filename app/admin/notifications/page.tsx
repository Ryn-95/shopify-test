'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Notification {
  id: string
  type: 'order' | 'cart' | 'product'
  message: string
  timestamp: Date
  read: boolean
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Charger les notifications depuis localStorage
    const savedNotifications = localStorage.getItem('shopify_notifications')
    if (savedNotifications) {
      const parsed = JSON.parse(savedNotifications).map((n: any) => ({
        ...n,
        timestamp: new Date(n.timestamp),
      }))
      setNotifications(parsed)
      setUnreadCount(parsed.filter((n: Notification) => !n.read).length)
    }

    // Écouter les événements de nouvelles notifications
    const handleNewNotification = (event: CustomEvent) => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: event.detail.type,
        message: event.detail.message,
        timestamp: new Date(),
        read: false,
      }

      setNotifications(prev => [newNotification, ...prev])
      setUnreadCount(prev => prev + 1)

      // Sauvegarder dans localStorage
      const updated = [newNotification, ...notifications]
      localStorage.setItem('shopify_notifications', JSON.stringify(updated))

      // Notification navigateur (si autorisée)
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Nouvelle commande !', {
          body: newNotification.message,
          icon: '/favicon.ico',
        })
      }
    }

    window.addEventListener('new-notification' as any, handleNewNotification as EventListener)

    // Demander la permission pour les notifications navigateur
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

    return () => {
      window.removeEventListener('new-notification' as any, handleNewNotification as EventListener)
    }
  }, [])

  const markAsRead = (id: string) => {
    const updated = notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    )
    setNotifications(updated)
    setUnreadCount(updated.filter(n => !n.read).length)
    localStorage.setItem('shopify_notifications', JSON.stringify(updated))
  }

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }))
    setNotifications(updated)
    setUnreadCount(0)
    localStorage.setItem('shopify_notifications', JSON.stringify(updated))
  }

  const clearAll = () => {
    setNotifications([])
    setUnreadCount(0)
    localStorage.removeItem('shopify_notifications')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p className="text-lg text-gray-600">
                {unreadCount} notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Tout marquer comme lu
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Tout effacer
              </button>
            )}
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Aucune notification
            </h2>
            <p className="text-gray-600">
              Vous recevrez des notifications ici quand de nouvelles commandes seront passées.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl border-2 p-6 transition-all duration-200 ${
                  notification.read
                    ? 'border-gray-200 opacity-75'
                    : 'border-blue-500 shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {!notification.read && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        notification.type === 'order'
                          ? 'bg-green-100 text-green-800'
                          : notification.type === 'cart'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {notification.type === 'order' ? 'Commande' : 
                         notification.type === 'cart' ? 'Panier' : 'Produit'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {notification.timestamp.toLocaleString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-gray-900 text-lg">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Marquer comme lu"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            💡 Comment recevoir des notifications sur votre téléphone ?
          </h3>
          <div className="space-y-2 text-blue-800 text-sm">
            <p><strong>Option 1 (Recommandé) :</strong> Activez les notifications Shopify natives</p>
            <p className="ml-4">→ Shopify Admin → Paramètres → Notifications → Activez SMS</p>
            <p className="mt-4"><strong>Option 2 :</strong> Utilisez l'application Shopify</p>
            <p className="ml-4">→ Téléchargez l'app Shopify sur votre téléphone</p>
            <p className="ml-4">→ Vous recevrez des notifications push automatiquement</p>
          </div>
        </div>
      </div>
    </div>
  )
}

