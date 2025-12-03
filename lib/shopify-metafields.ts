/**
 * Client Shopify Metafields API (Admin API)
 * Gestion des métadonnées personnalisées Shopify
 */

const adminStoreDomain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const adminAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN

export interface Metafield {
  id: string
  namespace: string
  key: string
  value: string
  type: string
  description?: string
}

/**
 * Récupère les metafields d'un produit
 */
export async function getProductMetafields(productId: string): Promise<Metafield[]> {
  if (!adminAccessToken || !adminStoreDomain) {
    throw new Error('Admin API non configurée')
  }

  try {
    // Extraire l'ID numérique du productId GraphQL
    const productIdMatch = productId.match(/\/(\d+)$/)
    const numericProductId = productIdMatch ? productIdMatch[1] : productId

    const response = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/products/${numericProductId}/metafields.json`,
      {
        headers: {
          'X-Shopify-Access-Token': adminAccessToken,
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Erreur lors de la récupération des metafields: ${errorText}`)
    }

    const data = await response.json()
    return (data.metafields || []).map((metafield: any) => ({
      id: metafield.id.toString(),
      namespace: metafield.namespace,
      key: metafield.key,
      value: metafield.value,
      type: metafield.type,
      description: metafield.description,
    }))
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des metafields:', error)
    throw error
  }
}

/**
 * Crée ou met à jour un metafield pour un produit
 */
export async function setProductMetafield(
  productId: string,
  namespace: string,
  key: string,
  value: string,
  type: string = 'single_line_text_field',
  description?: string
) {
  if (!adminAccessToken || !adminStoreDomain) {
    throw new Error('Admin API non configurée')
  }

  try {
    const productIdMatch = productId.match(/\/(\d+)$/)
    const numericProductId = productIdMatch ? productIdMatch[1] : productId

    const response = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/products/${numericProductId}/metafields.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': adminAccessToken,
        },
        body: JSON.stringify({
          metafield: {
            namespace,
            key,
            value,
            type,
            description,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Erreur lors de la création du metafield: ${errorText}`)
    }

    const data = await response.json()
    return data.metafield
  } catch (error) {
    console.error('❌ Erreur lors de la création du metafield:', error)
    throw error
  }
}

