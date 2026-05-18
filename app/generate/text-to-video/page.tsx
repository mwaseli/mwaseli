'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2, Video } from 'lucide-react'
import toast from 'react-hot-toast'

const videoModels = [
  { id: 'video-1.0', name: 'Video 1.0', premium: false },
  { id: 'video-3.0', name: 'Video 3.0', premium: true },
]

const durations = [15, 30, 45, 60]
const qualities = ['720p', '1080p', '4K']

export default function TextToVideoPage() {
  const [prompt, setPrompt] = useState('')
  const [duration, setDuration] = useState(30)
  const [quality, setQuality] = useState('720p')
  const [model, setModel] = useState('video-1.0')
  const [loading, setLoading] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          duration,
          quality,
          model,
        }),
      })

      const data = await response.json()
      if (data.success && data.videoUrl) {
        setGeneratedVideo(data.videoUrl)
        toast.success('Video generated successfully!')
      } else {
        toast.error(data.error || 'Failed to generate video')
      }
    } catch (error) {
      toast.error('Error generating video')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-800 rounded-lg transition">
              <ArrowLeft className="w-6 h-6 text-slate-400" />
            </Link>
            <h1 className="text-xl font-bold text-white">Video Generator</h1>
          </div>
          <span className="text-sm text-slate-400">Video 3.0</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">AI Video</h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-slate-700">
            <button className="px-4 py-3 font-semibold text-white border-b-2 border-purple-600">
              Text to Video
            </button>
            <button className="px-4 py-3 font-semibold text-slate-400 hover:text-white transition">
              Frames
            </button>
            <button className="px-4 py-3 font-semibold text-slate-400 hover:text-white transition">
              Motion Control
            </button>
          </div>

          {/* Prompt Input */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your vision..."
            className="w-full h-40 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-purple-500 focus:outline-none transition resize-none"
          />

          {/* Video Settings */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-3">Duration (seconds)</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {durations.map((d) => (
                  <option key={d} value={d}>{d}s</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-3">Quality</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {qualities.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-3">Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {videoModels.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Smart Multi-Shot Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div>
              <p className="font-semibold text-white">Smart Multi-Shot</p>
              <p className="text-sm text-slate-400">Generate multiple shots automatically</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <span>135 Credits</span>
                Generate
              </>
            )}
          </button>

          {/* Legal Notice */}
          <p className="text-xs text-slate-500 text-center">
            It is prohibited to use AI generated content for illegal activities
          </p>

          {/* Video Display */}
          <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center">
            {generatedVideo ? (
              <video
                src={generatedVideo}
                controls
                className="w-full rounded-lg"
              />
            ) : (
              <div className="py-16">
                <div className="flex justify-center mb-4">
                  <Video className="w-16 h-16 text-slate-600" />
                </div>
                <p className="text-slate-400">Your generated video will appear here</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
