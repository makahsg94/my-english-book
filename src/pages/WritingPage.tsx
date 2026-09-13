import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUnit } from '../content/book'
import { getWritingTask } from '../content/writing'
import { useProgress } from '../lib/appContext'
import { checkWriting } from '../lib/writeCheck'
import type { WritingCheck } from '../lib/writeCheck'
import { burstConfetti } from '../lib/confetti'
import { IconAward, IconCheck, IconChevronLeft, IconChevronRight, IconHome, IconPen } from '../components/Icons'

function wordCount(text: string) {
  return text.split(/\s+/).filter((w) => w.trim().length > 0).length
}

function sentenceCount(text: string) {
  return text.split(/[.!?]+[\s$]/).map((s) => s.trim()).filter((s) => s.length > 0).length
}

export default function WritingPage() {
  const { unitId } = useParams()
  const unit = unitId ? getUnit(unitId) : undefined
  const progress = useProgress()
  const task = unitId ? getWritingTask(unitId) : undefined

  const draftKey = `speakout-a2.writing.draft.${task?.id ?? 'none'}`
  const [draft, setDraft] = useState(() => {
    try {
      return localStorage.getItem(draftKey) ?? ''
    } catch {
      return ''
    }
  })
  const [result, setResult] = useState<WritingCheck | null>(null)
  const [checkedAt, setCheckedAt] = useState<number>(0)

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

  const words = useMemo(() => wordCount(draft), [draft])
  const sentences = useMemo(() => sentenceCount(draft), [draft])
  const best = task ? progress.bestWriting(task.id) : undefined

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

  const unitLabel = unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => setDraft(e.target.value)

  const onCheck = () => {
    if (words === 0) return
    const res = checkWriting(draft, { minWords: task.minWords, targets: task.targets })
    progress.recordWriting(task.id, res.score, res.grade, res.stats.words)
    setResult(res)
    setCheckedAt(Date.now())
    if (res.score >= 85) burstConfetti()
  }

  const onClear = () => {
    setDraft('')
    setResult(null)
  }

  const checklist = [
    `Write at least ${task.minWords} words`,
    'Use 2 words or phrases from this unit',
    'End every sentence with . ! or ?',
    'Start each sentence with a capital letter',
  ]

  return (
    <div className="fade-up book-page mx-auto w-full max-w-4xl px-5 pb-14 pt-3 sm:px-9">
      <div className="running-head">
        <span>
          Station {unitLabel} {'\u00b7'} Writing desk
        </span>
        <span className="rh-right">writing bank {'\u00b7'} pages 94{'\u2013'}95</span>
      </div>

      <nav className="mb-5 flex flex-wrap items-center gap-1 text-sm text-[var(--ink-faint)]">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
          <IconHome size={14} /> Home
        </Link>
        <IconChevronRight size={13} className="text-[var(--ink-faint)]" />
        <Link to={`/unit/${unit.id}`} className="hover:text-[var(--ink)]">
          {unitLabel}
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

      <div className="mb-6 grid gap-4 gap-y-6 lg:grid-cols-[minmax(0,1fr)_260px]">
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
            className="min-h-[240px] w-full rounded-xl border border-[var(--line-strong)] bg-[var(--bg)] p-4 text-[15px] leading-relaxed text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-brand-400 focus:outline-none"
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
        </div>

        <aside>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
            Before you check
          </p>
          <ul className="space-y-2">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-[13px] text-[var(--ink-soft)]">
                <span aria-hidden className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                  {'\u2713'}
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
              Sentence starters
            </p>
            <ul className="space-y-1.5">
              {task.starters.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => setDraft((d) => (d.trim() ? `${d.replace(/\s*$/, '')} ${s} ` : `${s} `))}
                    className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1.5 text-[13px] text-[var(--ink-soft)] transition-colors hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
              Try unit words
            </p>
            <div className="flex flex-wrap gap-1.5">
              {task.targets.slice(0, 8).map((w) => (
                <span key={w} className="rounded-full bg-[var(--line)] px-2.5 py-1 text-[12px] text-[var(--ink-soft)]">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {result && (
        <section key={checkedAt} className="rise rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="grid size-14 place-items-center rounded-full border-2 border-brand-300 bg-brand-50 text-2xl dark:border-brand-700 dark:bg-brand-950">
              {result.emoji}
            </span>
            <div>
              <p className="flex items-center gap-2 text-lg font-bold">
                Grade {result.grade} {'\u00b7'} {result.score}%
              </p>
              <p className="text-sm text-[var(--ink-soft)]">{result.gradeLabel}</p>
            </div>
            <div className="ml-auto w-full max-w-[220px]">
              <div className="mb-1 flex justify-between text-[11px] text-[var(--ink-faint)]">
                <span>Score</span>
                <span className="font-semibold text-brand-700 dark:text-brand-300">{result.score}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[var(--line)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-700"
                  style={{ width: `${result.score}%` }}
                />
              </div>
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
              <Link
                to={`/unit/${unit.id}`}
                className="page-turn py-2"
              >
                <IconChevronLeft size={14} /> Back to {unitLabel}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}