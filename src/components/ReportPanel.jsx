import React, { useState } from 'react'
import { Mail, AlertCircle } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function ReportPanel() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch(`${API_BASE}/api/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      setStatus({ ok: true, message: data.detail })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (e) {
      setStatus({ ok: false, message: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="container mx-auto px-6">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Mail className="text-emerald-400" /> Report Center
          </h2>
          <p className="text-emerald-100/80 mt-1">Send issues, updates, or feedback directly to the admin inbox.</p>
        </div>

        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 rounded-2xl border border-emerald-400/20 bg-slate-900/60 p-6 backdrop-blur">
          <input name="name" value={form.name} onChange={onChange} placeholder="Your name (optional)" className="rounded-xl bg-slate-900/80 border border-emerald-400/20 p-3 outline-none focus:border-emerald-400" />
          <input name="email" value={form.email} onChange={onChange} type="email" placeholder="Your email (optional)" className="rounded-xl bg-slate-900/80 border border-emerald-400/20 p-3 outline-none focus:border-emerald-400" />
          <input name="subject" value={form.subject} onChange={onChange} placeholder="Subject" className="md:col-span-2 rounded-xl bg-slate-900/80 border border-emerald-400/20 p-3 outline-none focus:border-emerald-400" />
          <textarea name="message" value={form.message} onChange={onChange} placeholder="Describe the problem or update..." className="md:col-span-2 min-h-[140px] rounded-xl bg-slate-900/80 border border-emerald-400/20 p-3 outline-none focus:border-emerald-400" />
          <div className="md:col-span-2 flex items-center gap-4">
            <button disabled={loading} className="rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold px-6 py-3">{loading ? 'Sending…' : 'Send report'}</button>
            {status && (
              <div className={(status.ok ? 'text-emerald-300' : 'text-red-400') + ' text-sm flex items-center gap-2'}>
                <AlertCircle className="w-4 h-4" /> {status.message}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
