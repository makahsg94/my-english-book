import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUnit, unitLabel } from '../content/book'
import { getWritingTask } from '../content/writing'
import { useProgress } from '../lib/appContext'
import { storageKey } from '../lib/auth'
import { checkWriting } from '../lib/writeCheck'
import type { WritingCheck } from '../lib/writeCheck'
import { levelProgress } from '../lib/progress'
import { burstConfetti } from '../lib/confetti'
import { playSound } from '../lib/sounds'
import { IconAward, IconCheck, IconChevronLeft, IconChevronRight, IconFlame, IconHome, IconPen } from '../components/Icons'

function wordCount(text: string) {
  return text.split(/\s+/).filter((w) => w.trim().length > 0).length
}

function sentenceCount(text: string) {
  return text.split(/[.!?]+[\s$]/).map((s) => s.trim()).filter((s) => s.length > 0).length
}

function gradeColor(score: number) {
  if (score >= 85) return 'var(--color-emerald-500)'
  if (score >= 70) return 'var(--color-brand-500)'
  if (score >= 55) return 'var(--color-amber-500)'
  return 'var(--ink-faint)'
}

function LiveGauge({ score, label }: { score: number; label?: string }) {
  const [off, setOff] = useState(150)
  useEffect(() => {
    const id = requestAnimationFrame(() => setOff(150 - (score / 100) * 150))
    return () => cancelAnimationFrame(id)
  }, [score])
  const color = gradeColor(score)
  return (
    <svg viewBox="0 0 60 60" className="size-20" aria-hidden>
      <circle cx="30" cy="30" r="24" fill="none" stroke="var(--line)" strokeWidth="6" />
      <circle
        cx="30"
        cy="30"
        r="24"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="151"
        strokeDashoffset={off}
        transform="rotate(-90 30 30)"
        style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.22,1,0.36,1), stroke 0.3s ease' }}
      />
      <text x="30" y="37" textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--ink)">
        {label ?? score}
      </text>
    </svg>
  )
}

function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const dur = 800
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return <>{n}</>
}

function coachLine(words: number, minWords: number, used: number, missing: string[], sentences: number, mechanics: number): { text: string; emoji: string } {
  if (words === 0) return { text: 'Start writing \u2013 every word counts!', emoji: '\u270D\uFE0F' }
  if (words < minWords) {
    const left = minWords - words
    return { text: `${left} more word${left === 1 ? '' : 's'} to reach the goal`, emoji: '\u{1F4AA}' }
  }
  if (used < 2) {
    return { text: `Try a unit word${missing.length > 0 ? ` like \u201c${missing[0]}\u201d` : ''}`, emoji: '\u2728' }
  }
  if (sentences < 3) return { text: 'Add one more sentence to tell the story', emoji: '\u{1F4DD}' }
  if (mechanics > 0) return { text: 'Fix capitals and ending dots \u2013 you\u2019re almost there', emoji: '\u{1F9F9}' }
  return { text: 'You are ready \u2013 press Check my writing!', emoji: '\u{1F389}' }
}

export default function WritingPage() {
  const { unitId } = useParams()
  const unit = unitId ? getUnit(unitId) : undefined
  const progress = useProgress()
  const task = unitId ? getWritingTask(unitId) : undefined

  const draftKey = storageKey(`speakout-b1.writing.draft.${task?.id ?? 'none'}`)
  const [draft, setDraft] = useState(() => {
    try {
      return localStorage.getItem(draftKey) ?? ''
    } catch {
      return ''
    }
  })
  const [result, setResult] = useState<WritingCheck | null>(null)
  const [checkedAt, setCheckedAt] = useState<number>(0)
  const [live, setLive] = useState<WritingCheck | null>(null)
  const debounceRef = useRef<number>(0)

  useEffect(() => {
    if (unitId) progress.recordVisit(unitId)
  }, [unitId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    try {
      if (draft) localStorage.setItem(draftKey, draft)
      else localStorage.removeItem(draftKey)
    } catch {
      /* ignore */
    }
  }, [draft, draftKey])

  useEffect(() => {
    window.clearTimeout(debounceRef.current)
    if (!task || wordCount(draft) === 0) {
      setLive(null)
      return
    }
    debounceRef.current = window.setTimeout(() => {
      setLive(checkWriting(draft, { minWords: task.minWords, targets: task.targets }))
    }, 220)
    return () => window.clearTimeout(debounceRef.current)
  }, [draft, task])

  const words = useMemo(() => wordCount(draft), [draft])
  const sentences = useMemo(() => sentenceCount(draft), [draft])
  const best = task ? progress.bestWriting(task.id) : undefined
  const lp = levelProgress(progress.state.xp)

  if (!unit || !task) {
    return (
      <div className="book-page rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8 text-center">
        <p className="text-[var(--ink-soft)]">No writing task for this chapter.</p>
        <Link to="/book" className="mt-2 inline-block text-sm font-medium text-brand-600">
          Back to the contents
        </Link>
      </div>
    )
  }

  const label = unitLabel(unit)

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => setDraft(e.target.value)

  const onCheck = () => {
    if (words === 0) return
    const res = checkWriting(draft, { minWords: task.minWords, targets: task.targets })
    progress.recordWriting(task.id, res.score, res.grade, res.stats.words)
    setResult(res)
    setCheckedAt(Date.now())
    if (res.score >= 85) {
      burstConfetti()
      playSound('star')
    } else {
      playSound('write')
    }
  }

  const onClear = () => {
    setDraft('')
    setResult(null)
  }

  const liveUsed = live?.targetsUsed ?? []
  const liveMissing = (live?.targetsMissing ?? []).slice(0, 3)
  const liveScore = live?.score ?? 0
  const coach = coachLine(words, task.minWords, liveUsed.length, liveMissing, sentences, live?.issues.length ?? 0)

  const noMechanics = live ? live.issues.every((i) => i.kind !== 'mechanics') : false
  const noSentenceIssues = live
    ? live.issues.every((i) => i.kind !== 'mechanics' && i.kind !== 'sentences')
    : false

  return (
    <div className="fade-up book-page mx-auto w-full max-w-4xl px-5 pb-14 pt-3 sm:px-9">
      <div className="running-head">
        <span>
          Station {label} {'\u00b7'} Writing desk
        </span>
        <span className="rh-right">
          <span className="inline-flex items-center gap-1">
            <IconFlame size={12} className="text-orange-500" /> {progress.state.streak}
          </span>
          {'\u00a0\u00a0\u00b7\u00a0\u00a0'} Level {lp.level} {'\u00b7'} {progress.state.xp} XP
        </span>
      </div>

      <nav className="mb-5 flex flex-wrap items-center gap-1 text-sm text-[var(--ink-faint)]">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
          <IconHome size={14} /> Home
        </Link>
        <IconChevronRight size={13} className="text-[var(--ink-faint)]" />
        <Link to={`/unit/${unit.id}`} className="hover:text-[var(--ink)]">
          {label}
        </Link>
        <IconChevronRight size={13} />
        <span className="text-[var(--ink)]">Writing desk</span>
      </nav>

      <header className="mb-6 border-b border-[var(--line)] pb-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-warm-600 text-white shadow-sm">
            <IconPen size={18} />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-warm-700 dark:text-warm-300">
              Writing task
            </p>
            <p className="page-number mt-0.5">
              {task.minWords}+ words {'\u00b7'} about {unit.phrase ?? unit.title}
            </p>
          </div>
          {best && (
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-warm-300 bg-warm-50 px-3 py-1 text-xs font-semibold text-warm-700 dark:border-warm-800 dark:bg-warm-950 dark:text-warm-200">
              <IconAward size={13} />
              Best: {best.grade} {'\u00b7'} {best.score}
            </span>
          )}
        </div>
        <h1 className="display mt-1 text-3xl tracking-tight sm:text-4xl">{task.title}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)]">{task.prompt}</p>
      </header>

      <div className="mb-6 grid gap-4 gap-y-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <label htmlFor="writing-editor" className="sr-only">
            Your writing
          </label>
          <textarea
            id="writing-editor"
            value={draft}
            onChange={onChange}
            placeholder={'Start writing here\u2026'}
            spellCheck
            className="min-h-[260px] w-full rounded-xl border border-[var(--line-strong)] bg-[var(--bg)] p-4 text-[15px] leading-relaxed text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-brand-400 focus:outline-none"
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--ink-faint)]">
            <span>
              <span className="font-semibold text-brand-700 dark:text-brand-300">{words}</span> words {'\u00b7'}{' '}
              <span className="font-semibold text-brand-700 dark:text-brand-300">{sentences}</span> sentences
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onCheck}
                disabled={words === 0}
                className="tactile inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 disabled:opacity-40"
              >
                <IconAward size={15} />
                Check my writing
              </button>
              {draft && (
                <button
                  type="button"
                  onClick={onClear}
                  className="rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm font-medium text-[var(--ink-soft)] transition-colors hover:border-brand-400"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div
            key={coach.text}
            className="rise mt-3 flex items-center gap-2.5 rounded-xl border border-brand-200 bg-brand-50/70 px-3.5 py-2.5 dark:border-brand-900 dark:bg-brand-950/50"
          >
            <span className="text-xl" aria-hidden>
              {coach.emoji}
            </span>
            <p className="text-sm font-medium text-brand-800 dark:text-brand-200">{coach.text}</p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <LiveGauge score={liveScore} />
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Live score</p>
              <p className="mt-0.5 text-2xl font-bold tabular-nums">
                {live ? liveScore : 0}
                <span className="text-sm font-medium text-[var(--ink-faint)]">/100</span>
              </p>
              <p className="mt-0.5 truncate text-[11px] text-[var(--ink-faint)]">
                {words}/{task.minWords} words {'\u00b7'} {liveUsed.length}/2 unit words used
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
              Unit words
            </p>
            <div className="flex flex-wrap gap-1.5">
              {task.targets.slice(0, 10).map((w) => {
                const used = liveUsed.includes(w)
                return (
                  <span
                    key={w}
                    className={`pop rounded-full border px-2.5 py-1 text-[12px] transition-all ${
                      used
                        ? 'border-brand-500 bg-brand-600 font-semibold text-white shadow-sm'
                        : 'border-[var(--line-strong)] bg-[var(--bg)] text-[var(--ink-soft)]'
                    }`}
                  >
                    {used ? '\u2713 ' : ''}
                    {w}
                  </span>
                )
              })}
            </div>
            <p className="mt-2 text-[11px] text-[var(--ink-faint)]">
              Watch them light up as you type.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
              Sentence starters
            </p>
            <ul className="space-y-1.5">
              {task.starters.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => setDraft((d) => (d.trim() ? `${d.replace(/\s*$/, '')} ${s} ` : `${s} `))}
                    className="w-full rounded-md border border-[var(--line)] bg-[var(--bg)] px-2.5 py-1.5 text-left text-[13px] text-[var(--ink-soft)] transition-colors hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: `Write at least ${task.minWords} words`, done: words >= task.minWords },
          { label: 'Use 2 words or phrases from this unit', done: liveUsed.length >= 2 },
          { label: 'End every sentence with . ! or ?', done: noSentenceIssues },
          { label: 'Start each sentence with a capital letter', done: noMechanics },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] transition-colors ${
              item.done
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)]'
            }`}
          >
            <span
              className={`grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                item.done ? 'bg-emerald-600 text-white' : 'bg-[var(--line)] text-[var(--ink-faint)]'
              }`}
            >
              {'\u2713'}
            </span>
            {item.label}
          </div>
        ))}
      </div>

      {result && (
        <section key={checkedAt} className="rise mt-6 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-6">
          <div className="flex flex-wrap items-center gap-5">
            <div className="size-24">
              <LiveGauge score={result.score} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
                Checked, graded, saved
              </p>
              <p className="flex items-center gap-2 text-2xl font-bold">
                Grade {result.grade} {'\u00b7'} <CountUp value={result.score} />
                <span className="text-base font-medium text-[var(--ink-faint)]">%</span>
              </p>
              <p className="mt-0.5 text-sm text-[var(--ink-soft)]">{result.gradeLabel}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
                +{result.grade === 'A' ? 30 : 10} XP
              </span>
              {result.grade === 'A' && (
                <span className="rise inline-flex items-center gap-1.5 rounded-full bg-warm-500 px-3 py-1 text-xs font-bold text-white">
                  Star writer bonus {'\u2B50'}
                </span>
              )}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
              <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                <IconCheck size={12} /> What went well
              </p>
              <ul className="space-y-1.5">
                {result.wins.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-[13px] text-[var(--ink-soft)]">
                    <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900 dark:bg-amber-950/40">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                Where to improve
              </p>
              {result.issues.length === 0 ? (
                <p className="text-[13px] text-emerald-700 dark:text-emerald-300">
                  {'Nothing to fix \u2013 perfect writing!'}
                </p>
              ) : (
                <ul className="space-y-2.5">
                  {result.issues.map((iss, i) => (
                    <li key={`${iss.kind}-${i}`} className="text-[13px]">
                      <span className="flex items-start gap-2">
                        <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" />
                        <span className="text-[var(--ink-soft)]">{iss.text}</span>
                      </span>
                      {iss.example && (
                        <span className="mt-1 block rounded-md bg-[var(--surface)] px-2 py-1 text-[12px] text-brand-700 dark:text-brand-300">
                          {iss.example}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
            <p className="text-[13px] text-[var(--ink-faint)]">
              {result.targetsUsed.length >= 2
                ? `You used unit words: ${result.targetsUsed.slice(0, 4).join(', ')}.`
                : 'Tip: your result goes up when you use this unit\u2019s words.'}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setResult(null)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm font-semibold text-[var(--ink-soft)] transition-colors hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
              >
                <IconPen size={14} /> Edit and try again
              </button>
              <Link to={`/unit/${unit.id}`} className="page-turn py-2">
                <IconChevronLeft size={14} /> Back to {label}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}