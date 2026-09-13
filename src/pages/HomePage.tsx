import { Link } from 'react-router-dom'
import { BOOK, flattenLessons, getUnit } from '../content/book'
import { getUnitQuiz } from '../content/quizzes'
import { pageImageUrl } from '../lib/images'
import { useProgress } from '../lib/appContext'
import Reveal from '../components/Reveal'
import AnimatedBar from '../components/AnimatedBar'
import CoverStack from '../components/CoverStack'
import Parallax from '../components/Parallax'
import { IconBook, IconCheck, IconChevronRight, IconClock, IconGrid, IconTarget } from '../components/Icons'

export default function HomePage() {
  const progress = useProgress()
  const lessons = flattenLessons()
  const doneCount = lessons.filter((f) => progress.isLessonComplete(f.lesson.id)).length
  const pct = Math.round((doneCount / Math.max(1, lessons.length)) * 100)

  const lastUnit = progress.state.lastUnit ? getUnit(progress.state.lastUnit) : undefined
  const lastLesson =
    lastUnit && progress.state.lastLesson
      ? lastUnit.lessons.find((l) => l.id === progress.state.lastLesson)
      : undefined
  const lastUnitQuiz = lastUnit && progress.state.lastUnit ? getUnitQuiz(progress.state.lastUnit) : undefined

  const continueTarget =
    progress.state.lastUnit && progress.state.lastLesson
      ? `/unit/${progress.state.lastUnit}/lesson/${progress.state.lastLesson}`
      : null
  const firstLesson = lessons[0]
  const startTarget = continueTarget ?? (firstLesson ? `/unit/${firstLesson.unit.id}/lesson/${firstLesson.lesson.id}` : '/book')

  const deckCovers = BOOK.units.map((unit) => ({
    unitId: unit.id,
    number: unit.number,
    title: unit.phrase ?? unit.title,
    subtitle: unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`,
    img: pageImageUrl(unit.overviewPage + 2),
    done: unit.lessons.every((l) => progress.isLessonComplete(l.id)),
  }))

  return (
    <div className="fade-up space-y-14">
      <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="flex flex-col justify-center">
          <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
            <span aria-hidden className="size-1.5 rounded-full bg-brand-500" />
            {BOOK.edition} {'\u00b7'} Level {BOOK.level}
          </p>
          <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
            {BOOK.title}
            <span className="mt-2 block text-2xl font-medium text-[var(--ink-soft)] sm:text-3xl">
              {BOOK.subtitle}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
            {BOOK.description}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to={startTarget}
              className="tactile inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-600/20 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg"
            >
              <IconBook size={17} />
              {continueTarget ? 'Continue reading' : 'Start reading'}
            </Link>
            <Link
              to="/book"
              className="tactile inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-6 py-3 text-sm font-medium transition-colors hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
            >
              <IconGrid size={16} />
              Explore chapters
            </Link>
          </div>
          <div className="mt-9 max-w-sm">
            <div className="mb-1.5 flex items-center justify-between text-xs text-[var(--ink-faint)]">
              <span className="font-medium">Lessons completed</span>
              <span className="font-semibold text-brand-700 dark:text-brand-300">
                {doneCount} / {lessons.length} ({pct}%)
              </span>
            </div>
            <AnimatedBar value={pct} className="h-2.5" bar="bg-gradient-to-r from-brand-500 to-accent-500" />
          </div>
        </div>
        <div className="flex items-center justify-center lg:justify-end">
          <CoverStack covers={deckCovers} />
        </div>
      </section>

      {lastUnit && lastLesson && (
        <Reveal delay={80}>
          <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <IconClock size={18} className="text-brand-600" />
                Continue learning
              </h2>
              <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--ink-soft)]">
                {lastUnit.number === 0 ? 'Lead-in' : `Unit ${lastUnit.number}`} · {lastLesson.title}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                to={continueTarget ?? `/unit/${lastUnit.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md"
              >
                {lastUnit.lessons[lastUnit.lessons.length - 1]?.id === lastLesson.id ? 'Review this lesson' : 'Go to lesson'}
              </Link>
              {lastUnitQuiz && (
                <Link
                  to={`/unit/${lastUnit.id}/quiz`}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-300 px-5 py-2.5 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50 dark:border-brand-800 dark:text-brand-300 dark:hover:bg-brand-950"
                >
                  <IconTarget size={15} />
                  Unit quiz
                </Link>
              )}
            </div>
          </section>
        </Reveal>
      )}

      <section>
        <div className="mb-5 flex items-end justify-between">
          <h2 className="display text-3xl">Chapters</h2>
          <Link to="/book" className="group inline-flex items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-300">
            Book map
            <IconChevronRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {BOOK.units.map((unit, i) => {
            const unitDone = unit.lessons.filter((l) => progress.isLessonComplete(l.id)).length
            const unitPct = Math.round((unitDone / Math.max(1, unit.lessons.length)) * 100)
            return (
              <Reveal key={unit.id} delay={i * 60}>
                <Link
                  to={`/unit/${unit.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] transition-all duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:border-[var(--line)] dark:hover:border-brand-700"
                >
                  <div className="relative overflow-hidden">
                    <Parallax strength={20} className="h-32">
                      <img
                        src={pageImageUrl(unit.overviewPage + 2)}
                        alt={`Unit ${unit.number} opener`}
                        loading="lazy"
                        className="absolute inset-x-0 -top-5 -bottom-5 h-[calc(100%+2.5rem)] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </Parallax>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                    />
                    <span className="absolute left-4 top-3 font-display text-5xl font-bold text-white drop-shadow-md">
                      {unit.number === 0 ? '0' : String(unit.number)}
                    </span>
                    {unitPct === 100 && (
                      <span className="absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-brand-600 text-white shadow-sm">
                        <IconCheck size={14} />
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700 dark:text-brand-300">
                      {unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`}
                    </p>
                    <h3 className="mt-1 line-clamp-1 font-display text-lg font-semibold tracking-tight">
                      {unit.phrase ?? unit.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs text-[var(--ink-soft)]">{unit.intro}</p>
                    <div className="mt-3">
                      <div className="mb-1 flex justify-between text-[11px] text-[var(--ink-faint)]">
                        <span>{unitDone}/{unit.lessons.length} lessons</span>
                        <span>{unitPct}%</span>
                      </div>
                      <AnimatedBar value={unitPct} className="h-1.5" bar="bg-brand-500" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Reveal delay={120}>
        <section className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-accent-50 p-6 dark:border-brand-800 dark:from-brand-950/60 dark:to-accent-950/60">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-brand-800 dark:text-brand-200">
                <IconCheck size={18} />
                Your study plan
              </h2>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                Work through units in order, or jump straight to a bank.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {BOOK.banks.map((bank) => (
                <Link
                  key={bank.id}
                  to={`/bank/${bank.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm transition-all hover:bg-brand-600 hover:text-white dark:border-brand-700 dark:bg-brand-950 dark:text-brand-200 dark:hover:bg-brand-700"
                >
                  {bank.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  )
}
