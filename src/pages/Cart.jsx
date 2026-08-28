import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { formatPrice } from '../utils/format.js'

const DELIVERY_FLAT = 19

export default function Cart() {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="section mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <EmptyState
          title="Your cart is empty"
          message="Browse the catalog and add a laptop to get started."
          action={
            <Link to="/products" className="focus-ring rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-medium text-white">
              Browse Laptops
            </Link>
          }
        />
      </div>
    )
  }

  const delivery = DELIVERY_FLAT
  const total = cartTotal + delivery

  return (
    <div className="section mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-700 text-white">Your Cart</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-base-800/60 p-4 sm:flex-row sm:items-center"
            >
              <img src={product.image_url} alt={product.name} className="h-24 w-full rounded-lg object-cover sm:w-32" />

              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-accent-blue/80">{product.brand}</p>
                <Link to={`/products/${product.id}`} className="focus-ring font-display text-base font-600 text-white hover:text-accent-blue">
                  {product.name}
                </Link>
                <p className="mt-1 text-sm text-white/50">{formatPrice(product.price)} each</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-lg border border-white/10">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    aria-label="Decrease quantity"
                    className="focus-ring p-2 text-white/70 hover:text-white"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-7 text-center text-sm text-white">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    aria-label="Increase quantity"
                    className="focus-ring p-2 text-white/70 hover:text-white"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <span className="w-20 text-right font-display text-sm font-600 text-white">
                  {formatPrice(product.price * quantity)}
                </span>

                <button
                  onClick={() => removeFromCart(product.id)}
                  aria-label="Remove item"
                  className="focus-ring rounded-full p-2 text-white/40 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-white/8 bg-base-800/60 p-6">
          <h2 className="font-display text-lg font-600 text-white">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Delivery</span>
              <span>{formatPrice(delivery)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-white/10 pt-3 font-display text-base font-700 text-white">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <button className="focus-ring mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-gradient px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            <ShoppingBag size={16} />
            Checkout
          </button>
          <Link
            to="/products"
            className="focus-ring mt-3 block text-center text-sm text-white/50 hover:text-white"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
