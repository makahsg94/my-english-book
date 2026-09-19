import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SHADOWING_CLIPS, getShadowClip, type ShadowClip, type ShadowKind, type ShadowLine } from '../content/shadowing'
import { videoSrc } from '../lib/videos'
import { playSound } from '../lib/sounds'
import {
  IconChevronRight,
  IconClock,
  IconClose,
  IconCross,
  IconForward,
  IconHome,
  IconList,
  IconMic,
  IconPause,
  IconPlay,
  IconRewind,
  IconRotate,
  IconVideo,
  IconVolume,
  IconZoomIn,
} from '../components/Icons'

function Ar({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span dir="rtl" lang="ar" className={`ar ${className}`}>
      {children}
    </span>
  )
}

const SPEED_KEY = 'shadow-speed'
const SPEEDS = [
  { id: '0.5', value: 0.5, label: '0.5×' },
  { id: '0.75', value: 0.75, label: '0.75×' },
  { id: '1', value: 1, label: '1×' },
  { id: '1.25', value: 1.25, label: '1.25×' },
  { id: '1.5', value: 1.5, label: '1.5×' },
]

function loadSpeed(): number {
  try {
    const raw = window.localStorage.getItem(SPEED_KEY)
    if (raw) {
      const v = Number(raw)
      if (SPEEDS.some((s) => s.value === v)) return v
    }
  } catch {
    /* ignore */
  }
  return 1
}

function saveSpeed(v: number) {
  try {
    window.localStorage.setItem(SPEED_KEY, String(v))
  } catch {
    /* ignore */
  }
}

function fmt(sec: number): string {
  if (!isFinite(sec) || sec < 0) sec = 0
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function say(text: string, rate = 0.8) {
  const synth = window.speechSynthesis
  if (!synth) return
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-GB'
  u.rate = rate
  synth.speak(u)
}

interface SpeechRecognitionLike {
  lang: string
  continuous: boolean
  interimResults: boolean
  start(): void
  stop(): void
  abort(): void
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onerror: ((e: { error: string }) => void) | null
}

type SRCtor = new () => SpeechRecognitionLike

function recognitionCtor(): SRCtor | undefined {
  const w = window as { SpeechRecognition?: SRCtor; webkitSpeechRecognition?: SRCtor }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition
}

function wordsOf(text: string) {
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
}

function matchWords(targetWords: string[], saidWords: string[]) {
  const bag = new Map<string, number>()
  for (const w of saidWords) bag.set(w, (bag.get(w) ?? 0) + 1)
  return targetWords.map((w) => {
    const left = bag.get(w) ?? 0
    if (left > 0) {
      bag.set(w, left - 1)
      return true
    }
    return false
  })
}

function LineScorer({ text, onClose }: { text: string; onClose: () => void }) {
  const supported = typeof window !== 'undefined' && !!recognitionCtor()
  const [listening, setListening] = useState(false)
  const [result, setResult] = useState<{ ok: boolean[]; said: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const recRef = useRef<SpeechRecognitionLike | null>(null)

  useEffect(
    () => () => {
      if (recRef.current) recRef.current.abort()
    },
    [],
  )

  if (!supported) {
    return null
  }

  const stopListening = () => {
    if (recRef.current) {
      recRef.current.abort()
      recRef.current = null
    }
    setListening(false)
  }

  const record = () => {
    setError(null)
    setResult(null)
    const Ctor = recognitionCtor()
    if (!Ctor) return
    const rec = new Ctor()
    recRef.current = rec
    rec.lang = 'en-GB'
    rec.interimResults = false
    rec.continuous = false
    rec.onresult = (e) => {
      const said = e.results[0]?.[0]?.transcript.trim() ?? ''
      if (said) {
        const target = wordsOf(text)
        const saidW = wordsOf(said)
        const ok = matchWords(target, saidW)
        setResult({ ok, said })
        const pct = ok.filter(Boolean).length / Math.max(1, target.length)
        if (pct === 1) playSound('star')
        else if (pct >= 0.5) playSound('echo')
        else playSound('wrong')
      }
      setListening(false)
    }
    rec.onerror = (e) => {
      setListening(false)
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        setError('الميكروفون مقفول — اسمح بالوصول وحاول تاني.')
      } else if (e.error === 'no-speech') {
        setError('مش سمعنا حاجة — اضغط تسجيل وكرّر الجملة تاني.')
      } else if (e.error === 'network') {
        setError('خدمة الصوت مش متاحة — اتأكد من النت وجرّب تاني.')
      } else {
        setError('مقدرناش نسمعك بوضوح — جرّب تاني.')
      }
    }
    setListening(true)
    try {
      rec.start()
    } catch {
      setListening(false)
      setError('مقدرناش نشغّل الميكروفون على الجهاز ده.')
    }
  }

  const target = wordsOf(text)
  const pct = result ? Math.round((result.ok.filter(Boolean).length / Math.max(1, target.length)) * 100) : 0

  return (
    <div className="space-y-2.5 rounded-xl border border-brand-200 bg-brand-50/60 p-3.5 dark:border-brand-800 dark:bg-brand-950/50">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-xs font-bold text-brand-800 dark:text-brand-200">
          <IconMic size={14} />
          <Ar>امتحان النطق — قولها وراء الستارة</Ar>
        </p>
        <button
          type="button"
          onClick={() => {
            stopListening()
            onClose()
          }}
          className="rounded-full p-1 text-[var(--ink-faint)] transition-colors hover:bg-[var(--line)] hover:text-[var(--ink)]"
          aria-label="إغلاق امتحان النطق"
        >
          <IconClose size={14} />
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <p className="w-full rounded-lg bg-[var(--surface)] px-3 py-2 leading-relaxed">{text}</p>
        <button
          type="button"
          onClick={() => say(text)}
          className="inline-flex items-center gap-1 rounded-full border border-[var(--line-strong)] px-3 py-1.5 text-xs font-semibold text-[var(--ink-soft)] transition-colors hover:border-brand-400 hover:text-brand-700"
        >
          <IconVolume size={13} /> <Ar>اسمعها تاني</Ar>
        </button>
        <button
          type="button"
          onClick={listening ? stopListening : record}
          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            listening
              ? 'border-rose-400 bg-rose-500 text-white'
              : 'border-brand-400 bg-brand-600 text-white hover:bg-brand-700'
          }`}
        >
          <IconMic size={13} />
          {listening ? '...يجري التقاط' : <Ar>سجّل صوتك</Ar>}
        </button>
      </div>

      {error && (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[13px] text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
          {error}
        </p>
      )}

      {result && (
        <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-3">
          <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
              <Ar>قولت:</Ar> <span className="normal-case italic tracking-normal text-[var(--ink-soft)]">{result.said}</span>
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                pct === 100 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-[var(--line)] text-[var(--ink-soft)]'
              }`}
            >
              {pct === 100 ? 'ممتاز! \u2B50' : `${pct}% مطابقة`}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {target.map((w, i) => (
              <span
                key={i}
                className={`rounded-md px-1.5 py-0.5 text-[12.5px] font-medium ${
                  result.ok[i]
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {w}
              </span>
            ))}
          </div>
          {pct !== 100 && (
            <button
              type="button"
              onClick={record}
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-3 py-1 text-xs font-semibold text-[var(--ink-soft)] transition-colors hover:border-brand-400 hover:text-brand-700"
            >
              <IconRotate size={12} /> <Ar>جرّب تاني</Ar>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

const KIND_META: Record<ShadowKind, { label: string; chip: string; dot: string }> = {
  course: {
    label: 'من الكتاب',
    chip: 'border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300',
    dot: 'bg-brand-500',
  },
  cartoon: {
    label: 'كرتون',
    chip: 'border-warm-200 bg-warm-50 text-warm-700 dark:border-warm-900 dark:bg-warm-950 dark:text-warm-300',
    dot: 'bg-warm-500',
  },
  movie: {
    label: 'فيلم',
    chip: 'border-accent-200 bg-accent-50 text-accent-800 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-300',
    dot: 'bg-accent-500',
  },
  series: {
    label: 'مسلسل',
    chip: 'border-accent-200 bg-accent-50 text-accent-800 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-300',
    dot: 'bg-accent-500',
  },
}

function ClipCard({ clip, onOpen }: { clip: ShadowClip; onOpen: () => void }) {
  const meta = KIND_META[clip.kind]
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      <span className="flex items-center justify-between gap-2">
        <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${meta.chip}`}>
          <IconVideo size={20} />
        </span>
        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${meta.chip}`}>
          <span className={`size-1.5 rounded-full ${meta.dot}`} />
          <Ar>{meta.label}</Ar>
        </span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-sm font-bold leading-snug text-[var(--ink)]">{clip.title}</span>
        <span className="truncate font-mono text-[11px] text-[var(--ink-faint)]">{clip.source}</span>
        {clip.note && (
          <span className="text-[12.5px] leading-relaxed text-[var(--ink-soft)]" dir="rtl" lang="ar">
            {clip.note}
          </span>
        )}
        {clip.lines && clip.lines.length > 0 && (
          <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-[var(--line)] px-2 py-0.5 text-[11px] font-semibold text-[var(--ink-soft)]">
            <IconList size={11} />
            <Ar>{clip.lines.length} سطر حوار جاهز</Ar>
          </span>
        )}
      </span>
      <span className="inline-flex items-center gap-1 self-end text-[12px] font-bold text-brand-600 transition-colors group-hover:text-brand-700 dark:text-brand-300">
        <Ar>افتح الاستوديو</Ar>
        <IconChevronRight size={13} />
      </span>
    </button>
  )
}

function Library({ onOpen }: { onOpen: (id: string) => void }) {
  const course = SHADOWING_CLIPS.filter((c) => c.kind === 'course')
  const custom = SHADOWING_CLIPS.filter((c) => c.kind !== 'course')
  return (
    <div className="fade-up mx-auto max-w-4xl space-y-8">
      <section className="grid gap-3 sm:grid-cols-3">
        {[
          { n: '1', ar: 'اسمع', en: 'Listen without reading' },
          { n: '2', ar: 'كرر', en: 'Pause, loop, echo it back' },
          { n: '3', ar: 'سجّل', en: 'Record yourself and compare' },
        ].map((s) => (
          <div key={s.n} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm">
            <span className="grid size-7 place-items-center rounded-lg bg-brand-600 text-sm font-bold text-white">{s.n}</span>
            <p className="mt-2 text-sm font-bold text-brand-800 dark:text-brand-200" dir="rtl" lang="ar">
              {s.ar}
            </p>
            <p className="pt-1 text-[12.5px] leading-relaxed text-[var(--ink-faint)]">{s.en}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="h-4 w-1 rounded-full bg-gradient-to-b from-brand-500 to-accent-500" />
          <Ar>فيديوهات الكتاب (BBC)</Ar>
          <span className="text-xs font-semibold text-[var(--ink-faint)]">({course.length})</span>
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {course.map((c) => (
            <ClipCard key={c.id} clip={c} onOpen={() => onOpen(c.id)} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="h-4 w-1 rounded-full bg-gradient-to-b from-warm-500 to-accent-500" />
          <Ar>كرتون وأفلام</Ar>
          <span className="text-xs font-semibold text-[var(--ink-faint)]">({custom.length})</span>
        </h2>
        {custom.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {custom.map((c) => (
              <ClipCard key={c.id} clip={c} onOpen={() => onOpen(c.id)} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-warm-300 bg-warm-50/60 p-6 dark:border-warm-900 dark:bg-warm-950/40">
            <p className="text-sm font-bold text-warm-800 dark:text-warm-200" dir="rtl" lang="ar">
              عايز تشادونج على كرتون أو فيلم؟
            </p>
            <ol className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-[var(--ink-soft)]" dir="rtl" lang="ar">
              <li>1) حط ملف الفيديو (.mp4) جوه مجلد <code className="rounded bg-[var(--line)] px-1.5 py-0.5 font-mono text-[12px]">public/videos/</code> في المشروع.</li>
              <li>2) افتح <code className="rounded bg-[var(--line)] px-1.5 py-0.5 font-mono text-[12px]">src/content/shadowing.ts</code> واضيف Clip بسيط (مثال جاهز معلّق أهو جوه الملف).</li>
              <li>3) اختياري: اكتب نص الحوار مع التايم بتاع كل جملة، وهيتفضل تحت المشغل للشادونج اللي ورا الستارة.</li>
            </ol>
          </div>
        )}
      </section>
    </div>
  )
}

function Studio({ clip, onBack }: { clip: ShadowClip; onBack: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [t, setT] = useState(0)
  const [dur, setDur] = useState(0)
  const [speed, setSpeed] = useState(() => loadSpeed())
  const [ab, setAb] = useState<{ a: number | null; b: number | null }>({ a: null, b: null })
  const [micLine, setMicLine] = useState<string | null>(null)
  const meta = KIND_META[clip.kind]

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [])

  const lines = clip.lines ?? []
  const activeIdx = (() => {
    if (lines.length === 0) return -1
    let idx = -1
    for (let i = 0; i < lines.length; i++) {
      if (t >= lines[i].time) idx = i
      else break
    }
    return idx
  })()

  const setVidSpeed = (v: number) => {
    setSpeed(v)
    saveSpeed(v)
    if (videoRef.current) videoRef.current.playbackRate = v
  }

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      void v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const seek = (value: string | number) => {
    const v = videoRef.current
    if (!v) return
    const to = Math.max(0, Number(value))
    v.currentTime = to
    setT(to)
  }

  const step = (dt: number) => {
    const v = videoRef.current
    if (!v) return
    const to = Math.max(0, Math.min(v.duration || (dur || 0), v.currentTime + dt))
    v.currentTime = to
    setT(to)
  }

  const setA = () => {
    setAb((prev) => (prev.b !== null && prev.b <= t ? { a: t, b: null } : { a: t, b: prev.b }))
  }
  const setB = () => {
    setAb((prev) => (prev.a !== null && t > prev.a ? { a: prev.a, b: t } : prev))
  }
  const clearAB = () => {
    setAb({ a: null, b: null })
  }

  const loopOn = ab.a !== null && ab.b !== null

  const replayLine = (line: ShadowLine, lineIdx: number) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = line.time
    setT(line.time)
    const end = line.end ?? (lineIdx + 1 < lines.length ? lines[lineIdx + 1].time : Math.min(v.duration || dur, line.time + 6))
    setAb({ a: line.time, b: end })
    void v.play()
    setPlaying(true)
  }

  const toggleFullscreen = () => {
    const el = wrapRef.current
    if (!el) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void el.requestFullscreen?.()
    }
  }

  useEffect(() => {
    const v = videoRef.current
    if (v) {
      v.playbackRate = speed
      v.volume = 1
    }
  }, [clip.id, speed])

  return (
    <div className="fade-up mx-auto max-w-2xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-[var(--surface)] px-3 py-1.5 text-xs font-bold text-[var(--ink-soft)] transition-colors hover:border-brand-400 hover:text-brand-700"
        >
          <IconChevronRight size={13} className="rotate-180" />
          <Ar>إلى المكتبة</Ar>
        </button>
        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold ${meta.chip}`}>
          <span className={`size-1.5 rounded-full ${meta.dot}`} />
          <Ar>{meta.label}</Ar>
        </span>
      </div>

      <header className="space-y-1 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-700 dark:text-brand-300">
          Shadowing studio
        </p>
        <h1 className="display text-3xl font-bold tracking-tight">{clip.title}</h1>
        <p className="text-[12px] font-mono text-[var(--ink-faint)]">{clip.file}</p>
      </header>

      <div ref={wrapRef} className="group-video relative overflow-hidden rounded-2xl bg-black shadow-lg">
        <video
          key={clip.id}
          ref={videoRef}
          src={videoSrc(clip.file)}
          preload="metadata"
          playsInline
          onClick={togglePlay}
          onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
          onTimeUpdate={(e) => {
            const v = e.currentTarget
            setT(v.currentTime)
            if (ab.b !== null && ab.a !== null && v.currentTime >= ab.b) {
              v.currentTime = ab.a
              setT(ab.a)
            }
          }}
          onEnded={() => {
            setPlaying(false)
            if (ab.a !== null && ab.b !== null) {
              const v = videoRef.current
              if (v) {
                v.currentTime = ab.a
                void v.play()
                setPlaying(true)
              }
            }
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="aspect-video w-full cursor-pointer"
          aria-label={clip.title}
        />
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? 'إيقاف' : 'تشغيل'}
          className="absolute inset-0 m-auto grid size-16 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-opacity hover:bg-black/60"
        >
          {playing ? <IconPause size={28} /> : <IconPlay size={30} className="translate-x-0.5" />}
        </button>
        {loopOn && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-warm-600 px-2.5 py-1 text-[11px] font-bold text-white shadow">
            <IconRotate size={12} />
            <span className="tabular-nums">
              {fmt(ab.a!)} {'\u2192'} {fmt(ab.b!)}
            </span>
          </span>
        )}
      </div>

      <div className="space-y-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="shrink-0 w-11 text-center font-mono text-[12px] tabular-nums text-[var(--ink-soft)]">
            {fmt(t)}
          </span>
          <input
            type="range"
            min={0}
            max={Math.max(0, Math.floor(dur))}
            step={0.1}
            value={Math.min(t, dur)}
            onChange={(e) => seek(e.target.value)}
            aria-label="شريط التقدم"
            className="flex-1 accent-brand-600"
          />
          <span className="shrink-0 w-12 text-center font-mono text-[12px] tabular-nums text-[var(--ink-faint)]">
            {fmt(dur)}
          </span>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="grid size-8 shrink-0 place-items-center rounded-lg text-[var(--ink-faint)] transition-colors hover:bg-[var(--line)] hover:text-[var(--ink)]"
            aria-label="ملء الشاشة"
          >
            <IconZoomIn size={16} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => step(-3)}
            className="inline-flex items-center gap-1 rounded-lg border border-[var(--line-strong)] px-2.5 py-1.5 text-xs font-semibold text-[var(--ink-soft)] transition-colors hover:border-brand-400 hover:text-brand-700"
            aria-label="رجوع 3 ثواني"
          >
            <IconRewind size={13} /> 3s
          </button>
          <button
            type="button"
            onClick={() => step(3)}
            className="inline-flex items-center gap-1 rounded-lg border border-[var(--line-strong)] px-2.5 py-1.5 text-xs font-semibold text-[var(--ink-soft)] transition-colors hover:border-brand-400 hover:text-brand-700"
            aria-label="قدام 3 ثواني"
          >
            <IconForward size={13} /> 3s
          </button>
          <span className="mx-1 h-5 w-px bg-[var(--line)]" aria-hidden />
          <span className="inline-flex items-center gap-1.5" role="group" aria-label="سرعة التشغيل">
            {SPEEDS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setVidSpeed(s.value)}
                aria-pressed={speed === s.value}
                className={`rounded-full border px-2.5 py-1 text-xs font-bold transition-colors ${
                  speed === s.value
                    ? 'border-brand-500 bg-brand-600 text-white'
                    : 'border-[var(--line-strong)] bg-[var(--bg)] text-[var(--ink-soft)] hover:border-brand-400'
                }`}
              >
                {s.label}
              </button>
            ))}
          </span>
          <span className="mx-1 h-5 w-px bg-[var(--line)]" aria-hidden />
          <button
            type="button"
            onClick={setA}
            disabled={dur === 0 || (ab.b !== null && t >= ab.b)}
            className={`rounded-full border px-2.5 py-1 text-xs font-bold transition-colors disabled:opacity-40 ${
              ab.a !== null ? 'border-warm-500 bg-warm-500 text-white' : 'border-[var(--line-strong)] bg-[var(--bg)] text-[var(--ink-soft)] hover:border-warm-400'
            }`}
          >
            <Ar>ضبط A</Ar>
          </button>
          <button
            type="button"
            onClick={setB}
            disabled={ab.a === null || t <= ab.a}
            className={`rounded-full border px-2.5 py-1 text-xs font-bold transition-colors disabled:opacity-40 ${
              ab.b !== null ? 'border-warm-500 bg-warm-500 text-white' : 'border-[var(--line-strong)] bg-[var(--bg)] text-[var(--ink-soft)] hover:border-warm-400'
            }`}
          >
            <Ar>ضبط B</Ar>
          </button>
          {loopOn && (
            <button
              type="button"
              onClick={clearAB}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-xs font-semibold text-[var(--ink-soft)] transition-colors hover:border-rose-300 hover:text-rose-600"
            >
              <IconCross size={12} /> <Ar>إلغاء الحلقة</Ar>
            </button>
          )}
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${
              loopOn ? 'bg-warm-100 text-warm-700 dark:bg-warm-900 dark:text-warm-200' : 'text-[var(--ink-faint)]'
            }`}
          >
            <IconClock size={12} />
            {loopOn ? (
              <span className="tabular-nums" dir="ltr">
                {fmt(ab.a!)} — {fmt(ab.b!)}
              </span>
            ) : (
              <Ar>حلقة A-B</Ar>
            )}
          </span>
        </div>

        {loopOn && (
          <p className="rounded-lg border border-warm-200 bg-warm-50 px-3 py-2 text-[12.5px] leading-relaxed text-warm-800 dark:border-warm-900 dark:bg-warm-950 dark:text-warm-200">
            <Ar>
              الحلقة شغّالة — الجزء من {fmt(ab.a!)} ل {fmt(ab.b!)} هيتعاد لوحده لحد ما تدوس «إلغاء الحلقة». مثالي لتمشيط
              جملة صعبة.
            </Ar>
          </p>
        )}
      </div>

      {lines.length > 0 ? (
        <section className="space-y-2.5">
          <h2 className="flex items-center gap-2 text-sm font-bold text-[var(--ink)]">
            <span className="grid size-7 place-items-center rounded-md bg-brand-600 text-white">
              <IconList size={14} />
            </span>
            <Ar>سطور الشادونج ({lines.length})</Ar>
            <span className="text-[11px] font-normal text-[var(--ink-faint)]">
              <Ar>اللي بيظهر ملوّن هو اللي الفيديو واقف عنده</Ar>
            </span>
          </h2>
          {lines.map((line, i) => {
            const active = i === activeIdx
            const openMic = micLine === line.en
            const next = i + 1 < lines.length ? lines[i + 1] : null
            return (
              <div
                key={i}
                className={`rounded-xl border p-3.5 transition-colors ${
                  active
                    ? 'border-brand-400 bg-brand-50/70 dark:border-brand-700 dark:bg-brand-950/50'
                    : 'border-[var(--line)] bg-[var(--surface)]'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="grid size-6 place-items-center rounded-md bg-[var(--line)] font-mono text-[11px] font-bold tabular-nums text-[var(--ink-soft)]">
                        {i + 1}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--line)] px-2 py-0.5 font-mono text-[11px] tabular-nums text-[var(--ink-soft)]">
                        <IconClock size={10} />
                        {fmt(line.time)}
                      </span>
                      {line.ar && (
                        <Ar className="text-[13px] font-medium text-[var(--ink-faint)]">{line.ar}</Ar>
                      )}
                    </div>
                    <p className="mt-1.5 text-[15px] font-semibold leading-relaxed">{line.en}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        const v = videoRef.current
                        if (!v) return
                        v.currentTime = line.time
                        setT(line.time)
                        void v.play()
                        setPlaying(true)
                      }}
                      className="inline-flex items-center gap-1 rounded-full border border-brand-300 bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-800 transition-colors hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200"
                    >
                      <IconPlay size={11} /> <Ar>كرر</Ar>
                    </button>
                    <button
                      type="button"
                      onClick={() => say(line.en)}
                      className="inline-flex items-center gap-1 rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-[11px] font-semibold text-[var(--ink-soft)] transition-colors hover:border-brand-400 hover:text-brand-700"
                      aria-label="اسمع الجملة"
                    >
                      <IconVolume size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMicLine(line.en)
                        setPlaying(false)
                        videoRef.current?.pause()
                      }}
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold transition-colors ${
                        openMic
                          ? 'border-brand-500 bg-brand-600 text-white'
                          : 'border-[var(--line-strong)] bg-[var(--bg)] text-[var(--ink-soft)] hover:border-brand-400 hover:text-brand-700'
                      }`}
                    >
                      <IconMic size={12} /> {openMic ? <Ar>سداد</Ar> : <Ar>امتحن نطقك</Ar>}
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => replayLine(line, i)}
                    className="inline-flex items-center gap-1 rounded-full border border-warm-200 bg-warm-50 px-2.5 py-1 text-[11px] font-bold text-warm-700 transition-colors hover:bg-warm-100 dark:border-warm-900 dark:bg-warm-950 dark:text-warm-300"
                  >
                    <IconRotate size={11} /> <Ar>كررها كحلقة</Ar>
                  </button>
                  {next && (
                    <span className="text-[11px] text-[var(--ink-faint)]">
                      <Ar>حتى</Ar> {fmt(next.time)}
                    </span>
                  )}
                </div>
                {openMic && <div className="mt-3"><LineScorer text={line.en} onClose={() => setMicLine(null)} /></div>}
              </div>
            )
          })}
        </section>
      ) : (
        <section className="space-y-3 rounded-2xl border border-dashed border-brand-300 bg-brand-50/50 p-5 dark:border-brand-800 dark:bg-brand-950/40">
          <p className="text-sm font-bold text-brand-800 dark:text-brand-200" dir="rtl" lang="ar">
            مفيش نص حوار جاهز للمقطع ده
          </p>
          <ul className="list-none space-y-1.5 text-[13.5px] leading-relaxed text-[var(--ink-soft)]" dir="rtl" lang="ar">
            <li>· شغّل الفيديو ووقف عند جملة عايز تتمرن عليها.</li>
            <li>· دوس «ضبط A» عند بدايتها و«ضبط B» عند نهايتها — هتتكرر لوحدها.</li>
            <li>· كرر وراها كذا مرة، وبعدين جرّب تحكيها ورا الستارة.</li>
          </ul>
          <p className="text-[12px] leading-relaxed text-[var(--ink-faint)]" dir="rtl" lang="ar">
            لو عايز سطور الحوار تظهر هنا تلقائيًا، ضيفها في الملف{' '}
            <code className="rounded bg-[var(--line)] px-1.5 py-0.5 font-mono text-[11px]">src/content/shadowing.ts</code>{' '}
            تحت المقطع ده، ومثال جاهز معلّق في آخر الملف.
          </p>
        </section>
      )}
    </div>
  )
}

export default function ShadowingPage() {
  const [clipId, setClipId] = useState<string | null>(null)
  const clip = clipId ? getShadowClip(clipId) : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [clipId])

  return (
    <div className="fade-up mx-auto max-w-4xl space-y-8">
      <nav className="flex items-center gap-1 text-sm text-[var(--ink-faint)]">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
          <IconHome size={14} /> Home
        </Link>
        <IconChevronRight size={13} />
        <span className="text-[var(--ink)]">
          <Ar>استوديو الشادونج</Ar>
        </span>
      </nav>

      {clip ? (
        <Studio clip={clip} onBack={() => setClipId(null)} />
      ) : (
        <>
          <header className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-300">
              Speakout A2 {'\u00b7'} Shadowing studio
            </p>
            <h1 className="display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              <Ar>استوديو الشادونج</Ar>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
              <Ar>
                اختار فيديو، اسمعه جمله جمله، قف عند اللي صعبة عليك، وكررها وراء الستارة لحد ما لسانك يتروس عليها —
                طريقه بتحسس النطق والسرعة وطريقة نطق الكلام الطبيعي.
              </Ar>
            </p>
          </header>

          <Library onOpen={setClipId} />
        </>
      )}
    </div>
  )
}