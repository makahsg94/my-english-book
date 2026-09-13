import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUnit } from '../content/book'
import { getUnitQuiz } from '../content/quizzes'
import { useProgress } from '../lib/appContext'
import { UnitQuiz } from '../components/UnitQuiz'
import { IconChevronRight, IconHome } from '../components/Icons'

export default function UnitQuizPage() {
  const { unitId } = useParams()
  const unit = unitId ? getUnit(unitId) : undefined
  const quiz = unitId ? getUnitQuiz(unitId) : undefined
  const progress = useProgress()

  useEffect(() => {
    if (unitId) progress.recordVisit(unitId)
  }, [unitId]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!unit || !quiz) {
    return (
      <div className="fade-up mx-auto max-w-md py-20 text-center">
        <p className="text-6xl font-bold text-brand-300">No quiz</p>
        <h1 className="mt-2 text-xl font-semibold">This unit has no quiz yet</h1>
        <Link
          to={unitId ? `/unit/${unitId}` : '/'}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <IconHome size={16} />
          Back to the unit
        </Link>
      </div>
    )
  }

  const unitLabel = unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`

  return (
    <div className="fade-up mx-auto max-w-3xl space-y-6">
      <nav className="flex items-center gap-1 text-sm text-[var(--ink-faint)]">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
          <IconHome size={14} /> Home
        </Link>
        <IconChevronRight size={13} />
        <Link to={`/unit/${unit.id}`} className="hover:text-[var(--ink)]">
          {unitLabel}
        </Link>
        <IconChevronRight size={13} />
        <span className="text-[var(--ink)]">Unit quiz</span>
      </nav>

      <header className="grid items-start gap-5 sm:grid-cols-[1fr_220px]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300">
            {unitLabel} assessment
          </p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight">{quiz.title}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">
            {quiz.description} No answers are revealed until you submit, and every question carries a short
            explanation for your review.
          </p>
        </div>
      </header>

      <UnitQuiz quiz={quiz} unitLabel={unitLabel} />
    </div>
  )
}