'use client'

import { useEffect, useState } from 'react'
import { User as AuthUser } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { Zap } from 'lucide-react'

interface UserProfile {
  id: string
  email: string
  full_name: string
  credits: number
  subscription_tier: string
}

export default function DashboardHeader({ user }: { user: AuthUser }) {
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
        <h1 className="text-2xl font-bold text-white">Welcome Back!</h1>
        <p className="text-slate-400">
          {loading ? 'Loading...' : profile?.full_name || user.email}
        </p>
      </div>

      <div className="flex items-center gap-6">
        {/* Credits Display */}
        {profile && (
          <div className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-lg border border-slate-600">
            <Zap className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-xs text-slate-400">Credits</p>
              <p className="text-lg font-bold text-white">{profile.credits}</p>
            </div>
          </div>
        )}

        {/* User Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {profile?.full_name?.charAt(0) || user.email?.charAt(0)}
          </span>
        </div>
      </div>
    </header>
  )
}
