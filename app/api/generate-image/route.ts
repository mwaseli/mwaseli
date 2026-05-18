import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, model = 'flux', shape = '1:1' } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Valid prompt is required' }, { status: 400 })
    }

    const apiKey = process.env.REPLICATE_API_TOKEN
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Map shape to dimensions
    const dimensionMap: Record<string, [number, number]> = {
      '16:9': [1024, 576],
      '4:3': [1024, 768],
      '1:1': [768, 768],
      '3:4': [576, 768],
      '9:16': [576, 1024],
    }

    const [width, height] = dimensionMap[shape] || [768, 768]

    // Call Replicate API
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${apiKey}`,
      },
      body: JSON.stringify({
        version: '6359de27f5adc6e29f9760f5fbe598477525405fd4e7a1b282dc07ca1b5f5144',
        input: {
          prompt: prompt.substring(0, 1000),
          width,
          height,
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 28,
        },
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('[v0] Replicate error:', result)
      return NextResponse.json({ 
        error: result.detail || 'Failed to generate image',
        success: false 
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
        model,
        shape,
      })
    }

    return NextResponse.json({
      error: prediction.error || 'Generation failed or timed out',
      success: false,
    }, { status: 500 })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate image',
        success: false,
      },
      { status: 500 }
    )
  }
}
