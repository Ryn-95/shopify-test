/**
 * Système de tracking des ajouts au panier
 * Enregistre les événements pour analytics
 */

/**
 * Track un ajout au panier
 */
export function trackAddToCart(productId: string, productTitle: string, variantId: string, price: string, quantity: number = 1) {
  // Log pour debugging
  console.log('📊 Analytics - Ajout au panier:', {
    productId,
    productTitle,
    variantId,
    price,
    quantity,
    timestamp: new Date().toISOString(),
  })

  // Vous pouvez ajouter ici :
  // - Google Analytics
  // - Facebook Pixel
  // - Autres outils d'analytics
  
  // Exemple pour Google Analytics (si vous l'ajoutez plus tard)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'add_to_cart', {
      currency: 'EUR',
      value: parseFloat(price) * quantity,
      items: [{
        item_id: productId,
        item_name: productTitle,
        price: price,
        quantity: quantity,
      }],
    })
  }
}

/**
 * Track une vue de produit
 */
export function trackProductView(productId: string, productTitle: string, price: string) {
  console.log('📊 Analytics - Vue produit:', {
    productId,
    productTitle,
    price,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track le début du checkout
 */
export function trackBeginCheckout(cartValue: string, itemCount: number) {
  console.log('📊 Analytics - Début checkout:', {
    cartValue,
    itemCount,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track une commande complétée
 */
export function trackPurchase(orderId: string, value: string, items: Array<{id: string, name: string, price: string, quantity: number}>) {
  console.log('📊 Analytics - Commande complétée:', {
    orderId,
    value,
    items,
    timestamp: new Date().toISOString(),
  })
}

