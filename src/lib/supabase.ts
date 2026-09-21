import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient, User } from '@supabase/supabase-js'

let client: SupabaseClient | null | undefined
let cachedUser: User | null | undefined

export function getSupabase(): SupabaseClient | null {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
  if (!url || !anonKey) return null
  if (client === undefined) {
    client = createClient(url, anonKey, { auth: { persistSession: true, autoRefreshToken: true } })
  }
  return client
}

export async function initSupabase() {
  const sb = getSupabase()
  if (!sb) return
  const { data } = await sb.auth.getSession()
  cachedUser = data.session?.user ?? null
  sb.auth.onAuthStateChange((_event, session) => {
    cachedUser = session?.user ?? null
  })
}

export function currentUser(): User | null {
  return cachedUser ?? null
}

export function sessionSettled(): boolean {
  return cachedUser !== undefined
}

export function setCachedUser(user: User | null) {
  cachedUser = user
}

export function currentUsername(user: User): string {
  const meta = user.user_metadata as { username?: string } | undefined
  if (meta?.username) return meta.username
  const email = user.email
  if (email) return email.split('@')[0]
  return `user_${user.id.slice(0, 6)}`
}