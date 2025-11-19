import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/DtQLjBkD1UpownGS/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-20 pb-32 flex flex-col items-start gap-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300 text-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Enterprise-grade security
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-[0_0_30px_rgba(16,185,129,0.35)]">
          Nova Enterprises — Secure your uploads with confidence
        </h1>
        <p className="max-w-2xl text-emerald-100/80 text-lg">
          Upload anything. We hash, scan, and protect. Earn points for keeping your workspace clean.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#upload" className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-5 py-3 transition">Start securing now</a>
          <a href="#chat" className="rounded-xl border border-emerald-400/40 text-emerald-200 hover:bg-emerald-400/10 px-5 py-3 transition">Ask Bukit AI</a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_10%_0%,rgba(16,185,129,0.25),transparent_60%),radial-gradient(600px_300px_at_90%_100%,rgba(16,185,129,0.25),transparent_60%)]" />
    </section>
  )
}
