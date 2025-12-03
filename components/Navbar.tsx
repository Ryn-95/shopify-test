'use client'

/**
 * Composant Navbar
 * Barre de navigation avec logo, liens et compteur panier
 */

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useWishlist } from '@/context/WishlistContext'
import { useCompare } from '@/context/CompareContext'
import { useProducts } from './ProductsProvider'
import SearchBar from './SearchBar'

export default function Navbar() {
  const { getCartCount } = useCart()
  const { isAuthenticated } = useAuth()
  const { items: wishlistItems } = useWishlist()
  const { products: compareProducts } = useCompare()
  const cartCount = getCartCount()
  const { products } = useProducts()

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
            <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-gray-700 group-hover:to-gray-900 transition-all duration-300">
              JJFYNE
            </span>
          </Link>

          {/* Barre de recherche - Desktop */}
          <div className="hidden lg:block flex-grow max-w-md mx-8">
            <SearchBar products={products} />
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-6 flex-shrink-0">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/collections"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Collections
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Produits
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
            <Link
              href="/wishlist"
              className="relative text-gray-700 hover:text-gray-900 transition-all duration-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
              title="Favoris"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link
              href="/compare"
              className="relative text-gray-700 hover:text-gray-900 transition-all duration-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
              title="Comparer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {compareProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {compareProducts.length}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <Link
                href="/account"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Mon compte
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Connexion
              </Link>
            )}
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-gray-900 transition-all duration-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Panier
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile - Search and Cart */}
          <div className="md:hidden flex items-center gap-2">
            {/* Barre de recherche mobile */}
            <div className="flex-grow max-w-xs">
              <SearchBar products={products} />
            </div>
            
            {/* Panier mobile */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-gray-900 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

