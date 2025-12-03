/**
 * Client Shopify Customers API (Admin API)
 * Gestion des clients Shopify
 */

const adminStoreDomain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const adminAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN

export interface Customer {
  id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  acceptsMarketing: boolean
  createdAt: string
  updatedAt: string
  ordersCount: number
  totalSpent: string
  tags: string[]
}

/**
 * Crée un nouveau client dans Shopify
 */
export async function createCustomer(customerData: {
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  acceptsMarketing?: boolean
  tags?: string[]
}) {
  if (!adminAccessToken || !adminStoreDomain) {
    throw new Error('Admin API non configurée')
  }

  try {
    const response = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/customers.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': adminAccessToken,
        },
        body: JSON.stringify({
          customer: customerData,
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Erreur lors de la création du client: ${errorText}`)
    }

    const data = await response.json()
    return data.customer
  } catch (error) {
    console.error('❌ Erreur lors de la création du client:', error)
    throw error
  }
}

/**
 * Récupère un client par son email
 */
export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  if (!adminAccessToken || !adminStoreDomain) {
    throw new Error('Admin API non configurée')
  }

  try {
    const response = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/customers/search.json?query=email:${encodeURIComponent(email)}`,
      {
        headers: {
          'X-Shopify-Access-Token': adminAccessToken,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la recherche du client')
    }

    const data = await response.json()
    if (data.customers && data.customers.length > 0) {
      const customer = data.customers[0]
      return {
        id: customer.id.toString(),
        email: customer.email,
        firstName: customer.first_name,
        lastName: customer.last_name,
        phone: customer.phone,
        acceptsMarketing: customer.accepts_marketing,
        createdAt: customer.created_at,
        updatedAt: customer.updated_at,
        ordersCount: customer.orders_count || 0,
        totalSpent: customer.total_spent || '0.00',
        tags: customer.tags ? customer.tags.split(',') : [],
      }
    }

    return null
  } catch (error) {
    console.error('❌ Erreur lors de la récupération du client:', error)
    throw error
  }
}

/**
 * Met à jour un client
 */
export async function updateCustomer(customerId: string, updates: {
  firstName?: string
  lastName?: string
  phone?: string
  acceptsMarketing?: boolean
  tags?: string[]
}) {
  if (!adminAccessToken || !adminStoreDomain) {
    throw new Error('Admin API non configurée')
  }

  try {
    const response = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/customers/${customerId}.json`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': adminAccessToken,
        },
        body: JSON.stringify({
          customer: updates,
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Erreur lors de la mise à jour du client: ${errorText}`)
    }

    const data = await response.json()
    return data.customer
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour du client:', error)
    throw error
  }
}

/**
 * Récupère toutes les commandes d'un client
 */
export async function getCustomerOrders(customerId: string) {
  if (!adminAccessToken || !adminStoreDomain) {
    throw new Error('Admin API non configurée')
  }

  try {
    const response = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/customers/${customerId}/orders.json`,
      {
        headers: {
          'X-Shopify-Access-Token': adminAccessToken,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des commandes')
    }

    const data = await response.json()
    return data.orders || []
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des commandes:', error)
    throw error
  }
}

