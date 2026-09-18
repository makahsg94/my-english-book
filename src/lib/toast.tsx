import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { IconCheck, IconSpark, IconTarget } from '../components/Icons'

export type ToastTone = 'success' | 'info' | 'celebration'

export interface ToastOptions {
  title: string
  body?: string
  tone?: ToastTone
}

interface ToastItem extends ToastOptions {
  id: number
  tone: ToastTone
}

type Push = (t: ToastOptions) => void

const ToastContext = createContext<Push>(() => {})

const TONE_CLASS: Record<ToastTone, string> = {
  success: 'border-emerald-300 text-emerald-900 dark:border-emerald-800 dark:text-emerald-100',
  info: 'border-brand-300 text-brand-900 dark:border-brand-700 dark:text-brand-100',
  celebration: 'border-amber-300 text-amber-900 dark:border-amber-700 dark:text-amber-100',
}

function ToneIcon({ tone }: { tone: ToastTone }) {
  if (tone === 'success') return <IconCheck size={16} />
  if (tone === 'celebration') return <IconSpark size={16} />
  return <IconTarget size={16} />
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(1)
  const timers = useRef(new Set<number>())

  const push = useCallback<Push>((t) => {
    const id = nextId.current++
    setToasts((prev) => [...prev, { ...t, tone: t.tone ?? 'info', id }].slice(-3))
    const timer = window.setTimeout(() => {
      timers.current.delete(timer)
      setToasts((prev) => prev.filter((x) => x.id !== id))
    }, 4500)
    timers.current.add(timer)
  }, [])

  useEffect(() => {
    const t = timers.current
    return () => {
      for (const timer of t) window.clearTimeout(timer)
    }
  }, [])

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-24 right-3 z-[60] flex w-[calc(100vw-1.5rem)] max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rise flex items-start gap-2.5 rounded-xl border bg-[var(--surface)]/95 px-3.5 py-3 shadow-xl shadow-black/10 backdrop-blur ${TONE_CLASS[t.tone]}`}
          >
            <span className="mt-0.5 shrink-0">
              <ToneIcon tone={t.tone} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-snug">{t.title}</span>
              {t.body && <span className="mt-0.5 block text-xs leading-snug opacity-80">{t.body}</span>}
            </span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): Push {
  return useContext(ToastContext)
}