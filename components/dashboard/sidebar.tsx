'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Image, Video, Wand2, Settings, BarChart3, LogOut, Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

const menuItems = [
  { icon: Sparkles, label: 'Dashboard', href: '/dashboard' },
  { icon: Image, label: 'Image Generator', href: '/dashboard/image-generator' },
  { icon: Video, label: 'Video Generator', href: '/dashboard/video-generator' },
  { icon: Wand2, label: 'Image to Image', href: '/dashboard/image-to-image' },
  { icon: Zap, label: 'Text to Voice', href: '/dashboard/text-to-voice' },
  { icon: BarChart3, label: 'Gallery', href: '/dashboard/gallery' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const supabase = createClient()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await supabase.auth.signOut()
      window.location.href = '/auth/login'
    } catch (error) {
      console.error('Logout error:', error)
      setIsLoggingOut(false)
    }
  }

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">MWASE AI</h1>
            <p className="text-xs text-slate-400">Pro Edition</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-slate-700 text-cyan-400 border border-cyan-500'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-6 border-t border-slate-700">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-red-400 transition disabled:opacity-50"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </aside>
  )
}
