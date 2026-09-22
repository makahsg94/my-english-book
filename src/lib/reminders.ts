// One gentle daily nudge, shown at most once per calendar day per user.
// Picks a short message based on the learner's current state (streak, where
// they stopped, how many lessons they finished) — never spammy.

import { flattenLessons } from '../content/book'
import { storageKey } from './auth'
import type { ProgressState } from './progress'
import type { ToastOptions } from './toast'

const KEY = 'speakout-b1.reminder.v1'

interface Stored {
  day: string
}

function todayStr() {
  return new Date().toDateString()
}

function readStored(): Stored | null {
  try {
    const raw = localStorage.getItem(storageKey(KEY))
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return null
    const p = parsed as Record<string, unknown>
    return typeof p.day === 'string' ? { day: p.day } : null
  } catch {
    return null
  }
}

function writeStored(day: string) {
  try {
    localStorage.setItem(storageKey(KEY), JSON.stringify({ day }))
  } catch {
    /* storage unavailable - ignore */
  }
}

function gapSince(last: string | undefined): number {
  if (!last) return -1
  try {
    const then = Date.parse(last)
    if (!Number.isFinite(then)) return -1
    const today = new Date(todayStr())
    const from = new Date(then)
    from.setHours(12, 0, 0, 0)
    today.setHours(12, 0, 0, 0)
    return Math.max(0, Math.abs(today.getTime() - from.getTime()) / 86_400_000)
  } catch {
    return -1
  }
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Returns a message for "today" if one is due, otherwise null. Not annoying: once/day. */
export function dailyReminder(state: ProgressState): ToastOptions | null {
  const stored = readStored()
  if (stored?.day === todayStr()) return null

  const lessons = flattenLessons()
  const done = lessons.filter((f) => state.lessons[f.lesson.id]?.completed).length
  const total = Math.max(1, lessons.length)
  const gap = gapSince(state.lastActiveDate)
  const restartTarget = state.lastLesson

  let toast: ToastOptions
  if (done === 0) {
    toast = pick([
      {
        title: 'First step is the easiest',
        body: 'درس واحد بس النهارده وهتحس بفرق. يلا بينا',
        tone: 'info',
      },
      {
        title: 'Welcome!',
        body: 'ابدأ من أي درس تحبه — أول خطوة في أقل من 10 دقايق',
        tone: 'success',
      },
    ])
  } else if (gap >= 3) {
    toast = {
      title: 'We missed you',
      body: `غبت عنّا ${Math.floor(gap)} يوم — مكانك محفوظ، كمّل من اللي وقفت عنده`,
      tone: 'info',
    }
  } else if (state.streak >= 3) {
    toast = pick([
      {
        title: `Keep the streak alive \u2014 ${state.streak} days!`,
        body: 'دقيقة واحدة كفاية تحافظ على الشعلة النهارده',
        tone: 'celebration',
      },
      {
        title: 'On fire!',
        body: `${state.streak} يوم ورا بعض — متسبش السلسلة تنقطع`,
        tone: 'celebration',
      },
    ])
  } else if (done < total) {
    toast = pick([
      {
        title: 'You\u2019ve come a long way',
        body: `${done} من ${total} درس خلصتهم — كمّل الترين باقي`,
        tone: 'success',
      },
      {
        title: restartTarget ? 'Keep it moving' : 'Small wins count',
        body: restartTarget
          ? 'هتنقذ عليه بدايتك، وهنكمّل من اللي فاضل'
          : 'درسين في اليوم = عادة بتكبر معايا',
        tone: 'info',
      },
    ])
  } else {
    toast = {
      title: 'Course complete \u2014 legend!',
      body: 'خلصت الكتاب كله! جهز نفسك للجزء التاني 🎉',
      tone: 'celebration',
    }
  }

  writeStored(todayStr())
  return toast
}