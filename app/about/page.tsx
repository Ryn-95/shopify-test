import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos - JJFYNE',
  description: 'Découvrez l\'histoire de JJFYNE et notre engagement envers l\'excellence.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              À propos de JJFYNE
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Une passion pour l&apos;excellence, une vision pour l&apos;avenir
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Notre Histoire</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Fondée avec une vision claire : offrir des produits de qualité exceptionnelle 
              qui allient design moderne et fonctionnalité. Chez JJFYNE, nous croyons que chaque 
              produit doit être soigneusement sélectionné pour répondre aux plus hauts standards 
              de qualité.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Notre équipe passionnée travaille sans relâche pour vous proposer une expérience 
              d&apos;achat unique, où chaque détail compte. De la sélection des produits à la livraison, 
              nous nous assurons que votre satisfaction soit notre priorité absolue.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Qualité</h3>
              <p className="text-gray-600 leading-relaxed">
                Nous sélectionnons uniquement les meilleurs produits, testés et approuvés pour leur excellence.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Passion</h3>
              <p className="text-gray-600 leading-relaxed">
                Notre passion pour l&apos;excellence se reflète dans chaque aspect de notre service client.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                Nous restons à la pointe de l&apos;innovation pour vous offrir les dernières tendances et technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Rejoignez l&apos;aventure JJFYNE
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Découvrez notre collection et faites partie de notre communauté de clients satisfaits.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Explorer la Collection
          </Link>
        </div>
      </section>
    </div>
  )
}

