import { NextRequest, NextResponse } from 'next/server'
import { getCustomerByEmail } from '@/lib/shopify-customers'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Note: Shopify Admin API utilise l'ID numérique, pas l'email
    // Pour simplifier, on accepte soit l'ID soit l'email
    // Dans un vrai système, vous utiliseriez l'ID Shopify directement
    
    // Pour l'instant, on retourne juste une validation
    // TODO: Implémenter la récupération par ID avec Shopify Admin API
    
    return NextResponse.json({ exists: true })
  } catch (error: any) {
    console.error('Erreur lors de la vérification du client:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}

