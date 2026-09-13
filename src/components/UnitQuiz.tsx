import { useMemo, useState } from 'react'
import type { QuizCategory, UnitQuiz, UnitQuizItem } from '../types/content'
import { getLesson } from '../content/book'
import { useProgress } from '../lib/appContext'
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconCross,
  IconHome,
  IconLayers,
  IconRotate,
  IconShield,
  IconSpark,
  IconTarget,
} from './Icons'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const

type AnswerValue = number | boolean | string
type Phase = 'intro' | 'active' | 'review' | 'results'

interface GradedItem extends UnitQuizItem {
  answered: string | null
  correct: boolean
}

interface ReviewGroup {
  lessonId: string
  code: string
  title: string
  skills: string[]
  items: GradedItem[]
}

const CATEGORY_LABEL: Record<QuizCategory, string> = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  reading: 'Reading',
  communication: 'Communication',
}

const CATEGORY_ORDER: QuizCategory[] = ['grammar', 'vocabulary', 'reading', 'communication']

const DIFFICULTY_STYLE: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  medium: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  hard: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '')
}

function evaluate(q: UnitQuizItem['question'], answer: AnswerValue | undefined): boolean {
  switch (q.kind) {
    case 'mcq':
      return typeof answer === 'number' && q.options[answer]?.correct === true
    case 'true-false':
      return answer === q.correct
    case 'fill-blank':
      if (!q.answer) return false
      return (
        normalize(String(answer ?? '')) === normalize(q.answer) ||
        (q.accept ?? []).some((a) => normalize(String(answer ?? '')) === normalize(a))
      )
  }
}

function promptText(item: UnitQuizItem): string {
  const q = item.question
  if (q.kind === 'mcq') return q.prompt
  if (q.kind === 'true-false') return q.statement
  return `${q.before} ___ ${q.after}`.replace(/\s+/g, ' ').trim()
}

function displayAnswer(q: UnitQuizItem['question'], answer: AnswerValue | undefined): string | null {
  switch (q.kind) {
    case 'mcq':
      return typeof answer === 'number' && q.options[answer] ? q.options[answer].label : null
    case 'true-false':
      return answer === undefined ? null : answer ? 'True' : 'False'
    case 'fill-blank':
      return answer !== undefined && String(answer).trim() !== '' ? String(answer).trim() : null
  }
}

function displayCorrect(q: UnitQuizItem['question']): string {
  switch (q.kind) {
    case 'mcq':
      return q.options.find((o) => o.correct)?.label ?? '\u2014'
    case 'true-false':
      return q.correct ? 'True' : 'False'
    case 'fill-blank':
      return q.answer
  }
}

function countFor(quiz: UnitQuiz, category: QuizCategory): number {
  return quiz.questions.filter((qi) => qi.category === category).length
}

export function UnitQuiz({ quiz, unitLabel }: { quiz: UnitQuiz; unitLabel: string }) {
  const progress = useProgress()

  const [phase, setPhase] = useState<Phase>('intro')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({})
  const [graded, setGraded] = useState<GradedItem[]>([])

  const total = quiz.questions.length
  const attempts = (progress.state.quizzes[quiz.id] ?? []).length
  const best = progress.bestQuiz(quiz.id)

  const reviewGroups = useMemo<ReviewGroup[]>(() => {
    if (graded.length === 0) return []
    const wrong = graded.filter((g) => !g.correct)
    const map = new Map<string, ReviewGroup>()
    for (const g of wrong) {
      const lesson = getLesson(g.unitId, g.lessonId)
      const existing = map.get(g.lessonId)
      if (existing) {
        existing.items.push(g)
        if (lesson && !existing.skills.includes(g.skill)) existing.skills.push(g.skill)
      } else {
        map.set(g.lessonId, {
          lessonId: g.lessonId,
          code: lesson?.code ?? '',
          title: lesson?.title ?? g.lessonId,
          skills: [g.skill],
          items: [g],
        })
      }
    }
    return [...map.values()]
  }, [graded])

  const setAnswer = (value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [current]: value }))
  }

  const start = () => {
    setAnswers({})
    setGraded([])
    setCurrent(0)
    setPhase('active')
  }

  const answerCount = Object.values(answers).filter((a) => a !== undefined && a !== '').length

  const submit = () => {
    const next: GradedItem[] = quiz.questions.map((item, i) => {
      const answer = answers[i]
      return {
        ...item,
        answered: displayAnswer(item.question, answer),
        correct: evaluate(item.question, answer),
      }
    })
    setGraded(next)
    const correct = next.filter((g) => g.correct).length
    const categories: Record<string, { correct: number; total: number }> = {}
    for (const g of next) {
      const c = categories[g.category] ?? { correct: 0, total: 0 }
      c.total += 1
      if (g.correct) c.correct += 1
      categories[g.category] = c
    }
    progress.recordQuiz(quiz.id, correct, total, {
      categories,
      wrong: next.filter((g) => !g.correct).map((g) => g.id),
    })
    setPhase('results')
  }

  const retake = () => {
    setAnswers({})
    setGraded([])
    setCurrent(0)
    setPhase('intro')
  }

  if (phase === 'intro') {
    return (
      <section className="rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
            <IconTarget size={12} /> Unit quiz
          </span>
          {best && attempts > 0 && (
            <span className="rounded-full bg-[var(--line)] px-3 py-1 text-xs font-semibold text-[var(--ink-soft)]">
              Best: {Math.round((best.correct / Math.max(1, best.total)) * 100)}%
            </span>
          )}
        </div>

        <h2 className="mt-3 text-2xl font-bold tracking-tight">{quiz.title}</h2>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[var(--ink-soft)]">{quiz.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {quiz.skills.map((s) => (
            <span
              key={s}
              className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--ink-soft)]"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Questions</p>
            <p className="mt-1 text-xl font-bold">{total}</p>
            <p className="text-xs text-[var(--ink-soft)]">
              {CATEGORY_ORDER.filter((c) => countFor(quiz, c) > 0)
                .map((c) => `${CATEGORY_LABEL[c]} \u00d7 ${countFor(quiz, c)}`)
                .join(' \u00b7 ')}
            </p>
          </div>
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Level</p>
            <p className="mt-1 text-xl font-bold">A2</p>
            <p className="text-xs text-[var(--ink-soft)]">Speakout {unitLabel}</p>
          </div>
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Your attempts</p>
            <p className="mt-1 text-xl font-bold">{attempts}</p>
            <p className="text-xs text-[var(--ink-soft)]">
              {attempts > 0 ? 'You can retake it any time' : 'First time \u2014 good luck'}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow"
          >
            <IconSpark size={16} />
            Start quiz
          </button>
          <p className="text-xs text-[var(--ink-faint)]">
            Your answers are shown only after you submit the quiz.
          </p>
        </div>
      </section>
    )
  }

  if (phase === 'results') {
    const correctCount = graded.filter((g) => g.correct).length
    const pct = Math.round((correctCount / Math.max(1, total)) * 100)
    const byCategory = CATEGORY_ORDER.map((c) => {
      const items = graded.filter((g) => g.category === c)
      if (items.length === 0) return null
      const good = items.filter((g) => g.correct).length
      return { category: c, correct: good, total: items.length, pct: Math.round((good / items.length) * 100) }
    }).filter((r): r is NonNullable<typeof r> => r !== null)

    const weakCategories = byCategory.filter((r) => r.pct < 70)
    const wrongCount = total - correctCount
    const wrongItems = graded.filter((g) => !g.correct)

    const headline =
      pct >= 90 ? 'Excellent!' : pct >= 70 ? 'Well done' : pct >= 50 ? 'Good effort' : 'Keep practising'
    const tone =
      pct >= 80
        ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
        : pct >= 60
          ? 'border-accent-200 bg-accent-50 text-accent-800 dark:border-accent-900 dark:bg-accent-950 dark:text-accent-200'
          : 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200'

    return (
      <section className="fade-up space-y-6">
        <div className="rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-5 sm:p-7">
          <div className="grid items-center gap-5 sm:grid-cols-[auto_1fr]">
            <div
              className={`grid size-28 place-items-center rounded-full border-4 p-3 ${tone}`}
              aria-label={`score ${pct}%`}
            >
              <div className="text-center">
                <p className="text-3xl font-bold leading-none">{pct}%</p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest">
                  {correctCount}/{total}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Result</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">{headline}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <IconCheck size={12} /> {correctCount} correct
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                  <IconCross size={12} /> {wrongCount} wrong
                </span>
              </div>
              {weakCategories.length > 0 && (
                <p className="mt-3 text-sm text-[var(--ink-soft)]">
                  Focus on{' '}
                  {weakCategories.map((r) => CATEGORY_LABEL[r.category]).join(' and ')}
                  {' \u2014 '}review the lessons below and try again.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {byCategory.map((r) => (
              <div key={r.category} className="rounded-xl border border-[var(--line)] p-3">
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-semibold">{CATEGORY_LABEL[r.category]}</span>
                  <span className="text-xs text-[var(--ink-faint)]">
                    {r.correct}/{r.total}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[var(--line)]">
                  <div
                    className={`h-full rounded-full transition-all ${
                      r.pct >= 70
                        ? 'bg-gradient-to-r from-brand-500 to-emerald-500'
                        : 'bg-gradient-to-r from-accent-400 to-rose-400'
                    }`}
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-[var(--ink-faint)]">{r.pct}%</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={retake}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--line-strong)] px-4 py-2 text-sm font-semibold text-[var(--ink-soft)] transition-colors hover:bg-[var(--line)]"
            >
              <IconRotate size={15} />
              Take it again
            </button>
          </div>
        </div>

        {wrongItems.length > 0 && (
          <div className="rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-5 sm:p-7">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[var(--ink-faint)]">
              <IconCross size={15} />
              Your wrong answers
            </h3>
            <div className="mt-3 space-y-3">
              {wrongItems.map((g, i) => (
                <div key={g.id} className="rounded-xl border border-[var(--line)] p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold">
                      {i + 1}. {promptText(g)}
                    </span>
                    <span className="ml-auto rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                      {CATEGORY_LABEL[g.category]}
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    <p className="rounded-lg bg-rose-50 px-3 py-2 text-rose-800 dark:bg-rose-950 dark:text-rose-200">
                      Your answer:{' '}
                      <span className="font-semibold">{g.answered ?? '(no answer)'}</span>
                    </p>
                    <p className="rounded-lg bg-brand-50 px-3 py-2 text-brand-800 dark:bg-brand-950 dark:text-brand-200">
                      Correct answer: <span className="font-semibold">{displayCorrect(g.question)}</span>
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-[var(--ink-soft)]">{g.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {reviewGroups.length > 0 && (
          <div className="rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-5 sm:p-7">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[var(--ink-faint)]">
              <IconShield size={16} />
              Recommended review
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {reviewGroups.map((g) => (
                <a
                  key={g.lessonId}
                  href={`#/unit/${quiz.unitId}/lesson/${g.lessonId}`}
                  className="group rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 transition-all hover:border-brand-300 hover:shadow-sm dark:hover:border-brand-700"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">
                      {g.code} {'\u00b7'} {g.title}
                    </span>
                    <span className="shrink-0 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                      {g.items.length} missed
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--ink-faint)]">{g.skills.join(' \u00b7 ')}</p>
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs text-[var(--ink-faint)]">
              Revisit the underlined lessons, then take the quiz again to improve your score.
            </p>
          </div>
        )}
      </section>
    )
  }

  const item = quiz.questions[current]
  const answeredCurrent = answers[current]
  const isAnswered = answeredCurrent !== undefined && answeredCurrent !== ''

  const nextStep = () => {
    if (current === total - 1) {
      setPhase('review')
    } else {
      setCurrent((c) => c + 1)
    }
  }

  const progressPct = Math.round(((current + 1) / total) * 100)

  return (
    <section className="space-y-5">
      {phase === 'active' && (
        <>
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--ink-faint)]">
                Question {current + 1} of {total}
              </span>
              <span className="text-xs font-medium text-[var(--ink-faint)]">answered {answerCount}/{total}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--line)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                {CATEGORY_LABEL[item.category]}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${DIFFICULTY_STYLE[item.difficulty]}`}>
                {item.difficulty}
              </span>
              <span className="rounded-full bg-[var(--line)] px-2.5 py-0.5 text-xs text-[var(--ink-soft)]">{item.skill}</span>
              {item.page && (
                <span className="rounded-full bg-[var(--line)] px-2.5 py-0.5 text-xs text-[var(--ink-faint)]">
                  page {item.page}
                </span>
              )}
            </div>

            <div className="mt-5">
              <QuestionBody item={item} answer={answeredCurrent} onAnswer={setAnswer} />
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line-strong)] px-4 py-2.5 text-sm font-semibold text-[var(--ink-soft)] transition-colors hover:bg-[var(--line)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <IconChevronLeft size={16} />
                Previous
              </button>
              {!isAnswered && (
                <span className="hidden text-xs text-[var(--ink-faint)] sm:block">
                  {current === total - 1 ? 'Review and submit when you\u2019re ready.' : 'Pick an answer to continue.'}
                </span>
              )}
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow"
              >
                {current === total - 1 ? 'Review & submit' : 'Next'}
                {current !== total - 1 && <IconChevronRight size={16} />}
              </button>
            </div>
          </div>
        </>
      )}

      {phase === 'review' && (
        <div className="rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-5 sm:p-7">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--ink-faint)]">
            <IconLayers size={15} />
            Review before you submit
          </h3>
          <p className="mt-1 text-xs text-[var(--ink-faint)]">Jump to any question to change your answer.</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {quiz.questions.map((q, i) => {
              const a = answers[i]
              const done = a !== undefined && a !== ''
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    setCurrent(i)
                    setPhase('active')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  aria-label={`go to question ${i + 1}`}
                  className={`grid size-10 place-items-center rounded-lg border text-sm font-semibold transition-colors ${
                    done
                      ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                      : 'border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-faint)] hover:border-accent-400'
                  }`}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>

          {answerCount < total && (
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              <IconRotate size={14} />
              {total - answerCount} unanswered question(s).
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={submit}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow"
            >
              <IconTarget size={16} />
              Submit quiz
            </button>
            <button
              type="button"
              onClick={retake}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line-strong)] px-4 py-2.5 text-sm font-semibold text-[var(--ink-soft)] transition-colors hover:bg-[var(--line)]"
            >
              <IconHome size={15} />
              Start over
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

function QuestionBody({
  item,
  answer,
  onAnswer,
}: {
  item: UnitQuizItem
  answer: AnswerValue | undefined
  onAnswer: (value: AnswerValue) => void
}) {
  const q = item.question

  if (q.kind === 'true-false') {
    return (
      <div>
        <p className="text-base font-medium leading-relaxed sm:text-lg">{q.statement}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-sm">
          {([true, false] as const).map((val) => {
            const isSel = answer === val
            return (
              <button
                key={String(val)}
                type="button"
                onClick={() => onAnswer(val)}
                aria-pressed={isSel}
                className={`rounded-xl border-2 px-4 py-3.5 text-center text-sm font-bold transition-all sm:text-base ${
                  isSel
                    ? 'border-brand-500 bg-brand-50 text-brand-800 shadow-sm dark:bg-brand-950 dark:text-brand-200'
                    : 'border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-brand-300 hover:bg-brand-50/30'
                }`}
              >
                {val ? 'True' : 'False'}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (q.kind === 'fill-blank') {
    return (
      <div>
        <p className="text-base font-medium leading-relaxed sm:text-lg">
          {q.before} <span className="mx-1 rounded-md bg-[var(--line)] px-2 py-0.5" aria-hidden>___</span> {q.after}
        </p>
        <input
          type="text"
          value={typeof answer === 'string' ? answer : ''}
          onChange={(e) => onAnswer(e.target.value)}
          placeholder={'Type your answer\u2026'}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="your answer"
          className="mt-4 w-full max-w-sm rounded-xl border border-[var(--line-strong)] bg-[var(--surface)] px-4 py-3 text-base text-[var(--ink)] outline-none transition-colors focus:border-brand-500"
        />
      </div>
    )
  }

  return (
    <div>
      <p className="text-base font-medium leading-relaxed sm:text-lg">{q.prompt}</p>
      <div className="mt-4 space-y-2.5">
        {q.options.map((opt, oi) => {
          const isSel = answer === oi
          return (
            <button
              key={oi}
              type="button"
              onClick={() => onAnswer(oi)}
              aria-pressed={isSel}
              className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition-all sm:text-base ${
                isSel
                  ? 'border-brand-500 bg-brand-50 text-[var(--ink)] shadow-sm dark:bg-brand-950/40'
                  : 'border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-brand-300 hover:bg-brand-50/30'
              }`}
            >
              <span
                className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                  isSel ? 'bg-brand-600 text-white' : 'bg-[var(--line)] text-[var(--ink-faint)]'
                }`}
              >
                {LETTERS[oi]}
              </span>
              <span className="min-w-0">{opt.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}