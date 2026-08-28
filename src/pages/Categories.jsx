import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../data/products.js'

export default function Categories() {
  return (
    <div className="section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-700 text-white">Shop by Category</h1>
      <p className="mt-2 max-w-xl text-sm text-white/50">
        Every laptop is grouped by how it's actually used, not just its specs on paper.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.name}
            to={`/products?category=${encodeURIComponent(c.name)}`}
            className="card-hover focus-ring group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-base-800/60"
          >
            <img src={c.image} alt="" aria-hidden className="h-44 w-full object-cover" />
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-600 text-white">{c.name}</h3>
              <p className="mt-2 flex-1 text-sm text-white/50">{c.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-blue">
                Explore {c.name}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
