/**
 * Client Shopify Analytics API (Admin API)
 * Récupération des statistiques et analytics Shopify
 */

const adminStoreDomain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const adminAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN

export interface ShopAnalytics {
  totalSales: number
  totalOrders: number
  averageOrderValue: number
  conversionRate: number
  topProducts: Array<{
    id: string
    title: string
    quantity: number
    revenue: number
  }>
  salesByPeriod: Array<{
    period: string
    sales: number
    orders: number
  }>
}

/**
 * Récupère les analytics de la boutique
 */
export async function getShopAnalytics(startDate?: string, endDate?: string): Promise<ShopAnalytics> {
  if (!adminAccessToken || !adminStoreDomain) {
    throw new Error('Admin API non configurée')
  }

  try {
    // Récupérer les commandes
    const ordersResponse = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/orders.json?limit=250&status=any`,
      {
        headers: {
          'X-Shopify-Access-Token': adminAccessToken,
        },
      }
    )

    if (!ordersResponse.ok) {
      throw new Error('Erreur lors de la récupération des commandes')
    }

    const ordersData = await ordersResponse.json()
    const orders = ordersData.orders || []

    // Filtrer par date si fourni
    let filteredOrders = orders
    if (startDate || endDate) {
      filteredOrders = orders.filter((order: any) => {
        const orderDate = new Date(order.created_at)
        if (startDate && orderDate < new Date(startDate)) return false
        if (endDate && orderDate > new Date(endDate)) return false
        return true
      })
    }

    // Calculer les statistiques
    const totalSales = filteredOrders.reduce((sum: number, order: any) => {
      return sum + parseFloat(order.total_price || '0')
    }, 0)

    const totalOrders = filteredOrders.length
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0

    // Top produits
    const productMap = new Map<string, { title: string; quantity: number; revenue: number }>()
    
    filteredOrders.forEach((order: any) => {
      order.line_items.forEach((item: any) => {
        const productId = item.product_id?.toString() || 'unknown'
        const existing = productMap.get(productId) || { title: item.title, quantity: 0, revenue: 0 }
        existing.quantity += item.quantity
        existing.revenue += parseFloat(item.price) * item.quantity
        productMap.set(productId, existing)
      })
    })

    const topProducts = Array.from(productMap.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)

    // Ventes par période (par jour)
    const salesByPeriodMap = new Map<string, { sales: number; orders: number }>()
    
    filteredOrders.forEach((order: any) => {
      const date = new Date(order.created_at).toISOString().split('T')[0]
      const existing = salesByPeriodMap.get(date) || { sales: 0, orders: 0 }
      existing.sales += parseFloat(order.total_price || '0')
      existing.orders += 1
      salesByPeriodMap.set(date, existing)
    })

    const salesByPeriod = Array.from(salesByPeriodMap.entries())
      .map(([period, data]) => ({ period, ...data }))
      .sort((a, b) => a.period.localeCompare(b.period))

    // Taux de conversion (approximation basée sur les sessions)
    // Note: Le taux de conversion réel nécessite l'API Analytics de Shopify
    const conversionRate = 0 // À implémenter avec l'API Analytics complète

    return {
      totalSales,
      totalOrders,
      averageOrderValue,
      conversionRate,
      topProducts,
      salesByPeriod,
    }
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des analytics:', error)
    throw error
  }
}

/**
 * Récupère les statistiques de produits
 */
export async function getProductAnalytics(productId: string) {
  if (!adminAccessToken || !adminStoreDomain) {
    throw new Error('Admin API non configurée')
  }

  try {
    const ordersResponse = await fetch(
      `https://${adminStoreDomain}/admin/api/2024-01/orders.json?limit=250&status=any`,
      {
        headers: {
          'X-Shopify-Access-Token': adminAccessToken,
        },
      }
    )

    if (!ordersResponse.ok) {
      throw new Error('Erreur lors de la récupération des commandes')
    }

    const ordersData = await ordersResponse.json()
    const orders = ordersData.orders || []

    const productIdMatch = productId.match(/\/(\d+)$/)
    const numericProductId = productIdMatch ? productIdMatch[1] : productId

    let totalQuantity = 0
    let totalRevenue = 0
    let orderCount = 0

    orders.forEach((order: any) => {
      order.line_items.forEach((item: any) => {
        if (item.product_id?.toString() === numericProductId) {
          totalQuantity += item.quantity
          totalRevenue += parseFloat(item.price) * item.quantity
          orderCount += 1
        }
      })
    })

    return {
      productId: numericProductId,
      totalQuantity,
      totalRevenue,
      orderCount,
      averageQuantityPerOrder: orderCount > 0 ? totalQuantity / orderCount : 0,
    }
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des analytics produit:', error)
    throw error
  }
}

