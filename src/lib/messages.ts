// Admin → student in-app messages. The admin writes a message for a specific
// student; the student's app picks it up next time they open the site and
// shows it as a toast. Stored in Supabase `messages` table via RPCs.

import { getSupabase } from './supabase'

export interface AdminMessage {
  id: string
  user_id: string
  username: string | null
  body: string
  created_at: string
}

export interface InboxMessage {
  id: string
  body: string
  created_at: string
}

const SEEN_KEY = 'speakout-b1.seen-messages.v1'

/**
 * قائمة الرسائل لكل الطلاب (للأدمن) — RPC admin_messages لو متوفر، وإلا مصفوفة فاضية.
 */
export async function adminMessages(): Promise<AdminMessage[]> {
  const sb = getSupabase()
  if (!sb) return []
  try {
    const { data, error } = await sb.rpc('admin_messages')
    if (error || !Array.isArray(data)) return []
    return data as AdminMessage[]
  } catch {
    return []
  }
}

/** الأدمن يبعت رسالة لطالب معين بالاسم — RPC admin_send_message */
export async function adminSendMessage(username: string, body: string): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return false
  try {
    const { error } = await sb.rpc('admin_send_message', { p_username: username, p_body: body })
    return !error
  } catch {
    return false
  }
}

/** الطالب بجيب رسايله الجديدة (اللي لسه مستلمهاش). */
export async function fetchInbox(): Promise<InboxMessage[]> {
  const sb = getSupabase()
  if (!sb) return []
  try {
    const { data, error } = await sb.rpc('my_inbox')
    if (error || !Array.isArray(data)) return []
    return data as InboxMessage[]
  } catch {
    return []
  }
}

/** نشوّف رسالة معينة مرة واحدة بس في المتصفح (نتجنب تكرار الظهور). */
function seenIds(): Set<string> {
  try {
    const raw = localStorage.getItem(SEEN_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw) as unknown
    if (!Array.isArray(arr)) return new Set()
    return new Set(arr.filter((x): x is string => typeof x === 'string'))
  } catch {
    return new Set()
  }
}

function markSeen(id: string) {
  try {
    const seen = seenIds()
    seen.add(id)
    localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]))
  } catch {
    /* ignore */
  }
}

/** الرسايل الجديدة اللي لسه متعرضتش في المتصفح ده. */
export async function newInboxForBrowser(): Promise<InboxMessage[]> {
  const msgs = await fetchInbox()
  const seen = seenIds()
  const fresh = msgs.filter((m) => !seen.has(m.id))
  for (const m of fresh) markSeen(m.id)
  return fresh
}