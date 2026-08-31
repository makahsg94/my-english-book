import { useEffect, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUnit, nav } from '../content/book'
import { useProgress } from '../lib/appContext'
import Blocks from '../components/Blocks'
import PrevNext from '../components/PrevNext'
import { IconChevronRight, IconHome, IconList, IconTarget, IconVideo, IconVolume } from '../components/Icons'

export default function LessonPage() {
  const { unitId, lessonId } = useParams()
  const unit = unitId ? getUnit(unitId) : undefined
  const lesson = unit?.lessons.find((l) => l.id === lessonId)
  const progress = useProgress()
  const navigate = useNavigate()

  const navData = useMemo(
    () => (unitId && lesson ? nav(unitId, lesson.id) : { prev: undefined, next: undefined }),
    [unitId, lesson],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return
      if (e.key === 'ArrowRight' && navData.next?.unitId && navData.next.lessonId) {
        e.preventDefault()
        navigate(`/unit/${navData.next.unitId}/lesson/${navData.next.lessonId}`)
      } else if (e.key === 'ArrowLeft' && navData.prev?.unitId && navData.prev.lessonId) {
        e.preventDefault()
        navigate(`/unit/${navData.prev.unitId}/lesson/${navData.prev.lessonId}`)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, navData])

  if (!unit || !lesson || !unitId) {
    return (
      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-8 text-center">
        <p className="text-[var(--ink-soft)]">Lesson not found.</p>
        <Link to="/book" className="mt-2 inline-block text-sm font-medium text-brand-600">
          Back to the book map
        </Link>
      </div>
    )
  }

  const unitLabel = unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`
  const complete = progress.isLessonComplete(lesson.id)
  const hasVideo = lesson.blocks.some((b) => b.type === 'video')
  const hasAudio = lesson.blocks.some((b) => b.type === 'audio')

  return (
    <div className="fade-up mx-auto max-w-3xl">
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-[var(--ink-faint)]">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
          <IconHome size={14} /> Home
        </Link>
        <IconChevronRight size={13} className="text-[var(--ink-faint)]" />
        <Link to={`/unit/${unit.id}`} className="hover:text-[var(--ink)]">
          {unitLabel}
        </Link>
        <IconChevronRight size={13} />
        <span className="text-[var(--ink)]">{lesson.code}</span>
      </nav>

      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-300">
          {unitLabel} {'\u00b7'} {unit.title}
        </p>
        <h1 className="mt-1 flex flex-wrap items-center gap-3 text-3xl font-bold">
          {lesson.code !== 'Review' && (
            <span className="rounded-lg bg-brand-600 px-2.5 py-0.5 text-lg font-bold text-white">{lesson.code}</span>
          )}
          {lesson.title}
        </h1>
        {lesson.labels && (
          <div className="mt-3 flex flex-wrap gap-2 text-[13px]">
            {lesson.labels.grammar && (
              <span className="rounded-full bg-[var(--line)] px-3 py-1 text-[var(--ink-soft)]">{lesson.labels.grammar}</span>
            )}
            {lesson.labels.vocabulary && (
              <span className="rounded-full bg-[var(--line)] px-3 py-1 text-[var(--ink-soft)]">{lesson.labels.vocabulary}</span>
            )}
            {lesson.labels.pronunciation && (
              <span className="rounded-full bg-[var(--line)] px-3 py-1 text-[var(--ink-soft)]">{lesson.labels.pronunciation}</span>
            )}
            {lesson.labels.skills && (
              <span className="rounded-full bg-accent-50 px-3 py-1 text-accent-700 dark:bg-accent-950 dark:text-accent-300">
                {lesson.labels.skills}
              </span>
            )}
          </div>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--ink-faint)]">
          <span>
            Pages {lesson.pages[0]}{'\u2013'}{lesson.pages[1]}
          </span>
          {hasAudio && (
            <span className="inline-flex items-center gap-1">
              <IconVolume size={13} /> audio
            </span>
          )}
          {hasVideo && (
            <span className="inline-flex items-center gap-1">
              <IconVideo size={13} /> video
            </span>
          )}
          <button
            type="button"
            onClick={() => (complete ? progress.toggleLessonComplete(lesson.id) : progress.markLessonComplete(lesson.id))}
            className={`ml-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-medium transition-colors ${
              complete
                ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                : 'border-[var(--line-strong)] text-[var(--ink-soft)] hover:border-brand-400'
            }`}
          >
            {complete ? '\u2713 Completed' : 'Mark as done'}
          </button>
        </div>
      </header>

      <Blocks blocks={lesson.blocks} />

      {lesson.objectives && lesson.objectives.length > 0 && (
        <section className="mt-6 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--ink-faint)]">
            <IconTarget size={14} />
            Lesson aims
          </h3>
          <ul className="space-y-1 text-sm">
            {lesson.objectives.map((o, i) => (
              <li key={i} className="flex items-start gap-2">
                <IconList size={14} className="mt-1 shrink-0 text-brand-600" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <PrevNext unitId={unit.id} lessonId={lesson.id} />
      <p className="mt-3 text-center text-[11px] text-[var(--ink-faint)]">Tip: use the {'\u2190'} and {'\u2192'} arrow keys to move between lessons</p>
    </div>
  )
}