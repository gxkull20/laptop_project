import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login, isSupabaseConfigured } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Enter your email and password.')
      return
    }
    setStatus('loading')
    setError('')
    const { error } = await login(form)
    if (error) {
      setStatus('idle')
      setError(error)
    } else {
      setStatus('success')
      navigate('/')
    }
  }

  return (
    <div className="section mx-auto flex min-h-[70vh] max-w-md items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full rounded-2xl border border-white/8 bg-base-800/60 p-8">
        <h1 className="font-display text-2xl font-700 text-white">Welcome back</h1>
        <p className="mt-1 text-sm text-white/50">Log in to view your saved cart and orders.</p>

        {!isSupabaseConfigured && (
          <p className="mt-4 rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs text-amber-300">
            Demo mode: connect Supabase (see .env.example) to enable real sign-in.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-white/50">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-white/50">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="focus-ring w-full rounded-lg bg-brand-gradient px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {status === 'loading' ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          Don't have an account?{' '}
          <Link to="/register" className="focus-ring text-accent-blue hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
