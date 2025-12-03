'use client'

import { useState } from 'react'
import { useToast } from './ToastProvider'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        showToast('Inscription réussie !', 'success')
        setEmail('')
      } else {
        throw new Error('Erreur lors de l\'inscription')
      }
    } catch (error) {
      showToast('Erreur lors de l\'inscription', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-32 bg-tech-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h2 className="text-display-2 md:text-display-1 font-display font-bold text-tech-white mb-6 tracking-tight">
            Restez informé
          </h2>
          <p className="text-body md:text-xl text-tech-medium-gray mb-12 leading-relaxed max-w-2xl mx-auto">
            Recevez en exclusivité nos dernières nouveautés, offres spéciales et actualités tech directement dans votre boîte mail.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              required
              className="flex-1 px-6 py-4 bg-tech-white/5 backdrop-blur-xl border border-tech-white/10 rounded-2xl text-tech-white placeholder:text-tech-medium-gray focus:ring-2 focus:ring-tech-accent focus:border-tech-accent transition-all duration-300 text-body"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-tech-white text-tech-black font-semibold rounded-2xl hover:bg-tech-light-gray transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-medium hover:shadow-large hover:scale-105 disabled:hover:scale-100"
            >
              {isSubmitting ? 'Inscription...' : 'S\'abonner'}
            </button>
          </form>

          <p className="text-caption text-tech-medium-gray mt-6">
            En vous abonnant, vous acceptez notre politique de confidentialité.
          </p>
        </div>
      </div>
    </section>
  )
}

