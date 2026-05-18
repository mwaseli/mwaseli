'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ImageToImagePage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [strength, setStrength] = useState(0.7)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!uploadedImage || !prompt.trim()) {
      toast.error('Please upload an image and enter a prompt')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/edit-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: uploadedImage,
          prompt,
          strength,
        }),
      })

      const data = await response.json()
      if (data.success && data.imageUrl) {
        setResult(data.imageUrl)
        toast.success('Image edited successfully!')
      } else {
        toast.error(data.error || 'Failed to edit image')
      }
    } catch (error) {
      toast.error('Error editing image')
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
            <h1 className="text-xl font-bold text-white">Image Editor</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Upload Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Upload Image</h2>
            <label className="flex items-center justify-center w-full h-48 border-2 border-dashed border-slate-700 rounded-xl hover:border-purple-500 transition cursor-pointer bg-slate-900/50">
              <div className="text-center">
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded" className="h-full w-full object-cover rounded-lg" />
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-slate-500 mx-auto mb-2" />
                    <p className="text-slate-400">Upload only JPG and PNG images.</p>
                    <p className="text-sm text-slate-500">File Size &lt; 10M, Dimension &gt; 300px.</p>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Prompt Input */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Prompt</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Use quotation marks for speaking/singing content. For example, Host says, 'welcome to today's release.' Support multiple languages, dialects and accents."
              className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-purple-500 focus:outline-none transition resize-none"
            />
          </div>

          {/* Strength Slider */}
          <div>
            <label className="block text-sm font-semibold text-white mb-3">
              Strength: {(strength * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={strength}
              onChange={(e) => setStrength(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !uploadedImage}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Editing...
              </>
            ) : (
              'Generate'
            )}
          </button>

          {/* Result */}
          {result && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Edited Image</h3>
              <img src={result} alt="Edited result" className="w-full rounded-xl" />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
