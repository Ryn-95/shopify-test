'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulation d'envoi (remplacer par votre API)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    }, 1000)
  }

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
              Contactez-nous
            </h1>
            <p className="text-body md:text-lg text-tech-medium-gray leading-relaxed">
              Nous sommes là pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-tech-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-headline font-display font-bold text-tech-black mb-6">
                Informations de contact
              </h2>
              <p className="text-body text-primary-600 mb-8 leading-relaxed">
                Notre équipe est disponible pour vous aider. N&apos;hésitez pas à nous contacter 
                pour toute question ou demande d&apos;information.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-14 h-14 bg-tech-black text-tech-white rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-title font-display font-semibold text-tech-black mb-1">Email</h3>
                    <p className="text-body text-primary-600">contact@jjfyne.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-14 h-14 bg-tech-black text-tech-white rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-1.516-.921-2.9-2.35-3.5l-1.293-.55a2.25 2.25 0 00-1.714 0l-1.293.55a2.25 2.25 0 00-2.35 3.5v1.372a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25V6.75z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-title font-display font-semibold text-tech-black mb-1">Téléphone</h3>
                    <p className="text-body text-primary-600">+33 1 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-14 h-14 bg-tech-black text-tech-white rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-title font-display font-semibold text-tech-black mb-1">Adresse</h3>
                    <p className="text-body text-primary-600">123 Rue de la Mode<br />75001 Paris, France</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-tech-white p-8 rounded-3xl shadow-medium border border-primary-100">
              <h2 className="text-headline font-display font-bold text-tech-black mb-6">
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-caption font-semibold text-tech-black mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-tech-light-gray border border-primary-200 rounded-2xl focus:ring-2 focus:ring-tech-accent focus:border-tech-accent transition-all duration-300 text-body"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-caption font-semibold text-tech-black mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-tech-light-gray border border-primary-200 rounded-2xl focus:ring-2 focus:ring-tech-accent focus:border-tech-accent transition-all duration-300 text-body"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-caption font-semibold text-tech-black mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-tech-light-gray border border-primary-200 rounded-2xl focus:ring-2 focus:ring-tech-accent focus:border-tech-accent transition-all duration-300 resize-none text-body"
                    placeholder="Votre message..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-2xl text-body">
                    Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-2xl text-body">
                    Une erreur s&apos;est produite. Veuillez réessayer.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-tech-black text-tech-white py-4 px-6 rounded-2xl font-semibold hover:bg-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-medium hover:shadow-large hover:scale-105 disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
