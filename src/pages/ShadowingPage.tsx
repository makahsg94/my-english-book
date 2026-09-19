import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SHADOWING_CLIPS, getShadowClip, type ShadowClip, type ShadowKind } from '../content/shadowing'
import { videoSrc } from '../lib/videos'
import { playSound } from '../lib/sounds'
import {
  IconChevronRight,
  IconClock,
  IconClose,
  IconHome,
  IconList,
  IconMic,
  IconPause,
  IconPlay,
  IconRotate,
  IconVideo,
  IconVolume,
} from '../components/Icons'

function Ar({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span dir="rtl" lang="ar" className={`ar ${className}`}>
      {children}
    </span>
  )
}

const SPEED_KEY = 'shadow-speed'
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5]

function loadSpeed(): number {
  try {
    const raw = window.localStorage.getItem(SPEED_KEY)
    if (raw && SPEEDS.includes(Number(raw))) return Number(raw)
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
    return (
      <div className="rounded-xl border border-brand-200 bg-brand-50/60 p-3.5 text-[13px] text-brand-800 dark:border-brand-800 dark:bg-brand-950/50 dark:text-brand-200">
        <Ar>الميكروفون غير مدعوم في المتصفح ده — جرّب Google Chrome أو Edge.</Ar>
      </div>
    )
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
          <Ar>امتحان النطق</Ar>
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
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => say(text)}
          className="inline-flex items-center gap-1 rounded-full border border-[var(--line-strong)] px-3 py-1.5 text-xs font-semibold text-[var(--ink-soft)] transition-colors hover:border-brand-400 hover:text-brand-700"
        >
          <IconVolume size={13} /> <Ar>اسمعها</Ar>
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
          {listening ? '...بيسمع' : <Ar>سجّل صوتك</Ar>}
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
            <span className="text-[12px] text-[var(--ink-soft)]">
              <Ar>قولت:</Ar> <span className="italic">{result.said}</span>
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
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
        {clip.scenes && clip.scenes.length > 0 && (
          <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-[var(--line)] px-2 py-0.5 text-[11px] font-semibold text-[var(--ink-soft)]">
            <IconList size={11} />
            <Ar>{clip.scenes.length} مشاهد جاهزة</Ar>
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
          { n: '1', ar: 'اسمع', en: 'Play the scene' },
          { n: '2', ar: 'شادونج', en: 'It loops, you repeat louder' },
          { n: '3', ar: 'سجّل', en: 'Record and compare word by word' },
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
              <li>2) افتح <code className="rounded bg-[var(--line)] px-1.5 py-0.5 font-mono text-[12px]">src/content/shadowing.ts</code> وضيف Clip بسيط (مثال معلّق جوه الملف).</li>
              <li>3) لكل «مشهد» اكتب سطر الحوار + معناه بالعربي + التايم، وبعدين زرار الشادونج الخاص بيه هيشتغل في الاستوديو.</li>
            </ol>
          </div>
        )}
      </section>
    </div>
  )
}

function Studio({ clip, onBack }: { clip: ShadowClip; onBack: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [t, setT] = useState(0)
  const [dur, setDur] = useState(0)
  const [speed, setSpeed] = useState(() => loadSpeed())
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [micIdx, setMicIdx] = useState<number | null>(null)
  const meta = KIND_META[clip.kind]

  const scenes = clip.scenes ?? []

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [])

  useEffect(() => {
    setActiveIdx(null)
    setMicIdx(null)
  }, [clip.id])

  const endOf = (i: number): number => {
    const s = scenes[i]
    const next = i + 1 < scenes.length ? scenes[i + 1] : null
    return s.end ?? next?.time ?? Math.min(dur, s.time + 8)
  }

  const loopOn = activeIdx !== null

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

  const startShadowing = (i: number) => {
    const v = videoRef.current
    if (!v) return
    setMicIdx(null)
    if (activeIdx === i) {
      setActiveIdx(null)
      return
    }
    v.currentTime = scenes[i].time
    setT(scenes[i].time)
    setActiveIdx(i)
    void v.play()
    setPlaying(true)
  }

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = speed
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

      <div className="overflow-hidden rounded-2xl bg-black shadow-lg">
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
            if (activeIdx !== null) {
              const end = endOf(activeIdx)
              if (v.currentTime >= end) {
                v.currentTime = scenes[activeIdx].time
                setT(scenes[activeIdx].time)
              }
            }
          }}
          onEnded={() => {
            setPlaying(false)
            if (activeIdx !== null && scenes[activeIdx]) {
              const v = videoRef.current
              if (v) {
                v.currentTime = scenes[activeIdx].time
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
      </div>

      <div className="space-y-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm">
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
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[var(--ink-soft)]">
            <Ar>السرعة:</Ar>
          </span>
          {SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSpeed(s)
                saveSpeed(s)
              }}
              aria-pressed={speed === s}
              className={`rounded-full border px-2.5 py-1 text-xs font-bold transition-colors ${
                speed === s
                  ? 'border-brand-500 bg-brand-600 text-white'
                  : 'border-[var(--line-strong)] bg-[var(--bg)] text-[var(--ink-soft)] hover:border-brand-400'
              }`}
            >
              {s}×
            </button>
          ))}
          {loopOn && (
            <span className="inline-flex items-center gap-1 rounded-full bg-warm-100 px-2.5 py-1 text-[11px] font-bold text-warm-700 dark:bg-warm-900 dark:text-warm-200">
              <IconRotate size={12} />
              <Ar>شادونج شغال — المشهد بيتعاد</Ar>
            </span>
          )}
        </div>
      </div>

      {scenes.length > 0 ? (
        <section className="space-y-2.5">
          <h2 className="flex items-center gap-2 text-sm font-bold text-[var(--ink)]">
            <span className="grid size-7 place-items-center rounded-md bg-brand-600 text-white">
              <IconList size={14} />
            </span>
            <Ar>مشاهد ومواقف ({scenes.length})</Ar>
            <span className="text-[11px] font-normal text-[var(--ink-faint)]">
              <Ar>اضغط «شادونج» على أي موقف — المشهد هيتعاد تلقائيًا ورا ما تردد</Ar>
            </span>
          </h2>
          {scenes.map((s, i) => {
            const active = i === activeIdx
            const playingHere = active && playing
            const openMic = micIdx === i
            return (
              <div
                key={i}
                className={`rounded-xl border p-4 transition-colors ${
                  active ? 'border-brand-400 bg-brand-50/70 dark:border-brand-700 dark:bg-brand-950/50' : 'border-[var(--line)] bg-[var(--surface)]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="grid size-6 place-items-center rounded-md bg-[var(--line)] font-mono text-[11px] font-bold tabular-nums text-[var(--ink-soft)]">
                      {i + 1}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--line)] px-2 py-0.5 font-mono text-[11px] tabular-nums text-[var(--ink-soft)]">
                      <IconClock size={10} />
                      {fmt(s.time)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => startShadowing(i)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                        active
                          ? 'border border-warm-500 bg-warm-500 text-white hover:bg-warm-600'
                          : 'bg-brand-600 text-white hover:bg-brand-700'
                      }`}
                    >
                      {active ? <IconRotate size={14} /> : <IconPlay size={14} />}
                      {active ? <Ar>وقّف الشادونج</Ar> : <Ar>شادونج</Ar>}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (videoRef.current) videoRef.current.pause()
                        setPlaying(false)
                        setMicIdx(openMic ? null : i)
                      }}
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-bold transition-colors ${
                        openMic
                          ? 'border-accent-500 bg-accent-600 text-white'
                          : 'border-[var(--line-strong)] bg-[var(--bg)] text-[var(--ink-soft)] hover:border-accent-400 hover:text-accent-700'
                      }`}
                    >
                      <IconMic size={13} /> {openMic ? <Ar>سداد</Ar> : <Ar>سجّل</Ar>}
                    </button>
                  </div>
                </div>
                <p className="mt-2.5 text-[16px] font-bold leading-relaxed">{s.en}</p>
                {s.ar && <Ar className="mt-1 block text-[13.5px] leading-snug text-[var(--ink-faint)]">{s.ar}</Ar>}
                {active && (
                  <p className="pop mt-2 inline-flex items-center gap-1.5 rounded-lg bg-warm-100 px-3 py-1.5 text-[12px] font-bold text-warm-700 dark:bg-warm-900 dark:text-warm-200">
                    <IconRotate size={13} />
                    {playingHere ? (
                      <Ar>هي شغّالة — كرر وراها بصوتك، وبعدين دوس «سجّل»</Ar>
                    ) : (
                      <Ar>اضغط تشغيل فوق على الفيديو — وهيتعاد من بداية المشهد</Ar>
                    )}
                  </p>
                )}
                {openMic && (
                  <div className="mt-3">
                    <LineScorer text={s.en} onClose={() => setMicIdx(null)} />
                  </div>
                )}
              </div>
            )
          })}
        </section>
      ) : (
        <section className="space-y-3 rounded-2xl border border-dashed border-brand-300 bg-brand-50/50 p-5 dark:border-brand-800 dark:bg-brand-950/40">
          <p className="text-sm font-bold text-brand-800 dark:text-brand-200" dir="rtl" lang="ar">
            لسه مفيش مشاهد مضافين للمقطع ده
          </p>
          <p className="text-[13.5px] leading-relaxed text-[var(--ink-soft)]" dir="rtl" lang="ar">
            اضغط على أي جملة في الفيديو ووقّف، قرب بالشريط وسمّع نفسك، وكرر وراها. ولما أبعت لك الكرتون أو الليست
            بتاعتك، هنضيف المشاهد بسطورها ومواقيتها هنا وكل موقف هيكون له زرار الشادونج بتاعه.
          </p>
          <p className="text-[12px] leading-relaxed text-[var(--ink-faint)]" dir="rtl" lang="ar">
            لو عايز تضيفهم بنفسك: حط الـ mp4 في <code className="rounded bg-[var(--line)] px-1.5 py-0.5 font-mono text-[11px]">public/videos/</code> وضيف المشاهد في <code className="rounded bg-[var(--line)] px-1.5 py-0.5 font-mono text-[11px]">src/content/shadowing.ts</code>.
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
                كل فيديو مقسّم لمشاهد ومواقف، كل موقف له سطر الحوار بتاعه وزر «شادونج» يكرّره ورا ما تردد وراه بصوتك.
              </Ar>
            </p>
          </header>

          <Library onOpen={setClipId} />
        </>
      )}
    </div>
  )
}