import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import type { Database } from '#/lib/database.types'

function getSupabaseUrl(): string {
  const url = process.env.SUPABASE_URL

  if (!url) {
    throw new Error('SUPABASE_URL is not configured.')
  }

  return url
}

function getSupabaseServiceRoleKey(): string {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured.')
  }

  return serviceRoleKey
}

let supabaseServerClient: SupabaseClient<Database> | null = null

export function getSupabaseServerClient(): SupabaseClient<Database> {
  if (!supabaseServerClient) {
    supabaseServerClient = createClient<Database>(
      getSupabaseUrl(),
      getSupabaseServiceRoleKey(),
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    )
  }

  return supabaseServerClient
}
