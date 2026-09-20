import { getSupabase, currentUser as sbUser, currentUsername } from './supabase'

export interface StoredUser {
  username: string
  salt: string
  hash: string
  createdAt: number
}

const USERS_KEY = 'speakout-b1.users.v1'
const SESSION_KEY = 'speakout-b1.session.v1'

function read<V>(key: string): V | null {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as V) : null
  } catch {
    return null
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable – ignore */
  }
}

function hasSupabase() {
  return getSupabase() !== null
}

export async function syntheticEmail(username: string): Promise<string> {
  const base = username.toLowerCase()
  try {
    const data = new TextEncoder().encode(base)
    const digest = await crypto.subtle.digest('SHA-256', data)
    const hex = Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
    return `l${hex.slice(0, 28)}@student.local`
  } catch {
    let h = 0
    for (let i = 0; i < base.length; i++) h = (h * 31 + base.charCodeAt(i)) >>> 0
    return `l${h.toString(16)}@student.local`
  }
}

function mapError(message: string): string {
  const m = message.toLowerCase()
  if (m.includes('already registered') || m.includes('over email rate limit')) return 'الإسم ده متسجل قبل كده، جرّب اسم تاني'
  if (m.includes('invalid login credentials')) return 'كلمة السر غلط أو مفيش حساب بالاسم ده'
  if (m.includes('email not confirmed') || m.includes('email address') && m.includes('confirm')) return 'فعّل الحساب من الإيميل الأول'
  if (m.includes('should be at least') || m.includes('password')) return 'كلمة السر أقل ما فيها 6 حروف'
  return 'حصلت مشكلة في الاتصال بالسيرفر، حاول تاني'
}

export function signOut() {
  const sb = getSupabase()
  if (sb) void sb.auth.signOut()
  try {
    window.localStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

export function currentUser(): string | null {
  const sb = getSupabase()
  if (sb) {
    const user = sbUser()
    return user ? currentUsername(user) : null
  }
  const sessionUser = read<{ username: string }>(SESSION_KEY)
  return sessionUser && typeof sessionUser.username === 'string' ? sessionUser.username : null
}

export function isLoggedIn() {
  return currentUser() !== null
}

export function userJoinedAt(username: string): number | undefined {
  const sb = getSupabase()
  if (sb) {
    const user = sbUser()
    if (user && currentUsername(user).toLowerCase() === username.toLowerCase()) {
      const ts = Date.parse(user.created_at)
      return Number.isFinite(ts) ? ts : undefined
    }
    return undefined
  }
  const legacy: StoredUser[] = read(USERS_KEY) ?? []
  const found = legacy.find((u) => u.username.toLowerCase() === username.toLowerCase())
  return found?.createdAt
}

export function storageKey(base: string): string {
  const user = currentUser()
  return user ? `speakout-b1.u.${user}.${base}` : base
}

export interface AuthResult {
  ok: boolean
  error?: string
}

export function validateUsername(username: string): string | undefined {
  const name = username.trim()
  if (!/^[a-zA-Z0-9_\u0600-\u06FF]{2,20}$/.test(name)) {
    return 'اسم المستخدم لازم يكون من 2 لـ 20 حرف (حروف أو أرقام)'
  }
  return undefined
}

export function validatePassword(password: string): string | undefined {
  if (password.length < 6) return 'كلمة السر أقل ما فيها 6 حروف'
  return undefined
}

export async function register(username: string, password: string): Promise<AuthResult> {
  const name = username.trim()
  const nameError = validateUsername(name)
  if (nameError) return { ok: false, error: nameError }
  const passError = validatePassword(password)
  if (passError) return { ok: false, error: passError }

  const sb = getSupabase()
  if (sb) {
    const email = await syntheticEmail(name)
    const { data, error } = await sb.auth.signUp({
      email,
      password,
      options: { data: { username: name } },
    })
    if (error) return { ok: false, error: mapError(error.message) }
    if (!data.session) return { ok: false, error: 'تم إرسال تأكيد للإيميل — فعّل الحساب وبعدين سجّل دخول' }
    return { ok: true }
  }

  const users: StoredUser[] = read(USERS_KEY) ?? []
  if (users.some((u) => u.username.toLowerCase() === name.toLowerCase())) {
    return { ok: false, error: 'الإسم ده متسجل قبل كده، اختار اسم تاني' }
  }
  const salt = `sb1:${name.toLowerCase()}`
  const hash = await sha256(`${salt}:${password}`)
  const user: StoredUser = { username: name, salt, hash, createdAt: Date.now() }
  write(USERS_KEY, [...users, user])
  write(SESSION_KEY, { username: name })
  return { ok: true }
}

export async function login(username: string, password: string): Promise<AuthResult> {
  const name = username.trim()
  const sb = getSupabase()
  if (sb) {
    const email = await syntheticEmail(name)
    const { error } = await sb.auth.signInWithPassword({ email, password })
    if (error) return { ok: false, error: mapError(error.message) }
    return { ok: true }
  }

  const users: StoredUser[] = read(USERS_KEY) ?? []
  const user = users.find((u) => u.username.toLowerCase() === name.toLowerCase())
  if (!user) return { ok: false, error: 'مفيش حساب بالاسم ده — سجّله الأول' }
  const hash = await sha256(`${user.salt}:${password}`)
  if (hash !== user.hash) return { ok: false, error: 'كلمة السر غلط' }
  write(SESSION_KEY, { username: user.username })
  return { ok: true }
}

async function sha256(text: string): Promise<string> {
  try {
    const data = new TextEncoder().encode(text)
    const digest = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  } catch {
    let h = 0
    for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0
    return h.toString(16)
  }
}

export function _hasSupabase() {
  return hasSupabase()
}