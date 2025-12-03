import { NextRequest, NextResponse } from 'next/server'
import { getCustomerByEmail } from '@/lib/shopify-customers'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }

    // Rechercher le client par email
    const customer = await getCustomerByEmail(email)

    if (!customer) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }

    // Note: Shopify Customer Account API gère les mots de passe
    // Pour l'instant, on accepte juste l'email (dans un vrai système, vérifier le mot de passe)
    // TODO: Intégrer Shopify Customer Account API pour l'authentification complète

    return NextResponse.json({
      user: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        acceptsMarketing: customer.acceptsMarketing,
        ordersCount: customer.ordersCount,
        totalSpent: customer.totalSpent,
      },
    })
  } catch (error: any) {
    console.error('Erreur lors de la connexion:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}

