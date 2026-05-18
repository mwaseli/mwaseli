import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, BarChart3 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-800 bg-opacity-50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">MWASE AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="px-6 py-2 text-white hover:text-cyan-400 transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
          Generate <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Everything</span>
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          Create stunning images, videos, 3D models, and voice with AI. Text-to-image, image-to-video, video editing, and much more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/sign-up"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition"
          >
            Start Creating <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#features"
            className="px-8 py-4 border border-slate-600 hover:border-cyan-500 text-white font-semibold rounded-lg transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Powerful Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: 'AI Generation',
              description: 'Generate images, videos, 3D models, and voice with multiple AI providers'
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Powered by Replicate, HuggingFace, and OpenAI for optimal speed'
            },
            {
              icon: BarChart3,
              title: 'Pro Analytics',
              description: 'Track usage, manage credits, and monitor your AI projects'
            }
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="bg-slate-800 border border-slate-700 rounded-xl p-8 hover:border-cyan-500 transition"
              >
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Create?</h2>
        <p className="text-xl text-slate-400 mb-8">Start with 100 free credits</p>
        <Link
          href="/auth/sign-up"
          className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition"
        >
          Create Your Account
        </Link>
      </section>
    </div>
  )
}
