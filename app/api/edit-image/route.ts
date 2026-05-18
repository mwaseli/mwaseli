import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { image, prompt, strength = 0.7 } = await request.json()

    if (!image || !prompt) {
      return NextResponse.json({ error: 'Image and prompt are required' }, { status: 400 })
    }

    const apiKey = process.env.REPLICATE_API_TOKEN
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Use Replicate for image-to-image editing
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${apiKey}`,
      },
      body: JSON.stringify({
        version: '15ab75e0bde51b65a61a2b2a1df711b348b4eb23c8ff21ec301de9d0e9944957',
        input: {
          prompt: prompt.substring(0, 1000),
          image: image,
          denoising: strength,
          guidance_scale: 7.5,
          num_inference_steps: 28,
        },
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('[v0] Replicate error:', result)
      return NextResponse.json({
        error: result.detail || 'Failed to edit image',
        success: false,
      }, { status: response.status })
    }

    // Poll for completion
    let prediction = result
    let attempts = 0
    const maxAttempts = 60

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
      const imageUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output

      return NextResponse.json({
        success: true,
        imageUrl,
        prompt,
        strength,
      })
    }

    return NextResponse.json({
      error: prediction.error || 'Image editing failed or timed out',
      success: false,
    }, { status: 500 })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to edit image',
        success: false,
      },
      { status: 500 }
    )
  }
}
