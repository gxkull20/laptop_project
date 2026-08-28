import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../services/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function register({ fullName, email, password }) {
    if (!isSupabaseConfigured) {
      return { error: 'Connect Supabase (see .env.example) to enable real accounts.' }
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    return { data, error: error?.message ?? null }
  }

  async function login({ email, password }) {
    if (!isSupabaseConfigured) {
      return { error: 'Connect Supabase (see .env.example) to enable real accounts.' }
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error: error?.message ?? null }
  }

  async function logout() {
    if (!isSupabaseConfigured) return
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, isSupabaseConfigured, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
