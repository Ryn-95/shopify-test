'use client'

import { useState, useEffect } from 'react'
import { getProductReviews, addReview, getProductRating, type Review } from '@/lib/reviews'
import { useAuth } from '@/context/AuthContext'
import { useToast } from './ToastProvider'

interface ProductReviewsProps {
  productId: string
  productHandle: string
}

export default function ProductReviews({ productId, productHandle }: ProductReviewsProps) {
  const { user, isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState(getProductRating(productId))
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
  })

  useEffect(() => {
    loadReviews()
  }, [productId])

  const loadReviews = () => {
    const productReviews = getProductReviews(productId)
    setReviews(productReviews.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ))
    setRating(getProductRating(productId))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated) {
      showToast('Vous devez être connecté pour laisser un avis', 'error')
      return
    }

    if (!formData.comment.trim()) {
      showToast('Veuillez saisir un commentaire', 'error')
      return
    }

    try {
      addReview({
        productId,
        productHandle,
        customerName: user?.firstName && user?.lastName 
          ? `${user.firstName} ${user.lastName}`
          : user?.email?.split('@')[0] || 'Anonyme',
        customerEmail: user?.email || '',
        rating: formData.rating,
        title: formData.title,
        comment: formData.comment,
        verified: false,
      })

      showToast('Votre avis a été publié !', 'success')
      setFormData({ rating: 5, title: '', comment: '' })
      setShowForm(false)
      loadReviews()
    } catch (error) {
      showToast('Erreur lors de la publication de l\'avis', 'error')
    }
  }

  const StarRating = ({ value, onChange, readonly = false }: { 
    value: number
    onChange?: (rating: number) => void
    readonly?: boolean 
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !readonly && onChange?.(star)}
            disabled={readonly}
            className={`${
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            } transition-transform duration-200`}
          >
            <svg
              className={`w-5 h-5 ${
                star <= value ? 'text-yellow-500 fill-current' : 'text-primary-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-16 border-t border-primary-100 pt-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-headline font-display font-bold text-tech-black mb-4 tracking-tight">Avis clients</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <StarRating value={Math.round(rating.average)} readonly />
              <span className="text-headline font-display font-bold text-tech-black">
                {rating.average > 0 ? rating.average.toFixed(1) : '0.0'}
              </span>
            </div>
            <span className="text-body text-primary-600">
              ({rating.count} {rating.count === 1 ? 'avis' : 'avis'})
            </span>
          </div>
        </div>
        {isAuthenticated && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-tech-black text-tech-white font-semibold rounded-2xl hover:bg-primary-800 transition-all duration-300 shadow-soft hover:shadow-medium hover:scale-105"
          >
            {showForm ? 'Annuler' : 'Laisser un avis'}
          </button>
        )}
      </div>

      {/* Formulaire d'avis */}
      {showForm && (
        <div className="mb-8 p-8 bg-tech-light-gray rounded-3xl border border-primary-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-caption font-semibold text-tech-black mb-3">
                Note *
              </label>
              <StarRating
                value={formData.rating}
                onChange={(rating) => setFormData({ ...formData, rating })}
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-caption font-semibold text-tech-black mb-2">
                Titre (optionnel)
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-tech-white border border-primary-200 rounded-2xl focus:ring-2 focus:ring-tech-accent focus:border-tech-accent transition-all duration-300 text-body"
                placeholder="Résumez votre avis"
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-caption font-semibold text-tech-black mb-2">
                Commentaire *
              </label>
              <textarea
                id="comment"
                required
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-tech-white border border-primary-200 rounded-2xl focus:ring-2 focus:ring-tech-accent focus:border-tech-accent transition-all duration-300 resize-none text-body"
                placeholder="Partagez votre expérience..."
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-tech-black text-tech-white font-semibold rounded-2xl hover:bg-primary-800 transition-all duration-300 shadow-soft hover:shadow-medium hover:scale-105"
            >
              Publier l&apos;avis
            </button>
          </form>
        </div>
      )}

      {/* Liste des avis */}
      {reviews.length === 0 ? (
        <div className="text-center py-16 text-primary-600">
          <p className="text-body font-medium">Aucun avis pour le moment. Soyez le premier à laisser un avis !</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border border-primary-100 rounded-2xl p-6 bg-tech-white hover:border-primary-200 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-display font-semibold text-tech-black text-title">
                      {review.customerName}
                    </h4>
                    {review.verified && (
                      <span className="text-caption bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-semibold">
                        Achat vérifié
                      </span>
                    )}
                  </div>
                  {review.title && (
                    <h5 className="font-display font-medium text-tech-black mb-2 text-body">{review.title}</h5>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? 'text-yellow-500 fill-current' : 'text-primary-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-body text-primary-700 mb-3 leading-relaxed">{review.comment}</p>
              <p className="text-caption text-primary-500">
                {new Date(review.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
