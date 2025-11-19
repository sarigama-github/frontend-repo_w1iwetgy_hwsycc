import React, { useState } from 'react'
import { MessageSquare, Send } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function ChatPanel() {
  const [input, setInput] = useState('')
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)

  const ask = async () => {
    if (!input.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })
      const data = await res.json()
      setReply(data.reply || 'No response')
    } catch (e) {
      setReply(`Error: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="chat" className="py-16 md:py-24 bg-slate-950 text-white">
      <div className="container mx-auto px-6">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <MessageSquare className="text-emerald-400" /> Ask Bukit (AI)
          </h2>
          <p className="text-emerald-100/80 mt-1">Have a question about your security? Ask away.</p>
        </div>
        <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/60 p-6 backdrop-blur">
          <div className="flex flex-col gap-4">
            <textarea value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type your question here..." className="w-full min-h-[100px] rounded-xl bg-slate-900/80 border border-emerald-400/20 p-3 outline-none focus:border-emerald-400" />
            <button onClick={ask} disabled={loading} className="self-start rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold px-5 py-2 flex items-center gap-2">
              {loading ? 'Thinking…' : 'Send'}
              <Send className="w-4 h-4" />
            </button>
            {reply && (
              <div className="rounded-xl border border-emerald-400/20 bg-slate-900/80 p-4 text-emerald-100">
                {reply}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
