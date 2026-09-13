// Learning progress store.
// Persisted in localStorage for v1; the IProgressStore interface keeps the UI
// decoupled so a backend/database provider can be swapped in later.

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

export interface ProgressState {
  lessons: Record<string, LessonProgress>
  quizzes: Record<string, QuizResult[]>
  writing: Record<string, WritingResult[]>
  lastUnit?: string
  lastLesson?: string
}

export interface IProgressStore {
  load(): ProgressState
  save(state: ProgressState): void
}

const STORAGE_KEY = 'speakout-a2.progress.v1'

class LocalStore implements IProgressStore {
  load(): ProgressState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return { lessons: {}, quizzes: {}, writing: {} }
      const parsed = JSON.parse(raw) as ProgressState
      return {
        lessons: parsed.lessons ?? {},
        quizzes: parsed.quizzes ?? {},
        writing: parsed.writing ?? {},
        lastUnit: parsed.lastUnit,
        lastLesson: parsed.lastLesson,
      }
    } catch {
      return { lessons: {}, quizzes: {}, writing: {} }
    }
  }
  save(state: ProgressState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
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

  function markLessonComplete(lessonId: string) {
    const prev = state.lessons[lessonId]
    state.lessons[lessonId] = {
      ...prev,
      completed: true,
      completedAt: prev?.completedAt ?? Date.now(),
      lastVisit: Date.now(),
    }
    emit()
  }

  function toggleLessonComplete(lessonId: string) {
    const cur = state.lessons[lessonId]
    if (cur?.completed) {
      state.lessons[lessonId] = { completed: false }
    } else {
      state.lessons[lessonId] = {
        completed: true,
        completedAt: Date.now(),
        lastVisit: Date.now(),
      }
    }
    emit()
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
    emit()
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
    emit()
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
    emit()
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
  }
}

export type ProgressApi = ReturnType<typeof createProgressApi>

export const progress = createProgressApi()