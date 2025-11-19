import { useState } from 'react'
import { Bot, Send } from 'lucide-react'

const AIAssistant = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const ask = async () => {
    if (!question.trim()) return
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${baseUrl}/api/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    })
    const data = await res.json()
    setAnswer(data.answer || '...')
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-2xl border border-emerald-500/20 bg-black/30 p-6 backdrop-blur">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-emerald-300" />
          <h2 className="text-2xl font-semibold text-white">Ask Nova AI</h2>
        </div>
        <div className="mt-4 flex gap-2">
          <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask about security..." className="flex-1 rounded-lg border border-emerald-500/30 bg-black/40 p-2 text-emerald-100 placeholder:text-emerald-200/50" />
          <button onClick={ask} className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-black transition hover:bg-emerald-400">
            <Send className="h-4 w-4" /> Ask
          </button>
        </div>
        {answer && <p className="mt-3 text-emerald-100/90">{answer}</p>}
      </div>
    </section>
  )
}

export default AIAssistant
