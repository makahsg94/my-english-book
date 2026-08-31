import { useMemo, useState } from 'react'
import type { Exercise, ExerciseQuestion } from '../types/content'
import { useProgress } from '../lib/appContext'
import { IconCheck, IconCross, IconRotate, IconTarget } from './Icons'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function Quiz({ exercise }: { exercise: Exercise }) {
  const progress = useProgress()
  const [answered, setAnswered] = useState<Record<string, unknown>>({})
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null)

  const onAnswer = (id: string, value: unknown) => {
    setAnswered((prev) => ({ ...prev, [id]: value }))
    setChecked(false)
    setScore(null)
  }

  const stats = useMemo(() => {
    let correct = 0
    let total = 0
    for (const q of exercise.questions) {
      switch (q.kind) {
        case 'mcq': {
          total += 1
          const sel = answered[q.id] as number | undefined
          if (sel !== undefined && q.options[sel]?.correct) correct += 1
          break
        }
        case 'true-false': {
          total += 1
          if (answered[q.id] === q.correct) correct += 1
          break
        }
        case 'fill-blank': {
          total += 1
          const guess = String(answered[q.id] ?? '').trim().toLowerCase()
          if (guess && guess === q.answer.toLowerCase()) correct += 1
          break
        }
        case 'matching': {
          const sel = (answered[q.id] ?? {}) as Record<string, number>
          for (const pair of q.pairs) {
            if (sel[pair.left] !== undefined && q.pairs[sel[pair.left]].right === pair.right) correct += 1
          }
          total += q.pairs.length
          break
        }
        case 'ordering': {
          const order = (answered[q.id] ?? []) as string[]
          for (const [i, item] of order.entries()) if (item === q.items[i]) correct += 1
          total += q.items.length
          break
        }
      }
    }
    return { correct, total }
  }, [answered, exercise.questions])

  const allAnswered = exercise.questions.every((q) => {
    if (q.kind === 'matching') {
      const sel = (answered[q.id] ?? {}) as Record<string, number>
      return q.pairs.every((p) => sel[p.left] !== undefined)
    }
    if (q.kind === 'ordering') return (answered[q.id] as string[] | undefined)?.length === q.items.length
    return answered[q.id] !== undefined && answered[q.id] !== ''
  })

  const check = () => {
    setChecked(true)
    setScore({ correct: stats.correct, total: stats.total })
    progress.recordQuiz(exercise.id, stats.correct, stats.total)
  }

  const reset = () => {
    setAnswered({})
    setChecked(false)
    setScore(null)
  }

  return (
    <div className="rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold">{exercise.title}</h3>
          {exercise.instructions && <p className="text-sm text-[var(--ink-soft)]">{exercise.instructions}</p>}
        </div>
        <div className="flex items-center gap-2">
          {exercise.page && (
            <span className="rounded-full bg-[var(--line)] px-2.5 py-0.5 text-xs text-[var(--ink-soft)]">page {exercise.page}</span>
          )}
          {exercise.verified && (
            <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              answers verified
            </span>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {exercise.questions.map((q, i) => (
          <QuestionRow key={q.id} question={q} index={i} answered={answered} onAnswer={onAnswer} checked={checked} />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={check}
          disabled={!allAnswered}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <IconTarget size={16} />
          Check answers
        </button>
        {score && checked && (
          <span className="text-sm font-medium" data-score>
            Score: {score.correct} / {score.total} ({Math.round((score.correct / Math.max(1, score.total)) * 100)}%)
          </span>
        )}
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--line-strong)] px-3 py-2 text-sm text-[var(--ink-soft)] transition-colors hover:bg-[var(--line)]"
        >
          <IconRotate size={14} />
          Reset
        </button>
      </div>
    </div>
  )
}

function QuestionRow({
  question,
  index,
  answered,
  onAnswer,
  checked,
}: {
  question: ExerciseQuestion
  index: number
  answered: Record<string, unknown>
  onAnswer: (id: string, value: unknown) => void
  checked: boolean
}) {
  switch (question.kind) {
    case 'mcq': {
      const sel = (answered[question.id] ?? -1) as number
      return (
        <div>
          <p className="mb-2 text-sm font-medium">{index + 1}. {question.prompt}</p>
          <div className="flex flex-wrap gap-2">
            {question.options.map((opt, oi) => {
              const isSel = sel === oi
              const reveal = checked && opt.correct
              const wrong = checked && isSel && !opt.correct
              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => onAnswer(question.id, oi)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                    reveal
                      ? 'border-brand-600 bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200'
                      : wrong
                        ? 'border-red-400 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                        : isSel
                          ? 'border-brand-600 bg-[var(--surface)] text-[var(--ink)]'
                          : 'border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-brand-400'
                  }`}
                >
                  {checked && (reveal ? <IconCheck size={14} /> : wrong ? <IconCross size={14} /> : null)}
                  <span>{opt.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )
    }

    case 'true-false': {
      const sel = answered[question.id]
      return (
        <div>
          <p className="mb-2 text-sm font-medium">{index + 1}. {question.statement}</p>
          <div className="flex gap-2">
            {([true, false] as const).map((val) => {
              const isSel = sel === val
              const good = checked && isSel && val === question.correct
              const bad = checked && isSel && val !== question.correct
              return (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() => onAnswer(question.id, val)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-4 py-1.5 text-sm transition-colors ${
                    good
                      ? 'border-brand-600 bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200'
                      : bad
                        ? 'border-red-400 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                        : isSel
                          ? 'border-brand-600 bg-[var(--surface)] text-[var(--ink)]'
                          : 'border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-brand-400'
                  }`}
                >
                  {checked && (good ? <IconCheck size={14} /> : bad ? <IconCross size={14} /> : null)}
                  {val ? 'True' : 'False'}
                </button>
              )
            })}
            {checked && !sel && (
              <span className="self-center text-xs text-[var(--ink-faint)]">Answer: {question.correct ? 'True' : 'False'}</span>
            )}
          </div>
        </div>
      )
    }

    case 'fill-blank': {
      const guess = String(answered[question.id] ?? '')
      const good = checked && guess.trim().toLowerCase() === question.answer.toLowerCase()
      const bad = checked && guess.trim().toLowerCase() !== question.answer.toLowerCase()
      return (
        <div>
          <p className="mb-2 text-sm font-medium">
            {index + 1}. {question.before} <span className="mx-0.5 rounded-md bg-[var(--line)] px-1.5 py-0.5">___</span>{' '}
            {question.after}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={guess}
              onChange={(e) => onAnswer(question.id, e.target.value)}
              placeholder={'Type your answer\u2026'}
              className={`rounded-lg border bg-[var(--surface)] px-3 py-1.5 text-sm ${
                good ? 'border-brand-600' : bad ? 'border-red-400' : 'border-[var(--line-strong)] text-[var(--ink)]'
              }`}
            />
            {checked && (
              <span className={`text-sm ${good ? 'text-brand-700' : 'text-red-600'}`}>
                {good ? 'Correct!' : `Answer: ${question.answer}`}
              </span>
            )}
          </div>
        </div>
      )
    }

    case 'matching': {
      const sel = (answered[question.id] ?? {}) as Record<string, number>
      const rightOptions = question.pairs.map((p) => p.right)
      return (
        <div>
          <p className="mb-2 text-sm font-medium">{index + 1}. Match the pairs</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1.5">
              {question.pairs.map((pair, li) => {
                const chosen = sel[pair.left]
                const good = checked && chosen !== undefined && rightOptions[chosen] === pair.right
                const bad = checked && chosen !== undefined && rightOptions[chosen] !== pair.right
                return (
                  <div key={pair.left} className="flex items-center gap-2">
                    <span className="w-5 text-xs font-semibold text-[var(--ink-faint)]">{LETTERS[li]}.</span>
                    <span
                      className={`flex-1 rounded-lg border px-3 py-1.5 text-sm ${
                        good
                          ? 'flex items-center gap-2 border-brand-600 bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200'
                          : bad
                            ? 'flex items-center gap-2 border-red-400 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                            : 'border-[var(--line-strong)]'
                      }`}
                    >
                      {checked && (good ? <IconCheck size={14} /> : bad ? <IconCross size={14} /> : null)}
                      {pair.left}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="space-y-1.5">
              {question.pairs.map((pair, ri) => {
                const chosenLeft = Object.entries(sel).find(([, v]) => v === ri)?.[0]
                const li = chosenLeft ? question.pairs.findIndex((p) => p.left === chosenLeft) : -1
                const good = checked && li >= 0 && rightOptions[ri] === question.pairs[li].right
                return (
                  <select
                    key={pair.right}
                    aria-label={`right item ${ri + 1}: ${pair.right}`}
                    value={chosenLeft ?? ''}
                    onChange={(e) => {
                      const next = { ...sel }
                      if (e.target.value) next[e.target.value] = ri
                      onAnswer(question.id, next)
                    }}
                    className={`w-full rounded-lg border bg-[var(--surface)] px-3 py-1.5 text-sm ${
                      good
                        ? 'border-brand-600'
                        : checked
                          ? 'border-red-300'
                          : 'border-[var(--line-strong)]'
                    }`}
                  >
                    <option value="">{'\u2026'} choose {'\u2192'} {pair.right}</option>
                    {question.pairs.map((p, li) => (
                      <option key={p.left} value={p.left}>
                        {LETTERS[li]}. {p.left}
                      </option>
                    ))}
                  </select>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    case 'ordering':
      return (
        <Ordering index={index} question={question} answered={answered} onAnswer={onAnswer} checked={checked} />
      )
  }
}

function Ordering({
  index,
  question,
  answered,
  onAnswer,
  checked,
}: {
  index: number
  question: Extract<ExerciseQuestion, { kind: 'ordering' }>
  answered: Record<string, unknown>
  onAnswer: (id: string, value: unknown) => void
  checked: boolean
}) {
  const stable = useMemo(() => shuffle(question.items), [question.items])
  const order = (answered[question.id] as string[] | undefined) ?? stable
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= order.length) return
    const next = [...order]
    const tmp = next[i]
    next[i] = next[j]
    next[j] = tmp
    onAnswer(question.id, next)
  }
  return (
    <div>
      <p className="mb-1 text-sm font-medium">{index + 1}. {question.title}</p>
      {question.prompt && <p className="mb-2 text-xs text-[var(--ink-faint)]">{question.prompt}</p>}
      <p className="mb-2 text-xs text-[var(--ink-faint)]">Use the arrows to put the steps in the correct order.</p>
      <div className="space-y-1.5">
        {order.map((item, i) => {
          const correctPos = question.items[i] === item
          return (
            <div
              key={`${item}-${i}`}
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${
                checked && correctPos
                  ? 'border-brand-600 bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200'
                  : checked
                    ? 'border-red-400 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                    : 'border-[var(--line-strong)]'
              }`}
            >
              <span className="w-5 text-xs font-semibold text-[var(--ink-faint)]">{i + 1}.</span>
              <span className="flex-1">{item}</span>
              {checked && (correctPos ? <IconCheck size={14} /> : <IconCross size={14} />)}
              <button type="button" onClick={() => move(i, -1)} aria-label="move up" className="px-1 text-[var(--ink-faint)] hover:text-[var(--ink)]">
                {'\u2191'}
              </button>
              <button type="button" onClick={() => move(i, 1)} aria-label="move down" className="px-1 text-[var(--ink-faint)] hover:text-[var(--ink)]">
                {'\u2193'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}