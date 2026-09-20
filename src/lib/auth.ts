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

function readUsers(): StoredUser[] {
  const users = read<StoredUser[]>(USERS_KEY)
  return Array.isArray(users) ? users : []
}

function saveUsers(users: StoredUser[]) {
  write(USERS_KEY, users)
}

function saltFor(username: string) {
  return `sb1:${username.toLowerCase()}`
}

export async function hashPassword(password: string, salt: string): Promise<string> {
  const text = `${salt}:${password}`
  try {
    const data = new TextEncoder().encode(text)
    const digest = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  } catch {
    let h = 0
    for (let i = 0; i < text.length; i++) {
      h = (h * 31 + text.charCodeAt(i)) >>> 0
    }
    return h.toString(16)
  }
}

export function signOut() {
  try {
    window.localStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

export function currentUser(): string | null {
  const user = read<{ username: string }>(SESSION_KEY)
  return user && typeof user.username === 'string' ? user.username : null
}

export function isLoggedIn() {
  return currentUser() !== null
}

export function userJoinedAt(username: string): number | undefined {
  return readUsers().find((u) => u.username.toLowerCase() === username.toLowerCase())?.createdAt
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
  if (password.length < 4) return 'كلمة السر أقل ما فيها 4 حروف'
  return undefined
}

export async function register(username: string, password: string): Promise<AuthResult> {
  const name = username.trim()
  const nameError = validateUsername(name)
  if (nameError) return { ok: false, error: nameError }
  const passError = validatePassword(password)
  if (passError) return { ok: false, error: passError }

  const users = readUsers()
  if (users.some((u) => u.username.toLowerCase() === name.toLowerCase())) {
    return { ok: false, error: 'الإسم ده متسجل قبل كده، اختار اسم تاني' }
  }

  const salt = saltFor(name)
  const hash = await hashPassword(password, salt)
  const user: StoredUser = { username: name, salt, hash, createdAt: Date.now() }
  saveUsers([...users, user])
  write(SESSION_KEY, { username: name })
  return { ok: true }
}

export async function login(username: string, password: string): Promise<AuthResult> {
  const name = username.trim()
  const users = readUsers()
  const user = users.find((u) => u.username.toLowerCase() === name.toLowerCase())
  if (!user) return { ok: false, error: 'مفيش حساب بالاسم ده — سجّله الأول' }
  const hash = await hashPassword(password, user.salt)
  if (hash !== user.hash) return { ok: false, error: 'كلمة السر غلط' }
  write(SESSION_KEY, { username: user.username })
  return { ok: true }
}