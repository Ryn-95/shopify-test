/**
 * Client Shopify Collections API (Admin API)
 * Pour obtenir le nombre exact de produits dans chaque collection
 */

const adminStoreDomain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const adminAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN

/**
 * Récupère toutes les collections avec le nombre de produits depuis Admin API
 */
export async function getAllCollectionsWithCount() {
  if (!adminAccessToken || !adminStoreDomain) {
    throw new Error('Admin API non configurée')
  }

  try {
    const response = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/smart_collections.json`,
      {
        headers: {
          'X-Shopify-Access-Token': adminAccessToken,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des collections')
    }

    const data = await response.json()
    return (data.smart_collections || []).map((collection: any) => ({
      id: collection.id.toString(),
      title: collection.title,
      handle: collection.handle,
      productsCount: collection.products_count || 0,
    }))
  } catch (error) {
    console.error('❌ Erreur Admin API:', error)
    // Fallback : retourner un tableau vide
    return []
  }
}

/**
 * Combine les collections Storefront avec les counts Admin
 */
export async function enrichCollectionsWithCounts(collections: Array<{ id: string; handle: string; [key: string]: any }>) {
  try {
    const adminCollections = await getAllCollectionsWithCount()
    const countMap = new Map(adminCollections.map((c: any) => [c.handle, c.productsCount]))

    return collections.map(collection => ({
      ...collection,
      productsCount: countMap.get(collection.handle) || 0,
    }))
  } catch (error) {
    console.error('❌ Erreur lors de l\'enrichissement:', error)
    return collections
  }
}

