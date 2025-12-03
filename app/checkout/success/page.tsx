'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const checkoutId = searchParams.get('checkout_id')
  const sessionId = searchParams.get('session_id') // Stripe Checkout Session ID
  const paymentIntent = searchParams.get('payment_intent') // Stripe Payment Intent ID
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [shopifyOrderCreated, setShopifyOrderCreated] = useState(false)

  useEffect(() => {
    // Gérer les différents types de retours de paiement
    // Shopify : ?order_id=xxx ou ?checkout_id=xxx
    // Stripe Checkout : ?session_id=xxx
    // Stripe Payment Intent : ?payment_intent=xxx
    
    if (sessionId) {
      // Stripe Checkout Session
      setOrderNumber(`#${sessionId.slice(-12)}`)
      setPaymentMethod('Stripe Checkout')
      createShopifyOrderFromStripeSession(sessionId)
    } else if (paymentIntent) {
      // Stripe Payment Intent (ancien système)
      setOrderNumber(`#${paymentIntent.slice(-12)}`)
      setPaymentMethod('Stripe')
    } else if (orderId) {
      // Shopify Order
      setOrderNumber(`#${orderId}`)
      setPaymentMethod('Shopify')
      fetchOrderDetails(orderId)
    } else if (checkoutId) {
      // Shopify Checkout
      setOrderNumber(`#${checkoutId.slice(-8)}`)
      setPaymentMethod('Shopify')
    } else {
      // Générer un numéro de commande fictif pour la démo
      setOrderNumber(`#${Date.now().toString().slice(-8)}`)
    }

    // Tracker la conversion (analytics)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: sessionId || paymentIntent || orderId || checkoutId,
      })
    }
  }, [orderId, checkoutId, sessionId, paymentIntent])

  const createShopifyOrderFromStripeSession = async (sessionId: string) => {
    // Éviter de créer plusieurs fois la commande
    if (shopifyOrderCreated) {
      return
    }

    try {
      console.log('📦 Création de la commande Shopify depuis la session Stripe...')
      
      // Récupérer les données du panier depuis localStorage
      const cartStorageKey = 'shopify_cart_id'
      const savedCartId = localStorage.getItem(cartStorageKey)
      
      if (!savedCartId) {
        console.warn('⚠️ Aucun panier trouvé dans localStorage')
        return
      }

      // Récupérer le panier depuis l'API Shopify
      const cartResponse = await fetch(`/api/shopify/cart?cartId=${savedCartId}`)
      if (!cartResponse.ok) {
        console.warn('⚠️ Impossible de récupérer le panier')
        return
      }

      const cartData = await cartResponse.json()
      const cart = cartData.cart

      if (!cart || !cart.lineItems || cart.lineItems.length === 0) {
        console.warn('⚠️ Panier vide')
        return
      }

      // Calculer le total
      const total = cart.lineItems.reduce((sum: number, item: any) => {
        return sum + parseFloat(item.price) * item.quantity
      }, 0)

      // Préparer les line items
      const lineItems = cart.lineItems.map((item: any) => ({
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price,
      }))

      console.log(`📦 Création de la commande avec ${lineItems.length} articles, total: ${total.toFixed(2)} €`)

      // Créer la commande Shopify
      const createOrderResponse = await fetch('/api/shopify/create-order-from-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          lineItems,
          totalAmount: total.toFixed(2),
          currency: 'EUR',
        }),
      })

      if (createOrderResponse.ok) {
        const orderData = await createOrderResponse.json()
        console.log('✅ Commande Shopify créée:', orderData.order.name)
        setOrderNumber(`#${orderData.order.name}`)
        setShopifyOrderCreated(true)
        
        // Vider le panier après création de la commande
        localStorage.removeItem(cartStorageKey)
        localStorage.removeItem('shopify_draft_order_id')
      } else {
        const errorData = await createOrderResponse.json()
        console.error('❌ Erreur lors de la création de la commande Shopify:', errorData)
      }
    } catch (error: any) {
      console.error('❌ Erreur lors de la création de la commande Shopify:', error)
    }
  }

  const fetchOrderDetails = async (id: string) => {
    // Cette fonction pourrait récupérer les détails depuis Shopify Admin API
    // Pour l'instant, on simule
    try {
      // TODO: Implémenter la récupération depuis Shopify Admin API
      console.log('Récupération des détails de la commande:', id)
    } catch (error) {
      console.error('Erreur lors de la récupération:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Confirmation', href: '/checkout/success' }
        ]} />

        <div className="text-center py-12">
          {/* Icône de succès */}
          <div className="mb-8 animate-float">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Commande Confirmée !
          </h1>
          
          {orderNumber && (
            <p className="text-xl text-gray-600 mb-8">
              Votre commande <span className="font-bold text-gray-900">{orderNumber}</span> a été enregistrée avec succès.
              {paymentMethod && (
                <span className="block text-sm text-gray-500 mt-2">
                  Paiement effectué via {paymentMethod}
                </span>
              )}
            </p>
          )}

          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Merci pour votre achat ! Vous recevrez un email de confirmation dans quelques instants avec tous les détails de votre commande.
          </p>

          {/* Informations importantes */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 text-left rounded-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Suivi de votre commande</h3>
                <p className="text-blue-800 text-sm">
                  Vous pouvez suivre votre commande dans votre compte Shopify ou consulter votre email pour le numéro de suivi.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Continuer les achats
            </Link>
            
            <Link
              href="/"
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-900 transition-all duration-300 hover:scale-105"
            >
              Retour à l'accueil
            </Link>
          </div>

          {/* Prochaines étapes */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-left">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              Prochaines étapes
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold mr-4">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email de confirmation</h3>
                  <p className="text-gray-600">Vous recevrez un email avec le récapitulatif de votre commande.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold mr-4">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Traitement de la commande</h3>
                  <p className="text-gray-600">Nous préparons votre commande et vous tiendrons informé de son statut.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold mr-4">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Expédition</h3>
                  <p className="text-gray-600">Vous recevrez un email avec le numéro de suivi dès l'expédition.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
