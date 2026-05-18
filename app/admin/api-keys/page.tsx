'use client'

import { Shield, Copy, Eye, EyeOff, Trash2, Plus } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface APIKey {
  id: string
  provider: string
  keyPrefix: string
  isActive: boolean
  lastUsed: string
  createdAt: string
}

export default function APIKeysPage() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])
  const [showForm, setShowForm] = useState(false)
  const [visibleKey, setVisibleKey] = useState<string | null>(null)
  const [newKey, setNewKey] = useState({
    provider: 'replicate',
    key: '',
  })

  const providers = [
    { id: 'replicate', name: 'Replicate', icon: '🎨' },
    { id: 'huggingface', name: 'HuggingFace', icon: '🤗' },
    { id: 'openai', name: 'OpenAI', icon: '🤖' },
  ]

  const handleAddKey = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKey.key) {
      toast.error('Please enter an API key')
      return
    }

    const newKeyData: APIKey = {
      id: Date.now().toString(),
      provider: newKey.provider,
      keyPrefix: newKey.key.substring(0, 10) + '...',
      isActive: true,
      lastUsed: 'Never',
      createdAt: new Date().toLocaleDateString(),
    }

    setApiKeys([...apiKeys, newKeyData])
    setNewKey({ provider: 'replicate', key: '' })
    setShowForm(false)
    toast.success('API key added successfully')
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8" />
            API Keys Management
          </h1>
          <p className="text-slate-400">
            Configure API keys for AI providers
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Key
        </button>
      </div>

      {/* Add Key Form */}
      {showForm && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Add New API Key</h2>
          <form onSubmit={handleAddKey} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Provider
              </label>
              <select
                value={newKey.provider}
                onChange={(e) => setNewKey({ ...newKey, provider: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
              >
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                API Key
              </label>
              <input
                type="password"
                placeholder="sk-xxx..."
                value={newKey.key}
                onChange={(e) => setNewKey({ ...newKey, key: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-lg transition"
              >
                Add Key
              </button>
            </div>
          </form>
        </div>
      )}

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
            <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No API keys configured yet</p>
          </div>
        ) : (
          apiKeys.map((key) => {
            const provider = providers.find((p) => p.id === key.provider)
            return (
              <div
                key={key.id}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-red-500 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{provider?.icon}</span>
                      <h3 className="text-lg font-semibold text-white">{provider?.name}</h3>
                      {key.isActive && (
                        <span className="px-2 py-1 bg-green-500 bg-opacity-20 text-green-400 rounded text-xs font-semibold">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-slate-400">
                      <p>Key: {key.keyPrefix}</p>
                      <p>Last Used: {key.lastUsed}</p>
                      <p>Added: {key.createdAt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        toast.success('Copied to clipboard')
                        setVisibleKey(visibleKey === key.id ? null : key.id)
                      }}
                      className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300 hover:text-white"
                    >
                      {visibleKey === key.id ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <button className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300 hover:text-white">
                      <Copy className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition text-slate-300 hover:text-red-400">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
