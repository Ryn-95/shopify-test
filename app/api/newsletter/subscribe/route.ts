import { NextRequest, NextResponse } from 'next/server'
import { createCustomer, getCustomerByEmail, updateCustomer } from '@/lib/shopify-customers'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }

    // Vérifier si le client existe déjà
    let customer = await getCustomerByEmail(email)

    if (customer) {
      // Mettre à jour pour accepter le marketing
      await updateCustomer(customer.id, {
        acceptsMarketing: true,
      })
    } else {
      // Créer un nouveau client avec acceptation marketing
      await createCustomer({
        email,
        acceptsMarketing: true,
      })
    }

    // Ici vous pourriez aussi intégrer avec un service d'email marketing
    // comme Mailchimp, SendGrid, etc.

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie',
    })
  } catch (error: any) {
    console.error('Erreur lors de l\'inscription à la newsletter:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}

