'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { Product } from '@/lib/types'

interface ProductsContextType {
  products: Product[]
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ 
  children, 
  products 
}: { 
  children: ReactNode
  products: Product[]
}) {
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within ProductsProvider')
  }
  return context
}

