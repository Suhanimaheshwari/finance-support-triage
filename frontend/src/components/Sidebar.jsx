import { NavLink } from "react-router-dom"
import { LayoutDashboard, Zap, Ticket } from "lucide-react"

export default function Sidebar() {

  const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
   ${isActive 
     ? "bg-indigo-500 text-white shadow-md" 
     : "text-gray-400 hover:bg-white/10 hover:text-white"
   }`

  return (
    <div className="w-64 h-[95vh] m-3 rounded-2xl bg-[#020617] border border-gray-800 shadow-xl flex flex-col p-5">

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-indigo-400">
          FinTriage
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          AI Support System
        </p>
      </div>
      <nav className="space-y-2">

        <NavLink to="/dashboard" end  className={linkClass}>
          <LayoutDashboard size={18} />
          Overview
        </NavLink>

        <NavLink to="/dashboard/triage" end className={linkClass}>
          <Zap size={18} />
          AI Assistant
        </NavLink>

        <NavLink to="/dashboard/tickets" end className={linkClass}>
          <Ticket size={18} />
          Activity
        </NavLink>

      </nav>

      <div className="my-6 border-t border-gray-800"></div>

      <div className="mt-auto">
        <div className="bg-[#1e293b] p-4 rounded-xl border border-gray-700">
          <p className="text-sm text-white font-medium">
             AI Status
          </p>
          <p className="text-xs text-gray-400 mt-1">
            System ready for triage
          </p>
        </div>
      </div>

    </div>
  )
}