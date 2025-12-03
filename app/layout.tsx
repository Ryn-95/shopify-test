import type { Metadata } from 'next'
import './globals.css'
import Layout from '@/components/Layout'
import { CartProvider } from '@/context/CartContext'
import { ToastProvider } from '@/components/ToastProvider'
import { ProductsProvider } from '@/components/ProductsProvider'
import { AuthProvider } from '@/context/AuthContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { CompareProvider } from '@/context/CompareContext'
import { getAllProducts } from '@/lib/shopify'

/**
 * Metadata SEO par défaut pour toutes les pages
 * Peut être surchargée dans chaque page individuelle
 */
export const metadata: Metadata = {
  title: {
    default: 'JJFYNE - Boutique en ligne',
    template: '%s | JJFYNE',
  },
  description: 'Découvrez notre collection de produits de qualité. Boutique en ligne moderne et élégante.',
  keywords: ['boutique', 'e-commerce', 'produits', 'achat en ligne'],
  authors: [{ name: 'JJFYNE' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'JJFYNE',
    title: 'JJFYNE - Boutique en ligne',
    description: 'Découvrez notre collection de produits de qualité.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JJFYNE - Boutique en ligne',
    description: 'Découvrez notre collection de produits de qualité.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

/**
 * Layout racine Next.js
 * Enveloppe toute l'application avec les providers nécessaires
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Charger les produits une fois pour toute l'application
  // Si les variables d'environnement ne sont pas définies (pendant le build), on retourne un tableau vide
  let products: any[] = []
  try {
    // Vérifier si les variables d'environnement sont disponibles
    const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
    const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    
    if (storeDomain && storefrontAccessToken) {
      products = await getAllProducts()
    }
    // Sinon, on laisse products = [] (silencieux pendant le build)
  } catch (error: any) {
    // Ne logger l'erreur que si ce n'est pas une erreur de configuration manquante
    if (!error.message?.includes('variables d\'environnement')) {
      console.error('Erreur lors du chargement des produits:', error)
    }
    // Pendant le build, on ignore silencieusement les erreurs de configuration
  }

  return (
    <html lang="fr">
      <body>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <CompareProvider>
                  <ProductsProvider products={products}>
                    <Layout>{children}</Layout>
                  </ProductsProvider>
                </CompareProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}

