import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SHADOWING_CLIPS, getShadowClip, type ShadowClip, type ShadowKind } from '../content/shadowing'
import { HT_DIALOGUE } from '../content/ht-dialogue'
import { HT_PARTS_DIALOGUE } from '../content/ht-parts-dialogue'
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

// ---------------------------------- ميكروفون ----------------------------------

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

// ------------------------------ وسيط التشغيل (فيديو محلي أو يوتيوب) ------------------------------

interface MediaEvents {
  time: (t: number) => void
  state: (playing: boolean) => void
  ended: () => void
  ready: (duration: number) => void
}

interface MediaBridge {
  play(): void
  pause(): void
  seek(t: number): void
  setRate(r: number): void
  getTime(): number
  getDuration(): number
  destroy(): void
}

type EVRef = { current: MediaEvents }

function createNativeBridge(el: HTMLVideoElement, ev: EVRef): MediaBridge {
  const onTime = () => ev.current.time(el.currentTime)
  const onPlay = () => ev.current.state(true)
  const onPause = () => ev.current.state(false)
  const onEnded = () => ev.current.ended()
  const onReady = () => {
    if (Number.isFinite(el.duration)) ev.current.ready(el.duration)
  }
  el.addEventListener('timeupdate', onTime)
  el.addEventListener('play', onPlay)
  el.addEventListener('pause', onPause)
  el.addEventListener('ended', onEnded)
  el.addEventListener('loadedmetadata', onReady)
  return {
    play: () => {
      void el.play().catch(() => {})
    },
    pause: () => el.pause(),
    seek: (t) => {
      try {
        el.currentTime = t
      } catch {
        /* ignore */
      }
    },
    setRate: (r) => {
      try {
        el.playbackRate = r
      } catch {
        /* ignore */
      }
    },
    getTime: () => el.currentTime,
    getDuration: () => el.duration || 0,
    destroy: () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onEnded)
      el.removeEventListener('loadedmetadata', onReady)
    },
  }
}

let ytApiPromise: Promise<void> | null = null

function loadYtApi(): Promise<void> {
  const w = window as unknown as { YT?: { Player?: unknown }; onYouTubeIframeAPIReady?: () => void }
  if (w.YT?.Player) return Promise.resolve()
  if (ytApiPromise) return ytApiPromise
  ytApiPromise = new Promise((resolve) => {
    const prev = w.onYouTubeIframeAPIReady
    w.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve()
    }
    const s = document.createElement('script')
    s.src = 'https://www.youtube.com/iframe_api'
    s.async = true
    document.head.appendChild(s)
  })
  return ytApiPromise
}

interface YTPlayerLike {
  playVideo(): void
  pauseVideo(): void
  seekTo(t: number, allowAhead?: boolean): void
  setPlaybackRate(r: number): void
  getCurrentTime(): number
  getDuration(): number
  getPlayerState(): number
  destroy(): void
}

interface YTPlayerCtor {
  new (
    host: string,
    opts: {
      videoId: string
      playerVars?: Record<string, unknown>
      events: {
        onReady: (e: { target: YTPlayerLike }) => void
        onStateChange: (e: { data: number }) => void
      }
    },
  ): YTPlayerLike
}

function createYtBridge(host: HTMLDivElement, videoId: string, ev: EVRef): MediaBridge {
  let player: YTPlayerLike | null = null
  let poll: ReturnType<typeof setInterval> | null = null
  let destroyed = false

  const stopPoll = () => {
    if (poll) {
      clearInterval(poll)
      poll = null
    }
  }
  const tick = () => {
    if (!player || destroyed) return
    try {
      ev.current.time(player.getCurrentTime())
      ev.current.state(player.getPlayerState() === 1)
    } catch {
      /* ignore */
    }
  }
  const startPoll = () => {
    if (poll) return
    poll = setInterval(tick, 200)
  }

  loadYtApi().then(() => {
    if (destroyed) return
    const w = window as unknown as { YT?: { Player: YTPlayerCtor } }
    if (!w.YT?.Player) return
    host.innerHTML = ''
    player = new w.YT.Player(host.getAttribute('id') ?? '', {
      videoId,
      playerVars: { playsinline: 1, rel: 0, fs: 1, modestbranding: 1 },
      events: {
        onReady: (e) => {
          player = e.target
          try {
            ev.current.ready(player.getDuration() || 0)
            player.setPlaybackRate(1)
          } catch {
            /* ignore */
          }
          startPoll()
        },
        onStateChange: (e) => {
          const st = e.data
          if (st === 1) {
            ev.current.state(true)
            startPoll()
          } else if (st === 2 || st === 0) {
            ev.current.state(false)
            stopPoll()
          }
          if (st === 0) ev.current.ended()
        },
      },
    })
  })

  return {
    play: () => {
      try {
        player?.playVideo()
      } catch {
        /* ignore */
      }
    },
    pause: () => {
      try {
        player?.pauseVideo()
      } catch {
        /* ignore */
      }
    },
    seek: (t) => {
      try {
        player?.seekTo(t, true)
      } catch {
        /* ignore */
      }
    },
    setRate: (r) => {
      try {
        player?.setPlaybackRate(r)
      } catch {
        /* ignore */
      }
    },
    getTime: () => {
      try {
        return player ? player.getCurrentTime() : 0
      } catch {
        return 0
      }
    },
    getDuration: () => {
      try {
        return player ? player.getDuration() || 0 : 0
      } catch {
        return 0
      }
    },
    destroy: () => {
      destroyed = true
      stopPoll()
      try {
        player?.destroy()
      } catch {
        /* ignore */
      }
      player = null
    },
  }
}

// ---------------------------------- واجهة المشغل ----------------------------------

function MediaPlayer({
  clip,
  rate,
  events,
  onBridge,
}: {
  clip: ShadowClip
  rate: number
  events: MediaEvents
  onBridge: (b: MediaBridge | null) => void
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const ytHostRef = useRef<HTMLDivElement | null>(null)
  const bridgeRef = useRef<MediaBridge | null>(null)
  const eventsRef = useRef(events)
  eventsRef.current = events
  const rateRef = useRef(rate)
  rateRef.current = rate

  useEffect(() => {
    let bridge: MediaBridge | null = null
    if (clip.youtube) {
      bridge = ytHostRef.current ? createYtBridge(ytHostRef.current, clip.youtube, eventsRef) : null
    } else if (videoRef.current) {
      bridge = createNativeBridge(videoRef.current, eventsRef)
    }
    bridgeRef.current = bridge
    onBridge(bridge)
    return () => {
      bridgeRef.current = null
      try {
        bridge?.destroy()
      } catch {
        /* ignore */
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clip])

  useEffect(() => {
    bridgeRef.current?.setRate(rateRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate])

  if (clip.youtube) {
    return <div ref={ytHostRef} id={`yt-${clip.id}`} className="aspect-video w-full bg-black" />
  }
  return (
    <video
      ref={videoRef}
      src={clip.file ? videoSrc(clip.file) : undefined}
      preload="metadata"
      playsInline
      className="aspect-video w-full cursor-pointer bg-black"
      aria-label={clip.title}
    />
  )
}

// ---------------------------------- المكتبة ----------------------------------

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
  const sceneCount = clip.scenes?.length ?? HT_DIALOGUE[clip.id]?.length ?? HT_PARTS_DIALOGUE[clip.id]?.length ?? 0
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
        <span className="truncate font-mono text-[11px] text-[var(--ink-faint)]">
          {clip.youtube ? `youtube · ${clip.youtube}` : clip.file}
        </span>
        {clip.note && (
          <span className="text-[12.5px] leading-relaxed text-[var(--ink-soft)]" dir="rtl" lang="ar">
            {clip.note}
          </span>
        )}
        {sceneCount > 0 && (
          <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-[var(--line)] px-2 py-0.5 text-[11px] font-semibold text-[var(--ink-soft)]">
            <IconList size={11} />
            <Ar>{sceneCount} سطر ديالوج متزامن</Ar>
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

function SectionTitle({ label, count }: { label: string; count: number }) {
  return (
    <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight">
      <span className="h-4 w-1 rounded-full bg-gradient-to-b from-brand-500 to-accent-500" />
      <Ar>{label}</Ar>
      <span className="text-xs font-semibold text-[var(--ink-faint)]">({count})</span>
    </h2>
  )
}

function Library({ onOpen }: { onOpen: (id: string) => void }) {
  const course = SHADOWING_CLIPS.filter((c) => c.kind === 'course')
  const parts = SHADOWING_CLIPS.filter((c) => c.id.startsWith('ht-part-'))
  const extras = SHADOWING_CLIPS.filter((c) => c.kind !== 'course' && !c.id.startsWith('ht-part-'))
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
        <SectionTitle label="فيديوهات الكتاب (BBC)" count={course.length} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {course.map((c) => (
            <ClipCard key={c.id} clip={c} onOpen={() => onOpen(c.id)} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle label="بلاي ليست: Hotel Transylvania 2012 (فيلم كامل بالانجليزي)" count={parts.length + extras.length} />
        <p className="text-[13px] leading-relaxed text-[var(--ink-soft)]" dir="rtl" lang="ar">
          الفيلم كامل مقسّم لأجزاء على يوتيوب — بيشتغلوا مباشرة هنا من غير أي ملفات، وكل جزء مفتوح في الاستوديو.
          توقيت الديالوج اتعمل تلقائيًا لكل الأجزاء (تعرف على الكلام على صوت المقطع نفسه)، فمشي مع الفيديو من أول جزء لآخره.
          الملاحظة الوحيدة: النص ده ناتج تلقائيًا ففيه أخطاء إملائية عادية — حقه نيلعّل عليه لاحقًا إن استدعى الأمر.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {parts.map((c) => (
            <ClipCard key={c.id} clip={c} onOpen={() => onOpen(c.id)} />
          ))}
        </div>
        {extras.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {extras.map((c) => (
              <ClipCard key={c.id} clip={c} onOpen={() => onOpen(c.id)} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

// ---------------------------------- الاستوديو ----------------------------------

function Studio({ clip, onBack }: { clip: ShadowClip; onBack: () => void }) {
  const bridgeRef = useRef<MediaBridge | null>(null)
  const [playing, setPlaying] = useState(false)
  const [showBtn, setShowBtn] = useState(true)
  const [t, setT] = useState(0)
  const [dur, setDur] = useState(0)
  const [speed, setSpeed] = useState(() => loadSpeed())
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [micIdx, setMicIdx] = useState<number | null>(null)
  const [arming, setArming] = useState<number | null>(null)
  const [userLoop, setUserLoop] = useState<{ a: number; b: number } | null>(null)
  const meta = KIND_META[clip.kind]

  const scenes = (clip.scenes ?? HT_DIALOGUE[clip.id] ?? HT_PARTS_DIALOGUE[clip.id]) ?? []
  const loopOn = activeIdx !== null || userLoop !== null
  const setBridge = (b: MediaBridge | null) => {
    bridgeRef.current = b
  }

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [])

  const endOf = (i: number): number => {
    const s = scenes[i]
    const next = i + 1 < scenes.length ? scenes[i + 1] : null
    return s.end ?? next?.time ?? Math.min(dur, s.time + 8)
  }

  const events: MediaEvents = {
    time: (now) => {
      setT(now)
      if (activeIdx !== null && now >= endOf(activeIdx)) {
        bridgeRef.current?.seek(scenes[activeIdx].time)
        setT(scenes[activeIdx].time)
      } else if (userLoop && now >= userLoop.b) {
        bridgeRef.current?.seek(userLoop.a)
        setT(userLoop.a)
      }
    },
    state: (p) => setPlaying(p),
    ended: () => {
      setPlaying(false)
      if (activeIdx !== null && scenes[activeIdx]) {
        bridgeRef.current?.seek(scenes[activeIdx].time)
        setT(scenes[activeIdx].time)
        bridgeRef.current?.play()
        setPlaying(true)
      } else if (userLoop) {
        bridgeRef.current?.seek(userLoop.a)
        setT(userLoop.a)
        bridgeRef.current?.play()
        setPlaying(true)
      }
    },
    ready: (d) => setDur(Math.max(0, d)),
  }

  const togglePlay = () => {
    if (playing) bridgeRef.current?.pause()
    else {
      bridgeRef.current?.play()
    }
  }

  useEffect(() => {
    if (playing) {
      const id = window.setTimeout(() => setShowBtn(false), 1000)
      return () => window.clearTimeout(id)
    }
    setShowBtn(true)
  }, [playing])

  const seek = (value: string | number) => {
    const to = Math.max(0, Number(value))
    bridgeRef.current?.seek(to)
    setT(to)
  }

  const startShadowing = (i: number) => {
    if (activeIdx === i) {
      setActiveIdx(null)
      return
    }
    setMicIdx(null)
    bridgeRef.current?.seek(scenes[i].time)
    setT(scenes[i].time)
    setActiveIdx(i)
    bridgeRef.current?.play()
  }

  const manualShadow = () => {
    if (userLoop) {
      setUserLoop(null)
      setArming(null)
      return
    }
    if (arming === null) {
      setArming(bridgeRef.current?.getTime() ?? t)
      return
    }
    const b = Math.max(arming + 0.5, bridgeRef.current?.getTime() ?? t)
    setUserLoop({ a: arming, b })
    setArming(null)
    bridgeRef.current?.seek(arming)
    setT(arming)
    bridgeRef.current?.play()
  }

  const setVidSpeed = (v: number) => {
    setSpeed(v)
    saveSpeed(v)
    bridgeRef.current?.setRate(v)
  }

  const hasDialogue = !!HT_DIALOGUE[clip.id] || !!HT_PARTS_DIALOGUE[clip.id]
  const currRef = useRef<HTMLDivElement | null>(null)
  const listBoxRef = useRef<HTMLDivElement | null>(null)
  let currIdx: number | null = null
  for (let i = 0; i < scenes.length; i++) {
    if (t >= scenes[i].time && t < endOf(i)) {
      currIdx = i
      break
    }
  }
  useEffect(() => {
    const box = listBoxRef.current
    const item = currRef.current
    if (!box || !item) return
    const pad = 8
    const rel = item.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop
    const top = rel
    const bottom = rel + item.offsetHeight
    if (top - pad < box.scrollTop) {
      box.scrollTop = Math.max(0, top - pad)
    } else if (bottom + pad > box.scrollTop + box.clientHeight) {
      box.scrollTop = bottom + pad - box.clientHeight
    }
  }, [currIdx])

  const startCurrent = () => {
    if (currIdx !== null) {
      startShadowing(currIdx)
    } else {
      togglePlay()
    }
  }

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
        <h1 className="display text-2xl font-bold tracking-tight sm:text-3xl">{clip.title}</h1>
        <p className="text-[12px] font-mono text-[var(--ink-faint)]">
          {clip.youtube ? `youtube · ${clip.youtube}` : clip.file}
        </p>
      </header>

      <div className="relative overflow-hidden rounded-2xl bg-black shadow-lg">
        <MediaPlayer clip={clip} rate={speed} events={events} onBridge={setBridge} />
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? 'إيقاف' : 'تشغيل'}
          className={`absolute inset-0 m-auto grid size-16 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-opacity duration-300 hover:bg-black/60 ${
            showBtn ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          {playing ? <IconPause size={28} /> : <IconPlay size={30} className="translate-x-0.5" />}
        </button>
      </div>

      {scenes.length > 0 && (
        <div className="rounded-2xl border border-[var(--line-strong)] bg-[#0d1017] p-4 shadow-lg dark:border-brand-900">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-300">
              <IconVolume size={12} />
              <Ar>بيقول دلوقتي</Ar>
            </p>
            <div className="flex items-center gap-1.5">
              {hasDialogue && (
                <span className="rounded-full bg-warm-100 px-2 py-0.5 text-[10px] font-bold text-warm-700 dark:bg-warm-900 dark:text-warm-200">
                  <Ar>ديالوج متزامن</Ar>
                </span>
              )}
              {currIdx !== null && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] tabular-nums text-white/70">
                  {fmt(scenes[currIdx].time)}
                </span>
              )}
            </div>
          </div>
          <p
            className="min-h-[3.2rem] text-center text-[17px] font-bold leading-7 tracking-wide text-white sm:text-[18px]"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,.55)' }}
          >
            {currIdx !== null ? scenes[currIdx].en : '\u00A0'}
          </p>
          {currIdx !== null && scenes[currIdx].ar ? (
            <p
              dir="rtl"
              lang="ar"
              className="ar mt-1 text-center text-[15px] font-semibold leading-6 text-white/90"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,.55)' }}
            >
              {scenes[currIdx].ar}
            </p>
          ) : null}
          <div className="mt-2.5 flex items-center justify-center gap-2">
            {currIdx !== null && (
              <>
                <button
                  type="button"
                  onClick={() => say(scenes[currIdx].en)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/10"
                >
                  <IconVolume size={13} /> <Ar>اسمعها</Ar>
                </button>
                <button
                  type="button"
                  onClick={startCurrent}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                    activeIdx === currIdx ? 'border border-warm-500 bg-warm-500 text-white hover:bg-warm-600' : 'bg-brand-600 text-white hover:bg-brand-700'
                  }`}
                >
                  {activeIdx === currIdx ? <IconRotate size={13} /> : <IconPlay size={13} />}
                  {activeIdx === currIdx ? <Ar>أوقف الشادونج</Ar> : <Ar>شادونج السطر ده</Ar>}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    bridgeRef.current?.pause()
                    setMicIdx(micIdx === currIdx ? null : currIdx)
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${
                    micIdx === currIdx ? 'border-accent-400 bg-accent-600 text-white' : 'border-white/25 text-white hover:bg-white/10'
                  }`}
                >
                  <IconMic size={13} /> {micIdx === currIdx ? <Ar>سداد</Ar> : <Ar>سجّل صوتك</Ar>}
                </button>
              </>
            )}
          </div>
          {currIdx !== null && micIdx === currIdx && (
            <div className="mt-3">
              <LineScorer text={scenes[currIdx].en} onClose={() => setMicIdx(null)} />
            </div>
          )}
        </div>
      )}

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
              onClick={() => setVidSpeed(s)}
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
              <Ar>شادونج شغال — الجزء بيتعاد</Ar>
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
          </h2>
          <div ref={listBoxRef} className="max-h-[42vh] space-y-2.5 overflow-y-auto pr-1 scrollbar-thin sm:max-h-[22rem]">
            {scenes.map((s, i) => {
            const active = i === activeIdx
            const current = i === currIdx
            const openMic = micIdx === i
            const style = active
              ? 'border-brand-400 bg-brand-50/70 dark:border-brand-700 dark:bg-brand-950/50'
              : current
                ? 'border-emerald-400 bg-emerald-50/70 dark:border-emerald-700 dark:bg-emerald-950/40'
                : 'border-[var(--line)] bg-[var(--surface)]'
            return (
              <div
                key={i}
                ref={i === currIdx ? currRef : undefined}
                className={`rounded-xl border p-4 transition-colors ${style}`}
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
                    {current && !active && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
                        <IconPlay size={9} />
                        <Ar>بيتقال دلوقتي</Ar>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => startShadowing(i)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                        active ? 'border border-warm-500 bg-warm-500 text-white hover:bg-warm-600' : 'bg-brand-600 text-white hover:bg-brand-700'
                      }`}
                    >
                      {active ? <IconRotate size={14} /> : <IconPlay size={14} />}
                      {active ? <Ar>وقّف الشادونج</Ar> : <Ar>شادونج</Ar>}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        bridgeRef.current?.pause()
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
                    {playing ? <Ar>هي شغّالة — كرر وراها بصوتك، وبعدين دوس «سجّل»</Ar> : <Ar>اضغط تشغيل — وهيتعاد من بداية المشهد</Ar>}
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
          </div>
        </section>
      ) : (
        <section className="space-y-3 rounded-2xl border border-dashed border-brand-300 bg-brand-50/50 p-5 dark:border-brand-800 dark:bg-brand-950/40">
          <p className="text-sm font-bold text-brand-800 dark:text-brand-200" dir="rtl" lang="ar">
            شادونج من غير مشاهد مكتوبة — فيها بسيطة
          </p>
          <p className="text-[13.5px] leading-relaxed text-[var(--ink-soft)]" dir="rtl" lang="ar">
            وقّف على الجملة اللي عايز تتمرن عليها، دوس «شادونج من هنا» عند بدايتها، وبعدين دوس تاني عند نهايتها
            وهتتكرر لوحدها — وانت كرر وراها بصوتك.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={manualShadow}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                userLoop
                  ? 'border border-warm-500 bg-warm-500 text-white hover:bg-warm-600'
                  : 'bg-brand-600 text-white hover:bg-brand-700'
              }`}
            >
              {userLoop ? <IconRotate size={14} /> : <IconPlay size={14} />}
              {userLoop ? <Ar>أوقف الشادونج</Ar> : arming !== null ? <Ar>ضغط قبل النهاية</Ar> : <Ar>شادونج من هنا</Ar>}
            </button>
            {arming !== null && !userLoop && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--line)] px-2.5 py-1 text-[11px] font-bold text-[var(--ink-soft)]">
                <IconClock size={11} />
                <Ar>البداية: </Ar>
                <span className="font-mono tabular-nums">{fmt(arming)}</span>
              </span>
            )}
            {userLoop && (
              <span className="inline-flex items-center gap-1 rounded-full bg-warm-100 px-2.5 py-1 text-[11px] font-bold text-warm-700 dark:bg-warm-900 dark:text-warm-200">
                <IconRotate size={11} />
                <span className="font-mono tabular-nums" dir="ltr">
                  {fmt(userLoop.a)} — {fmt(userLoop.b)}
                </span>
              </span>
            )}
          </div>
          <p className="text-[12px] leading-relaxed text-[var(--ink-faint)]" dir="rtl" lang="ar">
            لو بعتلي نص الكلام بتاع الجزء ده، هيظهر هنا تحت الفيديو سطر بسطر بيتمشى معاه وكل سطر عليه زرار
            «سجّل صوتك» للمراجعة — زي المقاطع اللي عليها «ديالوج متزامن».
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
        <Studio key={clip.id} clip={clip} onBack={() => setClipId(null)} />
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
                فيديوهات الكتاب + بلاي ليست أفلام وكرتون بتشتغل من يوتيوب مباشرة. كل موقف له زرار «شادونج» يكرّره ورا
                ما تردد وراه — لحد ما لسانك يتروس عليه.
              </Ar>
            </p>
          </header>

          <Library onOpen={setClipId} />
        </>
      )}
    </div>
  )
}