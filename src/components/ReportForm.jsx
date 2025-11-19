import { useState } from 'react'
import { AlertTriangle, Mail } from 'lucide-react'

const ReportForm = () => {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const clientId = (typeof window !== 'undefined' && (localStorage.getItem('nova_client') || 'web'))

  const submit = async () => {
    if (!subject.trim() || !message.trim()) return
    setStatus('Sending...')
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    try {
      const res = await fetch(`${baseUrl}/api/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: clientId, subject, message, from_email: email || null })
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus(data.sent ? 'Sent to owner ✓' : 'Received ✓ (email not configured)')
        setSubject('')
        setMessage('')
        setEmail('')
      } else {
        setStatus(`Failed: ${data.detail || 'Unknown error'}`)
      }
    } catch (e) {
      setStatus(`Error: ${e.message}`)
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-2xl border border-emerald-500/20 bg-black/30 p-6 backdrop-blur">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-emerald-300" />
          <h2 className="text-2xl font-semibold text-white">Report an issue / send update</h2>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="rounded-lg border border-emerald-500/30 bg-black/40 p-2 text-emerald-100 placeholder:text-emerald-200/50" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email (optional)" className="rounded-lg border border-emerald-500/30 bg-black/40 p-2 text-emerald-100 placeholder:text-emerald-200/50" />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message..." rows={4} className="sm:col-span-2 rounded-lg border border-emerald-500/30 bg-black/40 p-2 text-emerald-100 placeholder:text-emerald-200/50" />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <button onClick={submit} className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-black transition hover:bg-emerald-400">
            <Mail className="h-4 w-4" /> Send
          </button>
          {status && <p className="text-sm text-emerald-200">{status}</p>}
        </div>
      </div>
    </section>
  )
}

export default ReportForm
