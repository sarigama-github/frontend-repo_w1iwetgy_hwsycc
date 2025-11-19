import { Sparkles, Upload, ShieldCheck, Gamepad2, Bot } from 'lucide-react'

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="group rounded-2xl border border-emerald-500/20 bg-black/30 p-6 backdrop-blur transition hover:border-emerald-400/40 hover:bg-black/40">
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-300">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <p className="mt-3 text-sm text-emerald-100/80">{desc}</p>
  </div>
)

const Features = () => {
  const items = [
    { icon: Upload, title: 'Secure Uploads', desc: 'Files are fingerprinted with SHA-256 and tracked via immutable metadata.' },
    { icon: ShieldCheck, title: 'Integrity Guard', desc: 'Zero-trust posture with verification and audit trails for every action.' },
    { icon: Gamepad2, title: 'Gamified Progress', desc: 'Earn points and badges as you upload and secure more assets.' },
    { icon: Bot, title: 'AI Assistant', desc: 'Ask Nova AI anything about security and best practices.' },
    { icon: Sparkles, title: 'Animated UI', desc: 'Panels and transitions that feel alive—polished and futuristic.' },
  ]

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <Feature key={f.title} {...f} />
        ))}
      </div>
    </section>
  )
}

export default Features
