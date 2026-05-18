import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, duration = 30, quality = '720p', model = 'video-1.0' } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Valid prompt is required' }, { status: 400 })
    }

    const apiKey = process.env.REPLICATE_API_TOKEN
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Map quality to resolution
    const resolutionMap: Record<string, [number, number]> = {
      '720p': [1280, 720],
      '1080p': [1920, 1080],
      '4K': [3840, 2160],
    }

    const [width, height] = resolutionMap[quality] || [1280, 720]

    // Use Replicate to generate video with Kling model
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${apiKey}`,
      },
      body: JSON.stringify({
        version: '9b01b3a183b598e27cd7b4cf3d5fe4c1b97e5b5b9d8c5e7f8a9b0c1d2e3f4a5b',
        input: {
          prompt: prompt.substring(0, 2000),
          duration: Math.min(duration, 60),
          negative_prompt: '',
          num_frames: Math.min(duration * 10, 600),
        },
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('[v0] Video generation error:', result)
      return NextResponse.json({
        error: result.detail || 'Failed to generate video',
        success: false,
      }, { status: response.status })
    }

    // Poll for completion (videos take longer)
    let prediction = result
    let attempts = 0
    const maxAttempts = 120 // 2 minutes max

    while ((prediction.status === 'starting' || prediction.status === 'processing') && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: {
          'Authorization': `Token ${apiKey}`,
        },
      })

      prediction = await statusResponse.json()
      attempts++
    }

    if (prediction.status === 'succeeded' && prediction.output) {
      const videoUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output

      return NextResponse.json({
        success: true,
        videoUrl,
        prompt,
        duration,
        quality,
        model,
      })
    }

    return NextResponse.json({
      error: prediction.error || 'Video generation failed or timed out',
      success: false,
    }, { status: 500 })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate video',
        success: false,
      },
      { status: 500 }
    )
  }
}
