/**
 * Client Shopify Storefront API
 * Utilise le SDK shopify-buy pour interagir avec l'API Storefront
 */

// @ts-ignore - shopify-buy n'a pas de types TypeScript
import Client from 'shopify-buy'
import type { Product, Cart } from './types'

// Récupération des variables d'environnement
const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

// Vérification que les variables d'environnement sont définies
if (!storeDomain || !storefrontAccessToken) {
  throw new Error(
    'Les variables d\'environnement NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN et NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN doivent être définies'
  )
}

// Initialisation du client Shopify
export const client = Client.buildClient({
  domain: storeDomain,
  storefrontAccessToken: storefrontAccessToken,
})

/**
 * Récupère tous les produits disponibles dans la boutique
 * @returns Promise<Product[]> Liste des produits
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    console.log('🛍️ Récupération des produits depuis Shopify...')
    
    // Utilisation directe de l'API GraphQL Storefront car shopify-buy a des problèmes
    const query = `
      query {
        products(first: 250) {
          edges {
            node {
              id
              title
              description
              descriptionHtml
              handle
              availableForSale
              images(first: 10) {
                edges {
                  node {
                    id
                    url
                    altText
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
              options {
                id
                name
                values
              }
            }
          }
        }
      }
    `
    
    const response = await fetch(`https://${storeDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.errors) {
      console.error('❌ Erreurs GraphQL:', data.errors)
      throw new Error('Erreur lors de la récupération des produits depuis Shopify')
    }
    
    const products = data.data.products.edges.map((edge: any) => edge.node)
    
    console.log(`✅ ${products.length} produit(s) récupéré(s)`)
    
    // Conversion des produits Shopify GraphQL en format Product
    return products.map((product: any) => {
      const images = product.images.edges.map((edge: any) => ({
        id: edge.node.id || '',
        src: edge.node.url,
        alt: edge.node.altText || product.title,
      }))
      
      const variants = product.variants.edges.map((edge: any) => {
        const variant = edge.node
        return {
          id: variant.id,
        title: variant.title,
          price: variant.price.amount,
          compareAtPrice: variant.compareAtPrice?.amount || undefined,
          available: variant.availableForSale,
        image: variant.image
          ? {
                src: variant.image.url,
              alt: variant.image.altText || product.title,
            }
          : undefined,
        }
      })
      
      const prices = variants.map((v: any) => parseFloat(v.price))
      const minPrice = prices.length > 0 ? Math.min(...prices).toString() : '0'
      
      return {
        id: product.id,
        title: product.title,
        description: product.description || '',
        descriptionHtml: product.descriptionHtml || '',
        handle: product.handle,
        images,
        variants,
      options: product.options?.map((opt: any) => ({
          id: opt.id || '',
        name: opt.name,
        values: opt.values,
        })) || [],
        priceRange: prices.length > 0
        ? {
            minVariantPrice: {
                amount: minPrice,
                currencyCode: variants[0]?.price ? 'EUR' : 'EUR',
            },
          }
        : undefined,
      availableForSale: product.availableForSale,
      }
    })
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des produits:', error)
    throw new Error('Impossible de récupérer les produits depuis Shopify')
  }
}

/**
 * Récupère un produit par son handle ou ID
 * @param productHandleOrId - Handle ou ID du produit
 * @returns Promise<Product> Le produit
 */
export async function getProductByHandle(productHandle: string): Promise<Product> {
  try {
    console.log(`🛍️ Récupération du produit ${productHandle}...`)
    
    const query = `
      query getProduct($handle: String!) {
        product(handle: $handle) {
          id
          title
          description
          descriptionHtml
          handle
          availableForSale
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
              }
            }
          }
          options {
            id
            name
            values
          }
        }
      }
    `
    
    const response = await fetch(`https://${storeDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ 
        query,
        variables: { handle: productHandle }
      }),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.errors) {
      console.error('❌ Erreurs GraphQL:', data.errors)
      throw new Error(`Produit avec le handle ${productHandle} introuvable`)
    }
    
    if (!data.data.product) {
      throw new Error(`Produit avec le handle ${productHandle} introuvable`)
    }
    
    const product = data.data.product
    
    console.log(`✅ Produit récupéré: ${product.title}`)
    
    const images = product.images.edges.map((edge: any) => ({
      id: edge.node.id || '',
      src: edge.node.url,
      alt: edge.node.altText || product.title,
    }))
    
    const variants = product.variants.edges.map((edge: any) => {
      const variant = edge.node
    return {
        id: variant.id,
        title: variant.title,
        price: variant.price.amount,
        compareAtPrice: variant.compareAtPrice?.amount || undefined,
        available: variant.availableForSale,
        image: variant.image
          ? {
              src: variant.image.url,
              alt: variant.image.altText || product.title,
            }
          : undefined,
      }
    })
    
    const prices = variants.map((v: any) => parseFloat(v.price))
    const minPrice = prices.length > 0 ? Math.min(...prices).toString() : '0'
    
    return {
      id: product.id,
      title: product.title,
      description: product.description || '',
      descriptionHtml: product.descriptionHtml || '',
      handle: product.handle,
      images,
      variants,
      options: product.options?.map((opt: any) => ({
        id: opt.id || '',
        name: opt.name,
        values: opt.values,
      })) || [],
      priceRange: prices.length > 0
        ? {
            minVariantPrice: {
              amount: minPrice,
              currencyCode: 'EUR',
            },
          }
        : undefined,
      availableForSale: product.availableForSale,
    }
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération du produit ${productHandle}:`, error)
    throw new Error(`Impossible de récupérer le produit ${productHandle}`)
  }
}

/**
 * Récupère un produit par son ID (pour compatibilité)
 * @param productId - ID du produit
 * @returns Promise<Product> Le produit
 */
export async function getProductById(productId: string): Promise<Product> {
  // Si c'est un handle (pas de gid://), utiliser directement
  if (!productId.includes('gid://')) {
    return getProductByHandle(productId)
  }
  
  // Sinon, récupérer tous les produits et trouver celui avec l'ID correspondant
  const products = await getAllProducts()
  const product = products.find(p => p.id === productId || p.handle === productId)
  
  if (!product) {
    throw new Error(`Produit avec l'ID ${productId} introuvable`)
  }
  
  return product
}

/**
 * Crée un nouveau checkout Shopify via GraphQL
 * @returns Promise<Cart> Le checkout créé
 */
export async function createCheckout(): Promise<Cart> {
  try {
    console.log('🛒 Création d\'un nouveau checkout...')
    
    const mutation = `
      mutation {
        cartCreate {
          cart {
            id
            checkoutUrl
            lines(first: 250) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `
    
    const response = await fetch(`https://${storeDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query: mutation }),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erreur HTTP:', response.status, errorText)
      throw new Error(`Erreur HTTP ${response.status}: ${errorText}`)
    }
    
    const data = await response.json()
    
    if (data.errors) {
      console.error('❌ Erreurs GraphQL:', data.errors)
      throw new Error('Impossible de créer le checkout')
    }
    
    if (data.data.cartCreate.userErrors && data.data.cartCreate.userErrors.length > 0) {
      console.error('❌ Erreurs cart:', data.data.cartCreate.userErrors)
      throw new Error(data.data.cartCreate.userErrors[0].message || 'Impossible de créer le panier')
    }
    
    if (!data.data.cartCreate.cart) {
      throw new Error('Panier non créé')
    }
    
    const cart = data.data.cartCreate.cart
    
    console.log(`✅ Panier créé: ${cart.id}`)
    
    return {
      id: cart.id,
      webUrl: cart.checkoutUrl,
      lineItems: cart.lines.edges.map((edge: any) => {
        const variant = edge.node.merchandise
        return {
          id: edge.node.id,
          variantId: variant.id,
          title: variant.product.title,
          variantTitle: variant.title,
          quantity: edge.node.quantity,
          price: variant.price.amount,
          image: variant.image
            ? {
                src: variant.image.url,
                alt: variant.image.altText || variant.product.title,
              }
            : undefined,
        }
      }),
      subtotalPrice: cart.cost.subtotalAmount.amount,
      totalPrice: cart.cost.totalAmount.amount,
      currencyCode: cart.cost.totalAmount.currencyCode,
    }
  } catch (error) {
    console.error('❌ Erreur lors de la création du checkout:', error)
    throw new Error('Impossible de créer le checkout')
  }
}

/**
 * Ajoute un produit au checkout
 * @param checkoutId - ID du checkout
 * @param variantId - ID de la variante à ajouter
 * @param quantity - Quantité
 * @returns Promise<Cart> Le checkout mis à jour
 */
export async function addItemToCheckout(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<Cart> {
  try {
    console.log(`🛒 Ajout de ${quantity} x variant ${variantId} au panier ${cartId}...`)
    
    const mutation = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            lines(first: 250) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `
    
    const response = await fetch(`https://${storeDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          cartId,
          lines: [{ merchandiseId: variantId, quantity }],
        },
      }),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erreur HTTP:', response.status, errorText)
      throw new Error(`Erreur HTTP ${response.status}: ${errorText}`)
    }
    
    const data = await response.json()
    
    if (data.errors) {
      console.error('❌ Erreurs GraphQL:', data.errors)
      throw new Error('Impossible d\'ajouter le produit au panier')
    }
    
    if (data.data.cartLinesAdd.userErrors && data.data.cartLinesAdd.userErrors.length > 0) {
      console.error('❌ Erreurs cart:', data.data.cartLinesAdd.userErrors)
      throw new Error(data.data.cartLinesAdd.userErrors[0].message || 'Impossible d\'ajouter le produit au panier')
    }
    
    if (!data.data.cartLinesAdd.cart) {
      throw new Error('Panier non trouvé')
    }
    
    const cart = data.data.cartLinesAdd.cart
    
    console.log(`✅ Produit ajouté au panier`)
    
    return {
      id: cart.id,
      webUrl: cart.checkoutUrl,
      lineItems: cart.lines.edges.map((edge: any) => {
        const variant = edge.node.merchandise
        return {
          id: edge.node.id,
          variantId: variant.id,
          title: variant.product.title,
          variantTitle: variant.title,
          quantity: edge.node.quantity,
          price: variant.price.amount,
          image: variant.image
            ? {
                src: variant.image.url,
                alt: variant.image.altText || variant.product.title,
            }
          : undefined,
        }
      }),
      subtotalPrice: cart.cost.subtotalAmount.amount,
      totalPrice: cart.cost.totalAmount.amount,
      currencyCode: cart.cost.totalAmount.currencyCode,
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout au panier:', error)
    throw new Error('Impossible d\'ajouter le produit au panier')
  }
}

/**
 * Met à jour la quantité d'un item dans le panier
 * @param cartId - ID du panier
 * @param lineItemId - ID de la ligne à mettre à jour
 * @param quantity - Nouvelle quantité
 * @returns Promise<Cart> Le panier mis à jour
 */
export async function updateCheckoutLineItem(
  cartId: string,
  lineItemId: string,
  quantity: number
): Promise<Cart> {
  try {
    console.log(`🛒 Mise à jour de la ligne ${lineItemId} avec quantité ${quantity}...`)
    
    const mutation = `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            lines(first: 250) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `
    
    const response = await fetch(`https://${storeDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          cartId,
          lines: [{ id: lineItemId, quantity }],
        },
      }),
    })
    
    const data = await response.json()
    
    if (data.errors) {
      console.error('❌ Erreurs GraphQL:', data.errors)
      throw new Error('Impossible de mettre à jour le panier')
    }
    
    if (data.data.cartLinesUpdate.userErrors && data.data.cartLinesUpdate.userErrors.length > 0) {
      console.error('❌ Erreurs cart:', data.data.cartLinesUpdate.userErrors)
      throw new Error(data.data.cartLinesUpdate.userErrors[0].message || 'Impossible de mettre à jour le panier')
    }
    
    if (!data.data.cartLinesUpdate.cart) {
      throw new Error('Panier non trouvé')
    }
    
    const cart = data.data.cartLinesUpdate.cart
    
    console.log(`✅ Ligne mise à jour`)
    
    return {
      id: cart.id,
      webUrl: cart.checkoutUrl,
      lineItems: cart.lines.edges.map((edge: any) => {
        const variant = edge.node.merchandise
        return {
          id: edge.node.id,
          variantId: variant.id,
          title: variant.product.title,
          variantTitle: variant.title,
          quantity: edge.node.quantity,
          price: variant.price.amount,
          image: variant.image
            ? {
                src: variant.image.url,
                alt: variant.image.altText || variant.product.title,
            }
          : undefined,
        }
      }),
      subtotalPrice: cart.cost.subtotalAmount.amount,
      totalPrice: cart.cost.totalAmount.amount,
      currencyCode: cart.cost.totalAmount.currencyCode,
    }
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour du panier:', error)
    throw new Error('Impossible de mettre à jour le panier')
  }
}

/**
 * Supprime un item du panier
 * @param cartId - ID du panier
 * @param lineItemId - ID de la ligne à supprimer
 * @returns Promise<Cart> Le panier mis à jour
 */
export async function removeCheckoutLineItem(
  cartId: string,
  lineItemId: string
): Promise<Cart> {
  try {
    console.log(`🛒 Suppression de la ligne ${lineItemId}...`)
    
    const mutation = `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            checkoutUrl
            lines(first: 250) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `
    
    const response = await fetch(`https://${storeDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          cartId,
          lineIds: [lineItemId],
        },
      }),
    })
    
    const data = await response.json()
    
    if (data.errors) {
      console.error('❌ Erreurs GraphQL:', data.errors)
      throw new Error('Impossible de supprimer l\'item du panier')
    }
    
    if (data.data.cartLinesRemove.userErrors && data.data.cartLinesRemove.userErrors.length > 0) {
      console.error('❌ Erreurs cart:', data.data.cartLinesRemove.userErrors)
      throw new Error(data.data.cartLinesRemove.userErrors[0].message || 'Impossible de supprimer l\'item du panier')
    }
    
    if (!data.data.cartLinesRemove.cart) {
      throw new Error('Panier non trouvé')
    }
    
    const cart = data.data.cartLinesRemove.cart
    
    console.log(`✅ Ligne supprimée`)
    
    return {
      id: cart.id,
      webUrl: cart.checkoutUrl,
      lineItems: cart.lines.edges.map((edge: any) => {
        const variant = edge.node.merchandise
        return {
          id: edge.node.id,
          variantId: variant.id,
          title: variant.product.title,
          variantTitle: variant.title,
          quantity: edge.node.quantity,
          price: variant.price.amount,
          image: variant.image
            ? {
                src: variant.image.url,
                alt: variant.image.altText || variant.product.title,
            }
          : undefined,
        }
      }),
      subtotalPrice: cart.cost.subtotalAmount.amount,
      totalPrice: cart.cost.totalAmount.amount,
      currencyCode: cart.cost.totalAmount.currencyCode,
    }
  } catch (error) {
    console.error('❌ Erreur lors de la suppression du panier:', error)
    throw new Error('Impossible de supprimer l\'item du panier')
  }
}

/**
 * Récupère un panier existant par son ID
 * @param cartId - ID du panier
 * @returns Promise<Cart> Le panier
 */
export async function getCheckout(cartId: string): Promise<Cart> {
  try {
    console.log(`🛒 Récupération du panier ${cartId}...`)
    
    const query = `
      query getCart($id: ID!) {
        cart(id: $id) {
          id
          checkoutUrl
          lines(first: 250) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                    price {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    `
    
    const response = await fetch(`https://${storeDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({
        query,
        variables: { id: cartId },
      }),
    })
    
    const data = await response.json()
    
    if (data.errors || !data.data.cart) {
      console.error('❌ Erreurs GraphQL:', data.errors)
      throw new Error(`Panier avec l'ID ${cartId} introuvable`)
    }
    
    const cart = data.data.cart
    
    return {
      id: cart.id,
      webUrl: cart.checkoutUrl,
      lineItems: cart.lines.edges.map((edge: any) => {
        const variant = edge.node.merchandise
        return {
          id: edge.node.id,
          variantId: variant.id,
          title: variant.product.title,
          variantTitle: variant.title,
          quantity: edge.node.quantity,
          price: variant.price.amount,
          image: variant.image
            ? {
                src: variant.image.url,
                alt: variant.image.altText || variant.product.title,
              }
            : undefined,
        }
      }),
      subtotalPrice: cart.cost.subtotalAmount.amount,
      totalPrice: cart.cost.totalAmount.amount,
      currencyCode: cart.cost.totalAmount.currencyCode,
    }
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération du panier ${cartId}:`, error)
    throw new Error(`Impossible de récupérer le panier ${cartId}`)
  }
}

