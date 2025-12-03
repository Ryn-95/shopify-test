'use client'

/**
 * Composant CartItem Premium
 * Design inspiré Apple/Tesla
 */

import Image from 'next/image'
import { useState } from 'react'
import type { CartItem as CartItemType } from '@/lib/types'
import { useCart } from '@/context/CartContext'
import { useToast } from './ToastProvider'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, isLoading } = useCart()
  const { showToast } = useToast()
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
      showToast('Erreur lors de la mise à jour', 'error')
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
      showToast('Erreur lors de la mise à jour', 'error')
    } finally {
      setIsUpdating(false)
    }
  }

  /**
   * Gère la suppression de l'item
   */
  const handleRemove = async () => {
    if (confirm('Supprimer ce produit du panier ?')) {
      try {
        setIsUpdating(true)
        await removeFromCart(item.id)
        showToast('Produit retiré du panier', 'success')
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        showToast('Erreur lors de la suppression', 'error')
      } finally {
        setIsUpdating(false)
      }
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-tech-white rounded-3xl border border-primary-100 hover:border-primary-200 hover:shadow-medium transition-all duration-300">
      {/* Image */}
      <div className="relative w-32 h-32 sm:w-24 sm:h-24 flex-shrink-0 bg-tech-light-gray rounded-2xl overflow-hidden">
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt || item.title}
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12.75v-.008z" />
            </svg>
          </div>
        )}
      </div>

      {/* Informations */}
      <div className="flex-grow min-w-0">
        <h3 className="text-title font-display font-semibold text-tech-black mb-2">{item.title}</h3>
        {item.variantTitle && item.variantTitle !== 'Default Title' && (
          <p className="text-caption text-primary-600 mb-2 font-medium">{item.variantTitle}</p>
        )}
        <p className="text-caption text-primary-500">Prix unitaire: {price.toFixed(2)} €</p>
      </div>

      {/* Contrôles quantité et prix */}
      <div className="flex items-center gap-6 w-full sm:w-auto">
        {/* Contrôles quantité */}
        <div className="flex items-center gap-2 bg-tech-light-gray rounded-2xl border border-primary-200 p-1.5">
          <button
            onClick={handleDecrease}
            disabled={isUpdating || isLoading}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-tech-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-primary-700 hover:text-tech-black"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          </button>

          <span className="text-body font-semibold text-tech-black w-8 text-center">
            {item.quantity}
          </span>

          <button
            onClick={handleIncrease}
            disabled={isUpdating || isLoading}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-tech-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-primary-700 hover:text-tech-black"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Prix total */}
        <div className="text-right min-w-[120px]">
          <p className="text-headline font-display font-bold text-tech-black">
            {totalPrice.toFixed(2)} €
          </p>
        </div>

        {/* Bouton supprimer */}
        <button
          onClick={handleRemove}
          disabled={isUpdating || isLoading}
          className="p-2.5 text-primary-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Supprimer du panier"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  )
}
