import Replicate from 'replicate'
import OpenAI from 'openai'

// Initialize Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Image Generation with Replicate
export async function generateImageWithReplicate(prompt: string, model: string = 'flux-pro') {
  try {
    const output = await replicate.run(
      `black-forest-labs/${model}`,
      {
        input: {
          prompt,
          num_inference_steps: 50,
          guidance_scale: 7.5,
        },
      }
    )
    return output
  } catch (error) {
    console.error('Replicate image generation error:', error)
    throw error
  }
}

// Video Generation with Replicate
export async function generateVideoWithReplicate(prompt: string, duration: number = 5) {
  try {
    const output = await replicate.run(
      'stability-ai/stable-video-3d',
      {
        input: {
          prompt,
          duration,
          fps: 24,
          steps: 30,
        },
      }
    )
    return output
  } catch (error) {
    console.error('Replicate video generation error:', error)
    throw error
  }
}

// Text to Speech with OpenAI
export async function generateSpeech(text: string, voice: string = 'nova') {
  try {
    const response = await openai.audio.speech.create({
      model: 'tts-1-hd',
      voice: voice as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer',
      input: text,
      speed: 1.0,
    })

    // Convert response to buffer
    const buffer = await response.arrayBuffer()
    return Buffer.from(buffer)
  } catch (error) {
    console.error('OpenAI TTS error:', error)
    throw error
  }
}

// Get job status from Replicate
export async function getJobStatus(jobId: string) {
  try {
    const prediction = await replicate.predictions.get(jobId)
    return prediction
  } catch (error) {
    console.error('Error getting job status:', error)
    throw error
  }
}

// HuggingFace API for additional models
export async function generateWithHuggingFace(prompt: string, model: string) {
  const apiKey = process.env.HUGGINGFACE_API_KEY
  if (!apiKey) {
    throw new Error('HUGGINGFACE_API_KEY not configured')
  }

  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        method: 'POST',
        body: JSON.stringify({ inputs: prompt }),
      }
    )

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.statusText}`)
    }

    const result = await response.arrayBuffer()
    return result
  } catch (error) {
    console.error('HuggingFace generation error:', error)
    throw error
  }
}
