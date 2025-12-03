'use client'

import Image from 'next/image'

interface TestimonialsProps {
  productImages?: string[]
}

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'Client Premium',
    content: 'Produits tech de qualité exceptionnelle et service client irréprochable.',
    avatar: '👩',
  },
  {
    name: 'Thomas Dubois',
    role: 'Entrepreneur',
    content: 'Une expérience d\'achat fluide et des produits qui dépassent mes attentes.',
    avatar: '👨',
  },
  {
    name: 'Emma Laurent',
    role: 'Designer',
    content: 'Le design minimaliste et la qualité sont au rendez-vous.',
    avatar: '👩‍🎨',
  },
]

export default function Testimonials({ productImages = [] }: TestimonialsProps) {
  return (
    <section className="py-16 lg:py-20 bg-tech-white border-t border-primary-100 relative overflow-hidden">
      {/* Background Images */}
      {productImages.length > 0 && (
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="grid grid-cols-3 h-full">
            {productImages.slice(0, 3).map((img, i) => (
              <div key={i} className="relative">
                <Image
                  src={img}
                  alt={`Testimonial background ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-light text-tech-black mb-3 tracking-tight">
            Ce que disent nos clients
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const hasImage = productImages[index]
            return (
              <div key={index} className="group relative">
                {hasImage && (
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full overflow-hidden opacity-20 group-hover:opacity-30 transition-opacity">
                    <Image
                      src={hasImage}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}
                <div className="text-4xl mb-4 opacity-60">
                  {testimonial.avatar}
                </div>
                <p className="text-sm text-primary-700 mb-6 leading-relaxed font-light">
                  &quot;{testimonial.content}&quot;
                </p>
                <div>
                  <p className="text-xs font-display font-light text-tech-black">{testimonial.name}</p>
                  <p className="text-xs text-primary-600 mt-0.5 font-light">{testimonial.role}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
