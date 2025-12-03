'use client'

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'Client Premium',
    avatar: 'SM',
    content: 'Produits tech de qualité exceptionnelle et service client irréprochable. Je recommande vivement !',
    rating: 5,
  },
  {
    name: 'Thomas Dubois',
    role: 'Entrepreneur',
    avatar: 'TD',
    content: 'Une expérience d\'achat fluide et des produits qui dépassent mes attentes. Design premium !',
    rating: 5,
  },
  {
    name: 'Emma Laurent',
    role: 'Designer',
    avatar: 'EL',
    content: 'Le design minimaliste et la qualité sont au rendez-vous. Une boutique qui mérite vraiment le détour.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-tech-white to-tech-light-gray relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-display-3 md:text-headline font-display font-bold text-tech-black mb-4 tracking-tight">
            Ce que disent nos clients
          </h2>
          <p className="text-body md:text-lg text-primary-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-tech-white p-8 rounded-3xl border border-primary-100 hover:border-primary-200 hover:shadow-large transition-all duration-500 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-16 h-16 text-tech-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Rating */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Content */}
              <p className="text-body text-primary-700 mb-8 leading-relaxed relative z-10">
                &quot;{testimonial.content}&quot;
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-tech-accent to-tech-accent-hover rounded-2xl flex items-center justify-center text-tech-white font-display font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-display font-semibold text-tech-black text-body">{testimonial.name}</p>
                  <p className="text-caption text-primary-600 mt-0.5">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
