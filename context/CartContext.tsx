'use client'

/**
 * Context API pour la gestion du panier
 * Gère l'état du panier, la persistance dans localStorage
 * et les interactions avec l'API Shopify
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { Cart, CartItem } from '@/lib/types'
import {
  createCheckout,
  addItemToCheckout,
  updateCheckoutLineItem,
  removeCheckoutLineItem,
  getCheckout,
} from '@/lib/shopify'
import { trackAddToCart } from '@/lib/analytics'
import { createDraftOrder, updateDraftOrder } from '@/lib/shopify-admin'

interface CartContextType {
  cart: Cart | null
  isLoading: boolean
  addToCart: (variantId: string, quantity?: number) => Promise<void>
  removeFromCart: (lineItemId: string) => Promise<void>
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>
  getCartCount: () => number
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Clés pour le localStorage
const CART_STORAGE_KEY = 'shopify_cart_id'
const DRAFT_ORDER_STORAGE_KEY = 'shopify_draft_order_id'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Chargement du panier depuis localStorage au montage
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCheckoutId = localStorage.getItem(CART_STORAGE_KEY)
        
        if (savedCheckoutId) {
          console.log('📦 Chargement du panier depuis localStorage...')
          const savedCart = await getCheckout(savedCheckoutId)
          setCart(savedCart)
          console.log(`✅ Panier chargé: ${savedCart.lineItems.length} article(s)`)
        } else {
          console.log('📦 Aucun panier sauvegardé')
        }
      } catch (error) {
        console.error('❌ Erreur lors du chargement du panier:', error)
        // Si le checkout n'existe plus, on le supprime du localStorage
        localStorage.removeItem(CART_STORAGE_KEY)
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()
  }, [])

  // Sauvegarde du checkoutId dans localStorage
  const saveCartId = useCallback((checkoutId: string) => {
    localStorage.setItem(CART_STORAGE_KEY, checkoutId)
    
    // Sauvegarder les statistiques de panier
    try {
      const statsData = localStorage.getItem('shopify_carts_stats')
      const stats = statsData ? JSON.parse(statsData) : {
        totalCarts: 0,
        totalItems: 0,
        totalValue: 0,
        recentCarts: [],
      }
      
      stats.totalCarts += 1
      localStorage.setItem('shopify_carts_stats', JSON.stringify(stats))
    } catch (e) {
      console.error('Erreur lors de la sauvegarde des stats:', e)
    }
  }, [])

  // Suppression du checkoutId du localStorage
  const clearCartId = useCallback(() => {
    localStorage.removeItem(CART_STORAGE_KEY)
  }, [])

  /**
   * Ajoute un produit au panier
   */
  const addToCart = useCallback(
    async (variantId: string, quantity: number = 1) => {
      try {
        setIsLoading(true)
        let updatedCart: Cart

        if (!cart) {
          // Créer un nouveau checkout si le panier n'existe pas
          console.log('📦 Création d\'un nouveau panier...')
          const newCart = await createCheckout()
          console.log('📦 Panier créé, ajout du produit...')
          updatedCart = await addItemToCheckout(newCart.id, variantId, quantity)
          saveCartId(updatedCart.id)
        } else {
          // Ajouter au checkout existant
          console.log('📦 Ajout au panier existant...')
          updatedCart = await addItemToCheckout(cart.id, variantId, quantity)
        }

        setCart(updatedCart)
        console.log(`✅ Produit ajouté au panier: ${updatedCart.lineItems.length} article(s)`)
        
        // Track analytics - trouver le produit ajouté
        const addedItem = updatedCart.lineItems.find(item => item.variantId === variantId)
        if (addedItem) {
          trackAddToCart(
            addedItem.variantId,
            addedItem.title,
            addedItem.variantId,
            addedItem.price,
            quantity
          )
        }
        
        // Synchroniser avec Shopify Admin (Draft Order)
        try {
          const savedDraftOrderId = localStorage.getItem(DRAFT_ORDER_STORAGE_KEY)
          console.log(`🔍 Draft Order ID sauvegardé: ${savedDraftOrderId || 'Aucun'}`)
          console.log(`📦 Articles dans le panier: ${updatedCart.lineItems.length}`)
          
          if (savedDraftOrderId) {
            // Mettre à jour la Draft Order existante
            console.log(`📝 Mise à jour de la Draft Order ${savedDraftOrderId}...`)
            const updatedDraftOrder = await updateDraftOrder(
              savedDraftOrderId,
              updatedCart.lineItems.map(item => ({
                variantId: item.variantId,
                quantity: item.quantity,
              }))
            )
            if (updatedDraftOrder) {
              console.log(`✅ Draft Order mise à jour avec succès!`)
              console.log(`   ID: ${updatedDraftOrder.id}`)
              console.log(`   Articles: ${updatedDraftOrder.line_items?.length || 'N/A'}`)
            } else {
              console.warn(`⚠️ La mise à jour de la Draft Order a échoué`)
            }
          } else {
            // Créer une nouvelle Draft Order
            console.log('📝 Création d\'une nouvelle Draft Order...')
            const draftOrder = await createDraftOrder(updatedCart.lineItems.map(item => ({
              variantId: item.variantId,
              quantity: item.quantity,
              title: item.title,
              price: item.price,
            })))
            if (draftOrder) {
              localStorage.setItem(DRAFT_ORDER_STORAGE_KEY, draftOrder.id.toString())
              console.log(`✅ Draft Order créée: ${draftOrder.id}`)
              console.log(`   ID sauvegardé dans localStorage`)
            } else {
              console.warn(`⚠️ La création de la Draft Order a échoué`)
            }
          }
        } catch (error) {
          // Ne pas bloquer si l'Admin API n'est pas configurée
          console.error('❌ Erreur lors de la synchronisation de la Draft Order:', error)
        }
        
        // Mettre à jour les statistiques
        try {
          const statsData = localStorage.getItem('shopify_carts_stats')
          const stats = statsData ? JSON.parse(statsData) : {
            totalCarts: 0,
            totalItems: 0,
            totalValue: 0,
            recentCarts: [],
          }
          
          stats.totalItems += quantity
          const itemValue = parseFloat(addedItem?.price || '0') * quantity
          stats.totalValue += itemValue
          
          // Ajouter le panier aux récents (max 10)
          const cartValue = updatedCart.lineItems.reduce((sum, item) => 
            sum + (parseFloat(item.price) * item.quantity), 0
          )
          
          stats.recentCarts.unshift({
            id: updatedCart.id,
            items: updatedCart.lineItems.length,
            value: cartValue,
            createdAt: new Date().toISOString(),
          })
          
          // Garder seulement les 10 derniers
          if (stats.recentCarts.length > 10) {
            stats.recentCarts = stats.recentCarts.slice(0, 10)
          }
          
          localStorage.setItem('shopify_carts_stats', JSON.stringify(stats))
        } catch (e) {
          console.error('Erreur lors de la mise à jour des stats:', e)
        }
      } catch (error: any) {
        console.error('❌ Erreur lors de l\'ajout au panier:', error)
        const errorMessage = error?.message || 'Erreur lors de l\'ajout au panier'
        console.error('Détails de l\'erreur:', errorMessage)
        throw new Error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [cart, saveCartId]
  )

  /**
   * Supprime un produit du panier
   */
  const removeFromCart = useCallback(
    async (lineItemId: string) => {
      if (!cart) return

      try {
        setIsLoading(true)
        const updatedCart = await removeCheckoutLineItem(cart.id, lineItemId)
        
        // Si le panier est vide, on le supprime du localStorage
        if (updatedCart.lineItems.length === 0) {
          clearCartId()
          localStorage.removeItem(DRAFT_ORDER_STORAGE_KEY)
          setCart(null)
        } else {
          setCart(updatedCart)
          
          // Mettre à jour la Draft Order dans Shopify Admin
          try {
            const savedDraftOrderId = localStorage.getItem(DRAFT_ORDER_STORAGE_KEY)
            if (savedDraftOrderId) {
              await updateDraftOrder(
                savedDraftOrderId,
                updatedCart.lineItems.map(item => ({
                  variantId: item.variantId,
                  quantity: item.quantity,
                }))
              )
            }
          } catch (error) {
            console.log('ℹ️ Draft Order non mise à jour')
          }
        }
        
        console.log(`✅ Produit supprimé du panier`)
      } catch (error) {
        console.error('❌ Erreur lors de la suppression du panier:', error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [cart, clearCartId]
  )

  /**
   * Met à jour la quantité d'un produit dans le panier
   */
  const updateQuantity = useCallback(
    async (lineItemId: string, quantity: number) => {
      if (!cart) return

      if (quantity <= 0) {
        // Si la quantité est 0 ou négative, supprimer l'item
        await removeFromCart(lineItemId)
        return
      }

      try {
        setIsLoading(true)
        const updatedCart = await updateCheckoutLineItem(cart.id, lineItemId, quantity)
        setCart(updatedCart)
        
        // Mettre à jour la Draft Order dans Shopify Admin
        try {
          const savedDraftOrderId = localStorage.getItem(DRAFT_ORDER_STORAGE_KEY)
          if (savedDraftOrderId) {
            await updateDraftOrder(
              savedDraftOrderId,
              updatedCart.lineItems.map(item => ({
                variantId: item.variantId,
                quantity: item.quantity,
              }))
            )
          }
        } catch (error) {
          console.log('ℹ️ Draft Order non mise à jour')
        }
        
        console.log(`✅ Quantité mise à jour`)
      } catch (error) {
        console.error('❌ Erreur lors de la mise à jour de la quantité:', error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [cart, removeFromCart]
  )

  /**
   * Calcule le nombre total d'articles dans le panier
   */
  const getCartCount = useCallback(() => {
    if (!cart) return 0
    return cart.lineItems.reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  /**
   * Vide le panier
   */
  const clearCart = useCallback(() => {
    setCart(null)
    clearCartId()
    localStorage.removeItem(DRAFT_ORDER_STORAGE_KEY)
    console.log('✅ Panier vidé')
  }, [clearCartId])

  const value: CartContextType = {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/**
 * Hook pour utiliser le contexte du panier
 */
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart doit être utilisé dans un CartProvider')
  }
  return context
}

