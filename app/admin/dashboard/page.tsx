import { getShopAnalytics } from '@/lib/shopify-analytics'
import { getAllOrders, getOrdersStats } from '@/lib/shopify-orders'
import { getAllCollections } from '@/lib/shopify-collections'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  let analytics = null
  let ordersStats = null
  let recentOrders: any[] = []
  let collections: any[] = []
  let error: string | null = null

  try {
    // Récupérer les analytics
    try {
      analytics = await getShopAnalytics()
    } catch (e) {
      console.log('Analytics non disponibles:', e)
    }

    // Récupérer les stats des commandes
    try {
      ordersStats = await getOrdersStats()
    } catch (e) {
      console.log('Stats commandes non disponibles:', e)
    }

    // Récupérer les commandes récentes
    try {
      recentOrders = await getAllOrders(10)
    } catch (e) {
      console.log('Commandes non disponibles:', e)
    }

    // Récupérer les collections
    try {
      collections = await getAllCollections()
    } catch (e) {
      console.log('Collections non disponibles:', e)
    }
  } catch (err) {
    console.error('Erreur:', err)
    error = 'Impossible de charger les données'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Dashboard Admin
          </h1>
          <p className="text-xl text-gray-600">
            Vue d'ensemble de votre boutique Shopify
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-8">
            <p>{error}</p>
          </div>
        )}

        {/* Statistiques principales */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Total Ventes</div>
              <div className="text-3xl font-extrabold text-gray-900">
                {analytics.totalSales.toFixed(2)} €
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Total Commandes</div>
              <div className="text-3xl font-extrabold text-gray-900">
                {analytics.totalOrders}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Panier Moyen</div>
              <div className="text-3xl font-extrabold text-gray-900">
                {analytics.averageOrderValue.toFixed(2)} €
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Collections</div>
              <div className="text-3xl font-extrabold text-gray-900">
                {collections.length}
              </div>
            </div>
          </div>
        )}

        {/* Top Produits */}
        {analytics && analytics.topProducts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              Top Produits
            </h2>
            <div className="space-y-4">
              {analytics.topProducts.slice(0, 5).map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{product.title}</div>
                      <div className="text-sm text-gray-600">
                        {product.quantity} vendu{product.quantity > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{product.revenue.toFixed(2)} €</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commandes Récentes */}
        {recentOrders.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              Commandes Récentes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Commande</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Client</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Statut</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-900">{order.name}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-gray-900">{order.email}</div>
                        {order.customer && (
                          <div className="text-sm text-gray-600">
                            {order.customer.firstName} {order.customer.lastName}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.financialStatus === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.financialStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="font-bold text-gray-900">
                          {order.totalPrice} {order.currency}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Collections */}
        {collections.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    {collection.productsCount} produit{collection.productsCount > 1 ? 's' : ''}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Message si aucune donnée */}
        {!analytics && !recentOrders.length && !collections.length && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Aucune donnée disponible. Vérifiez votre configuration Admin API.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

