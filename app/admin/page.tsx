import { Users, TrendingUp, Zap, Activity } from 'lucide-react'
import Link from 'next/link'

const stats = [
  {
    icon: Users,
    label: 'Total Users',
    value: '0',
    change: '+0%',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Activity,
    label: 'Total Generations',
    value: '0',
    change: '+0%',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Zap,
    label: 'Credits Used',
    value: '0',
    change: '+0%',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    icon: TrendingUp,
    label: 'Revenue',
    value: '$0',
    change: '+0%',
    color: 'from-green-500 to-emerald-600'
  },
]

const recentActivities = [
  { id: '1', user: 'User 1', action: 'Generated Image', timestamp: 'Just now' },
  { id: '2', user: 'User 2', action: 'Created Account', timestamp: '2 mins ago' },
]

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">MWASE AI Admin Control Panel</h1>
        <p className="text-lg opacity-90">
          Manage users, credits, analytics, and system settings
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={idx}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-green-400 text-sm font-semibold">{stat.change} this month</p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/users"
              className="block w-full p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition text-center font-semibold"
            >
              Manage Users
            </Link>
            <Link
              href="/admin/credits"
              className="block w-full p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition text-center font-semibold"
            >
              Edit Credits
            </Link>
            <Link
              href="/admin/analytics"
              className="block w-full p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition text-center font-semibold"
            >
              View Analytics
            </Link>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">System Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">API Status</span>
              <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-400 rounded-lg text-sm font-semibold">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Database</span>
              <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-400 rounded-lg text-sm font-semibold">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Storage</span>
              <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-400 rounded-lg text-sm font-semibold">
                Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No recent activity</p>
          ) : (
            recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-slate-700 rounded-lg"
              >
                <div>
                  <p className="text-white font-medium">{activity.user}</p>
                  <p className="text-slate-400 text-sm">{activity.action}</p>
                </div>
                <span className="text-slate-500 text-sm">{activity.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
