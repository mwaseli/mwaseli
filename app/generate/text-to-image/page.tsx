'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const styles = [
  'AI Image Generator',
  'Cute Creature',
  'Fantasy World',
  'Cyberpunk',
  'Anime Portrait',
  'Old Drawing',
  'Realistic',
]

const shapes = [
  { name: 'Wide', ratio: '16:9' },
  { name: 'Landscape', ratio: '4:3' },
  { name: 'Square', ratio: '1:1' },
  { name: 'Portrait', ratio: '3:4' },
  { name: 'Tall', ratio: '9:16' },
]

const models = [
  { id: 'hd', name: 'HD', premium: false },
  { id: 'genius', name: 'Genius', premium: true },
  { id: 'super-genius', name: 'Super Genius', premium: true },
]

export default function TextToImagePage() {
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState(styles[0])
  const [selectedShape, setSelectedShape] = useState(shapes[2])
  const [selectedModel, setSelectedModel] = useState('hd')
  const [loading, setLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `${prompt} in ${selectedStyle} style`,
          model: selectedModel,
          shape: selectedShape.ratio,
        }),
      })

      const data = await response.json()
      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl)
        toast.success('Image generated successfully!')
      } else {
        toast.error(data.error || 'Failed to generate image')
      }
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Error generating image')
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
            <h1 className="text-xl font-bold text-white">Image Generator</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Create an image from text prompt</h2>
          </div>

          {/* Prompt Input */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a image prompt"
            className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-purple-500 focus:outline-none transition resize-none"
          />

          <div className="text-right">
            <button className="text-purple-400 hover:text-purple-300 flex items-center gap-2 ml-auto">
              <Sparkles className="w-4 h-4" />
              Enhance
            </button>
          </div>

          {/* Model Selection */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Choose a model</h3>
            <div className="flex gap-3 flex-wrap">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`px-6 py-2 rounded-full font-semibold transition ${
                    selectedModel === model.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  } ${model.premium ? 'flex items-center gap-2' : ''}`}
                >
                  {model.name}
                  {model.premium && <span>🔒</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Style Selection */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Choose a style</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`p-4 rounded-xl border-2 transition text-center ${
                    selectedStyle === style
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="h-16 bg-slate-900/50 rounded-lg mb-2 flex items-center justify-center">
                    <ImagePlaceholder />
                  </div>
                  <p className="text-sm text-white font-medium">{style}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Shape Selection */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Choose Shape</h3>
            <div className="grid grid-cols-5 gap-3">
              {shapes.map((shape) => (
                <button
                  key={shape.name}
                  onClick={() => setSelectedShape(shape)}
                  className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                    selectedShape.name === shape.name
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="text-slate-400">📐</div>
                  <p className="text-xs text-white font-medium">{shape.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </button>

          {/* Generated Image Display */}
          <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center">
            {generatedImage ? (
              <img src={generatedImage} alt="Generated" className="w-full rounded-lg" />
            ) : (
              <div className="py-16">
                <div className="flex justify-center mb-4">
                  <ImagePlaceholder />
                </div>
                <p className="text-slate-400">Your generated image will appear here</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function ImagePlaceholder() {
  return (
    <svg
      className="w-16 h-16 text-slate-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )
}
