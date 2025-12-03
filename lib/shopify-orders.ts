/**
 * Client Shopify Orders API (Admin API)
 * Gestion des commandes Shopify
 */

const adminStoreDomain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const adminAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN

export interface Order {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  financialStatus: string
  fulfillmentStatus: string
  totalPrice: string
  subtotalPrice: string
  totalTax: string
  currency: string
  lineItems: Array<{
    id: string
    title: string
    quantity: number
    price: string
    variantId?: string
  }>
  shippingAddress?: {
    address1: string
    address2?: string
    city: string
    province: string
    zip: string
    country: string
  }
  customer?: {
    id: string
    email: string
    firstName?: string
    lastName?: string
  }
}

/**
 * Récupère toutes les commandes depuis Shopify
 */
export async function getAllOrders(limit: number = 50): Promise<Order[]> {
  if (!adminAccessToken || !adminStoreDomain) {
    throw new Error('Admin API non configurée')
  }

  try {
    const response = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/orders.json?limit=${limit}&status=any`,
      {
        headers: {
          'X-Shopify-Access-Token': adminAccessToken,
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Erreur lors de la récupération des commandes: ${errorText}`)
    }

    const data = await response.json()
    return (data.orders || []).map((order: any) => ({
      id: order.id.toString(),
      name: order.name,
      email: order.email,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      financialStatus: order.financial_status,
      fulfillmentStatus: order.fulfillment_status || 'unfulfilled',
      totalPrice: order.total_price,
      subtotalPrice: order.subtotal_price,
      totalTax: order.total_tax,
      currency: order.currency,
      lineItems: order.line_items.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        variantId: item.variant_id?.toString(),
      })),
      shippingAddress: order.shipping_address ? {
        address1: order.shipping_address.address1,
        address2: order.shipping_address.address2,
        city: order.shipping_address.city,
        province: order.shipping_address.province,
        zip: order.shipping_address.zip,
        country: order.shipping_address.country,
      } : undefined,
      customer: order.customer ? {
        id: order.customer.id.toString(),
        email: order.customer.email,
        firstName: order.customer.first_name,
        lastName: order.customer.last_name,
      } : undefined,
    }))
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des commandes:', error)
    throw error
  }
}

/**
 * Récupère une commande par son ID
 */
export async function getOrderById(orderId: string): Promise<Order> {
  if (!adminAccessToken || !adminStoreDomain) {
    throw new Error('Admin API non configurée')
  }

  try {
    const response = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/orders/${orderId}.json`,
      {
        headers: {
          'X-Shopify-Access-Token': adminAccessToken,
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Erreur lors de la récupération de la commande: ${errorText}`)
    }

    const data = await response.json()
    const order = data.order

    return {
      id: order.id.toString(),
      name: order.name,
      email: order.email,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      financialStatus: order.financial_status,
      fulfillmentStatus: order.fulfillment_status || 'unfulfilled',
      totalPrice: order.total_price,
      subtotalPrice: order.subtotal_price,
      totalTax: order.total_tax,
      currency: order.currency,
      lineItems: order.line_items.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        variantId: item.variant_id?.toString(),
      })),
      shippingAddress: order.shipping_address ? {
        address1: order.shipping_address.address1,
        address2: order.shipping_address.address2,
        city: order.shipping_address.city,
        province: order.shipping_address.province,
        zip: order.shipping_address.zip,
        country: order.shipping_address.country,
      } : undefined,
      customer: order.customer ? {
        id: order.customer.id.toString(),
        email: order.customer.email,
        firstName: order.customer.first_name,
        lastName: order.customer.last_name,
      } : undefined,
    }
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de la commande:', error)
    throw error
  }
}

/**
 * Récupère les statistiques des commandes
 */
export async function getOrdersStats() {
  if (!adminAccessToken || !adminStoreDomain) {
    throw new Error('Admin API non configurée')
  }

  try {
    const orders = await getAllOrders(250)
    
    const stats = {
      total: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + parseFloat(order.totalPrice), 0),
      averageOrderValue: 0,
      byStatus: {} as Record<string, number>,
      byFinancialStatus: {} as Record<string, number>,
    }

    orders.forEach(order => {
      stats.byStatus[order.fulfillmentStatus] = (stats.byStatus[order.fulfillmentStatus] || 0) + 1
      stats.byFinancialStatus[order.financialStatus] = (stats.byFinancialStatus[order.financialStatus] || 0) + 1
    })

    stats.averageOrderValue = stats.total > 0 ? stats.totalRevenue / stats.total : 0

    return stats
  } catch (error) {
    console.error('❌ Erreur lors du calcul des statistiques:', error)
    throw error
  }
}

