import { Link } from 'react-router-dom'
import { BOOK, flattenLessons } from '../content/book'
import { pageImageUrl } from '../lib/images'
import { useProgress } from '../lib/appContext'
import { IconBook, IconCheck, IconClock, IconGrid } from '../components/Icons'

export default function HomePage() {
  const progress = useProgress()
  const lessons = flattenLessons()
  const doneCount = lessons.filter((f) => progress.isLessonComplete(f.lesson.id)).length
  const pct = Math.round((doneCount / Math.max(1, lessons.length)) * 100)

  const continueTarget =
    progress.state.lastUnit && progress.state.lastLesson
      ? `/unit/${progress.state.lastUnit}/lesson/${progress.state.lastLesson}`
      : null

  return (
    <div className="space-y-10 fade-up">
      <section className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col justify-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-300">
            {BOOK.edition} {'\u00b7'} Level {BOOK.level}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {BOOK.title}
            <span className="mt-1 block text-2xl text-[var(--ink-soft)] sm:text-3xl">
              {BOOK.subtitle}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
            {BOOK.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-md"
            >
              <IconBook size={17} />
              Browse the book
            </Link>
            {continueTarget && (
              <Link
                to={continueTarget}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--line-strong)] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--line)]"
              >
                <IconClock size={16} />
                Continue where you stopped
              </Link>
            )}
          </div>
          <div className="mt-8 max-w-sm">
            <div className="mb-1.5 flex items-center justify-between text-xs text-[var(--ink-faint)]">
              <span className="font-medium">Lessons completed</span>
              <span className="font-semibold text-brand-700 dark:text-brand-300">
                {doneCount} / {lessons.length} ({pct}%)
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-[var(--line)]">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
        <div className="flex items-start justify-center">
          <img
            src={pageImageUrl(BOOK.coverPage)}
            alt="Speakout A2 Student's Book cover"
            className="w-56 rounded-2xl border border-[var(--line)] shadow-xl sm:w-64"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <IconGrid size={18} className="text-brand-600" />
          Units
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BOOK.units.map((unit) => {
            const unitDone = unit.lessons.filter((l) => progress.isLessonComplete(l.id)).length
            const unitPct = Math.round((unitDone / Math.max(1, unit.lessons.length)) * 100)
            return (
              <Link
                key={unit.id}
                to={`/unit/${unit.id}`}
                className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] transition-all hover:border-brand-300 hover:shadow-md dark:hover:border-brand-700"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={pageImageUrl(unit.overviewPage + 2)}
                    alt={`Unit ${unit.number} opener`}
                    loading="lazy"
                    className="h-28 w-full border-b border-[var(--line)] object-cover object-top transition-transform group-hover:scale-105"
                  />
                  {unitPct === 100 && (
                    <span className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm">
                      <IconCheck size={14} />
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300">
                    {unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`}
                  </p>
                  <h3 className="mt-0.5 truncate text-base font-bold">
                    {unit.phrase ?? unit.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-[var(--ink-soft)]">{unit.intro}</p>
                  <div className="mt-3">
                    <div className="mb-1 flex justify-between text-[11px] text-[var(--ink-faint)]">
                      <span>{unitDone}/{unit.lessons.length} lessons</span>
                      <span>{unitPct}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[var(--line)]">
                      <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${unitPct}%` }} />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-accent-50 p-6 dark:border-brand-800 dark:from-brand-950/60 dark:to-accent-950/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-800 dark:text-brand-200">
              <IconCheck size={18} />
              Your study plan
            </h2>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">
              Work through units in order, or jump straight to a grammar or vocabulary bank.
            </p>
          </div>
          <Link
            to="/bank/grammar"
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-md"
          >
            Open the Grammar Bank
          </Link>
        </div>
      </section>
    </div>
  )
}
