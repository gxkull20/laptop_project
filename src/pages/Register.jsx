import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { register, isSupabaseConfigured } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.fullName || !form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }

    setStatus('loading')
    setError('')
    const { data, error } = await register(form)
    if (error) {
      setStatus('idle')
      setError(error)
    } else if (data?.session) {
      setStatus('success')
      navigate('/')
    } else {
      setStatus('confirmed_needed')
    }
  }

  return (
    <div className="section mx-auto flex min-h-[70vh] max-w-md items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full rounded-2xl border border-white/8 bg-base-800/60 p-8">
        <h1 className="font-display text-2xl font-700 text-white">Create your account</h1>
        <p className="mt-1 text-sm text-white/50">Save your cart and speed through checkout next time.</p>

        {!isSupabaseConfigured && (
          <p className="mt-4 rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs text-amber-300">
            Demo mode: connect Supabase (see .env.example) to enable real accounts.
          </p>
        )}

        {status === 'confirmed_needed' ? (
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-center">
            <h3 className="font-display text-base font-600 text-emerald-400">Account Created!</h3>
            <p className="mt-2 text-sm text-white/70">
              Please check your email to confirm your account, then log in.
            </p>
            <Link
              to="/login"
              className="focus-ring mt-4 inline-block rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-white/50">Full Name</label>
            <input
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              className="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none"
              placeholder="Jordan Lee"
            />
          </div>
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
              placeholder="At least 6 characters"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-white/50">Confirm Password</label>
            <input
              type="password"
              value={form.confirm}
              onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
              className="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none"
              placeholder="Re-enter password"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="focus-ring w-full rounded-lg bg-brand-gradient px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {status === 'loading' ? 'Creating account…' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          Already have an account?{' '}
          <Link to="/login" className="focus-ring text-accent-blue hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
