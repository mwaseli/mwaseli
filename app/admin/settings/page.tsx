import { Settings, Bell, Lock, Palette } from 'lucide-react'

export default function AdminSettings() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Settings className="w-8 h-8" />
          System Settings
        </h1>
        <p className="text-slate-400">
          Configure system-wide settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Palette className="w-6 h-6" />
            General Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Platform Name
              </label>
              <input
                type="text"
                defaultValue="MWASE AI Agent"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Support Email
              </label>
              <input
                type="email"
                defaultValue="support@mwaseai.com"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-lg transition">
              Save Settings
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Notifications
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Daily Summary', enabled: true },
              { label: 'User Alerts', enabled: true },
              { label: 'Error Notifications', enabled: true },
              { label: 'System Updates', enabled: false },
            ].map((notif, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={notif.enabled}
                  className="w-4 h-4"
                />
                <span className="text-slate-300">{notif.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Security
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-lg transition">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
