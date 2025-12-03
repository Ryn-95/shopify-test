'use client'

/**
 * Composant Navbar Premium Style Apple
 * Navigation améliorée avec animations et design épuré
 */

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useWishlist } from '@/context/WishlistContext'
import { useCompare } from '@/context/CompareContext'
import { useProducts } from './ProductsProvider'
import SearchBar from './SearchBar'

export default function Navbar() {
  const { getCartCount } = useCart()
  const { isAuthenticated, user } = useAuth()
  const { items: wishlistItems } = useWishlist()
  const { products: compareProducts } = useCompare()
  const cartCount = getCartCount()
  const { products } = useProducts()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/collections', label: 'Collections' },
    { href: '/products', label: 'Produits' },
    { href: '/about', label: 'À propos' },
  ]

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-tech-white/80 backdrop-blur-xl border-b border-primary-100 shadow-sm' 
        : 'bg-tech-white/50 backdrop-blur-sm border-b border-primary-100/50'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group flex-shrink-0"
          >
            <span className="text-xl font-display font-light text-tech-black tracking-tight group-hover:opacity-70 transition-opacity">
              JJFYNE
            </span>
          </Link>

          {/* Navigation links - Desktop */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm font-light transition-all duration-200 rounded-md ${
                    isActive
                      ? 'text-tech-black font-medium'
                      : 'text-primary-600 hover:text-tech-black'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Barre de recherche - Desktop */}
          <div className="hidden lg:block flex-grow max-w-xs mx-6">
            <SearchBar products={products} />
          </div>

          {/* Actions - Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/wishlist"
              className="relative p-2 text-primary-600 hover:text-tech-black transition-colors rounded-md"
              title="Favoris"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-tech-black text-white text-[9px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            
            <Link
              href="/compare"
              className="relative p-2 text-primary-600 hover:text-tech-black transition-colors rounded-md"
              title="Comparer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              {compareProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-tech-black text-white text-[9px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {compareProducts.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <Link
                href="/account"
                className="px-3 py-1.5 text-sm font-light text-primary-600 hover:text-tech-black transition-colors"
              >
                {user?.firstName || 'Compte'}
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1.5 text-sm font-light text-primary-600 hover:text-tech-black transition-colors"
              >
                Connexion
              </Link>
            )}
            
            <Link
              href="/cart"
              className="relative p-2 text-primary-600 hover:text-tech-black transition-colors rounded-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-tech-black text-white text-[9px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-primary-600 hover:text-tech-black transition-colors rounded-md"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-primary-100 animate-fade-in">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-2 text-sm font-light rounded-md transition-colors ${
                      isActive
                        ? 'text-tech-black font-medium bg-primary-50'
                        : 'text-primary-600 hover:text-tech-black hover:bg-primary-50/50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="pt-2 border-t border-primary-100">
                <div className="px-4 py-2">
                  <SearchBar products={products} />
                </div>
              </div>
              <div className="pt-2 border-t border-primary-100 flex items-center justify-around px-4">
                <Link
                  href="/wishlist"
                  className="p-2 text-primary-600 hover:text-tech-black transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </Link>
                <Link
                  href="/compare"
                  className="p-2 text-primary-600 hover:text-tech-black transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </Link>
                {isAuthenticated ? (
                  <Link
                    href="/account"
                    className="px-3 py-1.5 text-sm font-light text-primary-600 hover:text-tech-black transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Compte
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="px-3 py-1.5 text-sm font-light text-primary-600 hover:text-tech-black transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                )}
                <Link
                  href="/cart"
                  className="relative p-2 text-primary-600 hover:text-tech-black transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-tech-black text-white text-[9px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
