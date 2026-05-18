'use client'

import { useState } from 'react'
import { Settings, Key, Zap, User, Palette } from 'lucide-react'
import toast from 'react-hot-toast'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'api-keys', label: 'API Keys', icon: Key },
  { id: 'credits', label: 'Credits & Billing', icon: Zap },
  { id: 'appearance', label: 'Appearance', icon: Palette },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Profile updated successfully!')
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Settings className="w-8 h-8" />
          Settings
        </h1>
        <p className="text-slate-400">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-2 sticky top-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-slate-700 text-cyan-400 border border-cyan-500'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'api-keys' && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">API Keys</h2>
              <p className="text-slate-400 mb-6">
                Add your API keys for external AI providers (Replicate, HuggingFace, OpenAI)
              </p>
              <div className="space-y-6">
                {['Replicate', 'HuggingFace', 'OpenAI'].map((provider) => (
                  <div key={provider}>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {provider} API Key
                    </label>
                    <input
                      type="password"
                      placeholder={`Enter your ${provider} API key`}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                ))}
                <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition">
                  Save API Keys
                </button>
              </div>
            </div>
          )}

          {activeTab === 'credits' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-8 text-white">
                <p className="text-sm opacity-80 mb-2">Available Credits</p>
                <p className="text-4xl font-bold">1,000</p>
                <p className="text-sm opacity-80 mt-4">Free tier - Renews monthly</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Upgrade to Pro</h2>
                <p className="text-slate-400 mb-6">
                  Get unlimited credits and priority support
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition">
                  Upgrade Now
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Appearance</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="theme" defaultChecked className="w-4 h-4" />
                  <span className="text-slate-300">Dark Mode (Current)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer opacity-50">
                  <input type="radio" name="theme" className="w-4 h-4" disabled />
                  <span className="text-slate-300">Light Mode (Coming Soon)</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
