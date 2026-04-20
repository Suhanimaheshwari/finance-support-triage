import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function DashboardHome() {
  const navigate = useNavigate()
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const ticketsRes = await api.listTickets({ page: 1, per_page: 5 })
        setRecent(ticketsRes.data.tickets || [])
      } catch (e) {
        setError('Could not reach the backend. Make sure the API server is running.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-10 max-w-6xl">

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-3xl text-white shadow-xl">
        <h1 className="text-3xl font-bold">
          AI Finance Assistant 
        </h1>
        <p className="mt-2 opacity-80">
          Automate support, detect urgency, and resolve faster.
        </p>

        <button
          onClick={() => navigate('/dashboard/triage')}
          className="mt-4 bg-white text-black px-4 py-2 rounded-xl font-medium hover:scale-105 transition"
        >
          Run New Triage
        </button>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-xl px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700">
        <h3 className="text-white font-semibold mb-2">
          System Overview
        </h3>
        <p className="text-gray-400 text-sm">
          Your AI assistant is ready to analyze finance queries and generate responses in real-time.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div
          onClick={() => navigate('/dashboard/triage')}
          className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700 hover:scale-105 cursor-pointer transition"
        >
          <h3 className="text-white text-lg font-semibold">
             Analyze Query
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            Classify and respond instantly using AI
          </p>
        </div>

        <div
          onClick={() => navigate('/dashboard/tickets')}
          className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700 hover:scale-105 cursor-pointer transition"
        >
          <h3 className="text-white text-lg font-semibold">
             Manage Tickets
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            View and manage all support requests
          </p>
        </div>

      </div>

      <div className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold">
            Recent Tickets
          </h3>
          <button
            onClick={() => navigate('/dashboard/tickets')}
            className="text-indigo-400 text-sm hover:underline"
          >
            View all →
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : recent.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No tickets yet. Run a triage to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {recent.map((t) => (
              <div
                key={t.id}
                onClick={() => navigate('/dashboard/tickets')}
                className="p-3 bg-[#0f172a] rounded-xl border border-gray-700 hover:bg-[#1e293b] cursor-pointer transition"
              >
                <p className="text-white text-sm truncate">
                  {t.query}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  #{t.id.slice(-6)} • {t.urgency || t.parsed?.urgency || 'unknown'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}