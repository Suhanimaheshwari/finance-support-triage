import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ChevronLeft, ChevronRight, RefreshCw, ExternalLink } from 'lucide-react'
import UrgencyBadge from '../components/UrgencyBadge'
import Spinner from '../components/Spinner'
import { api } from '../services/api'

const STATUS_OPTIONS = ['', 'PROCESSING', 'RESOLVED', 'PENDING']
const URGENCY_OPTIONS = ['', 'high', 'medium', 'low']

export default function Tickets() {
  const [tickets, setTickets] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [status, setStatus] = useState('')
  const [urgency, setUrgency] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)

  const fetchTickets = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = { page, per_page: perPage }
      if (status) params.status = status
      if (urgency) params.urgency = urgency
      const res = await api.listTickets(params)
      setTickets(res.data.tickets || [])
      setTotalPages(res.data.total_pages || 1)
    } catch {
      setError('Failed to load tickets. Check your API connection.')
    } finally {
      setLoading(false)
    }
  }, [page, perPage, status, urgency])

  useEffect(() => { fetchTickets() }, [fetchTickets])

  async function viewDetail(id) {
    setDetailLoading(true)
    try {
      const res = await api.getTicket(id)
      setSelected(res.data)
    } catch {}
    setDetailLoading(false)
  }

  const filtered = search
    ? tickets.filter(t =>
        t.query?.toLowerCase().includes(search.toLowerCase()) ||
        t.id?.includes(search)
      )
    : tickets

  return (
    <div className="max-w-6xl space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">
            All triaged support queries and their AI results
          </p>
        </div>
        <button
          onClick={fetchTickets}
          className="flex items-center gap-2 text-sm bg-[#1e293b] border border-gray-700 px-3 py-2 rounded-xl text-gray-300 hover:bg-[#334155]"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <div className="bg-[#1e293b] border border-gray-700 p-4 rounded-2xl flex flex-wrap gap-3 items-center">

        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0f172a] border border-gray-700 text-white placeholder-gray-400 pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1) }}
          className="bg-[#0f172a] border border-gray-700 text-white px-3 py-2 rounded-xl"
        >
          <option value="">All Status</option>
          {STATUS_OPTIONS.filter(Boolean).map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={urgency}
          onChange={(e) => { setUrgency(e.target.value); setPage(1) }}
          className="bg-[#0f172a] border border-gray-700 text-white px-3 py-2 rounded-xl"
        >
          <option value="">All Urgencies</option>
          {URGENCY_OPTIONS.filter(Boolean).map(u => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>

      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-xl px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="bg-[#1e293b] border border-gray-700 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-[#0f172a] text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-5 py-3 text-left">ID</th>
              <th className="px-5 py-3 text-left">Message</th>
              <th className="px-5 py-3 text-left">Intent</th>
              <th className="px-5 py-3 text-left">Urgency</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Date</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center">
                  <Spinner size={20} className="mx-auto text-indigo-400" />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-400">
                  No tickets found
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-gray-700 hover:bg-[#0f172a] cursor-pointer"
                  onClick={() => viewDetail(t.id)}
                >
                  <td className="px-5 py-3 text-gray-400 text-xs">
                    #{t.id?.slice(-6)}
                  </td>

                  <td className="px-5 py-3 text-white max-w-[220px] truncate">
                    {t.query}
                  </td>

                  <td className="px-5 py-3 text-gray-300">
                    {t.category || '—'}
                  </td>

                  <td className="px-5 py-3">
                    <UrgencyBadge urgency={t.urgency || t.parsed?.urgency} />
                  </td>

                  <td className="px-5 py-3 text-gray-300">
                    {t.status}
                  </td>

                  <td className="px-5 py-3 text-gray-400 text-xs">
                    {t.date ? new Date(t.date).toLocaleString() : '—'}
                  </td>

                  <td className="px-5 py-3">
                    <ExternalLink size={14} className="text-gray-500" />
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>

        <div className="px-5 py-3 border-t border-gray-700 flex justify-between items-center text-sm text-gray-400">
          <span>Page {page} of {totalPages}</span>

          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))}>
              <ChevronLeft />
            </button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
              <ChevronRight />
            </button>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-[#1e293b] border border-gray-700 rounded-2xl p-6 w-full max-w-xl text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-semibold mb-3">Ticket Detail</h3>
              <p className="text-gray-300 text-sm">{selected.query}</p>

              {selected.ai_response && (
                <div className="mt-4 text-sm text-gray-400">
                  {selected.ai_response}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}