// Small celebration milestones surfaced as toasts when unlocked for the first
// time. Persisted locally so each milestone fires only once per browser.

import { BOOK } from '../content/book'
import { storageKey } from './auth'
import { queueSync } from './sync'
import type { ProgressState } from './progress'
import type { ToastOptions } from './toast'

interface Milestone extends ToastOptions {
  id: string
}

const KEY = 'speakout-a2.milestones.v1'

const ALL: Milestone[] = [
  { id: 'first-lesson', title: 'First lesson completed', body: 'Great start \u2014 keep the momentum!', tone: 'success' },
  { id: 'five-lessons', title: '5 lessons done', body: 'You\u2019re getting into the rhythm.', tone: 'celebration' },
  { id: 'first-unit', title: 'Unit complete', body: 'Lock it in with the unit quiz.', tone: 'celebration' },
  { id: 'first-quiz', title: 'First quiz taken', body: 'Your results build the review list.', tone: 'info' },
]

function counts(state: ProgressState) {
  const lessonsDone = Object.values(state.lessons).filter((l) => l.completed).length
  let unitsDone = 0
  for (const unit of BOOK.units) {
    if (unit.lessons.length > 0 && unit.lessons.every((l) => state.lessons[l.id]?.completed)) unitsDone += 1
  }
  const quizzesTaken = Object.keys(state.quizzes).length
  return { lessonsDone, unitsDone, quizzesTaken }
}

function readSeen(): Set<string> {
  try {
    const raw = localStorage.getItem(storageKey(KEY))
    if (!raw) return new Set()
    const arr = JSON.parse(raw) as unknown
    if (!Array.isArray(arr)) return new Set()
    return new Set(arr.filter((x): x is string => typeof x === 'string'))
  } catch {
    return new Set()
  }
}

export function checkMilestones(state: ProgressState): ToastOptions[] {
  const seen = readSeen()
  const c = counts(state)
  const hit: Record<string, boolean> = {
    'first-lesson': c.lessonsDone >= 1,
    'five-lessons': c.lessonsDone >= 5,
    'first-unit': c.unitsDone >= 1,
    'first-quiz': c.quizzesTaken >= 1,
  }
  const fresh = ALL.filter((m) => hit[m.id] && !seen.has(m.id))
  if (fresh.length === 0) return []
  for (const m of fresh) seen.add(m.id)
  try {
    localStorage.setItem(storageKey(KEY), JSON.stringify([...seen]))
    queueSync('speakout-a2.milestones.v1')
  } catch {
    /* storage unavailable - ignore */
  }
  return fresh.map(({ title, body, tone }) => ({ title, body, tone }))
}