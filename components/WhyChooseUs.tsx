'use client'

import Image from 'next/image'

interface WhyChooseUsProps {
  productImages?: string[]
}

// Images Unsplash par défaut
const defaultWhyChooseImages = [
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
]

const reasons = [
  {
    title: 'Design Minimaliste',
    description: 'Chaque produit est pensé pour allier esthétique et fonctionnalité.',
    icon: '🎨',
  },
  {
    title: 'Performance Maximale',
    description: 'Des produits sélectionnés pour leurs performances exceptionnelles.',
    icon: '⚡',
  },
  {
    title: 'Qualité Premium',
    description: 'Nous ne proposons que des produits de la plus haute qualité.',
    icon: '💎',
  },
  {
    title: 'Service Exceptionnel',
    description: 'Notre équipe dédiée est là pour vous accompagner à chaque étape.',
    icon: '🌟',
  },
]

export default function WhyChooseUs({ productImages = [] }: WhyChooseUsProps) {
  return (
    <section className="py-16 lg:py-20 bg-tech-white border-t border-primary-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-light text-tech-black mb-3 tracking-tight">
            Pourquoi choisir JJFYNE ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => {
            const image = productImages[index] || defaultWhyChooseImages[index]
            return (
              <div
                key={index}
                className="group relative"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-tech-light-gray">
                  <Image
                    src={image}
                    alt={reason.title}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tech-black/20 to-transparent" />
                </div>
                <h3 className="text-lg font-display font-light text-tech-black mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-primary-600 leading-relaxed font-light">
                  {reason.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
