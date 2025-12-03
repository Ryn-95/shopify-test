import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos - JJFYNE',
  description: 'Découvrez l\'histoire de JJFYNE et notre engagement envers l\'excellence tech.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-tech-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-tech-black overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-display-2 md:text-display-1 font-display font-bold text-tech-white mb-6 tracking-tight">
              À propos de JJFYNE
            </h1>
            <p className="text-body md:text-lg text-tech-medium-gray leading-relaxed">
              Une passion pour l&apos;excellence tech, une vision pour l&apos;avenir
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-tech-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-headline font-display font-bold text-tech-black mb-8">Notre Histoire</h2>
            <p className="text-body text-primary-600 mb-6 leading-relaxed">
              Fondée avec une vision claire : offrir des produits tech premium qui allient design minimaliste 
              et performance maximale. Chez JJFYNE, nous croyons que chaque produit doit être soigneusement 
              sélectionné pour répondre aux plus hauts standards de qualité.
            </p>
            <p className="text-body text-primary-600 mb-6 leading-relaxed">
              Notre équipe passionnée travaille sans relâche pour vous proposer une expérience 
              d&apos;achat unique, où chaque détail compte. De la sélection des produits à la livraison, 
              nous nous assurons que votre satisfaction soit notre priorité absolue.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-tech-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-display-3 md:text-headline font-display font-bold text-tech-black mb-4 tracking-tight">
              Nos Valeurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-tech-white p-8 rounded-3xl shadow-soft hover:shadow-medium transition-all duration-300 border border-primary-100">
              <div className="w-16 h-16 bg-tech-black text-tech-white rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-title font-display font-semibold text-tech-black mb-4">Qualité</h3>
              <p className="text-body text-primary-600 leading-relaxed">
                Nous sélectionnons uniquement les meilleurs produits tech, testés et approuvés pour leur excellence.
              </p>
            </div>

            <div className="bg-tech-white p-8 rounded-3xl shadow-soft hover:shadow-medium transition-all duration-300 border border-primary-100">
              <div className="w-16 h-16 bg-tech-black text-tech-white rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-title font-display font-semibold text-tech-black mb-4">Passion</h3>
              <p className="text-body text-primary-600 leading-relaxed">
                Notre passion pour l&apos;excellence tech se reflète dans chaque aspect de notre service client.
              </p>
            </div>

            <div className="bg-tech-white p-8 rounded-3xl shadow-soft hover:shadow-medium transition-all duration-300 border border-primary-100">
              <div className="w-16 h-16 bg-tech-black text-tech-white rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-title font-display font-semibold text-tech-black mb-4">Innovation</h3>
              <p className="text-body text-primary-600 leading-relaxed">
                Nous restons à la pointe de l&apos;innovation pour vous offrir les dernières tendances tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-tech-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-display-3 md:text-headline font-display font-bold text-tech-white mb-6 tracking-tight">
            Rejoignez l&apos;aventure JJFYNE
          </h2>
          <p className="text-body md:text-lg text-tech-medium-gray mb-8 leading-relaxed">
            Découvrez notre collection tech premium et faites partie de notre communauté.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-tech-white text-tech-black font-semibold rounded-2xl hover:bg-tech-light-gray transition-all duration-300 hover:scale-105 shadow-medium hover:shadow-large"
          >
            Explorer la Collection
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
