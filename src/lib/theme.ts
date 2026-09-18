// Theme preference (light / dark / reading), persisted in localStorage.

export type Theme = 'light' | 'dark' | 'reading'

const KEY = 'speakout-b1.theme'

export function getSavedTheme(): Theme {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw === 'light' || raw === 'dark' || raw === 'reading') return raw
  } catch {
    /* ignore */
  }
  const prefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('dark', 'reading')
  if (theme === 'dark') root.classList.add('dark')
  if (theme === 'reading') root.classList.add('reading')
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* ignore */
  }
}

export function toggleTheme(current: Theme): Theme {
  const next: Theme = current === 'light' ? 'dark' : current === 'dark' ? 'reading' : 'light'
  return next
}
