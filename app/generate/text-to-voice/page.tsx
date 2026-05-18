'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Volume2, Loader2, Play } from 'lucide-react'
import toast from 'react-hot-toast'

const voices = [
  { id: 'alloy', name: 'Alloy' },
  { id: 'echo', name: 'Echo' },
  { id: 'fable', name: 'Fable' },
  { id: 'onyx', name: 'Onyx' },
  { id: 'nova', name: 'Nova' },
  { id: 'shimmer', name: 'Shimmer' },
]

export default function TextToVoicePage() {
  const [text, setText] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('nova')
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error('Please enter text')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voice: selectedVoice,
        }),
      })

      const data = await response.json()
      if (data.success && data.audioUrl) {
        setAudioUrl(data.audioUrl)
        toast.success('Voice generated successfully!')
      } else {
        toast.error(data.error || 'Failed to generate voice')
      }
    } catch (error) {
      toast.error('Error generating voice')
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
            <h1 className="text-xl font-bold text-white">Text to Voice</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Convert Text to Voice</h2>
            <p className="text-slate-400">Create natural-sounding voice from any text</p>
          </div>

          {/* Text Input */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-40 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-purple-500 focus:outline-none transition resize-none"
          />

          {/* Voice Selection */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Choose Voice</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {voices.map((voice) => (
                <button
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  className={`p-4 rounded-lg border-2 transition font-semibold ${
                    selectedVoice === voice.id
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <Volume2 className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                  {voice.name}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Voice'
            )}
          </button>

          {/* Audio Player */}
          {audioUrl && (
            <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Generated Audio</h3>
              <audio
                src={audioUrl}
                controls
                className="w-full"
              />
              <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition flex items-center gap-2">
                <Play className="w-4 h-4" />
                Play
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
