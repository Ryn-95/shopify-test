'use client'

/**
 * Composant CartItem
 * Item individuel dans le panier
 * Affiche image, titre, variante, prix et contrôles de quantité
 */

import Image from 'next/image'
import { useState } from 'react'
import type { CartItem as CartItemType } from '@/lib/types'
import { useCart } from '@/context/CartContext'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, isLoading } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  const price = parseFloat(item.price)
  const totalPrice = price * item.quantity

  /**
   * Gère l'augmentation de la quantité
   */
  const handleIncrease = async () => {
    try {
      setIsUpdating(true)
      await updateQuantity(item.id, item.quantity + 1)
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
      alert('Erreur lors de la mise à jour de la quantité')
    } finally {
      setIsUpdating(false)
    }
  }

  /**
   * Gère la diminution de la quantité
   */
  const handleDecrease = async () => {
    if (item.quantity <= 1) {
      handleRemove()
      return
    }

    try {
      setIsUpdating(true)
      await updateQuantity(item.id, item.quantity - 1)
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
      alert('Erreur lors de la mise à jour de la quantité')
    } finally {
      setIsUpdating(false)
    }
  }

  /**
   * Gère la suppression de l'item
   */
  const handleRemove = async () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit du panier ?')) {
      try {
        setIsUpdating(true)
        await removeFromCart(item.id)
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        alert('Erreur lors de la suppression du produit')
      } finally {
        setIsUpdating(false)
      }
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative w-32 h-32 sm:w-24 sm:h-24 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-md">
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt || item.title}
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-10 h-10"
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
      </div>

      {/* Informations */}
      <div className="flex-grow min-w-0">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
        {item.variantTitle && item.variantTitle !== 'Default Title' && (
          <p className="text-sm text-gray-600 mb-2 font-medium">{item.variantTitle}</p>
        )}
        <p className="text-sm text-gray-500">Prix unitaire: {price.toFixed(2)} €</p>
      </div>

      {/* Contrôles quantité et prix */}
      <div className="flex items-center gap-6 w-full sm:w-auto">
        {/* Contrôles quantité */}
        <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-300 p-2">
          <button
            onClick={handleDecrease}
            disabled={isUpdating || isLoading}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>

          <span className="text-lg font-bold text-gray-900 w-8 text-center">
            {item.quantity}
          </span>

          <button
            onClick={handleIncrease}
            disabled={isUpdating || isLoading}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        {/* Prix total */}
        <div className="text-right min-w-[120px]">
          <p className="text-2xl font-extrabold text-gray-900">
            {totalPrice.toFixed(2)} €
          </p>
        </div>

        {/* Bouton supprimer */}
        <button
          onClick={handleRemove}
          disabled={isUpdating || isLoading}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Supprimer du panier"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

