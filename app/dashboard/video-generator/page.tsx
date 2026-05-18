'use client'

import { Video, Loader, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function VideoGeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [duration, setDuration] = useState(30)
  const [loading] = useState(false)

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Text to Video</h1>
        <p className="text-slate-400">
          Create videos up to 50 minutes long from text descriptions
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form className="bg-slate-800 border border-slate-700 rounded-xl p-6 sticky top-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Video Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the video you want to create..."
                rows={6}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Duration: {duration} seconds
              </label>
              <input
                type="range"
                min="5"
                max="3000"
                step="5"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 mt-2">
                {Math.floor(duration / 60)} min {duration % 60} sec
              </p>
            </div>

            <button
              type="button"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Video className="w-5 h-5" />
                  Generate Video
                </>
              )}
            </button>

            <div className="bg-slate-700 rounded-lg p-3 text-sm text-slate-300">
              <p className="text-xs text-slate-400 mb-1">Estimated cost</p>
              <p className="font-semibold text-white">50 Credits</p>
            </div>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">
                Enter a prompt and select duration to create a video
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Video generation may take several minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
