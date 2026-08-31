import { Link, useParams } from 'react-router-dom'
import { getUnit } from '../content/book'
import { useProgress } from '../lib/appContext'
import { PageFigure } from '../components/PageFigure'
import { IconChevronRight, IconVideo, IconHome, IconCheck } from '../components/Icons'

export default function UnitPage() {
  const { unitId } = useParams()
  const unit = unitId ? getUnit(unitId) : undefined
  const progress = useProgress()

  if (!unit) return null

  const unitLabel = unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`
  const done = unit.lessons.filter((l) => progress.isLessonComplete(l.id)).length

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
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-300">
            {unitLabel}
          </p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight">{unit.phrase ?? unit.title}</h1>
          {unit.intro && <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">{unit.intro}</p>}
          {unit.objectives && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {unit.objectives.map((o, i) => (
                <li key={i} className="rounded-full bg-[var(--line)] px-3 py-1 text-xs text-[var(--ink-soft)]">
                  {o}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 max-w-xs">
            <div className="mb-1 flex justify-between text-xs text-[var(--ink-faint)]">
              <span>Progress</span>
              <span>
                {done}/{unit.lessons.length}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--line)]">
              <div
                className="h-full rounded-full bg-brand-500 transition-all"
                style={{ width: `${Math.round((done / Math.max(1, unit.lessons.length)) * 100)}%` }}
              />
            </div>
          </div>
        </div>
        <PageFigure image={{ pdf: unit.overviewPage + 2, bookPage: unit.overviewPage }} />
      </header>

      <section>
        <ol className="space-y-2">
          {unit.lessons.map((lesson) => {
            const isDone = progress.isLessonComplete(lesson.id)
            return (
              <li key={lesson.id}>
                <Link
                  to={`/unit/${unit.id}/lesson/${lesson.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 transition-shadow hover:shadow-md"
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-lg text-sm font-bold ${
                      isDone
                        ? 'bg-brand-600 text-white'
                        : lesson.code === 'Review'
                          ? 'bg-accent-100 text-accent-700 dark:bg-accent-950 dark:text-accent-300'
                          : 'bg-[var(--line)] text-[var(--ink-soft)]'
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
                  <span className="shrink-0 text-xs text-[var(--ink-faint)]">
                    p{lesson.pages[0]}
                  </span>
                  <IconChevronRight
                    size={16}
                    className="shrink-0 text-[var(--ink-faint)] transition-transform group-hover:translate-x-0.5"
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