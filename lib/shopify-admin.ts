/**
 * Client Shopify Admin API
 * Pour créer des Draft Orders visibles dans Shopify Admin
 * 
 * IMPORTANT: Ces fonctions appellent les API routes Next.js qui s'exécutent côté serveur
 * où les variables d'environnement sont accessibles
 */

/**
 * Crée une Draft Order (Commande Brouillon) dans Shopify
 * Visible dans Shopify Admin → Commandes → Brouillons
 */
export async function createDraftOrder(lineItems: Array<{
  variantId: string
  quantity: number
  title?: string
  price?: string
}>) {
  try {
    console.log('📝 Création d\'une Draft Order dans Shopify...')
    
    const response = await fetch('/api/draft-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lineItems }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ Erreur lors de la création de la Draft Order:', errorData.error)
      return null
    }

    const data = await response.json()
    console.log(`✅ Draft Order créée: ${data.draftOrder.id}`)
    console.log(`   Visible dans: Shopify Admin → Commandes → Brouillons`)
    
    return data.draftOrder
  } catch (error) {
    console.error('❌ Erreur lors de la création de la Draft Order:', error)
    return null
  }
}

/**
 * Met à jour une Draft Order existante
 */
export async function updateDraftOrder(
  draftOrderId: string,
  lineItems: Array<{
    variantId: string
    quantity: number
  }>
) {
  try {
    console.log(`📝 Mise à jour de la Draft Order ${draftOrderId}...`)
    console.log(`   Articles à mettre à jour: ${lineItems.length}`)
    
    const response = await fetch('/api/draft-order', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ draftOrderId, lineItems }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error(`❌ Erreur lors de la mise à jour de la Draft Order:`, errorData.error)
      return null
    }

    const data = await response.json()
    console.log(`✅ Draft Order mise à jour: ${data.draftOrder.id}`)
    console.log(`   Nombre d'articles: ${data.draftOrder.line_items?.length || 'N/A'}`)
    console.log(`   Total: ${data.draftOrder.total_price} ${data.draftOrder.currency}`)
    
    return data.draftOrder
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour de la Draft Order:', error)
    return null
  }
}

