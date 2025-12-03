'use client'

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'Client Premium',
    content: 'Produits tech de qualité exceptionnelle et service client irréprochable.',
  },
  {
    name: 'Thomas Dubois',
    role: 'Entrepreneur',
    content: 'Une expérience d\'achat fluide et des produits qui dépassent mes attentes.',
  },
  {
    name: 'Emma Laurent',
    role: 'Designer',
    content: 'Le design minimaliste et la qualité sont au rendez-vous.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-20 bg-tech-white border-t border-primary-100">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-light text-tech-black mb-3 tracking-tight">
            Ce que disent nos clients
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <p className="text-sm text-primary-700 mb-6 leading-relaxed font-light">
                &quot;{testimonial.content}&quot;
              </p>
              <div>
                <p className="text-xs font-display font-light text-tech-black">{testimonial.name}</p>
                <p className="text-xs text-primary-600 mt-0.5 font-light">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
