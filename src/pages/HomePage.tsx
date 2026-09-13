import { Link } from 'react-router-dom'
import { BOOK, flattenLessons } from '../content/book'
import { useProgress } from '../lib/appContext'
import { levelProgress, achievementsFor } from '../lib/progress'
import Reveal from '../components/Reveal'
import AnimatedBar from '../components/AnimatedBar'
import LineMap from '../components/LineMap'
import { IconBook, IconCheck, IconFlame, IconLayers } from '../components/Icons'

export default function HomePage() {
  const progress = useProgress()
  const lessons = flattenLessons()
  const doneCount = lessons.filter((f) => progress.isLessonComplete(f.lesson.id)).length
  const pct = Math.round((doneCount / Math.max(1, lessons.length)) * 100)

  const continueTarget =
    progress.state.lastUnit && progress.state.lastLesson
      ? `/unit/${progress.state.lastUnit}/lesson/${progress.state.lastLesson}`
      : null
  const firstLesson = lessons[0]
  const startTarget = continueTarget ?? (firstLesson ? `/unit/${firstLesson.unit.id}/lesson/${firstLesson.lesson.id}` : '/book')

  const lp = levelProgress(progress.state.xp)
  const achievements = achievementsFor(progress.state, lessons.length)
  const earnedCount = achievements.filter((a) => a.earned).length

  return (
    <div className="fade-up space-y-16">
      {/* ---- 1. Title page ---- */}
      <section className="title-page mx-auto max-w-2xl pt-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--ink-faint)]">
          {BOOK.edition} {'\u00b7'} Level {BOOK.level}
        </p>
        <h1 className="display mt-4 text-7xl leading-none tracking-tight sm:text-8xl">{BOOK.title}</h1>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
          {BOOK.subtitle}
        </p>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
          {BOOK.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={startTarget}
            className="page-turn bg-brand-600 text-white hover:text-white"
          >
            <IconBook size={16} />
            {continueTarget ? 'Continue reading' : 'Start reading'}
          </Link>
          <Link to="/book" className="page-turn">
            Contents of this course
          </Link>
        </div>

        <div className="mx-auto mt-9 max-w-md">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 font-bold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                Level {lp.level}
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--ink-soft)]">
                <IconFlame size={14} className="text-orange-500" />
                {progress.state.streak} day{progress.state.streak === 1 ? '' : 's'} streak
              </span>
            </div>
            <p className="mt-3 flex items-center justify-between text-xs text-[var(--ink-faint)]">
              <span className="font-medium">{progress.state.xp} XP</span>
              <span>
                {lp.current}/{lp.target} to level {lp.level + 1}
              </span>
            </p>
            <div className="mt-1.5">
              <AnimatedBar value={lp.pct} className="h-2.5" bar="bg-gradient-to-r from-brand-500 via-accent-500 to-warm-500" />
            </div>
            <p className="mt-3 text-[11px] text-[var(--ink-faint)]">
              {doneCount} of {lessons.length} lessons {'\u00b7'} {pct}% of the course
            </p>
          </div>
        </div>
      </section>

      {/* ---- 2. The line: the whole course as one ride ---- */}
      <section>
        <LineMap />
      </section>

      {/* ---- 3. Achievements ---- */}
      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="display text-2xl tracking-tight">Achievements</h2>
          <span className="section-label">{earnedCount}/{achievements.length} unlocked</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 30}>
              <div
                className={`flex h-full flex-col items-center gap-1 rounded-2xl border p-3 text-center transition-all ${
                  a.earned
                    ? 'border-brand-300 bg-brand-50 dark:border-brand-800 dark:bg-brand-950'
                    : 'border-dashed border-[var(--line-strong)] bg-[var(--surface)] opacity-60'
                }`}
              >
                <span className={`text-2xl ${a.earned ? 'pop' : 'opacity-40 grayscale'}`} aria-hidden>
                  {a.emoji}
                </span>
                <span className={`text-[12px] font-bold ${a.earned ? 'text-brand-800 dark:text-brand-200' : 'text-[var(--ink-faint)]'}`}>
                  {a.title}
                </span>
                <span className="text-[10px] leading-tight text-[var(--ink-faint)]">{a.desc}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- 3. Printed contents ---- */}
      <section className="book-page px-6 py-8 sm:px-10">
        <div className="running-head">
          <span>
            {BOOK.title} {'\u00b7'} Level {BOOK.level}
          </span>
          <span className="rh-right">Contents</span>
        </div>

        <ol className="space-y-3">
          {BOOK.units.map((unit, i) => {
            const unitDone = unit.lessons.filter((l) => progress.isLessonComplete(l.id)).length
            const unitPct = Math.round((unitDone / Math.max(1, unit.lessons.length)) * 100)
            return (
              <Reveal key={unit.id} delay={i * 40}>
                <li className="border-b border-[var(--line)] pb-4">
                  <Link
                    to={`/unit/${unit.id}`}
                    className="group flex items-baseline gap-4 py-1"
                  >
                    <span className="chapter-num font-display text-5xl leading-none">
                      {unit.number === 0 ? '0' : String(unit.number)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
                        {unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`}
                      </span>
                      <span className="mt-0.5 block truncate font-display text-xl font-semibold tracking-tight group-hover:text-brand-700 dark:group-hover:text-brand-300">
                        {unit.phrase ?? unit.title}
                      </span>
                    </span>
                    <span className="hidden text-xs text-[var(--ink-faint)] sm:inline">{unitPct}%</span>
                    <span className="toc-page">{unit.pages[0]}</span>
                  </Link>

                  <ul className="mt-1.5 space-y-0.5 border-l border-[var(--line)] pl-4">
                    {unit.lessons.map((lesson) => {
                      const isDone = progress.isLessonComplete(lesson.id)
                      return (
                        <li key={lesson.id}>
                          <Link
                            to={`/unit/${unit.id}/lesson/${lesson.id}`}
                            className="toc-row group truncate text-[13px]"
                          >
                            <span className="w-3 shrink-0 text-center text-[10px] leading-none">
                              {isDone ? (
                                <IconCheck size={10} className="text-brand-600" />
                              ) : (
                                <span className="text-[var(--ink-faint)]">○</span>
                              )}
                            </span>
                            <span className="min-w-0 truncate transition-colors group-hover:text-brand-700 dark:group-hover:text-brand-300">
                              {lesson.code !== 'Review' ? `${lesson.code} ` : ''}
                              {lesson.title}
                            </span>
                            <span className="toc-dots" aria-hidden />
                            <span className="toc-page shrink-0">{lesson.pages[0]}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              </Reveal>
            )
          })}
        </ol>

        <div className="mt-8 border-t border-[var(--line)] pt-5">
          <div className="flex items-baseline gap-3">
            <IconLayers size={14} className="shrink-0 self-center text-[var(--ink-faint)]" />
            <span className="font-display text-lg font-semibold tracking-tight">Reference banks</span>
            <span className="toc-dots" aria-hidden />
            <span className="toc-page">back</span>
          </div>
          <ul className="mt-2 space-y-0.5">
            {BOOK.banks.map((bank) => (
              <li key={bank.id}>
                <Link to={`/bank/${bank.id}`} className="toc-row text-[13px]">
                  <span className="w-3 shrink-0 text-[10px] text-[var(--ink-faint)]">▲</span>
                  <span className="min-w-0 truncate transition-colors hover:text-brand-700 dark:hover:text-brand-300">
                    {bank.title}
                  </span>
                  <span className="toc-dots" aria-hidden />
                  <span className="toc-page shrink-0">{bank.pages[0]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}