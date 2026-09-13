import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Exercise, ExerciseQuestion } from '../types/content'
import { useProgress } from '../lib/appContext'
import { IconCheck, IconCross, IconEye, IconEyeOff, IconRotate, IconTarget } from './Icons'

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
  const [revealIds, setRevealIds] = useState<Set<string>>(new Set())

  const best = progress.bestQuiz(exercise.id)

  const onAnswer = (id: string, value: unknown) => {
    setAnswered((prev) => ({ ...prev, [id]: value }))
    setChecked(false)
    setScore(null)
    setRevealIds((prev) => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const onReveal = (id: string) => {
    setRevealIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
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
    setRevealIds(new Set())
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
          {best && (
            <span
              data-best
              className="rounded-full bg-accent-100 px-2.5 py-0.5 text-xs font-semibold text-accent-700 dark:bg-accent-900 dark:text-accent-300"
            >
              Best: {Math.round((best.correct / Math.max(1, best.total)) * 100)}%
            </span>
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
          <QuestionRow
            key={q.id}
            question={q}
            index={i}
            answered={answered}
            onAnswer={onAnswer}
            checked={checked}
            revealed={revealIds.has(q.id)}
            onReveal={onReveal}
          />
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
  revealed,
  onReveal,
}: {
  question: ExerciseQuestion
  index: number
  answered: Record<string, unknown>
  onAnswer: (id: string, value: unknown) => void
  checked: boolean
  revealed: boolean
  onReveal: (id: string) => void
}) {
  let content: ReactNode
  switch (question.kind) {
    case 'mcq': {
      const sel = (answered[question.id] ?? -1) as number
      const correctLabel = question.options.find((o) => o.correct)?.label
      const chosenWrong = checked && sel >= 0 && !question.options[sel]?.correct
      content = (
        <div>
          <p className="mb-3 text-sm font-medium leading-relaxed">{index + 1}. {question.prompt}</p>
          <div className="space-y-2">
            {question.options.map((opt, oi) => {
              const isSel = sel === oi
              const reveal = (checked || revealed) && opt.correct
              const wrong = checked && isSel && !opt.correct
              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => onAnswer(question.id, oi)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm transition-all ${
                    reveal
                      ? 'border-brand-500 bg-brand-50 text-brand-800 shadow-sm dark:bg-brand-950 dark:text-brand-200'
                      : wrong
                        ? 'border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : isSel
                          ? 'border-brand-500 bg-brand-50/50 text-[var(--ink)] shadow-sm dark:bg-brand-950/30'
                          : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-brand-300 hover:bg-brand-50/30'
                  }`}
                >
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                      reveal
                        ? 'bg-brand-600 text-white'
                        : wrong
                          ? 'bg-rose-500 text-white'
                          : isSel
                            ? 'bg-brand-600 text-white'
                            : 'bg-[var(--line)] text-[var(--ink-faint)]'
                    }`}
                  >
                    {reveal ? <IconCheck size={12} /> : wrong ? <IconCross size={12} /> : LETTERS[oi]}
                  </span>
                  <span>{opt.label}</span>
                </button>
              )
            })}
          </div>
          {(chosenWrong || revealed || (checked && sel === -1)) && (
            <p className="mt-2 rounded-lg bg-brand-50 px-3 py-1.5 text-sm text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              Correct answer: <span className="font-semibold">{correctLabel}</span>
            </p>
          )}
        </div>
      )
      break
    }

    case 'true-false': {
      const sel = answered[question.id]
      content = (
        <div>
          <p className="mb-2 text-sm font-medium">{index + 1}. {question.statement}</p>
          <div className="flex gap-2">
            {([true, false] as const).map((val) => {
              const isSel = sel === val
              const isCorrectOpt = val === question.correct
              const good = checked && isSel && isCorrectOpt
              const bad = checked && isSel && !isCorrectOpt
              const revealOpt = revealed && isCorrectOpt
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
                        : revealOpt
                          ? 'border-brand-500 bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200'
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
            {revealed || (checked && !sel) ? (
              <span className="self-center text-xs text-[var(--ink-faint)]">
                Answer: {question.correct ? 'True' : 'False'}
              </span>
            ) : null}
          </div>
        </div>
      )
      break
    }

    case 'fill-blank': {
      const guess = String(answered[question.id] ?? '')
      const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '')
      const ok =
        guess.trim() !== '' &&
        (norm(guess) === norm(question.answer) || (question.accept ?? []).some((a) => norm(guess) === norm(a)))
      const good = checked && ok
      const bad = checked && !ok
      content = (
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
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className={`rounded-lg border bg-[var(--surface)] px-3 py-1.5 text-sm ${
                good ? 'border-brand-600' : bad ? 'border-red-400' : 'border-[var(--line-strong)] text-[var(--ink)]'
              }`}
            />
            {checked && good && <span className="text-sm text-brand-700">Correct!</span>}
            {(revealed || bad) && !(checked && good) && (
              <span className="text-sm text-brand-700 dark:text-brand-300">
                Answer: <span className="font-medium">{question.answer}</span>
              </span>
            )}
          </div>
        </div>
      )
      break
    }

    case 'matching': {
      const sel = (answered[question.id] ?? {}) as Record<string, number>
      const rightOptions = question.pairs.map((p) => p.right)
      content = (
        <div>
          <p className="mb-2 text-sm font-medium">{index + 1}. Match the pairs</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1.5">
              {question.pairs.map((pair, li) => {
                const chosen = sel[pair.left]
                const correctPair = pair.right === rightOptions[li]
                const good = checked && chosen !== undefined && rightOptions[chosen] === pair.right
                const bad = checked && chosen !== undefined && rightOptions[chosen] !== pair.right
                const showGood = revealed && !checked && correctPair
                return (
                  <div key={pair.left} className="flex items-center gap-2">
                    <span className="w-5 text-xs font-semibold text-[var(--ink-faint)]">{LETTERS[li]}.</span>
                    <span
                      className={`flex-1 rounded-lg border px-3 py-1.5 text-sm ${
                        good || showGood
                          ? 'flex items-center gap-2 border-brand-600 bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200'
                          : bad
                            ? 'flex items-center gap-2 border-red-400 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                            : 'border-[var(--line-strong)]'
                      }`}
                    >
                      {(checked || revealed) && (good || showGood) ? <IconCheck size={14} /> : bad ? <IconCross size={14} /> : null}
                      {pair.left}
                      {bad && (
                        <span className="ml-auto text-xs font-medium text-red-600 dark:text-red-300">{'\u2192'} {pair.right}</span>
                      )}
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
                const showGood = revealed && !checked && rightOptions[ri] === question.pairs[ri].right
                return (
                  <div key={pair.right} className="w-full">
                    <select
                      aria-label={`right item ${ri + 1}: ${pair.right}`}
                      value={chosenLeft ?? ''}
                      onChange={(e) => {
                        const next = { ...sel }
                        if (e.target.value) next[e.target.value] = ri
                        onAnswer(question.id, next)
                      }}
                      className={`w-full rounded-lg border bg-[var(--surface)] px-3 py-1.5 text-sm ${
                        good || showGood
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
                    {!good && (checked || revealed) && (
                      <p className="mt-1 text-xs text-[var(--ink-soft)]">
                        Correct answer: <span className="font-medium text-brand-700 dark:text-brand-300">{LETTERS[ri]}. {question.pairs[ri].left}</span>
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )
      break
    }

    case 'ordering':
      content = <Ordering index={index} question={question} answered={answered} onAnswer={onAnswer} checked={checked} revealed={revealed} />
      break
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-end">
        <button
          type="button"
          onClick={() => onReveal(question.id)}
          aria-pressed={revealed}
          aria-label={revealed ? 'Hide correct answer' : 'Show correct answer'}
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
            revealed
              ? 'border-brand-400 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
              : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink-faint)] hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-300'
          }`}
        >
          {revealed ? <IconEyeOff size={13} /> : <IconEye size={13} />}
          {revealed ? 'Hide answer' : 'Show answer'}
        </button>
      </div>
      {content}
    </div>
  )
}

function Ordering({
  index,
  question,
  answered,
  onAnswer,
  checked,
  revealed,
}: {
  index: number
  question: Extract<ExerciseQuestion, { kind: 'ordering' }>
  answered: Record<string, unknown>
  onAnswer: (id: string, value: unknown) => void
  checked: boolean
  revealed: boolean
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
          const good = checked && correctPos
          const bad = checked && !correctPos
          return (
            <div
              key={`${item}-${i}`}
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${
                good
                  ? 'border-brand-600 bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200'
                  : bad
                    ? 'border-red-400 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                    : revealed && correctPos
                      ? 'border-brand-500 bg-brand-50/60 text-brand-800 dark:bg-brand-950 dark:text-brand-200'
                      : 'border-[var(--line-strong)]'
              }`}
            >
              <span className="w-5 text-xs font-semibold text-[var(--ink-faint)]">{i + 1}.</span>
              <span className="flex-1">{item}</span>
              {checked ? (correctPos ? <IconCheck size={14} /> : <IconCross size={14} />) : null}
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