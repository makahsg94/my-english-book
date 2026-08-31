// Theme preference (light / dark), persisted in localStorage.

export type Theme = 'light' | 'dark'

const KEY = 'speakout-a2.theme'

export function getSavedTheme(): Theme {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw === 'light' || raw === 'dark') return raw
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
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* ignore */
  }
}

export function toggleTheme(current: Theme): Theme {
  const next: Theme = current === 'dark' ? 'light' : 'dark'
  return next
}