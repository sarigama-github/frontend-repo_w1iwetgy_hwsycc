import React from 'react'
import Hero from './components/Hero'
import UploadPanel from './components/UploadPanel'
import ChatPanel from './components/ChatPanel'
import ReportPanel from './components/ReportPanel'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <UploadPanel />
      <ChatPanel />
      <ReportPanel />
      <footer className="py-10 text-center text-emerald-200/70 bg-slate-950 border-t border-emerald-400/10">
        © {new Date().getFullYear()} Nova Enterprises • Security-first, gamified experience
      </footer>
    </div>
  )
}

export default App
