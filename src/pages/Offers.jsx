import ProductCard from '../components/ProductCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useProducts } from '../hooks/useProducts.js'

export default function Offers() {
  const { products, loading } = useProducts()
  const discounted = products.filter((p) => p.original_price && p.original_price > p.price)

  return (
    <div className="section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="glass overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-16">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
          Limited-time offers
        </span>
        <h1 className="mt-4 font-display text-3xl font-700 text-white sm:text-4xl">
          Save up to <span className="text-gradient">25%</span> on select laptops
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-white/60">
          Prices update in real time — grab a deal before stock runs out.
        </p>
      </div>

      <div className="mt-10">
        {loading ? (
          <LoadingSpinner label="Loading offers…" />
        ) : discounted.length === 0 ? (
          <EmptyState title="No active offers right now" message="Check back soon — new deals are added weekly." />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {discounted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
