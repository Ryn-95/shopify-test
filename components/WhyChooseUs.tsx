'use client'

const reasons = [
  {
    title: 'Design Minimaliste',
    description: 'Chaque produit est pensé pour allier esthétique et fonctionnalité.',
  },
  {
    title: 'Performance Maximale',
    description: 'Des produits sélectionnés pour leurs performances exceptionnelles.',
  },
  {
    title: 'Qualité Premium',
    description: 'Nous ne proposons que des produits de la plus haute qualité.',
  },
  {
    title: 'Service Exceptionnel',
    description: 'Notre équipe dédiée est là pour vous accompagner à chaque étape.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-20 bg-tech-white border-t border-primary-100">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-light text-tech-black mb-3 tracking-tight">
            Pourquoi choisir JJFYNE ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group"
            >
              <h3 className="text-lg font-display font-light text-tech-black mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-primary-600 leading-relaxed font-light">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
