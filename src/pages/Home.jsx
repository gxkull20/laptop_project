import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import ProductCard from '../components/ProductCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { categories } from '../data/products.js'
import { useProducts } from '../hooks/useProducts.js'

export default function Home() {
  const { products, loading } = useProducts()
  const featured = products.slice(0, 4)

  return (
    <div>
      <Hero />

      <section className="section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-700 text-white sm:text-3xl">Shop by Category</h2>
            <p className="mt-2 text-sm text-white/50">Built for the way you actually use a laptop.</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.name}
              to={`/products?category=${encodeURIComponent(c.name)}`}
              className="card-hover focus-ring group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-base-800/60"
            >
              <img src={c.image} alt="" aria-hidden className="h-32 w-full object-cover" />
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-sm font-600 text-white">{c.name}</h3>
                <p className="mt-1 flex-1 text-xs text-white/50">{c.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent-blue">
                  Explore
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-700 text-white sm:text-3xl">Featured Laptops</h2>
            <p className="mt-2 text-sm text-white/50">Handpicked machines, popular this month.</p>
          </div>
          <Link to="/products" className="focus-ring hidden text-sm font-medium text-accent-blue hover:underline sm:inline">
            View all →
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading featured laptops…" />
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link to="/products" className="focus-ring text-sm font-medium text-accent-blue hover:underline">
            View all products →
          </Link>
        </div>
      </section>

      <section className="section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-16">
          <h2 className="font-display text-2xl font-700 text-white sm:text-3xl">
            Trade-in your old laptop, upgrade for less
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/60">
            Get an instant quote at checkout and apply it directly to any laptop in our catalog.
          </p>
          <Link
            to="/offers"
            className="focus-ring mt-6 inline-block rounded-lg bg-brand-gradient px-6 py-3 text-sm font-semibold text-white"
          >
            See Current Offers
          </Link>
        </div>
      </section>
    </div>
  )
}
