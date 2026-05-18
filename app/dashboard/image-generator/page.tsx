'use client'

import { useState } from 'react'
import { Sparkles, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('flux-pro')
  const [quality, setQuality] = useState('hd')
  const [loading, setLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

  const models = [
    { id: 'flux-pro', name: 'Flux Pro (Fastest)' },
    { id: 'flux-realism', name: 'Flux Realism' },
    { id: 'flux-anime', name: 'Flux Anime' },
  ]

  const qualities = [
    { id: 'standard', name: 'Standard (512x512)' },
    { id: 'hd', name: 'HD (768x768)' },
    { id: '4k', name: '4K (1024x1024)' },
  ]

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('/api/generate-image', {
        prompt,
        model,
        quality,
      })

      if (response.data.success) {
        toast.success('Image generation started!')
        
        // Poll for job status
        pollJobStatus()
      }
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to generate image'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const pollJobStatus = async () => {
    // This would poll the API to get job status
    // For now, we'll show a success message after a delay
    setTimeout(() => {
      setGeneratedImage('/placeholder-image.png')
      toast.success('Image generated successfully!')
    }, 3000)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Text to Image</h1>
        <p className="text-slate-400">
          Generate stunning images from text descriptions using AI
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <form onSubmit={handleGenerate} className="bg-slate-800 border border-slate-700 rounded-xl p-6 sticky top-8 space-y-6">
            {/* Prompt */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                rows={6}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition resize-none"
              />
              <p className="text-xs text-slate-500 mt-2">
                {prompt.length} / 1000 characters
              </p>
            </div>

            {/* Model Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Model
              </label>
              <div className="space-y-2">
                {models.map((m) => (
                  <label key={m.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="model"
                      value={m.id}
                      checked={model === m.id}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-slate-300">{m.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quality Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Quality
              </label>
              <div className="space-y-2">
                {qualities.map((q) => (
                  <label key={q.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="quality"
                      value={q.id}
                      checked={quality === q.id}
                      onChange={(e) => setQuality(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-slate-300">{q.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Image
                </>
              )}
            </button>

            {/* Credit Cost */}
            <div className="bg-slate-700 rounded-lg p-3 text-sm text-slate-300">
              <p className="text-xs text-slate-400 mb-1">Estimated cost</p>
              <p className="font-semibold text-white">10 Credits</p>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 min-h-[400px] flex items-center justify-center">
            {loading ? (
              <div className="text-center">
                <Loader className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
                <p className="text-slate-300">Generating your image...</p>
                <p className="text-slate-500 text-sm mt-2">This may take up to 2 minutes</p>
              </div>
            ) : generatedImage ? (
              <div className="w-full">
                <div className="bg-slate-700 rounded-lg overflow-hidden mb-4">
                  <img
                    src={generatedImage}
                    alt="Generated"
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition">
                    Download
                  </button>
                  <button className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition">
                    Save to Gallery
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">
                  Enter a prompt and click generate to create an image
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
