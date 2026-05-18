'use client'

import { useState, useEffect } from 'react'
import { Users, Search, Edit, Trash2, Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

interface User {
  id: string
  email: string
  full_name: string
  credits: number
  subscription_tier: string
  created_at: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, credits, subscription_tier, created_at')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUpdateCredits = async (userId: string, newCredits: number) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('profiles')
        .update({ credits: newCredits })
        .eq('id', userId)

      if (error) throw error
      
      setUsers(users.map(u => u.id === userId ? { ...u, credits: newCredits } : u))
      setEditingUser(null)
      toast.success('Credits updated successfully')
    } catch (error) {
      console.error('Error updating credits:', error)
      toast.error('Failed to update credits')
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Users className="w-8 h-8" />
            User Management
          </h1>
          <p className="text-slate-400">
            Manage users, credits, and subscriptions
          </p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-lg transition flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-3 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search users by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700 border-b border-slate-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Credits</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Joined</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {user.full_name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <span className="text-white font-medium">{user.full_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-yellow-500 bg-opacity-20 text-yellow-400 rounded-lg text-sm font-semibold">
                        {user.credits}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 capitalize">{user.subscription_tier}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="p-2 hover:bg-slate-600 rounded-lg transition text-slate-300 hover:text-white"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition text-slate-300 hover:text-red-400">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-6">Edit User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editingUser.full_name}
                  disabled
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Credits
                </label>
                <input
                  type="number"
                  defaultValue={editingUser.credits}
                  onChange={(e) => setEditingUser({ ...editingUser, credits: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setEditingUser(null)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateCredits(editingUser.id, editingUser.credits)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-lg transition font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
