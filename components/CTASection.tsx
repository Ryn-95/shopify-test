'use client'

import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-32 bg-gradient-to-b from-tech-light-gray to-tech-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(0,0,0,0.05) 50%, transparent 70%)`,
            backgroundSize: '200px 200px'
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h2 className="text-display-2 md:text-display-1 font-display font-bold text-tech-black mb-6 tracking-tight">
            Prêt à découvrir l'excellence ?
          </h2>
          <p className="text-body md:text-xl text-primary-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            Explorez notre collection complète de produits tech premium et trouvez celui qui vous correspond.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="group px-8 py-4 bg-tech-black text-tech-white font-semibold rounded-2xl hover:bg-primary-800 transition-all duration-300 hover:scale-105 shadow-medium hover:shadow-large inline-flex items-center justify-center"
            >
              Voir tous les produits
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/collections"
              className="px-8 py-4 bg-tech-white text-tech-black font-semibold rounded-2xl border-2 border-primary-200 hover:border-tech-black transition-all duration-300 hover:scale-105 shadow-soft hover:shadow-medium"
            >
              Explorer les collections
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

