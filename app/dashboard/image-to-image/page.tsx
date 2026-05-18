'use client'

import { Wand2, Upload, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function ImageToImagePage() {
  const [prompt, setPrompt] = useState('')
  const [strength, setStrength] = useState(0.7)

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Image to Image</h1>
        <p className="text-slate-400">
          Transform and edit existing images using AI
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form className="bg-slate-800 border border-slate-700 rounded-xl p-6 sticky top-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Upload Image
              </label>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-cyan-500 transition cursor-pointer">
                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">Click to upload or drag and drop</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Transformation Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe how you want to transform the image..."
                rows={5}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Strength: {Math.round(strength * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={strength}
                onChange={(e) => setStrength(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              type="button"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
            >
              <Wand2 className="w-5 h-5" />
              Transform Image
            </button>

            <div className="bg-slate-700 rounded-lg p-3 text-sm text-slate-300">
              <p className="text-xs text-slate-400 mb-1">Estimated cost</p>
              <p className="font-semibold text-white">15 Credits</p>
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Upload an image to get started</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
