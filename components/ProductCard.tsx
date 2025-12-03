'use client'

/**
 * Composant ProductCard Premium
 * Design inspiré Apple/Tesla - Minimaliste et élégant
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
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart, isLoading } = useCart()
  const { showToast } = useToast()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCompare, removeFromCompare, isInCompare, products: compareProducts, maxItems } = useCompare()
  const [isAdding, setIsAdding] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
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
      showToast('Ce produit n\'est pas disponible', 'error')
      return
    }

    try {
      setIsAdding(true)
      await addToCart(firstVariant.id, 1)
      showToast(`${product.title} ajouté au panier`, 'success')
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error)
      showToast('Erreur lors de l\'ajout au panier', 'error')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="group relative bg-tech-white rounded-3xl overflow-hidden border border-primary-100 hover:border-primary-200 transition-all duration-500 hover:shadow-large">
      <Link href={`/product/${product.handle || product.id}`} className="block">
        {/* Image container */}
        <div className="aspect-square relative overflow-hidden bg-tech-light-gray">
          {image ? (
            <>
              <Image
                src={image.src}
                alt={image.alt || product.title}
                fill
                priority={priority}
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 animate-shimmer" />
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary-400">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12.75v-.008z" />
              </svg>
            </div>
          )}
          
          {/* Badge disponibilité */}
          {product.availableForSale && (
            <div className="absolute top-4 right-4 bg-tech-accent text-white text-[10px] font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
              Disponible
            </div>
          )}
          
          {/* Actions overlay */}
          <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              className="p-2.5 bg-tech-white/90 backdrop-blur-md rounded-full shadow-medium hover:bg-tech-white transition-smooth"
              title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              <svg
                className={`w-4 h-4 transition-colors ${isFavorite ? 'text-red-500 fill-current' : 'text-primary-600'}`}
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
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
                    showToast(`Maximum ${maxItems} produits`, 'error')
                  } else {
                    addToCompare(product)
                    showToast('Ajouté à la comparaison', 'success')
                  }
                }
              }}
              className="p-2.5 bg-tech-white/90 backdrop-blur-md rounded-full shadow-medium hover:bg-tech-white transition-smooth"
              title={isCompared ? 'Retirer de la comparaison' : 'Comparer'}
            >
              <svg
                className={`w-4 h-4 transition-colors ${isCompared ? 'text-tech-accent' : 'text-primary-600'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="p-6">
          <h3 className="text-title font-display font-semibold text-tech-black mb-2 line-clamp-2 group-hover:text-tech-accent transition-colors">
            {product.title}
          </h3>
          <p className="text-headline font-display font-bold text-tech-black">
            {parseFloat(price).toFixed(2)} €
          </p>
        </div>
      </Link>

      {/* Add to cart button */}
      <div className="px-6 pb-6">
        <button
          onClick={handleAddToCart}
          disabled={!firstVariant?.available || isAdding || isLoading}
          className="w-full bg-tech-black text-tech-white py-3.5 px-6 rounded-2xl font-semibold hover:bg-primary-800 transition-all duration-300 disabled:bg-primary-200 disabled:text-primary-400 disabled:cursor-not-allowed shadow-soft hover:shadow-medium disabled:hover:shadow-soft"
        >
          {isAdding ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Ajout...
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
