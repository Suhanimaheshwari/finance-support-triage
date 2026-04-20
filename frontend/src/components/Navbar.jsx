import React from 'react'
import { useLocation } from 'react-router-dom'

const titles = {
  '/dashboard': 'Overview',
  '/dashboard/triage': 'AI Assistant',
  '/dashboard/tickets': 'Activity',
}

export default function Navbar() {
  const { pathname } = useLocation()
  const title = titles[pathname] || 'Dashboard'

  return (
    <header className="h-16 flex items-center px-6 border-b border-gray-800 bg-[#0f172a]">
      
      <h1 className="text-lg font-semibold text-white">
        {title}
      </h1>

    </header>
  )
}