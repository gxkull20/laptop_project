import { useState } from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../services/supabase.js'

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      setErrorMsg('Please fill in your name, email, and message.')
      return
    }

    setStatus('loading')

    if (!isSupabaseConfigured) {
      // Demo mode: simulate success so the flow is fully testable pre-Supabase
      setTimeout(() => {
        setStatus('success')
        setForm(initialForm)
      }, 500)
      return
    }

    const { error } = await supabase.from('contact_messages').insert([form])
    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
    } else {
      setStatus('success')
      setForm(initialForm)
    }
  }

  return (
    <div className="section mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-700 text-white">Contact Us</h1>
      <p className="mt-2 max-w-xl text-sm text-white/50">
        Questions about a laptop, an order, or a warranty claim? Reach out any time.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="space-y-5 rounded-2xl border border-white/8 bg-base-800/60 p-6">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 text-accent-blue" />
              <div>
                <p className="text-sm font-medium text-white">Address</p>
                <p className="text-sm text-white/50">221 Circuit Ave, San Francisco, CA 94103</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="mt-0.5 text-accent-blue" />
              <div>
                <p className="text-sm font-medium text-white">Phone</p>
                <p className="text-sm text-white/50">+1 (555) 019-2837</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 text-accent-blue" />
              <div>
                <p className="text-sm font-medium text-white">Email</p>
                <p className="text-sm text-white/50">support@laptophub.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 text-accent-blue" />
              <div>
                <p className="text-sm font-medium text-white">Working Hours</p>
                <p className="text-sm text-white/50">Mon–Fri, 9am–6pm PST</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-white/50">Name</label>
              <input
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none"
                placeholder="Jordan Lee"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-white/50">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none"
                placeholder="jordan@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-white/50">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none"
                placeholder="(555) 019-2837"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-white/50">Subject</label>
              <input
                value={form.subject}
                onChange={(e) => update('subject', e.target.value)}
                className="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none"
                placeholder="Order question"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-white/50">Message</label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              className="focus-ring mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none"
              placeholder="How can we help?"
            />
          </div>

          {status === 'error' && <p className="text-sm text-red-400">{errorMsg}</p>}
          {status === 'success' && (
            <p className="text-sm text-emerald-400">Message sent — we'll get back to you shortly.</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="focus-ring rounded-lg bg-brand-gradient px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {status === 'loading' ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}
