'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { Customer } from '@/lib/shopify-customers'

interface AuthContextType {
  user: Customer | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password?: string) => Promise<void>
  register: (email: string, firstName?: string, lastName?: string, password?: string) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<Customer>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = 'shopify_auth_user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = localStorage.getItem(AUTH_STORAGE_KEY)
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
          
          // Vérifier si l'utilisateur existe toujours dans Shopify
          try {
            const response = await fetch(`/api/customer/${userData.id}`)
            if (!response.ok) {
              // Utilisateur n'existe plus, déconnexion
              localStorage.removeItem(AUTH_STORAGE_KEY)
              setUser(null)
            }
          } catch (error) {
            console.error('Erreur lors de la vérification de l\'utilisateur:', error)
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = useCallback(async (email: string, password?: string) => {
    try {
      setIsLoading(true)
      
      // Pour l'instant, on utilise l'email comme identifiant
      // Dans un vrai système, vous utiliseriez Shopify Customer Account API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erreur de connexion')
      }

      const userData = await response.json()
      setUser(userData.user)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData.user))
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (
    email: string,
    firstName?: string,
    lastName?: string,
    password?: string
  ) => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName, lastName, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erreur lors de l\'inscription')
      }

      const userData = await response.json()
      setUser(userData.user)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData.user))
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  const updateProfile = useCallback(async (updates: Partial<Customer>) => {
    if (!user) throw new Error('Utilisateur non connecté')

    try {
      setIsLoading(true)
      
      const response = await fetch('/api/customer/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId: user.id, updates }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erreur lors de la mise à jour')
      }

      const updatedUser = await response.json()
      setUser(updatedUser.user)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser.user))
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du profil:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

