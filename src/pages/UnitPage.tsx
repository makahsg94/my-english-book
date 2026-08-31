import { Link, useParams } from 'react-router-dom'
import { getUnit } from '../content/book'
import { useProgress } from '../lib/appContext'
import { PageFigure } from '../components/PageFigure'
import { IconChevronRight, IconVideo, IconHome, IconCheck, IconList, IconTarget } from '../components/Icons'

export default function UnitPage() {
  const { unitId } = useParams()
  const unit = unitId ? getUnit(unitId) : undefined
  const progress = useProgress()

  if (!unit) return null

  const unitLabel = unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`
  const done = unit.lessons.filter((l) => progress.isLessonComplete(l.id)).length
  const pct = Math.round((done / Math.max(1, unit.lessons.length)) * 100)

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
            <div className="h-2.5 overflow-hidden rounded-full bg-[var(--line)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
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

      <section>
        <ol className="space-y-2">
          {unit.lessons.map((lesson) => {
            const isDone = progress.isLessonComplete(lesson.id)
            return (
              <li key={lesson.id}>
                <Link
                  to={`/unit/${unit.id}/lesson/${lesson.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 transition-all hover:border-brand-300 hover:shadow-sm dark:hover:border-brand-700"
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-xl text-sm font-bold transition-all ${
                      isDone
                        ? 'bg-brand-600 text-white shadow-sm'
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
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}
