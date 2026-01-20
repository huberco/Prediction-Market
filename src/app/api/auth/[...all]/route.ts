import { toNextJsHandler } from 'better-auth/next-js'
import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

let handler: ReturnType<typeof toNextJsHandler> | null = null

try {
  handler = toNextJsHandler(auth.handler)
}
catch (error: any) {
  console.error('Failed to initialize auth handler:', error)
  console.error('Error details:', {
    message: error?.message,
    stack: error?.stack,
    cause: error?.cause,
  })
}

export async function GET(request: NextRequest) {
  if (!handler) {
    const error = 'Auth handler not initialized. Check server logs for details.'
    console.error(error)
    return NextResponse.json(
      { 
        error,
        hint: 'This usually means environment variables are missing or database connection failed.',
        requiredEnvVars: [
          'POSTGRES_URL',
          'BETTER_AUTH_SECRET',
          'NEXT_PUBLIC_REOWN_APPKIT_PROJECT_ID',
        ],
      },
      { status: 500 },
    )
  }

  try {
    return await handler.GET(request)
  }
  catch (error: any) {
    console.error('Auth GET error:', error)
    console.error('Request URL:', request.url)
    console.error('Error stack:', error?.stack)
    return NextResponse.json(
      { 
        error: error?.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
        url: request.url,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  if (!handler) {
    const error = 'Auth handler not initialized. Check server logs for details.'
    console.error(error)
    return NextResponse.json(
      { 
        error,
        hint: 'This usually means environment variables are missing or database connection failed.',
        requiredEnvVars: [
          'POSTGRES_URL',
          'BETTER_AUTH_SECRET',
          'NEXT_PUBLIC_REOWN_APPKIT_PROJECT_ID',
        ],
      },
      { status: 500 },
    )
  }

  try {
    return await handler.POST(request)
  }
  catch (error: any) {
    console.error('Auth POST error:', error)
    console.error('Request URL:', request.url)
    console.error('Error stack:', error?.stack)
    return NextResponse.json(
      { 
        error: error?.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
        url: request.url,
      },
      { status: 500 },
    )
  }
}
