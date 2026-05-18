import Link from 'next/link'
import { getCurrentUser, getUserProfile } from '@/lib/auth'
import { Image, Video, Wand2, Zap, TrendingUp } from 'lucide-react'

export const metadata = {
  title: 'Dashboard - MWASE AI',
}

const features = [
  {
    icon: Image,
    title: 'Text to Image',
    description: 'Generate stunning images from text descriptions',
    href: '/dashboard/image-generator',
    color: 'from-pink-500 to-rose-600'
  },
  {
    icon: Video,
    title: 'Text to Video',
    description: 'Create videos from text prompts',
    href: '/dashboard/video-generator',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Wand2,
    title: 'Image to Image',
    description: 'Transform and edit existing images',
    href: '/dashboard/image-to-image',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Zap,
    title: 'Text to Voice',
    description: 'Generate natural-sounding audio from text',
    href: '/dashboard/text-to-voice',
    color: 'from-amber-500 to-orange-600'
  },
]

export default async function DashboardPage() {
  const user = await getCurrentUser()
  const profile = user ? await getUserProfile(user.id) : null

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-3">Welcome to MWASE AI Agent</h1>
        <p className="text-lg opacity-90 mb-4">
          Generate images, videos, 3D models, and more with powerful AI tools
        </p>
        <div className="flex items-center gap-4">
          {profile && (
            <>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <p className="text-sm opacity-80">Available Credits</p>
                <p className="text-2xl font-bold">{profile.credits}</p>
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <p className="text-sm opacity-80">Plan</p>
                <p className="text-2xl font-bold capitalize">{profile.subscription_tier}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link
                key={feature.href}
                href={feature.href}
                className="group bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-cyan-500 transition hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <div className={`bg-gradient-to-br ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
                <div className="mt-4 text-cyan-400 font-semibold group-hover:translate-x-2 transition">
                  Get Started →
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Total Generations</h3>
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Storage Used</h3>
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-white">0 MB</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Active Since</h3>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">Today</p>
        </div>
      </div>
    </div>
  )
}
