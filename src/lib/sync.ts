import { getSupabase, currentUser as sbUser } from './supabase'
import { storageKey } from './auth'

const timers: Record<string, number> = {}

export async function pullAll() {
  const sb = getSupabase()
  if (!sb) return
  const user = sbUser()
  if (!user) return
  const { data, error } = await sb.from('user_data').select('key, value').eq('user_id', user.id)
  if (error || !data) return
  for (const row of data) {
    try {
      window.localStorage.setItem(storageKey(row.key), JSON.stringify(row.value))
    } catch {
      /* storage unavailable – ignore */
    }
  }
  window.dispatchEvent(new CustomEvent('sb:synced'))
}

export function queueSync(key: string) {
  window.clearTimeout(timers[key])
  timers[key] = window.setTimeout(() => void flushSync(key), 500)
}

async function flushSync(key: string) {
  delete timers[key]
  const sb = getSupabase()
  if (!sb) return
  const user = sbUser()
  if (!user) return
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(storageKey(key))
  } catch {
    return
  }
  if (raw === null) {
    await sb.from('user_data').delete().eq('user_id', user.id).eq('key', key)
    return
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return
  }
  await sb.from('user_data').upsert(
    { user_id: user.id, key, value: parsed, updated_at: new Date().toISOString() },
    { onConflict: 'user_id,key' },
  )
}