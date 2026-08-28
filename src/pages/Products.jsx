import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import FilterPanel from '../components/FilterPanel.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useProducts } from '../hooks/useProducts.js'
import { categories as categoryData, brands as brandData } from '../data/products.js'

export default function Products() {
  const { products, loading } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: '',
    ram: '',
    maxPrice: 2500,
    sort: 'featured',
  })

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
    setFilters((prev) => ({ ...prev, category: searchParams.get('category') || prev.category }))
  }, [searchParams])

  const filtered = useMemo(() => {
    let list = [...products]

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }
    if (filters.category) list = list.filter((p) => p.category === filters.category)
    if (filters.brand) list = list.filter((p) => p.brand === filters.brand)
    if (filters.ram) list = list.filter((p) => p.ram?.startsWith(filters.ram))
    list = list.filter((p) => Number(p.price) <= filters.maxPrice)

    switch (filters.sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
        break
      default:
        break
    }

    return list
  }, [products, query, filters])

  function submitSearch(e) {
    e.preventDefault()
    setSearchParams(query ? { q: query } : {})
  }

  return (
    <div className="section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-700 text-white">All Laptops</h1>
        <p className="text-sm text-white/50">Browse the full catalog and narrow it down with filters.</p>
      </div>

      <form onSubmit={submitSearch} className="mt-6 max-w-lg">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, brand, or category…"
          className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none"
        />
      </form>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          brands={brandData}
          categories={categoryData.map((c) => c.name)}
          resultCount={filtered.length}
        />

        <div className="flex-1">
          {loading ? (
            <LoadingSpinner label="Loading laptops…" />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No laptops match those filters"
              message="Try widening your price range or clearing a filter."
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
