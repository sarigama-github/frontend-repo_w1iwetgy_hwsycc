import React, { useState } from 'react'
import { Upload, ShieldCheck, Sparkles } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function UploadPanel() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const onUpload = async () => {
    if (!file) return
    setLoading(true)
    setResult(null)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: form,
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setResult({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="upload" className="relative py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <ShieldCheck className="text-emerald-400" /> Secure Upload
          </h2>
          <p className="text-emerald-100/80 mt-2">We hash and scan every file. Earn points for clean results.</p>
        </div>

        <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/60 p-6 backdrop-blur">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <label className="flex-1 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-emerald-400/30 bg-slate-900/70 px-6 py-12 text-center cursor-pointer hover:border-emerald-400/60 transition">
              <input type="file" className="hidden" onChange={onFileChange} />
              <Upload className="w-10 h-10 text-emerald-300 mb-2" />
              <span className="text-emerald-100">{file ? file.name : 'Drop or select a file'}</span>
            </label>
            <button onClick={onUpload} disabled={loading || !file} className="rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold px-6 py-3 min-w-[160px] flex items-center justify-center gap-2">
              {loading ? 'Scanning…' : 'Scan File'}
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

          {result && (
            <div className="mt-6 rounded-xl border border-emerald-400/20 bg-slate-900/80 p-4">
              {result.error ? (
                <p className="text-red-400">{result.error}</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-emerald-200/80">Filename</p>
                    <p className="font-mono break-all">{result.filename}</p>
                  </div>
                  <div>
                    <p className="text-emerald-200/80">SHA-256</p>
                    <p className="font-mono break-all">{result.sha256}</p>
                  </div>
                  <div>
                    <p className="text-emerald-200/80">Verdict</p>
                    <p className={"font-semibold " + (result.verdict === 'clean' ? 'text-emerald-400' : result.verdict === 'suspicious' ? 'text-yellow-400' : 'text-red-400')}>{result.verdict}</p>
                  </div>
                  <div>
                    <p className="text-emerald-200/80">Points earned</p>
                    <p className="font-semibold">{result.points_earned}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
