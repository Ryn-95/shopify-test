'use client'

import Link from 'next/link'
import type { Product } from '@/lib/types'
import Image from 'next/image'

interface ProductShowcaseProps {
  products: Product[]
}

export default function ProductShowcase({ products }: ProductShowcaseProps) {
  // Prendre les 3 meilleurs produits pour le showcase
  const showcaseProducts = products.slice(0, 3)

  if (showcaseProducts.length === 0) return null

  return (
    <section className="py-32 bg-tech-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-display-2 md:text-display-1 font-display font-bold text-tech-black mb-6 tracking-tight">
            Nos Produits Phares
          </h2>
          <p className="text-body md:text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre sélection de produits tech les plus appréciés
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {showcaseProducts.map((product, index) => {
            const image = product.images[0]
            const firstVariant = product.variants[0]
            const price = firstVariant?.price || '0.00'
            const isLarge = index === 0

            return (
              <Link
                key={product.id}
                href={`/product/${product.handle || product.id}`}
                className={`group relative bg-tech-light-gray rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 animate-fade-in ${
                  isLarge ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Image */}
                <div className={`relative ${isLarge ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden bg-gradient-to-br from-tech-light-gray to-primary-200`}>
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt || product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes={isLarge ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                      priority={index < 2}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-24 h-24 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12.75v-.008z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-tech-black/80 via-tech-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-tech-white transform translate-y-0 group-hover:translate-y-0 transition-all duration-500">
                  <div className="max-w-2xl">
                    <h3 className={`font-display font-bold text-tech-white mb-3 ${isLarge ? 'text-headline' : 'text-title'}`}>
                      {product.title}
                    </h3>
                    <p className={`font-display font-bold mb-6 ${isLarge ? 'text-headline' : 'text-title'}`}>
                      {parseFloat(price).toFixed(2)} €
                    </p>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-body font-medium">Découvrir</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

