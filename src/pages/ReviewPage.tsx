import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  REVIEW_VOCAB,
  REVIEW_GRAMMAR,
  REVIEW_QUIZ,
  REVIEW_QUIZ_LETTERS,
  type ReviewVocabTable,
} from '../content/review'
import { IconChevronRight, IconHome, IconLayers, IconList, IconTarget, IconVolume } from '../components/Icons'
import { burstConfetti } from '../lib/confetti'

type Tab = 'vocab' | 'grammar' | 'quiz'

const hasArabic = (text: string) => /[\u0600-\u06FF]/.test(text)

function Ar({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span dir="rtl" lang="ar" className={`ar ${className}`}>
      {children}
    </span>
  )
}

interface SpeechSettings {
  accent: 'en-GB' | 'en-US'
  rate: number
}

const SPEECH_DEFAULT: SpeechSettings = { accent: 'en-GB', rate: 0.9 }
const SPEECH_STORAGE_KEY = 'review-speech-settings'

const ACCENTS = [
  { id: 'en-GB', label: 'بريطاني' },
  { id: 'en-US', label: 'أمريكي' },
] as const

const SPEEDS = [
  { id: 'slow', label: 'بطيء', rate: 0.6 },
  { id: 'normal', label: 'عادي', rate: 0.9 },
  { id: 'fast', label: 'سريع', rate: 1.3 },
] as const

function loadSpeech(): SpeechSettings {
  try {
    const raw = window.localStorage.getItem(SPEECH_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SpeechSettings>
      return {
        accent: parsed.accent === 'en-US' ? 'en-US' : 'en-GB',
        rate: typeof parsed.rate === 'number' ? parsed.rate : SPEECH_DEFAULT.rate,
      }
    }
  } catch {
    /* ignore */
  }
  return SPEECH_DEFAULT
}

function saveSpeech(settings: SpeechSettings) {
  try {
    window.localStorage.setItem(SPEECH_STORAGE_KEY, JSON.stringify(settings))
  } catch {
    /* ignore */
  }
}

function sayWord(word: string, settings: SpeechSettings) {
  if (!('speechSynthesis' in window) || !word.trim()) return
  const synth = window.speechSynthesis
  synth.cancel()

  const parts = word
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean)
  const texts = parts.length > 0 ? parts : [word.trim()]

  const makeUtterance = (text: string) => {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = settings.accent
    u.rate = settings.rate
    const voices = synth.getVoices()
    const voice =
      voices.find((v) => v.lang.toLowerCase().startsWith(settings.accent.toLowerCase())) ??
      voices.find((v) => v.lang.toLowerCase().startsWith('en'))
    if (voice) u.voice = voice
    return u
  }

  const speakNext = (i: number) => {
    if (i >= texts.length) return
    const u = makeUtterance(texts[i])
    const next = () => {
      if (i + 1 < texts.length) window.setTimeout(() => speakNext(i + 1), 200)
    }
    u.onend = next
    u.onerror = next
    synth.speak(u)
  }

  speakNext(0)
}

function SpeechControls({
  settings,
  onChange,
}: {
  settings: SpeechSettings
  onChange: (next: SpeechSettings) => void
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 shadow-sm">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
        <IconVolume size={13} />
        <Ar className="!tracking-normal">النطق</Ar>
      </span>

      <span className="inline-flex items-center gap-1.5" role="group" aria-label="اللكنة">
        <Ar className="text-xs font-semibold text-[var(--ink-soft)]">اللكنة:</Ar>
        {ACCENTS.map((a) => {
          const active = settings.accent === a.id
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => onChange({ ...settings, accent: a.id })}
              aria-pressed={active}
              className={`rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
                active
                  ? 'border-brand-500 bg-brand-600 text-white'
                  : 'border-[var(--line-strong)] bg-[var(--bg)] text-[var(--ink-soft)] hover:border-brand-400'
              }`}
            >
              {a.label}
            </button>
          )
        })}
      </span>

      <span className="inline-flex items-center gap-1.5" role="group" aria-label="السرعة">
        <Ar className="text-xs font-semibold text-[var(--ink-soft)]">السرعة:</Ar>
        {SPEEDS.map((s) => {
          const active = settings.rate === s.rate
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onChange({ ...settings, rate: s.rate })}
              aria-pressed={active}
              className={`rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
                active
                  ? 'border-accent-500 bg-accent-600 text-white'
                  : 'border-[var(--line-strong)] bg-[var(--bg)] text-[var(--ink-soft)] hover:border-accent-400'
              }`}
            >
              {s.label}
            </button>
          )
        })}
      </span>
    </div>
  )
}

function Tabs({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const items: { id: Tab; label: string; sub: string; icon: React.ReactNode }[] = [
    { id: 'vocab', label: 'الكلمات', sub: 'جداول بالترجمة والأمثلة', icon: <IconList size={15} /> },
    { id: 'grammar', label: 'الجرامر', sub: 'قواعد وأمثلة لكل درس', icon: <IconLayers size={15} /> },
    { id: 'quiz', label: 'الكويز', sub: '25 سؤال بتصحيح فوري', icon: <IconTarget size={15} /> },
  ]
  return (
    <div className="mx-auto grid max-w-3xl gap-2 sm:grid-cols-3" role="tablist" aria-label="أقسام المراجعة">
      {items.map((item) => {
        const active = tab === item.id
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={`tactile flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all ${
              active
                ? 'border-brand-500 bg-brand-600 text-white shadow-sm'
                : 'border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-brand-400'
            }`}
          >
            <span
              className={`grid size-8 shrink-0 place-items-center rounded-lg ${
                active ? 'bg-white/15' : 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
              }`}
            >
              {item.icon}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold leading-tight">{item.label}</span>
              <span className={`block truncate text-[11px] leading-tight ${active ? 'text-white/75' : 'text-[var(--ink-faint)]'}`}>
                {item.sub}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

function VocabTable({ table, onSpeak }: { table: ReviewVocabTable; onSpeak: (word: string) => void }) {
  const lastIsExample = /مثال/.test(table.headers[table.headers.length - 1] ?? '')
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
      <div className="overflow-x-auto">
        <table className="content-table !rounded-none !border-0">
          <thead>
            <tr>
              {table.headers.map((h, j) => (
                <th key={j} className={hasArabic(h) ? 'ar' : ''}>
                  {hasArabic(h) ? <Ar>{h}</Ar> : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => {
                  const isWord = j === 0 && !hasArabic(cell)
                  const isLast = j === row.length - 1
                  const italic = lastIsExample && isLast
                  if (isWord) {
                    return (
                      <td key={j} className="align-top">
                        <button
                          type="button"
                          onClick={() => onSpeak(cell)}
                          title="اضغط للاستماع"
                          aria-label={`استمع إلى ${cell}`}
                          className="group/word inline-flex max-w-full items-center gap-1.5 text-left font-semibold text-brand-800 underline-offset-4 hover:underline dark:text-brand-200"
                        >
                          <span className="min-w-0">{cell}</span>
                          <IconVolume
                            size={13}
                            className="shrink-0 text-brand-500 opacity-40 transition-opacity group-hover/word:opacity-100 dark:text-brand-300"
                          />
                        </button>
                      </td>
                    )
                  }
                  return (
                    <td key={j} className="align-top">
                      {hasArabic(cell) ? (
                        <Ar className={italic ? 'italic' : ''}>{cell}</Ar>
                      ) : italic ? (
                        <em>{`\u201c${cell}\u201d`}</em>
                      ) : (
                        cell
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function MemoryCards({
  tables,
  onSpeak,
}: {
  tables: ReviewVocabTable[]
  onSpeak: (word: string) => void
}) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set())

  const total = tables.reduce((acc, t) => acc + t.rows.filter((r) => r.length > 0 && r[0].trim()).length, 0)
  const known = revealed.size

  const toggle = (key: string) => {
    setRevealed((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <section className="fade-up space-y-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-[var(--ink-faint)]">
          <Ar className="!text-[13px]">
            اقرأ الكلمة من غير ما تشوف الترجمة، وحاول تتذكر معناها، وبعدين اضغط على الكارت تكتشفها بنفسك.
          </Ar>
        </p>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            known === total && total > 0
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
              : 'bg-[var(--line)]'
          }`}
        >
          {known}/{total} {known === total && total > 0 ? '\u2713' : ''}
        </span>
      </div>

      {tables.map((t, ti) => (
        <div key={ti} className="space-y-2">
          <h4 className="flex items-center gap-2 text-[13px] font-bold text-[var(--ink-soft)]">
            <span className="h-3.5 w-1 rounded-full bg-gradient-to-b from-accent-500 to-brand-500" />
            <Ar>{t.title}</Ar>
          </h4>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {t.rows.map((row, ri) => {
              if (row.length === 0 || !row[0].trim()) return null
              const key = `${ti}-${ri}`
              const examplePos = t.headers.findIndex((h) => /مثال/.test(h)) - 1
              const open = revealed.has(key)
              const primary = row[0]
              const details = row.slice(1)
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggle(key)}
                  aria-pressed={open}
                  className={`flex min-h-28 flex-col justify-between gap-2 rounded-xl border p-3.5 text-left transition-all ${
                    open
                      ? 'border-brand-400 bg-brand-50/70 dark:border-brand-700 dark:bg-brand-950/40'
                      : 'border-[var(--line)] bg-[var(--surface)] hover:border-brand-300 hover:shadow-sm'
                  }`}
                >
                  <span className="flex min-w-0 items-start justify-between gap-2">
                    {hasArabic(primary) ? (
                      <Ar className="text-[15px] font-bold text-brand-800 dark:text-brand-200">{primary}</Ar>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <span className="min-w-0 text-[15px] font-bold text-brand-800 dark:text-brand-200">
                          {primary}
                        </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation()
                            onSpeak(primary)
                          }}
                          className="grid size-6 shrink-0 place-items-center rounded-md text-brand-500 opacity-50 transition-opacity hover:bg-[var(--line)] hover:opacity-100 dark:text-brand-300"
                          aria-label={`استمع إلى ${primary}`}
                        >
                          <IconVolume size={13} />
                        </span>
                      </span>
                    )}
                  </span>
                  {open ? (
                    <span className="pop space-y-1.5">
                      {details.map((d, k) => {
                        if (hasArabic(d)) {
                          return (
                            <Ar key={k} className="block text-[13.5px] leading-snug text-[var(--ink)]">
                              {d}
                            </Ar>
                          )
                        }
                        if (k === examplePos) {
                          return (
                            <em key={k} className="block text-[12px] italic text-[var(--ink-faint)]">
                              {'\u201c'}
                              {d}
                              {'\u201d'}
                            </em>
                          )
                        }
                        return (
                          <span key={k} className="block text-[13.5px] leading-snug text-[var(--ink)]">
                            {d}
                          </span>
                        )
                      })}
                    </span>
                  ) : (
                    <span aria-hidden className="block text-[13px] font-bold tracking-[0.3em] text-[var(--ink-faint)]">
                      {'\u00b7'} {'\u00b7'} {'\u00b7'}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}

function VocabPart({ onSpeak }: { onSpeak: (word: string) => void }) {
  const [cardsMode, setCardsMode] = useState(false)

  return (
    <div className="fade-up space-y-10">
      <div className="mx-auto -mb-4 flex w-fit items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--surface)] p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setCardsMode(false)}
          aria-pressed={!cardsMode}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
            !cardsMode ? 'bg-brand-600 text-white' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
          }`}
        >
          <Ar>الجداول</Ar>
        </button>
        <button
          type="button"
          onClick={() => setCardsMode(true)}
          aria-pressed={cardsMode}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
            cardsMode ? 'bg-accent-600 text-white' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
          }`}
        >
          <Ar>كروت الذاكرة</Ar>
        </button>
      </div>

      <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-[var(--ink-soft)]">
        {cardsMode ? (
          <Ar>حاول تسترجع معنى كل كلمة بنفسك قبل ما تكشفه — اضغط على الكارت.</Ar>
        ) : (
          <Ar>كل جدول بيمثل مجموعة كلمات من الكتاب: الكلمة، ترجمتها بالعربي، ومثال من الدرس.</Ar>
        )}
      </p>

      {REVIEW_VOCAB.map((group) => (
        <section key={group.unit} className="space-y-6">
          <h2 className="display flex items-baseline gap-3 text-2xl tracking-tight">
            <Ar className="shrink-0!">{group.unit}</Ar>
            <span className="h-px flex-1 bg-gradient-to-r from-brand-400/60 to-transparent" aria-hidden />
          </h2>
          {cardsMode ? (
            <MemoryCards tables={group.tables} onSpeak={onSpeak} />
          ) : (
            <div className="space-y-5">
              {group.tables.map((t, j) => (
                <div key={j}>
                  <h3 className="mb-2 flex items-center gap-2 text-[15px] font-bold">
                    <span className="h-4 w-1 rounded-full bg-gradient-to-b from-accent-500 to-brand-500" />
                    <Ar>{t.title}</Ar>
                  </h3>
                  <VocabTable table={t} onSpeak={onSpeak} />
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

function GrammarPart() {
  return (
    <div className="fade-up space-y-10">
      <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-[var(--ink-soft)]">
        <Ar>ملخص لكل درس قواعد في الكتاب: القاعدة، شرحها بالعربي، وأمثلة من الدرس.</Ar>
      </p>
      {REVIEW_GRAMMAR.map((group) => (
        <section key={group.unit} className="space-y-5">
          <h2 className="display flex items-baseline gap-3 text-2xl tracking-tight">
            <Ar className="shrink-0!">{group.unit}</Ar>
            <span className="h-px flex-1 bg-gradient-to-r from-accent-400/60 to-transparent" aria-hidden />
          </h2>
          <div className="grid gap-4">
            {group.points.map((point, j) => (
              <section
                key={j}
                className="overflow-hidden rounded-2xl border border-brand-200 bg-[var(--surface)] shadow-sm dark:border-brand-800"
              >
                <header className="flex items-center gap-2 bg-gradient-to-r from-brand-50 to-accent-50 px-4 py-2.5 dark:from-brand-950/70 dark:to-accent-950/70">
                  <span className="grid size-7 place-items-center rounded-md bg-brand-600 text-white">
                    <IconLayers size={15} />
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-800 dark:text-brand-200">
                    <Ar className="!normal-case">{point.title}</Ar>
                  </h3>
                </header>
                <div className="space-y-4 p-4 sm:p-5">
                  {point.explanation && (
                    <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
                      <Ar>{point.explanation}</Ar>
                    </p>
                  )}
                  <div className="overflow-x-auto rounded-xl">
                    <table className="content-table">
                      <thead>
                        <tr>
                          <th>
                            <Ar>القاعدة / Rule</Ar>
                          </th>
                          <th>
                            <Ar>أمثلة / Examples</Ar>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {point.rules.map((r, k) => (
                          <tr key={k}>
                            <td className="align-top font-semibold text-brand-800 dark:text-brand-200">
                              {hasArabic(r.rule) ? <Ar>{r.rule}</Ar> : r.rule}
                            </td>
                            <td className="align-top">
                              {hasArabic(r.examples) ? <Ar>{r.examples}</Ar> : r.examples}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

interface QuizAnswer {
  index: number
  correct?: boolean
}

function QuizPart() {
  const [answers, setAnswers] = useState<Record<number, QuizAnswer>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    return REVIEW_QUIZ.reduce((acc, _q, i) => acc + (answers[i]?.correct ? 1 : 0), 0)
  }, [answers])

  const allAnswered = Object.keys(answers).length === REVIEW_QUIZ.length

  const pick = (qi: number, oi: number) => {
    if (submitted) return
    const correct = REVIEW_QUIZ[qi].options[oi] === REVIEW_QUIZ[qi].answer
    setAnswers((prev) => ({ ...prev, [qi]: { index: oi, correct } }))
  }

  const submit = () => {
    if (!allAnswered) return
    setSubmitted(true)
    const pct = score / REVIEW_QUIZ.length
    if (pct === 1) burstConfetti()
  }

  const retry = () => {
    setAnswers({})
    setSubmitted(false)
  }

  const pct = Math.round((score / REVIEW_QUIZ.length) * 100)

  return (
    <div className="fade-up mx-auto max-w-3xl space-y-6">
      <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-[var(--ink-soft)]">
        <Ar>اختر الإجابة الصحيحة لكل سؤال، ثم اضغط «صحّح». الإجابات مش هتتظهر غير بعد التصحيح.</Ar>
      </p>

      <div className="mx-auto max-w-md space-y-3">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm">
          <p className="flex items-center justify-between text-xs text-[var(--ink-faint)]">
            <span>
              <Ar>أجبت على</Ar> {Object.keys(answers).length}/{REVIEW_QUIZ.length}
            </span>
            <span className="font-semibold tabular-nums text-[var(--ink-soft)]">{submitted ? `${score}/25` : '\u2014'}</span>
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--line)]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                pct === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-brand-500 to-accent-500'
              }`}
              style={{ width: `${Math.round((Object.keys(answers).length / REVIEW_QUIZ.length) * 100)}%` }}
            />
          </div>
          {submitted && (
            <p className="pop mt-3 text-center text-sm font-bold text-brand-800 dark:text-brand-200">
              <Ar>
                نتيجتك: {score} من {REVIEW_QUIZ.length} ({pct}%)
              </Ar>
            </p>
          )}
          <div className="mt-3 flex gap-2">
            {!submitted ? (
              <button
                type="button"
                onClick={submit}
                disabled={!allAnswered}
                className="tactile inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IconTarget size={15} />
                <Ar>صحّح</Ar>
              </button>
            ) : (
              <button
                type="button"
                onClick={retry}
                className="tactile inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-brand-300 bg-brand-50 px-3 py-2 text-sm font-bold text-brand-800 transition-colors hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200"
              >
                <IconList size={15} />
                <Ar>إعادة المحاولة</Ar>
              </button>
            )}
          </div>
        </div>
      </div>

      <ol className="space-y-4">
        {REVIEW_QUIZ.map((q, qi) => {
          const picked = answers[qi]
          return (
            <li key={qi} className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
              <div className="flex items-start gap-3 border-b border-[var(--line)] bg-[var(--line)]/40 px-4 py-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-brand-600 text-[12px] font-bold text-white">
                  {qi + 1}
                </span>
                <p className="min-w-0 text-[15px] font-semibold leading-relaxed">{q.prompt}</p>
              </div>
              <div className="grid gap-2 p-3 sm:grid-cols-2">
                {q.options.map((opt, oi) => {
                  const isPicked = picked?.index === oi
                  const isCorrect = opt === q.answer
                  let cls =
                    'border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink)] hover:border-brand-400'
                  if (submitted && isCorrect) {
                    cls = 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100'
                  } else if (submitted && isPicked) {
                    cls = 'border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950 dark:text-rose-100'
                  } else if (isPicked) {
                    cls = 'border-brand-500 bg-brand-50 text-brand-900 dark:bg-brand-950 dark:text-brand-100'
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={submitted}
                      onClick={() => pick(qi, oi)}
                      aria-pressed={isPicked}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm leading-relaxed transition-colors disabled:cursor-default ${cls}`}
                    >
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-md text-[11px] font-bold ${
                          submitted ? (isCorrect ? 'bg-emerald-600 text-white' : isPicked ? 'bg-rose-600 text-white' : 'bg-[var(--line)] text-[var(--ink-faint)]') : isPicked ? 'bg-brand-600 text-white' : 'bg-[var(--line)] text-[var(--ink-soft)]'
                        }`}
                      >
                        {submitted && isCorrect ? '\u2713' : submitted && isPicked ? '\u2715' : REVIEW_QUIZ_LETTERS[oi]}
                      </span>
                      <span>{opt}</span>
                    </button>
                  )
                })}
              </div>
              {submitted && (
                <p className="px-4 pb-3 text-[12px] leading-relaxed text-[var(--ink-soft)]">
                  {picked?.correct ? (
                    <Ar className="font-semibold text-emerald-700 dark:text-emerald-300">الإجابة صحيحة ✓</Ar>
                  ) : (
                    <Ar>
                      <span className="font-semibold text-rose-600 dark:text-rose-300">إجابة خطأ</span> — الإجابة الصحيحة:{' '}
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300">{q.answer}</span>
                    </Ar>
                  )}
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default function ReviewPage() {
  const [tab, setTab] = useState<Tab>('vocab')
  const [speech, setSpeech] = useState<SpeechSettings>(() => loadSpeech())

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tab])

  const handleSpeech = (next: SpeechSettings) => {
    setSpeech(next)
    saveSpeech(next)
  }

  const onSpeak = (word: string) => sayWord(word, speech)

  return (
    <div className="fade-up mx-auto max-w-4xl space-y-8">
      <nav className="flex items-center gap-1 text-sm text-[var(--ink-faint)]">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
          <IconHome size={14} /> Home
        </Link>
        <IconChevronRight size={13} />
        <span className="text-[var(--ink)]">
          <Ar>المراجعة الشاملة</Ar>
        </span>
      </nav>

      <header className="text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-300">
          Speakout A2 {'\u00b7'} Full course review
        </p>
        <h1 className="display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
          <Ar>مراجعة شاملة</Ar>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
          <Ar>
            كلمات في جداول (بالعربي ومع أمثلة)، ملخص القواعد (الجرامر) لكل درس، وكويز 25 سؤال
            بعدّلك فورًا — كل ده من محتوى الوحدات الثماني + الـ Lead-in.
          </Ar>
        </p>
      </header>

      <Tabs tab={tab} onChange={setTab} />

      <SpeechControls settings={speech} onChange={handleSpeech} />

      <div key={tab}>
        {tab === 'vocab' ? <VocabPart onSpeak={onSpeak} /> : tab === 'grammar' ? <GrammarPart /> : <QuizPart />}
      </div>
    </div>
  )
}