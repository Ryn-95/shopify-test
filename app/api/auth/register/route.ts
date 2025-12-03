import { NextRequest, NextResponse } from 'next/server'
import { createCustomer, getCustomerByEmail } from '@/lib/shopify-customers'

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, password } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // Vérifier si le client existe déjà
    try {
      const existingCustomer = await getCustomerByEmail(email)
      if (existingCustomer) {
        return NextResponse.json(
          { error: 'Un compte existe déjà avec cet email' },
          { status: 409 }
        )
      }
    } catch (error: any) {
      // Si l'erreur n'est pas "client non trouvé", on continue
      console.log('Vérification client existant:', error.message)
    }

    // Créer le nouveau client dans Shopify
    // Note: Shopify Admin API ne permet pas de définir un mot de passe directement
    // Le client recevra un email de Shopify pour définir son mot de passe (si activé)
    const customer = await createCustomer({
      email,
      firstName,
      lastName,
      acceptsMarketing: false,
      // Note: Pour activer l'envoi d'email de bienvenue avec mot de passe,
      // configurez cela dans Shopify Admin → Paramètres → Notifications
    })

    console.log(`✅ Nouveau client créé: ${email} (ID: ${customer.id})`)

    return NextResponse.json({
      user: {
        id: customer.id.toString(),
        email: customer.email,
        firstName: customer.first_name,
        lastName: customer.last_name,
        phone: customer.phone,
        acceptsMarketing: customer.accepts_marketing || false,
        ordersCount: 0,
        totalSpent: '0.00',
      },
    })
  } catch (error: any) {
    console.error('❌ Erreur lors de l\'inscription:', error)
    
    // Messages d'erreur plus explicites
    let errorMessage = 'Erreur lors de la création du compte'
    if (error.message?.includes('Admin API non configurée')) {
      errorMessage = 'Configuration Admin API manquante. Vérifiez vos variables d\'environnement.'
    } else if (error.message?.includes('already exists')) {
      errorMessage = 'Un compte existe déjà avec cet email'
    } else if (error.message) {
      errorMessage = error.message
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
