import { createClient } from '@supabase/supabase-js'
import 'server-only'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable is required')
}

if (!supabaseKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY environment variable is required')
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

export function getSupabaseImageUrl(iconPath: string | null): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!iconPath || !supabaseUrl) {
    return 'https://avatar.vercel.sh/creator.png'
  }

  if (iconPath.startsWith('http://') || iconPath.startsWith('https://')) {
    return iconPath
  }

  return `${supabaseUrl}/storage/v1/object/public/kuest-assets/${iconPath}`
}
