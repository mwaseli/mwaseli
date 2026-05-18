'use client'

import { useState } from 'react'
import { Image, Filter, Download, Trash2, Share2 } from 'lucide-react'

export default function GalleryPage() {
  const [filterType, setFilterType] = useState('all')
  const [galleryItems] = useState<any[]>([])

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Gallery</h1>
          <p className="text-slate-400">
            View and manage your generated creations
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-8">
        <div className="flex items-center gap-4 overflow-x-auto">
          <Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
          {[
            { id: 'all', label: 'All' },
            { id: 'images', label: 'Images' },
            { id: 'videos', label: 'Videos' },
            { id: 'voice', label: 'Voice' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterType(filter.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                filterType === filter.id
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {galleryItems.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
          <Image className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No items yet</h2>
          <p className="text-slate-400 mb-6">
            Start creating images, videos, and audio to build your gallery
          </p>
          <a
            href="/dashboard/image-generator"
            className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition"
          >
            Create Something
          </a>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500 transition group"
            >
              <div className="relative bg-slate-700 aspect-square overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded-lg transition">
                    <Download className="w-5 h-5 text-white" />
                  </button>
                  <button className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded-lg transition">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition">
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm text-slate-300 truncate">{item.title}</p>
                <p className="text-xs text-slate-500">{item.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
