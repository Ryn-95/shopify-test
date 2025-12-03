'use client'

/**
 * Composant ProductCard
 * Carte produit pour l'affichage dans la liste des produits
 * Affiche image, titre, prix et bouton "Ajouter au panier"
 */

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Product } from '@/lib/types'
import { useCart } from '@/context/CartContext'
import { useToast } from './ToastProvider'
import { useWishlist } from '@/context/WishlistContext'
import { useCompare } from '@/context/CompareContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isLoading } = useCart()
  const { showToast } = useToast()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCompare, removeFromCompare, isInCompare, products: compareProducts, maxItems } = useCompare()
  const [isAdding, setIsAdding] = useState(false)
  const isFavorite = isInWishlist(product.id)
  const isCompared = isInCompare(product.id)

  // Récupération de la première image disponible
  const image = product.images[0]
  // Récupération de la première variante disponible
  const firstVariant = product.variants[0]
  const price = firstVariant?.price || '0.00'

  /**
   * Gère l'ajout du produit au panier
   */
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!firstVariant || !firstVariant.available) {
      alert('Ce produit n\'est pas disponible')
      return
    }

    try {
      setIsAdding(true)
      await addToCart(firstVariant.id, 1)
      showToast(`${product.title} ajouté au panier !`, 'success')
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error)
      showToast('Erreur lors de l\'ajout au panier', 'error')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <Link href={`/product/${product.handle || product.id}`}>
        {/* Image du produit */}
        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt || product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          {/* Badge disponibilité */}
          {product.availableForSale && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              En stock
            </div>
          )}
          {/* Boutons actions */}
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (isFavorite) {
                  removeFromWishlist(product.id)
                  showToast('Retiré des favoris', 'info')
                } else {
                  addToWishlist(product)
                  showToast('Ajouté aux favoris', 'success')
                }
              }}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              <svg
                className={`w-5 h-5 transition-colors ${isFavorite ? 'text-red-600 fill-current' : 'text-gray-600'}`}
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (isCompared) {
                  removeFromCompare(product.id)
                  showToast('Retiré de la comparaison', 'info')
                } else {
                  if (compareProducts.length >= maxItems) {
                    showToast(`Maximum ${maxItems} produits pour la comparaison`, 'error')
                  } else {
                    addToCompare(product)
                    showToast('Ajouté à la comparaison', 'success')
                  }
                }
              }}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              title={isCompared ? 'Retirer de la comparaison' : 'Comparer'}
            >
              <svg
                className={`w-5 h-5 transition-colors ${isCompared ? 'text-blue-600' : 'text-gray-600'}`}
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
            </button>
          </div>
        </div>

        {/* Informations du produit */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {product.title}
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {parseFloat(price).toFixed(2)} €
          </p>
        </div>
      </Link>

      {/* Bouton Ajouter au panier */}
      <div className="px-5 pb-5">
        <button
          onClick={handleAddToCart}
          disabled={!firstVariant?.available || isAdding || isLoading}
          className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 px-4 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition-all duration-200 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
        >
          {isAdding ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Ajout en cours...
            </span>
          ) : firstVariant?.available ? (
            'Ajouter au panier'
          ) : (
            'Indisponible'
          )}
        </button>
      </div>
    </div>
  )
}

