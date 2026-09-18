import { useEffect, useRef, useState } from 'react'
import { IconClose, IconEar, IconMic, IconPlay, IconVolume } from './Icons'
import { playSound } from '../lib/sounds'

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

export default function EchoLab({ sentences }: { sentences: string[] }) {
  const supported = typeof window !== 'undefined' && !!recognitionCtor()
  const [open, setOpen] = useState(false)
  const [sel, setSel] = useState(0)
  const [listening, setListening] = useState(false)
  const [saying, setSaying] = useState(false)
  const [result, setResult] = useState<{ ok: boolean[]; said: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const recRef = useRef<SpeechRecognitionLike | null>(null)

  const sentence = sentences[sel] ?? ''

  useEffect(
    () => () => {
      if (recRef.current) recRef.current.abort()
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    },
    [],
  )

  if (!supported || sentences.length === 0) return null

  const listen = () => {
    const synth = window.speechSynthesis
    if (!synth) return
    synth.cancel()
    setSaying(true)
    const u = new SpeechSynthesisUtterance(sentence)
    u.lang = 'en-GB'
    u.rate = 0.86
    u.onend = () => setSaying(false)
    u.onerror = () => setSaying(false)
    synth.speak(u)
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
        const target = wordsOf(sentence)
        const saidW = wordsOf(said)
        const ok = matchWords(target, saidW)
        setResult({ ok, said })
        const pct = ok.filter(Boolean).length / Math.max(1, target.length)
        if (pct === 1) {
          playSound('star')
        } else if (pct >= 0.5) {
          playSound('echo')
        } else {
          playSound('wrong')
        }
      }
      setListening(false)
    }
    rec.onerror = (e) => {
      setListening(false)
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        setError('Microphone is blocked. Allow microphone access and try again.')
      } else if (e.error === 'no-speech') {
        setError("We didn't hear anything \u2013 tap Record and speak again.")
      } else if (e.error === 'network') {
        setError('Speech service unavailable. Check your connection and retry.')
      } else {
        setError('Could not hear you clearly. Try again.')
      }
    }
    setListening(true)
    try {
      rec.start()
    } catch {
      setListening(false)
      setError('Could not start the microphone on this device.')
    }
  }

  const next = () => {
    setResult(null)
    setError(null)
    setSel((s) => (s + 1) % sentences.length)
  }

  const target = wordsOf(sentence)
  const pct = result ? Math.round((result.ok.filter(Boolean).length / Math.max(1, target.length)) * 100) : 0
  const targetChips = sentence.split(' ')

  return (
    <div className="mt-5 rounded-xl border border-accent-200 bg-accent-50/50 p-4 dark:border-accent-900 dark:bg-accent-950/30">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-sm font-bold text-accent-900 dark:text-accent-200">
          <IconEar size={16} />
          Echo Lab {'\u2013'} listen, then say it back
        </p>
        <button
          type="button"
          onClick={() => {
            setOpen((o) => !o)
            stopListening()
          }}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 rounded-full border border-accent-300 px-3 py-1 text-xs font-semibold text-accent-800 transition-colors hover:bg-accent-100 dark:border-accent-800 dark:text-accent-200 dark:hover:bg-accent-900/40"
        >
          {open ? (
            <>
              <IconClose size={13} /> Close
            </>
          ) : (
            <>
              <IconMic size={13} /> Practise
            </>
          )}
        </button>
      </div>

      {open && (
        <div className="mt-3 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="echo-select" className="sr-only">
              Choose a sentence
            </label>
            <select
              id="echo-select"
              value={sel}
              onChange={(e) => {
                setSel(Number(e.target.value))
                setResult(null)
                setError(null)
              }}
              className="rounded-lg border border-[var(--line-strong)] bg-[var(--bg)] px-2.5 py-1.5 text-[13px] text-[var(--ink)] focus:border-accent-400 focus:outline-none"
            >
              {sentences.map((_, i) => (
                <option key={i} value={i}>
                  Sentence {i + 1}
                </option>
              ))}
            </select>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={listen}
                disabled={saying}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-[var(--bg)] px-3 py-1.5 text-xs font-semibold text-[var(--ink-soft)] transition-colors hover:border-accent-400 hover:text-accent-700 dark:hover:text-accent-300"
              >
                {saying ? <IconEar size={13} className="eq eq-on" /> : <IconVolume size={13} />}
                {saying ? 'Playing\u2026' : 'Listen'}
              </button>
              <button
                type="button"
                onClick={listening ? stopListening : record}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  listening
                    ? 'border-rose-400 bg-rose-500 text-white'
                    : 'border-accent-400 bg-accent-600 text-white hover:bg-accent-700'
                }`}
              >
                <IconMic size={13} />
                {listening ? 'Stop listening' : 'Record'}
              </button>
            </div>
            <p className="text-[11px] text-[var(--ink-faint)]">
              {listening ? 'Listening\u2026 say the sentence now' : 'Tap a word in the preview to jump to its sentence'}
            </p>
          </div>

          <p className="rounded-lg border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-[15px] leading-relaxed">
            {targetChips.map((w, i) => {
              const isTypoPunct = /^[^a-z0-9]/i.test(w)
              if (isTypoPunct) return <span key={i}> {w}</span>
              return <span key={i}> {w} </span>
            })}
          </p>

          {error && (
            <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[13px] text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
              {error}
            </p>
          )}

          {result && (
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
                  You said
                </span>
                {(pct === 100 || pct >= 1) && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    {pct === 100 ? 'Perfect! \u2B50' : `${pct}% matched`}
                  </span>
                )}
              </div>
              <p className="text-[13.5px] italic text-[var(--ink-soft)]">{result.said}</p>
              <div className="mt-2.5 flex flex-wrap gap-1">
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
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={record}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-3 py-1.5 text-xs font-semibold text-[var(--ink-soft)] transition-colors hover:border-accent-400 hover:text-accent-700 dark:hover:text-accent-300"
                >
                  <IconMic size={13} /> Try again
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-700"
                >
                  <IconPlay size={12} /> Next sentence
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}