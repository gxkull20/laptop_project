import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../services/supabase'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)
const STORAGE_KEY = 'laptophub_cart'

function readLocalCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const { user } = useAuth() ?? {}
  const [items, setItems] = useState(readLocalCart)
  const [loading, setLoading] = useState(false)

  // Persist guest cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // When a user logs in and Supabase is configured, pull their saved cart
  useEffect(() => {
    if (!isSupabaseConfigured || !user) return
    setLoading(true)
    supabase
      .from('cart_items')
      .select('id, quantity, products(*)')
      .eq('user_id', user.id)
      .then(({ data, error }) => {
        if (!error && data) {
          setItems(
            data
              .filter((row) => row.products)
              .map((row) => ({
                product: row.products,
                quantity: row.quantity,
              }))
          )
        }
        setLoading(false)
      })
  }, [user])

  async function addToCart(product, quantity = 1) {
    if (!product || !product.id) return
    let newQty = quantity

    setItems((prev) => {
      const existing = prev.find((i) => i.product && i.product.id === product.id)
      if (existing) {
        newQty = existing.quantity + quantity
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: newQty } : i
        )
      }
      return [...prev, { product, quantity }]
    })

    if (isSupabaseConfigured && user) {
      await supabase.from('cart_items').upsert(
        { user_id: user.id, product_id: product.id, quantity: newQty },
        { onConflict: 'user_id,product_id' }
      )
    }
  }

  async function updateQuantity(productId, quantity) {
    if (quantity < 1) return removeFromCart(productId)
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    )
    if (isSupabaseConfigured && user) {
      await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', productId)
    }
  }

  async function removeFromCart(productId) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
    if (isSupabaseConfigured && user) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)
    }
  }

  async function clearCart() {
    setItems([])
    if (isSupabaseConfigured && user) {
      await supabase.from('cart_items').delete().eq('user_id', user.id)
    }
  }

  const cartCount = items.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0)
  const cartTotal = items.reduce(
    (sum, i) => sum + (Number(i.quantity) || 0) * (Number(i.product?.price) || 0),
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
