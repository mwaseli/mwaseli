'use client'

import { User as AuthUser } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'

interface UserProfile {
  id: string
  email: string
  full_name: string
  is_admin: boolean
}

export default function AdminHeader({ user }: { user: AuthUser }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (!error) {
          setProfile(data)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user.id])

  return (
    <header className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">Administration</h1>
        <p className="text-slate-400">
          {loading ? 'Loading...' : `Welcome, ${profile?.full_name || user.email}`}
        </p>
      </div>

      <div className="flex items-center gap-6">
        {/* System Status */}
        <div className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-lg border border-slate-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <p className="text-sm text-slate-300">System Online</p>
        </div>

        {/* Admin Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {profile?.full_name?.charAt(0) || user.email?.charAt(0)}
          </span>
        </div>
      </div>
    </header>
  )
}
