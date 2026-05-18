import { BarChart3, TrendingUp, Users, Zap } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <BarChart3 className="w-8 h-8" />
          Analytics
        </h1>
        <p className="text-slate-400">
          Detailed statistics and insights about your platform
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Users, label: 'Active Users', value: '0', trend: '+0%' },
          { icon: TrendingUp, label: 'Daily Generations', value: '0', trend: '+0%' },
          { icon: Zap, label: 'Credits Consumed', value: '0', trend: '+0%' },
          { icon: BarChart3, label: 'Revenue', value: '$0', trend: '+0%' },
        ].map((metric, idx) => {
          const Icon = metric.icon
          return (
            <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-sm">{metric.label}</p>
                  <p className="text-3xl font-bold text-white mt-2">{metric.value}</p>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-pink-600 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-green-400 text-sm font-semibold">{metric.trend}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Generation Statistics</h2>
        <div className="h-64 flex items-center justify-center border border-dashed border-slate-600 rounded-lg">
          <p className="text-slate-500">Charts will be displayed here</p>
        </div>
      </div>
    </div>
  )
}
