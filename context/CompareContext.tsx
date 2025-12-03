'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { Product } from '@/lib/types'

interface CompareContextType {
  products: Product[]
  addToCompare: (product: Product) => void
  removeFromCompare: (productId: string) => void
  isInCompare: (productId: string) => boolean
  clearCompare: () => void
  maxItems: number
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

const COMPARE_STORAGE_KEY = 'shopify_compare'
const MAX_COMPARE_ITEMS = 4

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  // Charger depuis localStorage au démarrage
  useEffect(() => {
    try {
      const savedCompare = localStorage.getItem(COMPARE_STORAGE_KEY)
      if (savedCompare) {
        setProducts(JSON.parse(savedCompare))
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la comparaison:', error)
    }
  }, [])

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(products))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la comparaison:', error)
    }
  }, [products])

  const addToCompare = useCallback((product: Product) => {
    setProducts((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev // Déjà dans la comparaison
      }
      if (prev.length >= MAX_COMPARE_ITEMS) {
        return prev // Limite atteinte
      }
      return [...prev, product]
    })
  }, [])

  const removeFromCompare = useCallback((productId: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const isInCompare = useCallback(
    (productId: string) => {
      return products.some((item) => item.id === productId)
    },
    [products]
  )

  const clearCompare = useCallback(() => {
    setProducts([])
  }, [])

  return (
    <CompareContext.Provider
      value={{
        products,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        maxItems: MAX_COMPARE_ITEMS,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider')
  }
  return context
}

