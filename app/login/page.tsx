'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/components/ToastProvider'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function LoginPage() {
  const router = useRouter()
  const { login, register, isLoading } = useAuth()
  const { showToast } = useToast()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (isLogin) {
        await login(email, password)
        showToast('Connexion réussie !', 'success')
        router.push('/account')
      } else {
        await register(email, firstName, lastName, password)
        showToast('Inscription réussie !', 'success')
        router.push('/account')
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
      showToast(err.message || 'Une erreur est survenue', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-tech-light-gray py-12 px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Breadcrumbs items={[
          { label: 'Accueil', href: '/' },
          { label: isLogin ? 'Connexion' : 'Inscription', href: '/login' }
        ]} />

        <div className="mt-8 bg-tech-white rounded-3xl shadow-large border border-primary-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-headline font-display font-bold text-tech-black mb-2">
              {isLogin ? 'Connexion' : 'Créer un compte'}
            </h1>
            <p className="text-body text-primary-600">
              {isLogin
                ? 'Connectez-vous à votre compte'
                : 'Rejoignez-nous dès aujourd\'hui'}
            </p>
          </div>

          {/* Toggle Login/Register */}
          <div className="flex mb-6 bg-tech-light-gray rounded-2xl p-1">
            <button
              onClick={() => {
                setIsLogin(true)
                setError('')
              }}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-tech-white text-tech-black shadow-soft'
                  : 'text-primary-600 hover:text-tech-black'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError('')
              }}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-tech-white text-tech-black shadow-soft'
                  : 'text-primary-600 hover:text-tech-black'
              }`}
            >
              Inscription
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-sm text-red-800 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="firstName" className="block text-caption font-semibold text-tech-black mb-2">
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-tech-light-gray border border-primary-200 rounded-2xl focus:ring-2 focus:ring-tech-accent focus:border-tech-accent transition-all duration-300 text-body"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-caption font-semibold text-tech-black mb-2">
                    Nom
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-tech-light-gray border border-primary-200 rounded-2xl focus:ring-2 focus:ring-tech-accent focus:border-tech-accent transition-all duration-300 text-body"
                    placeholder="Votre nom"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-caption font-semibold text-tech-black mb-2">
                Email *
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

            {isLogin && (
              <div>
                <label htmlFor="password" className="block text-caption font-semibold text-tech-black mb-2">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-tech-light-gray border border-primary-200 rounded-2xl focus:ring-2 focus:ring-tech-accent focus:border-tech-accent transition-all duration-300 text-body"
                  placeholder="••••••••"
                />
                <Link
                  href="/forgot-password"
                  className="text-caption text-primary-600 hover:text-tech-accent mt-2 inline-block transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-tech-black text-tech-white font-semibold rounded-2xl hover:bg-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-medium hover:shadow-large hover:scale-105 disabled:hover:scale-100"
            >
              {isLoading ? 'Chargement...' : isLogin ? 'Se connecter' : 'Créer un compte'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-body text-primary-600">
              {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                }}
                className="text-tech-black font-semibold hover:text-tech-accent transition-colors"
              >
                {isLogin ? 'Inscrivez-vous' : 'Connectez-vous'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
