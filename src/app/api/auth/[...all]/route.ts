import { toNextJsHandler } from 'better-auth/next-js'
import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

const handler = toNextJsHandler(auth.handler)

export async function GET(request: NextRequest, context: any) {
  try {
    return await handler.GET(request)
  }
  catch (error: any) {
    console.error('Auth GET error:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal server error', details: process.env.NODE_ENV === 'development' ? error?.stack : undefined },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest, context: any) {
  try {
    return await handler.POST(request)
  }
  catch (error: any) {
    console.error('Auth POST error:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal server error', details: process.env.NODE_ENV === 'development' ? error?.stack : undefined },
      { status: 500 },
    )
  }
}
