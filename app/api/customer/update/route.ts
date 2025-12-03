import { NextRequest, NextResponse } from 'next/server'
import { updateCustomer } from '@/lib/shopify-customers'

export async function PUT(request: NextRequest) {
  try {
    const { customerId, updates } = await request.json()

    if (!customerId) {
      return NextResponse.json(
        { error: 'ID client requis' },
        { status: 400 }
      )
    }

    const updatedCustomer = await updateCustomer(customerId, updates)

    return NextResponse.json({
      user: {
        id: updatedCustomer.id.toString(),
        email: updatedCustomer.email,
        firstName: updatedCustomer.first_name,
        lastName: updatedCustomer.last_name,
        phone: updatedCustomer.phone,
        acceptsMarketing: updatedCustomer.accepts_marketing || false,
        ordersCount: updatedCustomer.orders_count || 0,
        totalSpent: updatedCustomer.total_spent || '0.00',
      },
    })
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du client:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}

