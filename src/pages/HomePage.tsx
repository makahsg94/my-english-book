import { Link } from 'react-router-dom'
import { BOOK, flattenLessons } from '../content/book'
import { pageImageUrl } from '../lib/images'
import { useProgress } from '../lib/appContext'
import { IconBook, IconCheck, IconChevronRight, IconClock, IconGrid } from '../components/Icons'

export default function HomePage() {
  const progress = useProgress()
  const lessons = flattenLessons()
  const doneCount = lessons.filter((f) => progress.isLessonComplete(f.lesson.id)).length
  const pct = Math.round((doneCount / Math.max(1, lessons.length)) * 100)

  const continueTarget = progress.state.lastUnit && progress.state.lastLesson
    ? `/unit/${progress.state.lastUnit}/lesson/${progress.state.lastLesson}`
    : null

  return (
    <div className="space-y-8 fade-up">
      <section className="grid gap-6 lg:grid-cols-[1fr_300px]">
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
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              <IconBook size={17} />
              Browse the book
            </Link>
            {continueTarget && (
              <Link
                to={continueTarget}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--line-strong)] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--line)]"
              >
                <IconClock size={16} />
                Continue where you stopped
              </Link>
            )}
          </div>
          <div className="mt-6 max-w-sm">
            <div className="mb-1 flex items-center justify-between text-xs text-[var(--ink-faint)]">
              <span>Lessons completed</span>
              <span>
                {doneCount} / {lessons.length} ({pct}%)
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--line)]">
              <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
        <div className="flex items-start justify-center">
          <img
            src={pageImageUrl(BOOK.coverPage)}
            alt="Speakout A2 Student's Book cover"
            className="w-56 rounded-xl border border-[var(--line)] shadow-lg sm:w-64"
          />
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <IconGrid size={18} className="text-brand-600" />
            Units
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BOOK.units.map((unit) => {
            const unitDone = unit.lessons.filter((l) => progress.isLessonComplete(l.id)).length
            return (
              <Link
                key={unit.id}
                to={`/unit/${unit.id}`}
                className="group overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-3 p-4">
                  <img
                    src={pageImageUrl(unit.overviewPage + 2)}
                    alt={`Unit ${unit.number} opener`}
                    loading="lazy"
                    className="h-16 w-12 rounded-md border border-[var(--line)] object-cover object-top"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
                      {unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`}
                    </p>
                    <h3 className="truncate text-lg font-bold">
                      {unit.phrase ?? unit.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-[var(--ink-soft)]">{unit.intro}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--line)] px-4 py-2 text-xs text-[var(--ink-faint)]">
                  <span>
                    {unitDone}/{unit.lessons.length} done
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-brand-600 transition-transform group-hover:translate-x-0.5">
                    Open <IconChevronRight size={12} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-brand-200 bg-brand-50 p-5 dark:border-brand-800 dark:bg-brand-950">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-brand-800 dark:text-brand-200">
              <IconCheck size={18} />
              Your study plan
            </h2>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">
              Work through units in order, or jump straight to a grammar or vocabulary bank.
            </p>
          </div>
          <Link to="/bank/grammar" className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            Open the Grammar Bank
          </Link>
        </div>
      </section>
    </div>
  )
}