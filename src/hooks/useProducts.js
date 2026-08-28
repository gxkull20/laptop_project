import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../services/supabase'
import { products as demoProducts } from '../data/products'

export function useProducts() {
  const [products, setProducts] = useState(isSupabaseConfigured ? [] : demoProducts)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    let cancelled = false
    setLoading(true)
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          setError(error.message)
          setProducts(demoProducts) // graceful fallback
        } else {
          setProducts(data ?? [])
        }
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { products, loading, error }
}
