'use client'

const features = [
  {
    title: 'Qualité Premium',
    description: 'Produits sélectionnés avec soin pour garantir une qualité exceptionnelle.',
  },
  {
    title: 'Livraison Rapide',
    description: 'Expédition rapide et sécurisée pour recevoir vos produits rapidement.',
  },
  {
    title: 'Paiement Sécurisé',
    description: 'Transactions sécurisées avec les meilleures méthodes de paiement.',
  },
  {
    title: 'Support 24/7',
    description: 'Notre équipe est disponible pour répondre à toutes vos questions.',
  },
]

export default function Features() {
  return (
    <section className="py-16 lg:py-20 bg-tech-white border-t border-primary-100">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-light text-tech-black mb-3 tracking-tight">
            Pourquoi nous choisir ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="group">
              <h3 className="text-sm font-display font-light text-tech-black mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-primary-600 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
