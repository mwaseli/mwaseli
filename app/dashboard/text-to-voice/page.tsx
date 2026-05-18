'use client'

import { Volume2, Sparkles, Play } from 'lucide-react'
import { useState } from 'react'

const voices = [
  { id: 'nova', name: 'Nova (Female)' },
  { id: 'onyx', name: 'Onyx (Male)' },
  { id: 'alloy', name: 'Alloy' },
  { id: 'echo', name: 'Echo' },
  { id: 'fable', name: 'Fable' },
]

export default function TextToVoicePage() {
  const [text, setText] = useState('')
  const [voice, setVoice] = useState('nova')
  const [audioUrl] = useState<string | null>(null)

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Text to Voice</h1>
        <p className="text-slate-400">
          Generate natural-sounding audio from text
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form className="bg-slate-800 border border-slate-700 rounded-xl p-6 sticky top-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Text
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the text you want to convert to speech..."
                rows={8}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition resize-none"
              />
              <p className="text-xs text-slate-500 mt-2">
                {text.length} / 5000 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Voice
              </label>
              <div className="space-y-2">
                {voices.map((v) => (
                  <label key={v.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="voice"
                      value={v.id}
                      checked={voice === v.id}
                      onChange={(e) => setVoice(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-slate-300">{v.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
            >
              <Volume2 className="w-5 h-5" />
              Generate Voice
            </button>

            <div className="bg-slate-700 rounded-lg p-3 text-sm text-slate-300">
              <p className="text-xs text-slate-400 mb-1">Estimated cost</p>
              <p className="font-semibold text-white">5 Credits</p>
            </div>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 min-h-[300px] flex items-center justify-center">
            {audioUrl ? (
              <div className="w-full">
                <audio controls className="w-full mb-4">
                  <source src={audioUrl} type="audio/mpeg" />
                </audio>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition">
                    Download
                  </button>
                  <button className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" />
                    Generate New
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">Enter text and select a voice to generate audio</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
