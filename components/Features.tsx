'use client'

import Image from 'next/image'

interface FeaturesProps {
  productImages?: string[]
}

// Images Unsplash par défaut pour les features
const defaultFeatureImages = [
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
]

const features = [
  {
    title: 'Qualité Premium',
    description: 'Produits sélectionnés avec soin pour garantir une qualité exceptionnelle.',
    icon: '✨',
  },
  {
    title: 'Livraison Rapide',
    description: 'Expédition rapide et sécurisée pour recevoir vos produits rapidement.',
    icon: '🚀',
  },
  {
    title: 'Paiement Sécurisé',
    description: 'Transactions sécurisées avec les meilleures méthodes de paiement.',
    icon: '🔒',
  },
  {
    title: 'Support 24/7',
    description: 'Notre équipe est disponible pour répondre à toutes vos questions.',
    icon: '💬',
  },
]

export default function Features({ productImages = [] }: FeaturesProps) {
  return (
    <section className="py-16 lg:py-20 bg-tech-white border-t border-primary-100">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-light text-tech-black mb-3 tracking-tight">
            Pourquoi nous choisir ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const image = productImages[index] || defaultFeatureImages[index]
            return (
              <div key={feature.title} className="group">
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-tech-light-gray">
                  <Image
                    src={image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-sm font-display font-light text-tech-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-primary-600 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
