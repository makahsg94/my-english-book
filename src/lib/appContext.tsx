import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { progress } from './progress'
import type { ProgressApi } from './progress'
import { applyTheme, getSavedTheme } from './theme'
import type { Theme } from './theme'

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light',
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => getSavedTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

// ---------------------------------------------------------------------------
// Progress
// ---------------------------------------------------------------------------

const ProgressContext = createContext<ProgressApi>(progress)

export interface ProgressReporting {
  progressApi: ProgressApi
  version: number
}

const ProgressStateContext = createContext<ProgressReporting>({
  progressApi: progress,
  version: 0,
})

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(0)

  const bump = useCallback(() => {
    setVersion((v) => v + 1)
  }, [])

  const api: ProgressApi = {
    ...progress,
    markLessonComplete: (id) => {
      progress.markLessonComplete(id)
      bump()
    },
    toggleLessonComplete: (id) => {
      progress.toggleLessonComplete(id)
      bump()
    },
    recordVisit: (unitId, lessonId) => {
      progress.recordVisit(unitId, lessonId)
      bump()
    },
    recordQuiz: (id, correct, total, meta) => {
      progress.recordQuiz(id, correct, total, meta)
      bump()
    },
    resetAll: () => {
      progress.resetAll()
      bump()
    },
  }

  return (
    <ProgressStateContext.Provider value={{ progressApi: api, version }}>
      <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>
    </ProgressStateContext.Provider>
  )
}

export function useProgress(): ProgressApi {
  return useContext(ProgressContext)
}

export function useProgressVersion() {
  return useContext(ProgressStateContext)
}