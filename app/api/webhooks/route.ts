/**
 * API Route pour recevoir les webhooks Shopify
 * Configurez ces webhooks dans Shopify Admin → Paramètres → Notifications → Webhooks
 */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || ''

/**
 * Vérifie la signature du webhook Shopify
 */
function verifyWebhookSignature(
  data: string,
  signature: string,
  secret: string
): boolean {
  if (!secret) {
    console.warn('⚠️ SHOPIFY_WEBHOOK_SECRET non configuré')
    return true // En développement, on peut accepter sans vérification
  }

  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(data)
  const calculatedSignature = hmac.digest('base64')

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(calculatedSignature)
  )
}

/**
 * POST - Reçoit les webhooks Shopify
 */
export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-shopify-hmac-sha256')
    const topic = request.headers.get('x-shopify-topic')
    const shop = request.headers.get('x-shopify-shop-domain')

    if (!signature || !topic || !shop) {
      return NextResponse.json(
        { error: 'Headers manquants' },
        { status: 400 }
      )
    }

    const body = await request.text()

    // Vérifier la signature
    if (!verifyWebhookSignature(body, signature, SHOPIFY_WEBHOOK_SECRET)) {
      console.error('❌ Signature webhook invalide')
      return NextResponse.json(
        { error: 'Signature invalide' },
        { status: 401 }
      )
    }

    const data = JSON.parse(body)

    console.log(`📨 Webhook reçu: ${topic} depuis ${shop}`)

    // Traiter le webhook selon le topic
    switch (topic) {
      case 'orders/create':
        await handleOrderCreate(data)
        break
      case 'orders/updated':
        await handleOrderUpdate(data)
        break
      case 'products/create':
        await handleProductCreate(data)
        break
      case 'products/update':
        await handleProductUpdate(data)
        break
      case 'customers/create':
        await handleCustomerCreate(data)
        break
      case 'cart/create':
        await handleCartCreate(data)
        break
      default:
        console.log(`ℹ️ Webhook non géré: ${topic}`)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('❌ Erreur lors du traitement du webhook:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}

/**
 * Handlers pour chaque type de webhook
 */
async function handleOrderCreate(order: any) {
  console.log(`✅ Nouvelle commande créée: ${order.name}`)
  console.log(`   Total: ${order.total_price} ${order.currency}`)
  console.log(`   Email client: ${order.email}`)
  
  // Ici vous pouvez :
  // - Envoyer un email de confirmation personnalisé
  // - Envoyer une notification push (Pushbullet, Discord, etc.)
  // - Mettre à jour votre base de données
  // - Déclencher des actions automatiques
  // - Envoyer un SMS via Twilio
  
  // Exemple : Envoyer une notification via un service externe
  // await sendPushNotification(`Nouvelle commande ${order.name} - ${order.total_price} ${order.currency}`)
}

async function handleOrderUpdate(order: any) {
  console.log(`📝 Commande mise à jour: ${order.name}`)
  console.log(`   Statut: ${order.financial_status}`)
}

async function handleProductCreate(product: any) {
  console.log(`🆕 Nouveau produit créé: ${product.title}`)
  // Ici vous pouvez :
  // - Mettre à jour le cache
  // - Notifier les administrateurs
}

async function handleProductUpdate(product: any) {
  console.log(`📝 Produit mis à jour: ${product.title}`)
  // Ici vous pouvez :
  // - Invalider le cache
  // - Mettre à jour les index de recherche
}

async function handleCustomerCreate(customer: any) {
  console.log(`👤 Nouveau client créé: ${customer.email}`)
  // Ici vous pouvez :
  // - Envoyer un email de bienvenue
  // - Créer un compte dans votre système
}

async function handleCartCreate(cart: any) {
  console.log(`🛒 Nouveau panier créé`)
  // Ici vous pouvez :
  // - Tracker les analytics
  // - Envoyer des notifications
}

