import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TrendingUp, Zap, ShieldCheck, BarChart3, ArrowRight,
  Brain, Clock, Layers
} from 'lucide-react'

const features = [
  { icon: Brain, title: 'Intent', desc: 'Understands user queries instantly.' },
  { icon: Zap, title: 'Urgency', desc: 'Flags critical issues quickly.' },
  { icon: Layers, title: 'Insights', desc: 'Pulls key details from messages.' },
  { icon: ShieldCheck, title: 'Responses', desc: 'Generates smart replies.' },
  { icon: BarChart3, title: 'Dashboard', desc: 'View and manage tickets.' },
  { icon: Clock, title: 'Tracking', desc: 'Keeps record of interactions.' },
]

function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white overflow-hidden">

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full -translate-x-1/2"></div>
      </div>
      <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
              <TrendingUp size={14} className="text-white" />
            </div>
            <span className="font-semibold text-white">FinTriage</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/dashboard')}
            className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition"
          >
            Open Dashboard <ArrowRight size={14} />
          </motion.button>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold leading-tight mb-6"
        >
          <span className="text-white">Smarter Finance Support</span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.6)]">
            with AI
          </span>
        </motion.h1>

        <motion.p className="text-gray-400 max-w-xl mx-auto mb-10">
          Automate triage. Respond faster. Reduce manual effort.
        </motion.p>

        <div className="flex justify-center gap-4">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/dashboard')}
            className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition"
          >
            Get Started <ArrowRight size={16} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/dashboard/triage')}
            className="border border-white/20 px-6 py-3 rounded-xl text-gray-300 hover:bg-white/10 transition"
          >
            Try Analyzer
          </motion.button>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">
              Core capabilities
            </h2>
            <p className="text-gray-400">
              Everything you need to handle support efficiently.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/10 transition">

                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
                    <f.icon size={18} className="text-indigo-400" />
                  </div>

                  <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>

                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <footer className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        FinTriage · {new Date().getFullYear()}
      </footer>
    </div>
  )
}