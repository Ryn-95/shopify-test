'use client'

/**
 * Composant ProductCard Minimaliste
 * Design inspiré Apple - Épuré et subtil
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

  const image = product.images?.[0]
  const firstVariant = product.variants?.[0]
  const price = firstVariant?.price || '0.00'

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
    <div className="group">
      <Link href={`/product/${product.handle || product.id}`} className="block mb-3">
        {/* Image container - Style Apple minimaliste */}
        <div className="aspect-square relative overflow-hidden bg-tech-light-gray rounded-lg mb-3">
          {image?.src ? (
            <>
              <Image
                src={image.src}
                alt={image.alt || product.title}
                fill
                priority={priority}
                className={`object-cover transition-opacity duration-300 group-hover:opacity-90 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-tech-light-gray" />
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary-300">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12.75v-.008z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product info - Style Apple épuré */}
        <div>
          <h3 className="text-sm font-display font-light text-tech-black mb-1 line-clamp-2 group-hover:text-primary-700 transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-primary-600 font-light">
            {parseFloat(price).toFixed(2)} €
          </p>
        </div>
      </Link>

      {/* Add to cart button - Minimaliste */}
      <button
        onClick={handleAddToCart}
        disabled={!firstVariant?.available || isAdding || isLoading}
        className="w-full text-xs text-tech-black border border-primary-200 py-2 px-4 rounded-lg hover:border-tech-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {isAdding ? 'Ajout...' : firstVariant?.available ? 'Ajouter au panier' : 'Indisponible'}
      </button>
    </div>
  )
}
