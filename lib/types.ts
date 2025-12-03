/**
 * Types TypeScript pour les produits, panier et checkout Shopify
 * Basés sur les types du SDK shopify-buy
 */

// Type pour une variante de produit
export interface ProductVariant {
  id: string
  title: string
  price: string
  compareAtPrice?: string
  available: boolean
  selectedOptions?: Array<{
    name: string
    value: string
  }>
  image?: {
    src: string
    alt?: string
  }
}

// Type pour une image de produit
export interface ProductImage {
  id: string
  src: string
  alt?: string
}

// Type pour une option de produit (taille, couleur, etc.)
export interface ProductOption {
  id: string
  name: string
  values: string[]
}

// Type pour un produit Shopify
export interface Product {
  id: string
  title: string
  description: string
  descriptionHtml?: string
  handle: string
  images: ProductImage[]
  variants: ProductVariant[]
  options?: ProductOption[]
  priceRange?: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  availableForSale: boolean
}

// Type pour un item dans le panier
export interface CartItem {
  id: string
  variantId: string
  title: string
  variantTitle: string
  quantity: number
  price: string
  image?: {
    src: string
    alt?: string
  }
}

// Type pour le panier/checkout
export interface Cart {
  id: string
  webUrl: string
  lineItems: CartItem[]
  subtotalPrice?: string
  totalPrice?: string
  currencyCode?: string
}

