import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import RatingStars from './RatingStars'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const hasDiscount = product.original_price && product.original_price > product.price
  const discountPct = hasDiscount
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  return (
    <div className="card-hover group flex flex-col rounded-2xl border border-white/8 bg-base-800/60 p-4">
      <Link to={`/products/${product.id}`} className="focus-ring relative block overflow-hidden rounded-xl bg-base-900">
        {hasDiscount && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-brand-gradient px-2 py-1 text-[11px] font-semibold text-white">
            -{discountPct}%
          </span>
        )}
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="mt-3 flex flex-1 flex-col">
        <span className="text-xs font-medium uppercase tracking-wide text-accent-blue/80">
          {product.brand}
        </span>
        <Link to={`/products/${product.id}`} className="focus-ring mt-1 font-display text-base font-600 text-white hover:text-accent-blue">
          {product.name}
        </Link>

        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-white/50">
          <span>{product.processor}</span>
          <span>{product.ram}</span>
          <span className="col-span-2">{product.storage}</span>
        </div>

        <div className="mt-2">
          <RatingStars rating={product.rating} />
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-lg font-700 text-white">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-sm text-white/40 line-through">{formatPrice(product.original_price)}</span>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => addToCart(product, 1)}
            className="focus-ring flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-gradient px-3 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            <ShoppingCart size={15} />
            Add to Cart
          </button>
          <Link
            to={`/products/${product.id}`}
            className="focus-ring flex items-center justify-center rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-white/80 transition hover:border-accent-blue/50 hover:text-white"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}
