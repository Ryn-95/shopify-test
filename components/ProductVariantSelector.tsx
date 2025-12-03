'use client'

/**
 * Composant ProductVariantSelector Premium
 * Design inspiré Apple/Tesla
 */

import { useState } from 'react'
import type { Product } from '@/lib/types'
import { useCart } from '@/context/CartContext'
import { useToast } from './ToastProvider'

interface ProductVariantSelectorProps {
  product: Product
}

export default function ProductVariantSelector({
  product,
}: ProductVariantSelectorProps) {
  const { addToCart, isLoading } = useCart()
  const { showToast } = useToast()
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  )
  const [isAdding, setIsAdding] = useState(false)

  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  )

  /**
   * Gère l'ajout du produit au panier avec la variante sélectionnée
   */
  const handleAddToCart = async () => {
    if (!selectedVariant) {
      showToast('Veuillez sélectionner une variante', 'error')
      return
    }

    if (!selectedVariant.available) {
      showToast('Cette variante n\'est pas disponible', 'error')
      return
    }

    try {
      setIsAdding(true)
      await addToCart(selectedVariant.id, 1)
      showToast(`${product.title} ajouté au panier`, 'success')
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error)
      showToast('Erreur lors de l\'ajout au panier', 'error')
    } finally {
      setIsAdding(false)
    }
  }

  // Si une seule variante, afficher directement le bouton
  if (product.variants.length === 1) {
    const variant = product.variants[0]
    return (
      <div className="space-y-4">
        {/* Prix */}
        <div>
          <p className="text-headline font-display font-bold text-tech-black">
            {parseFloat(variant.price).toFixed(2)} €
            {variant.compareAtPrice && (
              <span className="ml-3 text-title text-primary-500 line-through font-normal">
                {parseFloat(variant.compareAtPrice).toFixed(2)} €
              </span>
            )}
          </p>
        </div>

        {/* Bouton */}
        <button
          onClick={handleAddToCart}
          disabled={!variant.available || isAdding || isLoading}
          className="w-full bg-tech-black text-tech-white py-4 px-6 rounded-2xl font-semibold text-body hover:bg-primary-800 transition-all duration-300 disabled:bg-primary-200 disabled:text-primary-400 disabled:cursor-not-allowed shadow-medium hover:shadow-large hover:scale-105 disabled:hover:scale-100"
        >
          {isAdding ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Ajout...
            </span>
          ) : variant.available ? (
            'Ajouter au panier'
          ) : (
            'Indisponible'
          )}
        </button>
      </div>
    )
  }

  // Si plusieurs variantes, afficher les sélecteurs
  return (
    <div className="space-y-6">
      {/* Sélection des variantes */}
      {product.options?.map((option) => (
        <div key={option.id}>
          <label className="block text-caption font-semibold text-tech-black mb-3">
            {option.name}
          </label>
          <div className="flex flex-wrap gap-3">
            {option.values.map((value) => {
              // Trouver la variante correspondante à cette valeur
              const variant = product.variants.find((v) =>
                v.selectedOptions?.some(
                  (opt) => opt.name === option.name && opt.value === value
                )
              )

              const isSelected = variant?.id === selectedVariantId
              const isAvailable = variant?.available ?? false

              return (
                <button
                  key={value}
                  onClick={() => variant && setSelectedVariantId(variant.id)}
                  disabled={!isAvailable}
                  className={`px-5 py-2.5 rounded-2xl border-2 transition-all duration-300 text-caption font-semibold ${
                    isSelected
                      ? 'border-tech-black bg-tech-black text-tech-white shadow-soft'
                      : isAvailable
                      ? 'border-primary-200 bg-tech-white hover:border-tech-black text-tech-black'
                      : 'border-primary-100 bg-tech-light-gray text-primary-400 cursor-not-allowed line-through'
                  }`}
                >
                  {value}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Prix de la variante sélectionnée */}
      {selectedVariant && (
        <div className="pt-2">
          <p className="text-headline font-display font-bold text-tech-black">
            {parseFloat(selectedVariant.price).toFixed(2)} €
            {selectedVariant.compareAtPrice && (
              <span className="ml-3 text-title text-primary-500 line-through font-normal">
                {parseFloat(selectedVariant.compareAtPrice).toFixed(2)} €
              </span>
            )}
          </p>
        </div>
      )}

      {/* Bouton Ajouter au panier */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedVariant?.available || isAdding || isLoading}
        className="w-full bg-tech-black text-tech-white py-4 px-6 rounded-2xl font-semibold text-body hover:bg-primary-800 transition-all duration-300 disabled:bg-primary-200 disabled:text-primary-400 disabled:cursor-not-allowed shadow-medium hover:shadow-large hover:scale-105 disabled:hover:scale-100"
      >
        {isAdding ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Ajout...
          </span>
        ) : selectedVariant?.available ? (
          'Ajouter au panier'
        ) : (
          'Indisponible'
        )}
      </button>
    </div>
  )
}
