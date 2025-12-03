'use client'

import Image from 'next/image'

interface StatsSectionProps {
  backgroundImage?: string
}

const stats = [
  {
    number: '10K+',
    label: 'Clients satisfaits',
    icon: '👥',
  },
  {
    number: '500+',
    label: 'Produits premium',
    icon: '⭐',
  },
  {
    number: '50+',
    label: 'Pays desservis',
    icon: '🌍',
  },
  {
    number: '24/7',
    label: 'Support client',
    icon: '💬',
  },
]

export default function StatsSection({ backgroundImage }: StatsSectionProps) {
  return (
    <section className="relative py-16 bg-tech-white border-t border-primary-100 overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 opacity-[0.02]">
          <Image
            src={backgroundImage}
            alt="Stats Background"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
      
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="text-3xl mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-display font-light text-tech-black mb-1 tracking-tight">
                {stat.number}
              </div>
              <div className="text-xs md:text-sm text-primary-600 font-light">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
