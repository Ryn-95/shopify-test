'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Product } from '@/lib/types'

interface SearchBarProps {
  products: Product[]
  onSearch?: (results: Product[]) => void
}

export default function SearchBar({ products, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([])
      setIsOpen(false)
      return
    }

    const searchResults = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description?.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5)

    setResults(searchResults)
    setIsOpen(searchResults.length > 0)
    setSelectedIndex(-1)

    if (onSearch) {
      onSearch(searchResults)
    }
  }, [query, products, onSearch])

  const handleSelect = (product: Product) => {
    router.push(`/product/${product.handle || product.id}`)
    setQuery('')
    setIsOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setQuery('')
      setIsOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSelect(results[selectedIndex])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setQuery('')
    }
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 0 && results.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher..."
          className="w-full px-4 py-2.5 pl-11 bg-tech-light-gray/50 backdrop-blur-sm border border-primary-200/50 rounded-2xl focus:ring-2 focus:ring-tech-accent focus:border-tech-accent transition-all duration-300 text-sm font-medium text-tech-black placeholder:text-primary-400"
        />
        <svg
          className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <button
          type="submit"
          className="sr-only"
          aria-label="Rechercher"
        />
      </form>

      {/* Résultats de recherche */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 glass border border-primary-100/50 rounded-2xl shadow-large max-h-96 overflow-y-auto animate-scale-in">
          {results.map((product, index) => {
            const image = product.images[0]
            return (
              <button
                key={product.id}
                onClick={() => handleSelect(product)}
                className={`w-full flex items-center gap-4 p-4 hover:bg-primary-50/50 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl ${
                  index === selectedIndex ? 'bg-primary-50/50' : ''
                }`}
              >
                {image && (
                  <div className="w-14 h-14 relative flex-shrink-0 bg-tech-light-gray rounded-xl overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt || product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-grow text-left">
                  <p className="font-semibold text-tech-black text-sm">{product.title}</p>
                  {product.variants[0] && (
                    <p className="text-xs text-primary-600 font-medium mt-0.5">
                      {parseFloat(product.variants[0].price).toFixed(2)} €
                    </p>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {query.trim().length > 0 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 glass border border-primary-100/50 rounded-2xl shadow-large p-4 text-center text-primary-500 text-sm">
          Aucun résultat
        </div>
      )}
    </div>
  )
}
