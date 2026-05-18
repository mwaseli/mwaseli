'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SignUpSuccessPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Content */}
          <h1 className="text-3xl font-bold text-white mb-3">Account Created!</h1>
          <p className="text-slate-400 mb-6">
            We&apos;ve sent a confirmation email to verify your account. Please check your inbox and click the confirmation link.
          </p>

          {/* Action */}
          <Link
            href="/auth/login"
            className="inline-block w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Go to Login
          </Link>

          <p className="text-slate-500 text-sm mt-6">
            Once you confirm your email, you can access all features of MWASE AI Agent.
          </p>
        </div>
      </div>
    </div>
  )
}
