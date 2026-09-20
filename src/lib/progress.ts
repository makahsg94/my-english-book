// Learning progress store.
// Persisted in localStorage for v1; the IProgressStore interface keeps the UI
// decoupled so a backend/database provider can be swapped in later.

import { storageKey } from './auth'

export interface LessonProgress {
  completed: boolean
  completedAt?: number
  lastVisit?: number
}

export interface QuizResult {
  correct: number
  total: number
  at: number
  /** optional analytics: correct/total per category (e.g. { grammar: [7, 12] }) */
  categories?: Record<string, { correct: number; total: number }>
  /** optional analytics: ids of the questions answered incorrectly */
  wrong?: string[]
}

export interface WritingResult {
  score: number
  grade: string
  words: number
  at: number
}

export interface XpEntry {
  at: number
  amount: number
  reason: string
}

export interface ProgressState {
  lessons: Record<string, LessonProgress>
  quizzes: Record<string, QuizResult[]>
  writing: Record<string, WritingResult[]>
  xp: number
  xpLog: XpEntry[]
  streak: number
  lastActiveDate?: string
  lastUnit?: string
  lastLesson?: string
}

export interface Achievement {
  id: string
  title: string
  desc: string
  emoji: string
  earned: boolean
}

export interface IProgressStore {
  load(): ProgressState
  save(state: ProgressState): void
}

const progressStorageKey = () => storageKey('speakout-b1.progress.v1')

class LocalStore implements IProgressStore {
  load(): ProgressState {
    try {
      const raw = localStorage.getItem(progressStorageKey())
      if (!raw) return { lessons: {}, quizzes: {}, writing: {}, xp: 0, xpLog: [], streak: 0 }
      const parsed = JSON.parse(raw) as ProgressState
      return {
        lessons: parsed.lessons ?? {},
        quizzes: parsed.quizzes ?? {},
        writing: parsed.writing ?? {},
        xp: parsed.xp ?? 0,
        xpLog: parsed.xpLog ?? [],
        streak: parsed.streak ?? 0,
        lastActiveDate: parsed.lastActiveDate,
        lastUnit: parsed.lastUnit,
        lastLesson: parsed.lastLesson,
      }
    } catch {
      return { lessons: {}, quizzes: {}, writing: {}, xp: 0, xpLog: [], streak: 0 }
    }
  }
  save(state: ProgressState): void {
    try {
      localStorage.setItem(progressStorageKey(), JSON.stringify(state))
    } catch {
      /* storage unavailable – ignore */
    }
  }
}

export const progressStore: IProgressStore = new LocalStore()

export function createProgressApi(store: IProgressStore = progressStore) {
  const state: ProgressState = store.load()

  const emit = () => {
    store.save(state)
  }

  function awardXp(amount: number, reason: string) {
    state.xp += amount
    state.xpLog = [...state.xpLog.slice(-49), { at: Date.now(), amount, reason }]
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 864e5).toDateString()
    if (state.lastActiveDate === today) {
      // already counted today
    } else if (state.lastActiveDate === yesterday) {
      state.streak += 1
    } else {
      state.streak = 1
    }
    state.lastActiveDate = today
    emit()
  }

  function markLessonComplete(lessonId: string) {
    const prev = state.lessons[lessonId]
    const wasComplete = prev?.completed ?? false
    state.lessons[lessonId] = {
      ...prev,
      completed: true,
      completedAt: prev?.completedAt ?? Date.now(),
      lastVisit: Date.now(),
    }
    if (!wasComplete) awardXp(10, 'lesson')
    else emit()
  }

  function toggleLessonComplete(lessonId: string) {
    const cur = state.lessons[lessonId]
    if (cur?.completed) {
      state.lessons[lessonId] = { completed: false }
      emit()
    } else {
      state.lessons[lessonId] = {
        completed: true,
        completedAt: Date.now(),
        lastVisit: Date.now(),
      }
      awardXp(10, 'lesson')
    }
  }

  function recordVisit(unitId: string, lessonId?: string) {
    state.lastUnit = unitId
    if (lessonId) {
      state.lastLesson = lessonId
      const cur = state.lessons[lessonId]
      state.lessons[lessonId] = { ...cur, lastVisit: Date.now(), completed: cur?.completed ?? false }
    }
    emit()
  }

  function recordQuiz(
    quizId: string,
    correct: number,
    total: number,
    meta?: { categories?: Record<string, { correct: number; total: number }>; wrong?: string[] },
  ) {
    state.quizzes[quizId] = [
      ...(state.quizzes[quizId] ?? []),
      { correct, total, at: Date.now(), ...meta },
    ]
    awardXp(15, `quiz:${quizId}`)
  }

  function bestQuiz(quizId: string): QuizResult | undefined {
    const list = state.quizzes[quizId] ?? []
    return list.reduce<QuizResult | undefined>((best, r) => {
      if (!best) return r
      const score = (a: QuizResult) => a.correct / Math.max(1, a.total)
      return score(r) > score(best) ? r : best
    }, undefined)
  }

  function recordWriting(taskId: string, score: number, grade: string, words: number) {
    state.writing[taskId] = [...(state.writing[taskId] ?? []), { score, grade, words, at: Date.now() }]
    awardXp(10, `writing:${taskId}`)
    if (grade === 'A') awardXp(20, `writing-a:${taskId}`)
  }

  function bestWriting(taskId: string): WritingResult | undefined {
    const list = state.writing[taskId] ?? []
    return list.reduce<WritingResult | undefined>((best, r) => (!best || r.score > best.score ? r : best), undefined)
  }

  function isLessonComplete(lessonId: string) {
    return state.lessons[lessonId]?.completed ?? false
  }

  function resetAll() {
    state.lessons = {}
    state.quizzes = {}
    state.writing = {}
    state.xp = 0
    state.xpLog = []
    state.streak = 0
    state.lastActiveDate = undefined
    emit()
  }

  function reload() {
    Object.assign(state, store.load())
  }

  return {
    get state() {
      return state
    },
    markLessonComplete,
    toggleLessonComplete,
    recordVisit,
    recordQuiz,
    bestQuiz,
    recordWriting,
    bestWriting,
    isLessonComplete,
    resetAll,
    reload,
  }
}

const XP_PER_LEVEL = 100

export function levelForXp(xp: number) {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

export function levelProgress(xp: number) {
  const current = xp % XP_PER_LEVEL
  return { level: levelForXp(xp), current, target: XP_PER_LEVEL, pct: Math.round((current / XP_PER_LEVEL) * 100) }
}

const ACHIEVEMENTS: Omit<Achievement, 'earned'>[] = [
  { id: 'first-lesson', title: 'First steps', desc: 'Complete your first lesson', emoji: '\u{1F3AF}' },
  { id: 'five-lessons', title: 'Reader', desc: 'Complete 5 lessons', emoji: '\u{1F4DA}' },
  { id: 'ten-lessons', title: 'Bookworm', desc: 'Complete 10 lessons', emoji: '\u{1F9E0}' },
  { id: 'all-course', title: 'Full journey', desc: 'Complete every lesson in the course', emoji: '\u{1F3C1}' },
  { id: 'first-quiz', title: 'Quizzer', desc: 'Finish your first unit quiz', emoji: '\u{1F3AE}' },
  { id: 'perfect-quiz', title: 'Perfect score', desc: 'Get 100% on a quiz', emoji: '\u{1F4AF}' },
  { id: 'first-write', title: 'Writer', desc: 'Check your first piece of writing', emoji: '\u{270D}\uFE0F' },
  { id: 'star-writer', title: 'Star writer', desc: 'Get grade A on a writing task', emoji: '\u2B50' },
  { id: 'day-streak', title: 'On fire', desc: 'Study 3 days in a row', emoji: '\u{1F525}' },
  { id: 'week-streak', title: 'Unstoppable', desc: 'Study 7 days in a row', emoji: '\u{1F680}' },
]

export function achievementsFor(state: ProgressState, totalLessons: number): Achievement[] {
  const lessonsDone = Object.values(state.lessons).filter((l) => l.completed).length
  const quizzesDone = Object.values(state.quizzes).flat().length
  const perfect = Object.values(state.quizzes)
    .flat()
    .some((r) => r.total > 0 && r.correct === r.total)
  const writesDone = Object.values(state.writing).flat().length
  const starWrite = Object.values(state.writing)
    .flat()
    .some((r) => r.grade === 'A' && r.score >= 85)
  const flags: Record<string, boolean> = {
    'first-lesson': lessonsDone >= 1,
    'five-lessons': lessonsDone >= 5,
    'ten-lessons': lessonsDone >= 10,
    'all-course': totalLessons > 0 && lessonsDone >= totalLessons,
    'first-quiz': quizzesDone >= 1,
    'perfect-quiz': perfect,
    'first-write': writesDone >= 1,
    'star-writer': starWrite,
    'day-streak': state.streak >= 3,
    'week-streak': state.streak >= 7,
  }
  return ACHIEVEMENTS.map((a) => ({ ...a, earned: flags[a.id] ?? false }))
}

export type ProgressApi = ReturnType<typeof createProgressApi>

/** Activities recorded for the current calendar day – used by the share card. */
export function todayCounts(state: ProgressState) {
  const day = new Date().toDateString()
  let xpToday = 0
  for (const e of state.xpLog) {
    if (new Date(e.at).toDateString() === day) xpToday += e.amount
  }
  let lessonsToday = 0
  for (const l of Object.values(state.lessons)) {
    if (l.completedAt && new Date(l.completedAt).toDateString() === day) lessonsToday += 1
  }
  return { xpToday, lessonsToday }
}

export const progress = createProgressApi()