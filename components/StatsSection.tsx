'use client'

const stats = [
  {
    number: '10K+',
    label: 'Clients satisfaits',
  },
  {
    number: '500+',
    label: 'Produits premium',
  },
  {
    number: '50+',
    label: 'Pays desservis',
  },
  {
    number: '24/7',
    label: 'Support client',
  },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-tech-white border-t border-primary-100">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
            >
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
