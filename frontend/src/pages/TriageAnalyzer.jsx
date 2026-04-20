import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { api } from '../services/api'

export default function TriageAnalyzer() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit() {
    if (!query.trim() || loading) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const triageRes = await api.triage(query.trim())
      const { ticket_id } = triageRes.data
      const ticketRes = await api.getTicket(ticket_id)
      setResult(ticketRes.data)
    } catch (e) {
      setError(
        e?.response?.data?.detail ||
        'Failed to connect to backend'
      )
    } finally {
      setLoading(false)
    }
  }

  const parsed = result?.parsed || {}

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          AI Triage Assistant 
        </h1>
      </div>

      <div className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700">

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Paste your message here...

Example: I was charged twice for ₹999, please refund."
          rows={6}
          className="w-full bg-[#0f172a] border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleSubmit}
          disabled={!query.trim() || loading}
          className="mt-4 bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-xl text-white flex items-center gap-2 transition"
        >
          {loading ? 'Analyzing...' : <> <Zap size={16}/> Run Triage</>}
        </button>

      </div>
      {error && (
        <div className="bg-red-900/30 border border-red-700 p-4 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >

          <div className="bg-[#1e293b] p-5 rounded-2xl border border-gray-700">
            <h3 className="text-gray-400 text-sm mb-1">Intent</h3>
            <p className="text-white font-semibold text-lg">
              {parsed.intent || parsed.category || 'Not detected'}
            </p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-2xl border border-gray-700">
            <h3 className="text-gray-400 text-sm mb-1">Urgency</h3>
            <p className="text-white font-semibold text-lg">
              {parsed.urgency || 'Unknown'}
            </p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-2xl border border-gray-700">
            <h3 className="text-gray-400 text-sm mb-2">AI Response</h3>
            <p className="text-gray-300 text-sm whitespace-pre-line">
              {result.ai_response}
            </p>
          </div>

        </motion.div>
      )}

    </div>
  )
}