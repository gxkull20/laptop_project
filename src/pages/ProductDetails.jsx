import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Zap, Minus, Plus } from 'lucide-react'
import RatingStars from '../components/RatingStars.jsx'
import ProductCard from '../components/ProductCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { formatPrice } from '../utils/format.js'
import { useCart } from '../context/CartContext.jsx'
import { useProducts } from '../hooks/useProducts.js'

const SPEC_LABELS = [
  ['processor', 'Processor'],
  ['ram', 'RAM'],
  ['storage', 'Storage'],
  ['display', 'Display'],
  ['graphics', 'Graphics'],
  ['battery', 'Battery'],
  ['operating_system', 'Operating System'],
]

export default function ProductDetails() {
  const { id } = useParams()
  const { products, loading } = useProducts()
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)

  if (loading) return <LoadingSpinner label="Loading product…" />

  const product = products.find((p) => String(p.id) === id)

  if (!product) {
    return (
      <div className="section mx-auto max-w-3xl px-4">
        <EmptyState
          title="Product not found"
          message="This laptop may have been removed or the link is incorrect."
          action={
            <Link to="/products" className="focus-ring rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white">
              Browse products
            </Link>
          }
        />
      </div>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const hasDiscount = product.original_price && product.original_price > product.price

  return (
    <div className="section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-2xl border border-white/8 bg-base-900">
            <img src={product.image_url} alt={product.name} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-white/8 bg-base-900 opacity-70">
                <img src={product.image_url} alt="" className="aspect-square w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-accent-blue/80">{product.brand}</span>
          <h1 className="mt-1 font-display text-3xl font-700 text-white">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <RatingStars rating={product.rating} size={16} />
            <span className="text-xs text-white/40">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl font-700 text-white">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-lg text-white/40 line-through">{formatPrice(product.original_price)}</span>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-white/60">{product.description}</p>

          <div className="mt-6 rounded-xl border border-white/8 bg-base-800/60 p-4">
            <h3 className="font-display text-sm font-600 text-white">Technical Specifications</h3>
            <dl className="mt-3 grid grid-cols-1 gap-y-2 text-sm sm:grid-cols-2">
              {SPEC_LABELS.map(([key, label]) => (
                <div key={key} className="flex justify-between gap-4 border-b border-white/5 py-1.5 sm:border-none sm:py-0">
                  <dt className="text-white/40">{label}</dt>
                  <dd className="text-right text-white/80">{product[key] || '—'}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-lg border border-white/10">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="focus-ring p-2.5 text-white/70 hover:text-white"
              >
                <Minus size={15} />
              </button>
              <span className="w-8 text-center text-sm text-white">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="focus-ring p-2.5 text-white/70 hover:text-white"
              >
                <Plus size={15} />
              </button>
            </div>

            <button
              onClick={() => addToCart(product, qty)}
              className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-gradient px-6 py-3 text-sm font-semibold text-white sm:flex-none"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
            <Link
              to="/cart"
              onClick={() => addToCart(product, qty)}
              className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white sm:flex-none"
            >
              <Zap size={16} />
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-xl font-700 text-white">Related Products</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
