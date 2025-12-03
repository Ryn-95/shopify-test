'use client'

import Link from 'next/link'
import type { Product } from '@/lib/types'
import Image from 'next/image'

interface ProductShowcaseProps {
  products: Product[]
}

export default function ProductShowcase({ products }: ProductShowcaseProps) {
  const showcaseProducts = products.slice(0, 3)

  if (showcaseProducts.length === 0) return null

  return (
    <section className="py-16 lg:py-20 bg-tech-white border-t border-primary-100">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-light text-tech-black mb-3 tracking-tight">
            Nos Produits Phares
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {showcaseProducts.map((product) => {
            const image = product.images?.[0]
            const firstVariant = product.variants?.[0]
            const price = firstVariant?.price || '0.00'

            return (
              <Link
                key={product.id}
                href={`/product/${product.handle || product.id}`}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden bg-tech-light-gray rounded-lg mb-3">
                  {image?.src ? (
                    <Image
                      src={image.src}
                      alt={image.alt || product.title}
                      fill
                      className="object-cover group-hover:opacity-90 transition-opacity duration-300"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12.75v-.008z" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-display font-light text-tech-black mb-1">
                  {product.title}
                </h3>
                <p className="text-sm text-primary-600 font-light">
                  {parseFloat(price).toFixed(2)} €
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
