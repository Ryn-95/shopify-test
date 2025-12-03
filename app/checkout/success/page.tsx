'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useCart } from '@/context/CartContext'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const checkoutId = searchParams.get('checkout_id')
  const sessionId = searchParams.get('session_id')
  const paymentIntent = searchParams.get('payment_intent')
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [isOrderCreating, setIsOrderCreating] = useState(false)
  const [shopifyOrderCreated, setShopifyOrderCreated] = useState(false)
  const { cart, clearCart } = useCart()

  const createShopifyOrderFromStripeSession = useCallback(async (stripeSessionId: string) => {
    if (isOrderCreating || shopifyOrderCreated) return

    setIsOrderCreating(true)
    try {
      console.log('Attempting to create Shopify order from Stripe session:', stripeSessionId)

      if (!cart || cart.lineItems.length === 0) {
        console.warn('Cart is empty, cannot create Shopify order.')
        return
      }

      const sessionResponse = await fetch(`/api/stripe/get-session-details?sessionId=${stripeSessionId}`)
      if (!sessionResponse.ok) {
        const errorData = await sessionResponse.json()
        throw new Error(errorData.error || 'Failed to fetch Stripe session details.')
      }
      const sessionDetails = await sessionResponse.json()
      const { line_items, customer_details, amount_total, currency } = sessionDetails.session

      const formattedLineItems = line_items.data.map((item: any) => ({
        variantId: item.price.product_data.metadata.variant_id,
        quantity: item.quantity,
        price: (item.amount_total / 100).toFixed(2),
      }))

      const createOrderResponse = await fetch('/api/shopify/create-order-from-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lineItems: formattedLineItems,
          customerEmail: customer_details?.email,
          customerName: customer_details?.name,
          totalAmount: (amount_total / 100).toFixed(2),
          currency: currency,
          stripeSessionId: stripeSessionId,
        }),
      })

      if (!createOrderResponse.ok) {
        const errorData = await createOrderResponse.json()
        throw new Error(errorData.error || 'Failed to create Shopify order.')
      }

      const orderData = await createOrderResponse.json()
      console.log('Shopify order created successfully:', orderData.order)
      setShopifyOrderCreated(true)
      clearCart()
    } catch (error) {
      console.error('Error creating Shopify order from Stripe session:', error)
    } finally {
      setIsOrderCreating(false)
    }
  }, [isOrderCreating, shopifyOrderCreated, cart, clearCart])

  useEffect(() => {
    if (sessionId) {
      setOrderNumber(`#${sessionId.slice(-12)}`)
      setPaymentMethod('Stripe Checkout')
      if (!shopifyOrderCreated && !isOrderCreating) {
        createShopifyOrderFromStripeSession(sessionId)
      }
    } else if (paymentIntent) {
      setOrderNumber(`#${paymentIntent.slice(-12)}`)
      setPaymentMethod('Stripe')
    } else if (orderId) {
      setOrderNumber(`#${orderId}`)
      setPaymentMethod('Shopify')
    } else if (checkoutId) {
      setOrderNumber(`#${checkoutId.slice(-8)}`)
      setPaymentMethod('Shopify')
    } else {
      setOrderNumber(`#${Date.now().toString().slice(-8)}`)
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: sessionId || paymentIntent || orderId || checkoutId,
      })
    }
  }, [orderId, checkoutId, sessionId, paymentIntent, createShopifyOrderFromStripeSession, isOrderCreating, shopifyOrderCreated])

  return (
    <div className="min-h-screen bg-tech-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Confirmation', href: '/checkout/success' }
        ]} />

        <div className="text-center py-12">
          {/* Icône de succès */}
          <div className="mb-8 animate-fade-in">
            <div className="w-24 h-24 bg-tech-accent rounded-full flex items-center justify-center mx-auto shadow-large">
              <svg
                className="w-12 h-12 text-tech-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-display-3 md:text-headline font-display font-bold text-tech-black mb-6 tracking-tight">
            Commande Confirmée !
          </h1>
          
          {orderNumber && (
            <p className="text-body md:text-lg text-primary-600 mb-8">
              Votre commande <span className="font-display font-bold text-tech-black">{orderNumber}</span> a été enregistrée avec succès.
              {paymentMethod && (
                <span className="block text-caption text-primary-500 mt-2">
                  Paiement effectué via {paymentMethod}
                </span>
              )}
            </p>
          )}

          {isOrderCreating && (
            <div className="flex items-center justify-center text-tech-accent mb-4">
              <div className="w-5 h-5 border-2 border-tech-accent border-t-transparent rounded-full animate-spin mr-3"></div>
              <span className="text-body font-medium">Création de la commande Shopify...</span>
            </div>
          )}
          {!isOrderCreating && shopifyOrderCreated && (
            <div className="text-tech-accent font-semibold mb-4 text-body">
              ✅ Commande Shopify créée avec succès !
            </div>
          )}

          <p className="text-body md:text-lg text-primary-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Merci pour votre achat ! Vous recevrez un email de confirmation dans quelques instants avec tous les détails de votre commande.
          </p>

          {/* Informations importantes */}
          <div className="bg-tech-accent/10 border border-tech-accent/20 p-6 mb-8 text-left rounded-2xl max-w-2xl mx-auto">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-tech-accent mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <div>
                <h3 className="font-display font-semibold text-tech-black mb-2 text-title">Suivi de votre commande</h3>
                <p className="text-body text-primary-600">
                  Vous pouvez suivre votre commande dans votre compte Shopify ou consulter votre email pour le numéro de suivi.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-tech-black text-tech-white font-semibold rounded-2xl hover:bg-primary-800 transition-all duration-300 hover:scale-105 shadow-medium hover:shadow-large"
            >
              Continuer les achats
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-tech-white text-tech-black font-semibold rounded-2xl border-2 border-primary-200 hover:border-tech-black transition-all duration-300 hover:scale-105"
            >
              Retour à l&apos;accueil
            </Link>
          </div>

          {/* Prochaines étapes */}
          <div className="mt-16 bg-tech-light-gray rounded-3xl shadow-soft border border-primary-100 p-8 text-left">
            <h2 className="text-headline font-display font-bold text-tech-black mb-8">
              Prochaines étapes
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-tech-black text-tech-white rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold mr-4 text-body">
                  1
                </div>
                <div>
                  <h3 className="font-display font-semibold text-tech-black mb-1 text-title">Email de confirmation</h3>
                  <p className="text-body text-primary-600">Vous recevrez un email avec le récapitulatif de votre commande.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-tech-black text-tech-white rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold mr-4 text-body">
                  2
                </div>
                <div>
                  <h3 className="font-display font-semibold text-tech-black mb-1 text-title">Traitement de la commande</h3>
                  <p className="text-body text-primary-600">Nous préparons votre commande et vous tiendrons informé de son statut.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-tech-black text-tech-white rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold mr-4 text-body">
                  3
                </div>
                <div>
                  <h3 className="font-display font-semibold text-tech-black mb-1 text-title">Expédition</h3>
                  <p className="text-body text-primary-600">Vous recevrez un email avec le numéro de suivi dès l&apos;expédition.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
