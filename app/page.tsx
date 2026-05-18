'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Sparkles, Image as ImageIcon, Video, Zap, Home } from 'lucide-react'

const generators = [
  { id: 'text-to-image', name: 'AI Image', icon: ImageIcon, path: '/generate/text-to-image' },
  { id: 'text-to-video', name: 'AI Video', icon: Video, path: '/generate/text-to-video' },
  { id: 'image-to-image', name: 'Image Edit', icon: ImageIcon, path: '/generate/image-to-image' },
  { id: 'text-to-voice', name: 'Text to Voice', icon: Zap, path: '/generate/text-to-voice' },
]

const trendingModels = [
  { name: 'Elegant Aura', category: 'trending' },
  { name: 'Fairy Awakening', category: 'hot' },
  { name: 'Golden Vlog', category: 'hot' },
  { name: 'Happy Hops', category: 'new' },
  { name: 'AI Dance', category: 'trending' },
  { name: 'Gender Swap', category: 'hot' },
]

export default function HomePage() {
  const [prompt, setPrompt] = useState('')

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">MWASE AI</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800 transition text-slate-400 hover:text-white">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Generator Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {generators.map((gen) => {
            const Icon = gen.icon
            return (
              <Link
                key={gen.id}
                href={gen.path}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-purple-500 transition p-6 text-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-lg group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="font-semibold text-white text-sm">{gen.name}</span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Prompt Input Section */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Create with AI</h2>
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your vision..."
            className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition resize-none"
          />

          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition">
              Generate
            </button>
            <button className="px-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition">
              Enhance
            </button>
          </div>
        </div>

        {/* Trending Models */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Trending Models</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {trendingModels.map((model, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-slate-700 p-6 group cursor-pointer hover:border-purple-500 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-white group-hover:text-purple-300 transition">{model.name}</h4>
                  {model.category === 'hot' && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Hot</span>}
                  {model.category === 'new' && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">New</span>}
                </div>
                <div className="h-20 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-600">
                  <ImageIcon className="w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generated Results Section */}
        <div className="mt-12 text-center">
          <div className="flex justify-center mb-4">
            <ImageIcon className="w-16 h-16 text-slate-700" />
          </div>
          <p className="text-slate-400">Your generated images will appear here</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p>MWASE AI Generator - Free AI Image & Video Generation</p>
        </div>
      </footer>
    </div>
  )
}
