import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
        
        <Navbar />

        <div className="p-6">
          <Outlet />  
        </div>

      </div>
    </div>
  )
}