/**
 * Système de notifications pour les événements Shopify
 */

/**
 * Émet une notification dans l'application
 */
export function emitNotification(type: 'order' | 'cart' | 'product', message: string) {
  if (typeof window === 'undefined') return

  // Émettre un événement personnalisé
  const event = new CustomEvent('new-notification', {
    detail: { type, message },
  })
  window.dispatchEvent(event)

  // Notification navigateur (si autorisée)
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Nouvelle activité', {
      body: message,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
    })
  }

  // Log pour debug
  console.log(`🔔 Notification: ${type} - ${message}`)
}

/**
 * Demande la permission pour les notifications navigateur
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission === 'default') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

/**
 * Envoie une notification pour une nouvelle commande
 */
export function notifyNewOrder(orderId: string, total: string) {
  emitNotification('order', `Nouvelle commande ${orderId} - Total: ${total} €`)
}

/**
 * Envoie une notification pour un nouveau panier
 */
export function notifyNewCart(cartId: string) {
  emitNotification('cart', `Nouveau panier créé`)
}

/**
 * Envoie une notification pour un nouveau produit
 */
export function notifyNewProduct(productTitle: string) {
  emitNotification('product', `Nouveau produit: ${productTitle}`)
}

