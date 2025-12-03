'use client'

import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-16 lg:py-20 bg-tech-white border-t border-primary-100">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-light text-tech-black mb-3 tracking-tight">
          Prêt à découvrir l'excellence ?
        </h2>
        <p className="text-sm md:text-base text-primary-600 mb-8 leading-relaxed font-light max-w-xl mx-auto">
          Explorez notre collection complète de produits tech premium.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-tech-black hover:text-primary-700 transition-colors font-medium"
          >
            Voir tous les produits
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <span className="text-primary-400 hidden sm:inline">•</span>
          <Link
            href="/collections"
            className="text-sm text-primary-600 hover:text-tech-black transition-colors"
          >
            Explorer les collections
          </Link>
        </div>
      </div>
    </section>
  )
}
