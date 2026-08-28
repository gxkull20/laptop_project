import { Link } from 'react-router-dom'
import { brands } from '../data/products.js'
import { useProducts } from '../hooks/useProducts.js'

export default function Brands() {
  const { products } = useProducts()

  return (
    <div className="section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-700 text-white">Shop by Brand</h1>
      <p className="mt-2 max-w-xl text-sm text-white/50">
        Every major brand we carry, with a live count of what's in stock.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((b) => {
          const count = products.filter((p) => p.brand === b).length
          return (
            <Link
              key={b}
              to={`/products?q=${encodeURIComponent(b)}`}
              className="card-hover focus-ring flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/8 bg-base-800/60 px-4 py-10 text-center"
            >
              <span className="font-display text-xl font-700 text-white">{b}</span>
              <span className="text-xs text-white/40">{count} laptops</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
