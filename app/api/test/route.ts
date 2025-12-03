import { NextResponse } from 'next/server'

/**
 * Route de test pour vérifier que les API routes fonctionnent
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'API route fonctionne',
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}

