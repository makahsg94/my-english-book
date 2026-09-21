import { getSupabase } from './supabase'
import { USERS_KEY } from './auth'
import type { StoredUser } from './auth'

export interface AdminRow {
  user_id: string
  username: string | null
  age: string | null
  created_at: string
  data: Record<string, unknown> | null
}

/** اسم الأدمن من متغير البيئة VITE_ADMIN_USERNAME (فاضي لحد ما يكتبه صاحب الكتاب) */
export function envAdminUsername(): string {
  return (import.meta.env.VITE_ADMIN_USERNAME as string | undefined ?? '').trim()
}

/**
 * فولباك محلي: لو Supabase مش متظبط، نقرا المستخدمين المسجلين من
 * localStorage (USERS_KEY) ونضم لكل واحد لقطة تقدّمه.
 */
function readLocalUsers(): StoredUser[] {
  try {
    const raw = window.localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as StoredUser[]) : []
  } catch {
    return []
  }
}

function localProgressFor(username: string): Record<string, unknown> | null {
  try {
    const key = `speakout-a2.u.${username}.speakout-a2.progress.v1`
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : null
  } catch {
    return null
  }
}

function removeLocalUser(username: string) {
  try {
    const users = readLocalUsers().filter((u) => u.username.toLowerCase() !== username.toLowerCase())
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
    const prefix = `speakout-a2.u.${username.toLowerCase()}.`
    const toDrop: string[] = []
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i)
      if (k && k.toLowerCase().startsWith(prefix)) toDrop.push(k)
    }
    for (const k of toDrop) window.localStorage.removeItem(k)
  } catch {
    /* ignore */
  }
}

/** هل الاسم الحالي هو الأدمن؟ (بيئة أو RPC admin_status) */
export async function adminStatus(currentUsername: string | null): Promise<boolean> {
  const envName = envAdminUsername()
  if (envName && currentUsername && envName.toLowerCase() === currentUsername.toLowerCase()) {
    return true
  }
  const sb = getSupabase()
  if (!sb) return false
  try {
    const { data, error } = await sb.rpc('admin_status')
    if (error || data === null || data === undefined) return false
    return data === true
  } catch {
    return false
  }
}

/** قائمة الطلاب — RPC admin_data لو موجود، وإلا فولباك محلي */
/** Is the main admin RPC reachable (meaning the SQL has been applied)? */
export async function adminRpcReady(): Promise<boolean | null> {
  const sb = getSupabase()
  if (!sb) return null
  try {
    const { data, error } = await sb.rpc('admin_data')
    return !error && Array.isArray(data)
  } catch {
    return false
  }
}

export async function adminStudents(): Promise<AdminRow[]> {
  const sb = getSupabase()
  if (sb) {
    try {
      const { data, error } = await sb.rpc('admin_data')
      if (!error && Array.isArray(data)) return data as AdminRow[]
    } catch {
      /* fallthrough to local */
    }
  }
  return readLocalUsers().map((u) => ({
    user_id: `local:${u.username.toLowerCase()}`,
    username: u.username,
    age: u.age != null ? String(u.age) : null,
    created_at: new Date(u.createdAt).toISOString(),
    data: localProgressFor(u.username),
  }))
}

/** مسح طالب — RPC admin_delete_user لو موجود، وإلا إزالة محلية */
export async function adminDeleteUser(username: string): Promise<boolean> {
  const target = username.trim()
  if (!target) return false
  const sb = getSupabase()
  if (sb) {
    try {
      const { error } = await sb.rpc('admin_delete_user', { p_username: target })
      return !error
    } catch {
      return false
    }
  }
  removeLocalUser(target)
  return true
}