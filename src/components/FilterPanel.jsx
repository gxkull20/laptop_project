const RAM_OPTIONS = ['8GB', '16GB', '32GB']
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
]

export default function FilterPanel({ filters, setFilters, brands, categories, resultCount }) {
  function toggle(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? '' : value,
    }))
  }

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="rounded-2xl border border-white/8 bg-base-800/60 p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-600 text-white">Filters</h3>
          <button
            onClick={() =>
              setFilters({ category: '', brand: '', ram: '', maxPrice: 2500, sort: 'featured' })
            }
            className="focus-ring text-xs text-accent-blue hover:underline"
          >
            Reset
          </button>
        </div>

        <p className="mt-1 text-xs text-white/40">{resultCount} results</p>

        <div className="mt-5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-white/40">Category</h4>
          <div className="mt-2 flex flex-col gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => toggle('category', c)}
                className={`focus-ring rounded-md px-2.5 py-1.5 text-left text-sm transition ${
                  filters.category === c ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-white/40">Brand</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => toggle('brand', b)}
                className={`focus-ring rounded-full border px-3 py-1 text-xs transition ${
                  filters.brand === b
                    ? 'border-accent-blue bg-accent-blue/15 text-white'
                    : 'border-white/10 text-white/60 hover:border-white/25'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-white/40">RAM</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {RAM_OPTIONS.map((r) => (
              <button
                key={r}
                onClick={() => toggle('ram', r)}
                className={`focus-ring rounded-full border px-3 py-1 text-xs transition ${
                  filters.ram === r
                    ? 'border-accent-blue bg-accent-blue/15 text-white'
                    : 'border-white/10 text-white/60 hover:border-white/25'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-white/40">Max Price</h4>
            <span className="text-xs text-white/50">${filters.maxPrice}</span>
          </div>
          <input
            type="range"
            min="500"
            max="2500"
            step="50"
            value={filters.maxPrice}
            onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="mt-3 w-full accent-accent-blue"
          />
        </div>

        <div className="mt-5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-white/40">Sort By</h4>
          <select
            value={filters.sort}
            onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
            className="focus-ring mt-2 w-full rounded-lg border border-white/10 bg-base-900 px-3 py-2 text-sm text-white"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  )
}
