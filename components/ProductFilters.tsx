'use client'

import { useState, useEffect } from 'react'
import type { Product } from '@/lib/types'

interface ProductFiltersProps {
  products: Product[]
  onFilter: (filtered: Product[]) => void
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

export default function ProductFilters({ products, onFilter }: ProductFiltersProps) {
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const prices = products.map(p => parseFloat(p.variants[0]?.price || '0'))
    return Math.max(...prices, 1000)
  })
  const [selectedPrice, setSelectedPrice] = useState(maxPrice)

  const handleSort = (option: SortOption) => {
    setSortBy(option)
    let sorted = [...products]

    switch (option) {
      case 'price-asc':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.variants[0]?.price || '0')
          const priceB = parseFloat(b.variants[0]?.price || '0')
          return priceA - priceB
        })
        break
      case 'price-desc':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.variants[0]?.price || '0')
          const priceB = parseFloat(b.variants[0]?.price || '0')
          return priceB - priceA
        })
        break
      case 'name-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        // Ordre par défaut
        break
    }

    // Filtrer par prix
    const filtered = sorted.filter(product => {
      const price = parseFloat(product.variants[0]?.price || '0')
      return price <= selectedPrice
    })

    onFilter(filtered)
  }

  const handlePriceChange = (value: number) => {
    setSelectedPrice(value)
    handleSort(sortBy)
  }

  // Appliquer les filtres au chargement
  useEffect(() => {
    handleSort('default')
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
      <h2 className="text-xl font-extrabold text-gray-900 mb-6">Filtres</h2>

      {/* Tri */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Trier par
        </label>
        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value as SortOption)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        >
          <option value="default">Par défaut</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="name-asc">Nom A-Z</option>
          <option value="name-desc">Nom Z-A</option>
        </select>
      </div>

      {/* Filtre par prix */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Prix maximum : {selectedPrice.toFixed(2)} €
        </label>
        <input
          type="range"
          min="0"
          max={maxPrice}
          step="10"
          value={selectedPrice}
          onChange={(e) => handlePriceChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0 €</span>
          <span>{maxPrice.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  )
}

