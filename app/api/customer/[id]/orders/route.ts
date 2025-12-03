import { NextRequest, NextResponse } from 'next/server'
import { getCustomerOrders } from '@/lib/shopify-customers'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orders = await getCustomerOrders(params.id)

    return NextResponse.json({
      orders: orders.map((order: any) => ({
        id: order.id.toString(),
        name: order.name,
        total_price: order.total_price,
        currency: order.currency,
        created_at: order.created_at,
        financial_status: order.financial_status,
        fulfillment_status: order.fulfillment_status,
      })),
    })
  } catch (error: any) {
    console.error('Erreur lors de la récupération des commandes:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur', orders: [] },
      { status: 500 }
    )
  }
}

