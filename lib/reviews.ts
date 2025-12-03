/**
 * Système de gestion des avis clients
 * Stockage local pour l'instant (peut être migré vers Shopify Metafields ou base de données)
 */

export interface Review {
  id: string
  productId: string
  productHandle: string
  customerName: string
  customerEmail: string
  rating: number // 1-5
  title?: string
  comment: string
  createdAt: string
  verified: boolean // Achat vérifié
}

const REVIEWS_STORAGE_KEY = 'shopify_reviews'

/**
 * Récupère tous les avis pour un produit
 */
export function getProductReviews(productId: string): Review[] {
  if (typeof window === 'undefined') return []

  try {
    const reviews = localStorage.getItem(REVIEWS_STORAGE_KEY)
    if (!reviews) return []

    const allReviews: Review[] = JSON.parse(reviews)
    return allReviews.filter((review) => review.productId === productId)
  } catch (error) {
    console.error('Erreur lors de la récupération des avis:', error)
    return []
  }
}

/**
 * Ajoute un nouvel avis
 */
export function addReview(review: Omit<Review, 'id' | 'createdAt'>): Review {
  if (typeof window === 'undefined') {
    throw new Error('addReview doit être appelé côté client')
  }

  try {
    const reviews = localStorage.getItem(REVIEWS_STORAGE_KEY)
    const allReviews: Review[] = reviews ? JSON.parse(reviews) : []

    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    allReviews.push(newReview)
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(allReviews))

    return newReview
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'avis:', error)
    throw error
  }
}

/**
 * Calcule la note moyenne d'un produit
 */
export function getProductRating(productId: string): {
  average: number
  count: number
  distribution: { [key: number]: number }
} {
  const reviews = getProductReviews(productId)

  if (reviews.length === 0) {
    return {
      average: 0,
      count: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    }
  }

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  const average = sum / reviews.length

  const distribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  reviews.forEach((review) => {
    distribution[review.rating] = (distribution[review.rating] || 0) + 1
  })

  return {
    average: Math.round(average * 10) / 10,
    count: reviews.length,
    distribution,
  }
}

