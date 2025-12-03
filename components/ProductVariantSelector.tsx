'use client'

/**
 * Composant ProductVariantSelector
 * Permet de sélectionner une variante de produit et de l'ajouter au panier
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
      alert('Veuillez sélectionner une variante')
      return
    }

    if (!selectedVariant.available) {
      alert('Cette variante n\'est pas disponible')
      return
    }

    try {
      setIsAdding(true)
      await addToCart(selectedVariant.id, 1)
      showToast(`${product.title} ajouté au panier !`, 'success')
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
      <button
        onClick={handleAddToCart}
        disabled={!variant.available || isAdding || isLoading}
        className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-200 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
      >
        {isAdding ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Ajout en cours...
          </span>
        ) : variant.available ? (
          'Ajouter au panier'
        ) : (
          'Indisponible'
        )}
      </button>
    )
  }

  // Si plusieurs variantes, afficher les sélecteurs
  return (
    <div className="space-y-4">
      {/* Sélection des variantes */}
      {product.options?.map((option) => (
        <div key={option.id}>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {option.name}
          </label>
          <div className="flex flex-wrap gap-2">
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
                  className={`px-4 py-2 rounded-md border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : isAvailable
                      ? 'border-gray-300 hover:border-gray-400 text-gray-700'
                      : 'border-gray-200 text-gray-400 cursor-not-allowed line-through'
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
          <p className="text-2xl font-semibold text-gray-900">
            {parseFloat(selectedVariant.price).toFixed(2)} €
            {selectedVariant.compareAtPrice && (
              <span className="ml-3 text-lg text-gray-500 line-through">
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
        className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-200 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
      >
        {isAdding ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Ajout en cours...
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

