'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { Product } from '@/lib/types'

interface WishlistContextType {
  items: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

const WISHLIST_STORAGE_KEY = 'shopify_wishlist'

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([])

  // Charger la wishlist depuis localStorage au démarrage
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY)
      if (savedWishlist) {
        setItems(JSON.parse(savedWishlist))
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la wishlist:', error)
    }
  }, [])

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la wishlist:', error)
    }
  }, [items])

  const addToWishlist = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev // Déjà dans la wishlist
      }
      return [...prev, product]
    })
  }, [])

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const isInWishlist = useCallback(
    (productId: string) => {
      return items.some((item) => item.id === productId)
    },
    [items]
  )

  const clearWishlist = useCallback(() => {
    setItems([])
  }, [])

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

