import { Link, useParams } from 'react-router-dom'
import { BOOK, getUnit } from '../content/book'
import { getUnitQuiz } from '../content/quizzes'
import { useProgress } from '../lib/appContext'
import { PageFigure } from '../components/PageFigure'
import Reveal from '../components/Reveal'
import AnimatedBar from '../components/AnimatedBar'
import { IconChevronRight, IconVideo, IconHome, IconCheck, IconList, IconTarget } from '../components/Icons'

export default function UnitPage() {
  const { unitId } = useParams()
  const unit = unitId ? getUnit(unitId) : undefined
  const progress = useProgress()

  if (!unit) return null

  const unitIndex = BOOK.units.findIndex((u) => u.id === unit.id)
  const nextUnit = unitIndex >= 0 ? BOOK.units[unitIndex + 1] : undefined

  const unitLabel = unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`
  const done = unit.lessons.filter((l) => progress.isLessonComplete(l.id)).length
  const pct = Math.round((done / Math.max(1, unit.lessons.length)) * 100)
  const quiz = getUnitQuiz(unit.id)
  const quizBest = quiz ? progress.bestQuiz(quiz.id) : undefined

  return (
    <div className="fade-up mx-auto max-w-3xl space-y-8">
      <nav className="flex items-center gap-1 text-sm text-[var(--ink-faint)]">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
          <IconHome size={14} /> Home
        </Link>
        <IconChevronRight size={13} />
        <span className="text-[var(--ink)]">{unitLabel}</span>
      </nav>

      <header className="grid items-start gap-5 sm:grid-cols-[1fr_220px]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300">
            {unitLabel}
          </p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight">{unit.phrase ?? unit.title}</h1>
          {unit.intro && <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">{unit.intro}</p>}

          {unit.objectives && unit.objectives.length > 0 && (
            <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
                <IconTarget size={12} />
                Unit objectives
              </p>
              <ul className="space-y-1">
                {unit.objectives.map((o, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--ink-soft)]">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                      {i + 1}
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 max-w-xs">
            <div className="mb-1.5 flex justify-between text-xs text-[var(--ink-faint)]">
              <span className="font-medium">Progress</span>
              <span className="font-semibold text-brand-700 dark:text-brand-300">
                {done}/{unit.lessons.length} ({pct}%)
              </span>
            </div>
            <AnimatedBar value={pct} className="h-2.5" bar="bg-gradient-to-r from-brand-500 to-accent-500" />
          </div>
        </div>
        <PageFigure image={{ pdf: unit.overviewPage + 2, bookPage: unit.overviewPage }} />
      </header>

      <div className="section-divider">
        <span>
          <IconList size={12} className="mr-1 inline" />
          Lessons
        </span>
      </div>

      {quiz && (
        <Reveal delay={40}>
          <Link
            to={`/unit/${unit.id}/quiz`}
            className="group flex items-center gap-4 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-accent-50 p-4 transition-all hover:border-brand-400 hover:shadow-sm dark:border-brand-800 dark:from-brand-950/70 dark:to-accent-950/70 dark:hover:border-brand-600"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <IconTarget size={22} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="font-semibold">Take the {unitLabel} Quiz</span>
                {quizBest && (
                  <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[11px] font-bold text-white">
                    best {Math.round((quizBest.correct / Math.max(1, quizBest.total)) * 100)}%
                  </span>
                )}
              </span>
              <span className="mt-0.5 block truncate text-sm text-[var(--ink-soft)]">
                {quiz.questions.length} questions {quiz.skills.slice(0, 3).join(' \u00b7 ')}
              </span>
            </span>
            <IconChevronRight
              size={18}
              className="shrink-0 text-brand-600 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      )}

      <section>
        <ol className="space-y-2">
          {unit.lessons.map((lesson, i) => {
            const isDone = progress.isLessonComplete(lesson.id)
            const started = !isDone && !!progress.state.lessons[lesson.id]?.lastVisit
            return (
              <li key={lesson.id}>
                <Reveal delay={i * 45}>
                  <Link
                    to={`/unit/${unit.id}/lesson/${lesson.id}`}
                    className="group flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg dark:hover:border-brand-700"
                  >
                    <span
                      className={`relative grid size-10 shrink-0 place-items-center rounded-xl text-sm font-bold transition-all ${
                        isDone
                          ? 'bg-brand-600 text-white shadow-sm'
                          : started
                            ? 'bg-warm-100 text-warm-700 dark:bg-warm-900 dark:text-warm-100'
                            : lesson.code === 'Review'
                              ? 'bg-accent-100 text-accent-700 dark:bg-accent-950 dark:text-accent-300'
                              : 'bg-[var(--line)] text-[var(--ink-soft)] group-hover:bg-brand-100 group-hover:text-brand-700 dark:group-hover:bg-brand-900'
                      }`}
                    >
                      {isDone ? <IconCheck size={18} /> : lesson.code !== 'Review' ? lesson.code : '\u2605'}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold">{lesson.title}</span>
                      <span className="mt-0.5 flex items-center gap-2 truncate text-xs text-[var(--ink-faint)]">
                        {lesson.labels?.grammar || lesson.labels?.skills || 'Review'}
                        {lesson.blocks.some((b) => b.type === 'video') && (
                          <span className="inline-flex items-center gap-0.5 text-accent-600">
                            <IconVideo size={12} /> video
                          </span>
                        )}
                        {lesson.blocks.some((b) => b.type === 'audio') && (
                          <span className="inline-flex items-center gap-0.5">audio</span>
                        )}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-md bg-[var(--line)] px-2 py-0.5 text-[11px] font-medium text-[var(--ink-faint)]">
                      p{lesson.pages[0]}
                    </span>
                    <IconChevronRight
                      size={16}
                      className="shrink-0 text-[var(--ink-faint)] transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600"
                    />
                  </Link>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </section>

      {nextUnit && (
        <Reveal delay={80}>
          <Link
            to={`/unit/${nextUnit.id}`}
            className="group flex items-center gap-4 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-4 transition-all hover:border-brand-400 hover:shadow-sm"
          >
            <span className="min-w-0 flex-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Next unit</span>
              <span className="mt-0.5 block truncate font-semibold">
                {nextUnit.number === 0 ? 'Lead-in' : `Unit ${nextUnit.number}`}: {nextUnit.phrase ?? nextUnit.title}
              </span>
            </span>
            <IconChevronRight
              size={18}
              className="shrink-0 text-brand-600 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      )}
    </div>
  )
}
