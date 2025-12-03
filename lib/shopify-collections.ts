/**
 * Client Shopify Collections API
 * Gestion des collections Shopify
 */

const adminStoreDomain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
import { enrichCollectionsWithCounts } from './shopify-collections-admin'

export interface Collection {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  image?: {
    src: string
    alt: string
  }
  productsCount: number
}

/**
 * Récupère le nombre réel de produits dans une collection
 */
async function getCollectionProductsCount(handle: string): Promise<number> {
  try {
    const products = await getCollectionProducts(handle, 1)
    // Faire une requête pour compter tous les produits
    const countQuery = `
      query getCollectionProductsCount($handle: String!) {
        collection(handle: $handle) {
          products(first: 250) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `
    
    const response = await fetch(`https://${adminStoreDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken || '',
      },
      body: JSON.stringify({
        query: countQuery,
        variables: { handle },
      }),
    })

    const data = await response.json()
    return data.data.collection?.products.edges.length || 0
  } catch (error) {
    console.error('Erreur lors du comptage:', error)
    return 0
  }
}

/**
 * Récupère toutes les collections depuis Shopify
 */
export async function getAllCollections(): Promise<Collection[]> {
  if (!adminStoreDomain || !storefrontAccessToken) {
    throw new Error('Variables d\'environnement Shopify manquantes')
  }

  try {
    const query = `
      query getAllCollections {
        collections(first: 250) {
          edges {
            node {
              id
              title
              handle
              description
              descriptionHtml
              image {
                url
                altText
              }
              products(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch(`https://${adminStoreDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken || '',
      },
      body: JSON.stringify({ query }),
    })

    const data = await response.json()

    if (data.errors) {
      console.error('❌ Erreurs GraphQL:', data.errors)
      throw new Error('Impossible de récupérer les collections')
    }

    const collections = await Promise.all(
      data.data.collections.edges.map(async (edge: any) => {
        const collection = edge.node
        
        // Récupérer le vrai nombre de produits
        let productsCount = 0
        try {
          const countQuery = `
            query getCollectionProductsCount($handle: String!) {
              collection(handle: $handle) {
                products(first: 250) {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            }
          `
          
          const countResponse = await fetch(`https://${adminStoreDomain}/api/2023-10/graphql.json`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': storefrontAccessToken || '',
            },
            body: JSON.stringify({
              query: countQuery,
              variables: { handle: collection.handle },
            }),
          })
          
          const countData = await countResponse.json()
          if (countData.data?.collection?.products) {
            productsCount = countData.data.collection.products.edges.length
          }
        } catch (error) {
          console.log(`⚠️ Impossible de compter les produits pour ${collection.handle}`)
        }

        return {
          id: collection.id,
          title: collection.title,
          handle: collection.handle,
          description: collection.description,
          descriptionHtml: collection.descriptionHtml,
          image: collection.image ? {
            src: collection.image.url,
            alt: collection.image.altText || collection.title,
          } : undefined,
          productsCount: productsCount,
        }
      })
    )

    // Enrichir avec les counts depuis Admin API si disponible (pour plus de précision)
    try {
      return await enrichCollectionsWithCounts(collections) as Collection[]
    } catch (error) {
      // Si Admin API n'est pas disponible, retourner les collections avec counts Storefront
      return collections
    }
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des collections:', error)
    throw error
  }
}

/**
 * Récupère une collection par son handle
 */
export async function getCollectionByHandle(handle: string): Promise<Collection> {
  if (!adminStoreDomain || !storefrontAccessToken) {
    throw new Error('Variables d\'environnement Shopify manquantes')
  }

  try {
    const query = `
      query getCollectionByHandle($handle: String!) {
        collection(handle: $handle) {
          id
          title
          handle
          description
          descriptionHtml
          image {
            url
            altText
          }
          products(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `

    const response = await fetch(`https://${adminStoreDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken || '',
      },
      body: JSON.stringify({
        query,
        variables: { handle },
      }),
    })

    const data = await response.json()

    if (data.errors) {
      console.error('❌ Erreurs GraphQL:', data.errors)
      throw new Error('Collection introuvable')
    }

    if (!data.data.collection) {
      throw new Error('Collection introuvable')
    }

    const collection = data.data.collection
    // Récupérer le nombre de produits
    const productsCount = collection.products?.edges?.length || 0
    
    return {
      id: collection.id,
      title: collection.title,
      handle: collection.handle,
      description: collection.description,
      descriptionHtml: collection.descriptionHtml,
      image: collection.image ? {
        src: collection.image.url,
        alt: collection.image.altText || collection.title,
      } : undefined,
      productsCount: productsCount,
    }
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de la collection:', error)
    throw error
  }
}

/**
 * Récupère les produits d'une collection
 */
export async function getCollectionProducts(collectionHandle: string, first: number = 250) {
  if (!adminStoreDomain || !storefrontAccessToken) {
    throw new Error('Variables d\'environnement Shopify manquantes')
  }

  try {
    const query = `
      query getCollectionProducts($handle: String!, $first: Int!) {
        collection(handle: $handle) {
          products(first: $first) {
            edges {
              node {
                id
                title
                handle
                description
                descriptionHtml
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
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      availableForSale
                    }
                  }
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch(`https://${adminStoreDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken || '',
      },
      body: JSON.stringify({
        query,
        variables: { handle: collectionHandle, first },
      }),
    })

    const data = await response.json()

    if (data.errors) {
      console.error('❌ Erreurs GraphQL:', data.errors)
      throw new Error('Impossible de récupérer les produits de la collection')
    }

    return data.data.collection?.products.edges.map((edge: any) => {
      const product = edge.node
      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        description: product.description,
        descriptionHtml: product.descriptionHtml,
        availableForSale: product.availableForSale,
        images: product.images.edges.map((img: any) => ({
          id: img.node.id,
          src: img.node.url,
          alt: img.node.altText || product.title,
        })),
        variants: product.variants.edges.map((variant: any) => ({
          id: variant.node.id,
          title: variant.node.title,
          price: variant.node.price.amount,
          compareAtPrice: variant.node.compareAtPrice?.amount,
          available: variant.node.availableForSale,
        })),
      }
    }) || []
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des produits de la collection:', error)
    throw error
  }
}

