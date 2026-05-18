'use client'

import { Zap, Plus, Settings } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function CreditsPage() {
  const [selectedUser, setSelectedUser] = useState('')
  const [creditAmount, setCreditAmount] = useState('')
  const [reason, setReason] = useState('manual_adjustment')

  const handleAddCredits = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser || !creditAmount) {
      toast.error('Please fill in all fields')
      return
    }
    toast.success('Credits added successfully')
    setCreditAmount('')
    setSelectedUser('')
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Zap className="w-8 h-8" />
          Credits Management
        </h1>
        <p className="text-slate-400">
          Add or adjust user credits and manage pricing
        </p>
      </div>

      {/* Add Credits Form */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Add Credits to User</h2>
        <form onSubmit={handleAddCredits} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              User Email
            </label>
            <input
              type="email"
              placeholder="user@example.com"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Credits Amount
              </label>
              <input
                type="number"
                placeholder="100"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Reason
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
              >
                <option value="manual_adjustment">Manual Adjustment</option>
                <option value="refund">Refund</option>
                <option value="promotion">Promotion</option>
                <option value="bonus">Sign-up Bonus</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-lg transition flex items-center gap-2 w-full justify-center"
          >
            <Plus className="w-5 h-5" />
            Add Credits
          </button>
        </form>
      </div>

      {/* Credits Pricing */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Generation Costs</h2>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300 hover:text-white">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {[
            { task: 'Image Generation', cost: 10 },
            { task: 'Video Generation (30s)', cost: 50 },
            { task: 'Video Generation (1m)', cost: 100 },
            { task: 'Image to Image', cost: 15 },
            { task: 'Text to Voice (1min)', cost: 5 },
            { task: '3D Model Generation', cost: 75 },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600 hover:border-red-500 transition"
            >
              <span className="text-white font-medium">{item.task}</span>
              <div className="flex items-center gap-3">
                <span className="text-yellow-400 font-bold">{item.cost}</span>
                <input
                  type="number"
                  defaultValue={item.cost}
                  className="w-20 px-3 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-lg transition w-full">
          Save Pricing
        </button>
      </div>
    </div>
  )
}
