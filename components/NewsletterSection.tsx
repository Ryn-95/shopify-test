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
    <section className="py-16 lg:py-20 bg-tech-white border-t border-primary-100">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-light text-tech-black mb-3 tracking-tight">
          Restez informé
        </h2>
        <p className="text-sm md:text-base text-primary-600 mb-8 leading-relaxed font-light max-w-xl mx-auto">
          Recevez nos dernières nouveautés et offres spéciales.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            required
            className="flex-1 px-4 py-2.5 bg-tech-white border border-primary-200 rounded-lg text-sm text-tech-black placeholder:text-primary-400 focus:ring-1 focus:ring-tech-black focus:border-tech-black transition-all outline-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-tech-black text-tech-white text-sm font-medium rounded-lg hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '...' : 'S\'abonner'}
          </button>
        </form>

        <p className="text-xs text-primary-500 mt-4 font-light">
          En vous abonnant, vous acceptez notre politique de confidentialité.
        </p>
      </div>
    </section>
  )
}
