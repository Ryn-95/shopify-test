'use client'

import { useState } from 'react'
import { useToast } from '@/components/ToastProvider'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function NewsletterPage() {
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erreur lors de l\'inscription')
      }

      showToast('Inscription réussie ! Vous recevrez nos dernières nouveautés.', 'success')
      setEmail('')
    } catch (error: any) {
      showToast(error.message || 'Erreur lors de l\'inscription', 'error')
    } finally {
      setIsSubmitting(false)
    }
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
              Restez informé
            </h1>
            <p className="text-body md:text-lg text-tech-medium-gray leading-relaxed">
              Recevez nos dernières nouveautés tech, offres exclusives et actualités directement dans votre boîte mail.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-16">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: 'Newsletter', href: '/newsletter' }
        ]} />

        <div className="mt-12 bg-tech-white rounded-3xl shadow-large border border-primary-100 p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-tech-black rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-tech-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-caption font-semibold text-tech-black mb-2">
                Votre adresse email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-tech-light-gray border border-primary-200 rounded-2xl focus:ring-2 focus:ring-tech-accent focus:border-tech-accent transition-all duration-300 text-body"
                placeholder="votre@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-tech-black text-tech-white font-semibold rounded-2xl hover:bg-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-medium hover:shadow-large hover:scale-105 disabled:hover:scale-100"
            >
              {isSubmitting ? 'Inscription en cours...' : "S'abonner à la newsletter"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-primary-100">
            <h3 className="font-display font-semibold text-tech-black mb-4 text-title">Pourquoi s'abonner ?</h3>
            <ul className="space-y-3 text-body text-primary-600">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-tech-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Offres exclusives et réductions spéciales</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-tech-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Nouveautés produits tech en avant-première</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-tech-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Conseils et actualités tech</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-tech-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Désinscription facile à tout moment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
