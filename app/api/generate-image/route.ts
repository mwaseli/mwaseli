import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get request body
    const { prompt, model = 'flux-pro', quality = 'hd' } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Return success response
    return NextResponse.json({
      success: true,
      jobId: 'job-' + Date.now(),
      message: 'Image generation started',
    })
  } catch (error: any) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Generation failed' },
      { status: 500 }
    )
  }
}
