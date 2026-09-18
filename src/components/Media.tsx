import { useEffect, useReducer, useRef, useState } from 'react'
import type { AudioTrack } from '../types/content'
import {
  PLAYBACK_SPEEDS,
  formatTime,
  getPlaybackRate,
  getPlayhead,
  isTrackActive,
  nextInstance,
  onEnded,
  seekAudio,
  setPlaybackRate,
  stepAudio,
  subscribePlayhead,
  toggleTrack,
} from '../lib/audio'
import { IconClose, IconForward, IconPlay, IconRewind, IconZoomIn, IconZoomOut } from './Icons'

function formatRate(r: number) {
  const s = Number.isInteger(r) ? r.toString() : r.toFixed(2).replace(/[.0]+$/, '')
  return `${s}x`
}

export function SpeedControl({ compact = false }: { compact?: boolean }) {
  const rate = getPlaybackRate()
  return (
    <button
      type="button"
      onClick={() => {
        const i = PLAYBACK_SPEEDS.indexOf(rate)
        setPlaybackRate(PLAYBACK_SPEEDS[(i + 1) % PLAYBACK_SPEEDS.length])
      }}
      aria-label={`Playback speed ${formatRate(rate)}`}
      title="Playback speed"
      className={
        compact
          ? 'shrink-0 rounded-md px-1.5 py-1 font-mono text-[11px] font-bold tabular-nums text-[var(--ink-soft)] transition-colors hover:bg-[var(--line)]'
          : 'shrink-0 rounded-md px-2 font-mono text-[11px] font-bold tabular-nums text-brand-700 transition-colors hover:bg-[var(--line)] dark:text-brand-300'
      }
    >
      {formatRate(rate)}
    </button>
  )
}

export function AudioPlayer({ tracks, title }: { tracks: AudioTrack[]; title?: string }) {
  const [instance] = useState(() => nextInstance())
  const [, force] = useReducer((n: number) => n + 1, 0)

  useEffect(() => subscribePlayhead(force), [])

  useEffect(
    () =>
      onEnded(() => {
        const ph = getPlayhead()
        if (!ph || ph.instance !== instance) return
        const i = tracks.findIndex((t) => t.file === ph.file)
        const next = tracks[i + 1]
        if (next?.file) toggleTrack(next.file, next.label, instance)
      }),
    [instance, tracks],
  )

  if (tracks.length === 0) return null

  return (
    <section className="space-y-2">
      {title && (
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
          {title}
        </h3>
      )}
      <div className="divide-y divide-[var(--line)] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]">
        {tracks.map((t) => {
          const active = !!t.file && isTrackActive(t.file)
          const mine = active && getPlayhead()?.instance === instance
          const ph = getPlayhead()
          const loading = mine && !(ph && ph.duration > 0)
          const max = ph?.duration && ph.duration > 0 ? ph.duration : 1
          return t.file ? (
            <div key={t.label}>
              <button
                type="button"
                onClick={() => toggleTrack(t.file!, t.label, instance)}
                aria-pressed={active}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[var(--brand-50)] dark:hover:bg-[var(--brand-950)]"
              >
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full text-white transition-colors ${
                    active ? 'bg-accent-600' : 'bg-brand-600'
                  }`}
                >
                  {active ? (
                    <span className="eq eq-on" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    <IconPlay size={16} className="ml-0.5" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{t.label}</span>
                  <span className="block truncate font-mono text-xs text-[var(--ink-faint)]">
                    {t.file.split('/audio/').pop()}
                    {loading && (
                      <span className="ml-2 animate-pulse italic text-[var(--ink-soft)]">loading{'\u2026'}</span>
                    )}
                  </span>
                </span>
                {t.page && <span className="shrink-0 text-xs text-[var(--ink-faint)]">page {t.page}</span>}
              </button>

              {mine && (
                <div className="flex items-center gap-2 border-t border-[var(--line)] bg-[var(--brand-50)] px-4 py-2.5 dark:bg-[var(--brand-950)]">
                  <button
                    type="button"
                    onClick={() => stepAudio(-10)}
                    className="flex min-h-9 min-w-9 flex-col items-center justify-center rounded-md px-2 py-1 text-brand-700 transition-colors hover:bg-[var(--line)] dark:text-brand-300"
                    title="Back 10 seconds"
                  >
                    <IconRewind size={16} />
                    <span className="text-[9px] font-bold leading-none">10</span>
                  </button>

                  <span className="w-10 shrink-0 text-right font-mono text-[11px] tabular-nums text-[var(--ink-soft)]">
                    {formatTime(ph?.position ?? 0)}
                  </span>

                  <input
                    type="range"
                    min={0}
                    max={max}
                    step={1}
                    value={Math.min(ph?.position ?? 0, max)}
                    onChange={(e) => seekAudio(Number(e.target.value))}
                    aria-label={`Seek ${t.label}`}
                    className="h-1.5 min-w-0 flex-1 cursor-pointer accent-brand-600"
                  />

                  <span className="w-10 shrink-0 font-mono text-[11px] tabular-nums text-[var(--ink-faint)]">
                    {formatTime(ph?.duration ?? 0)}
                  </span>

                  <button
                    type="button"
                    onClick={() => stepAudio(10)}
                    className="flex min-h-9 min-w-9 flex-col items-center justify-center rounded-md px-2 py-1 text-brand-700 transition-colors hover:bg-[var(--line)] dark:text-brand-300"
                    title="Forward 10 seconds"
                  >
                    <IconForward size={16} />
                    <span className="text-[9px] font-bold leading-none">10</span>
                  </button>

                  <SpeedControl />
                </div>
              )}
            </div>
          ) : (
            <div key={t.label} className="flex items-center gap-3 px-4 py-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--line)] text-[var(--ink-faint)]">
                <IconPlay size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{t.label}</span>
                <span className="block text-xs text-[var(--ink-faint)]">{t.note}</span>
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

let lightboxOpen: string | null = null
const lightboxListeners = new Set<() => void>()

function setLightbox(url: string | null) {
  lightboxOpen = url
  for (const l of lightboxListeners) l()
}

export function openLightbox(url: string) {
  setLightbox(url)
}

export function LightboxProvider() {
  const [url, setUrl] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null)
  const urlRef = useRef<string | null>(url)
  urlRef.current = url

  useEffect(() => {
    const cb = () => {
      if (urlRef.current !== lightboxOpen) {
        setUrl(lightboxOpen)
        setZoom(1)
        setPos({ x: 0, y: 0 })
      }
    }
    lightboxListeners.add(cb)
    return () => {
      lightboxListeners.delete(cb)
    }
  }, [])

  useEffect(() => {
    if (!url) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      else if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(6, z * 1.25))
      else if (e.key === '-' || e.key === '_') setZoom((z) => Math.max(0.4, z / 1.25))
      else if (e.key === '0') {
        setZoom(1)
        setPos({ x: 0, y: 0 })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [url])

  if (!url) return null

  const clampZoom = (z: number) => Math.min(6, Math.max(0.4, z))
  const zoomBy = (factor: number) => setZoom((z) => clampZoom(z * factor))
  const reset = () => {
    setZoom(1)
    setPos({ x: 0, y: 0 })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/90 p-3 sm:p-4"
      onClick={() => setLightbox(null)}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <div
        className="z-10 mb-2 flex items-center gap-1.5 self-center rounded-full bg-white/10 px-2 py-1.5 text-white sm:absolute sm:left-1/2 sm:top-4 sm:-translate-x-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => zoomBy(1.25)}
          aria-label="Zoom in"
          className="grid size-8 place-items-center rounded-full text-white transition-colors hover:bg-white/20"
        >
          <IconZoomIn size={17} />
        </button>
        <button
          type="button"
          onClick={() => zoomBy(0.8)}
          aria-label="Zoom out"
          className="grid size-8 place-items-center rounded-full text-white transition-colors hover:bg-white/20"
        >
          <IconZoomOut size={17} />
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label="Reset zoom"
          className="min-w-12 rounded-full px-2 py-1 text-center font-mono text-xs transition-colors hover:bg-white/20"
        >
          {Math.round(zoom * 100)}%
        </button>
        <span className="hidden text-[11px] text-white/60 sm:inline">scroll or drag</span>
      </div>

      <button
        type="button"
        aria-label="Close"
        onClick={() => setLightbox(null)}
        className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <IconClose size={20} />
      </button>

      <div
        className="relative h-full min-h-0 flex-1 overflow-hidden rounded-lg"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => {
          drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y }
          setDragging(true)
          ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
        }}
        onPointerMove={(e) => {
          if (!drag.current) return
          const dx = e.clientX - drag.current.sx
          const dy = e.clientY - drag.current.sy
          setPos({ x: drag.current.ox + dx, y: drag.current.oy + dy })
        }}
        onPointerUp={() => {
          drag.current = null
          setDragging(false)
        }}
        onPointerCancel={() => {
          drag.current = null
          setDragging(false)
        }}
        onWheel={(e) => {
          e.preventDefault()
          zoomBy(e.deltaY < 0 ? 1.15 : 0.87)
        }}
        onDoubleClick={() => {
          if (zoom > 1.3) reset()
          else setZoom((z) => clampZoom(z * 2))
        }}
        style={{ cursor: zoom > 1 ? 'grab' : 'zoom-in', touchAction: 'none' }}
      >
        <img
          src={url}
          alt=""
          draggable={false}
          className="absolute left-1/2 top-1/2 max-h-full max-w-full select-none object-contain"
          style={{
            transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${zoom})`,
            transition: dragging ? 'none' : 'transform 120ms ease',
          }}
        />
      </div>
    </div>
  )
}