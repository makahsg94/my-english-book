import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchBook } from '../lib/search'
import type { SearchHit } from '../lib/search'
import { IconSearch, IconClose } from './Icons'

export default function SearchBox({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [hits, setHits] = useState<SearchHit[]>([])
  const navigate = useNavigate()
  const boxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!query.trim()) return
    const t = setTimeout(() => setHits(searchBook(query)), 150)
    return () => clearTimeout(t)
  }, [query])

  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return
      e.preventDefault()
      inputRef.current?.focus()
      setOpen(true)
      inputRef.current?.select?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (h: SearchHit) => {
    navigate(h.url)
    setQuery('')
    setHits([])
    setOpen(false)
    inputRef.current?.blur()
  }

  const grouped = useMemo(() => {
    return {
      lessons: hits.filter((h) => h.type === 'lesson'),
      pages: hits.filter((h) => h.type === 'page'),
      banks: hits.filter((h) => h.type === 'bank'),
    }
  }, [hits])

  return (
    <div ref={boxRef} className="relative w-full max-w-sm">
      <div className="relative">
        <IconSearch size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-faint)]" />
        <input
          ref={inputRef}
          id="global-search"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            if (!e.target.value) setHits([])
          }}
          onFocus={() => setOpen(true)}
          placeholder={'Search the book\u2026'}
          className="w-full rounded-full border border-[var(--line-strong)] bg-[var(--surface)] py-2 pl-9 pr-12 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-brand-500"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setHits([])
            }}
            aria-label="clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--ink-faint)] hover:text-[var(--ink)]"
          >
            <IconClose size={14} />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-[var(--line-strong)] bg-[var(--line)] px-1.5 text-[11px] font-semibold text-[var(--ink-faint)] sm:inline-block">
            /
          </kbd>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-11 z-40 max-h-[70vh] overflow-y-auto rounded-xl border border-[var(--line-strong)] bg-[var(--surface)] py-2 shadow-xl scrollbar-thin">
          {grouped.lessons.length === 0 && grouped.pages.length === 0 && grouped.banks.length === 0 ? (
            <p className="px-4 py-3 text-sm text-[var(--ink-faint)]">No results for {'\u201c'}{query}{'\u201d'}.</p>
          ) : (
            <>
              {grouped.lessons.length > 0 && (
                <Group title="Lessons">
                  {grouped.lessons.map((h) => (
                    <Hit key={h.url} hit={h} onGo={go} />
                  ))}
                </Group>
              )}
              {grouped.pages.length > 0 && (
                <Group title="Book pages">
                  {grouped.pages.map((h) => (
                    <Hit key={h.url} hit={h} onGo={go} />
                  ))}
                </Group>
              )}
              {grouped.banks.length > 0 && (
                <Group title="Banks">
                  {grouped.banks.map((h) => (
                    <Hit key={h.url} hit={h} onGo={go} />
                  ))}
                </Group>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-[var(--ink-faint)]">{title}</p>
      {children}
    </div>
  )
}

function Hit({ hit, onGo }: { hit: SearchHit; onGo: (h: SearchHit) => void }) {
  return (
    <button
      type="button"
      onClick={() => onGo(hit)}
      className="block w-full px-4 py-2 text-left transition-colors hover:bg-brand-50 dark:hover:bg-brand-950"
    >
      <span className="block text-sm font-medium">{hit.title}</span>
      {hit.snippet && <span className="mt-0.5 block text-xs text-[var(--ink-faint)]">{hit.snippet}</span>}
    </button>
  )
}