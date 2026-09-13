import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUnit, nav } from '../content/book'
import { getUnitQuiz } from '../content/quizzes'
import { useProgress } from '../lib/appContext'
import Blocks from '../components/Blocks'
import PrevNext from '../components/PrevNext'
import { IconChevronLeft, IconChevronRight, IconHome, IconList, IconTarget, IconVideo, IconVolume } from '../components/Icons'
import type { ContentBlock } from '../types/content'

function ReadingProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const h = el.scrollHeight - el.clientHeight
      setPct(h > 0 ? Math.min(100, (el.scrollTop / h) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="reading-progress" style={{ width: `${pct}%` }} />
}

function TableOfContents({ lesson }: { lesson: { blocks: { type: string; title?: string }[] } }) {
  const sections = useMemo(() => {
    return lesson.blocks
      .map((b, i) => {
        const label =
          b.title ||
          (b.type === 'exercise'
            ? 'Practice'
            : b.type === 'audio'
              ? 'Listen'
              : b.type === 'video'
                ? 'Watch'
                : b.type === 'pages'
                  ? 'Book Pages'
                  : null)
        if (!label || b.type === 'pages') return null
        return { i, label, type: b.type }
      })
      .filter(Boolean) as { i: number; label: string; type: string }[]
  }, [lesson])

  const [active, setActive] = useState(0)

  useEffect(() => {
    if (sections.length === 0) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).id.split('-')[1])
            if (Number.isFinite(idx)) setActive(idx)
          }
        }
      },
      { rootMargin: '-15% 0px -65% 0px' },
    )
    for (const s of sections) {
      const el = document.getElementById(`section-${s.i}`)
      if (el) obs.observe(el)
    }
    return () => obs.disconnect()
  }, [sections])

  if (sections.length < 3) return null

  const jump = (i: number) => {
    document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="sticky top-16 z-20 mb-6 rounded-xl border border-[var(--line)] bg-[var(--surface)]/90 p-3 backdrop-blur">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">On this page</p>
      <div className="flex flex-wrap gap-1.5">
        {sections.map((s) => (
          <button
            key={s.i}
            type="button"
            onClick={() => jump(s.i)}
            aria-pressed={active === s.i}
            className={`rounded-full border px-2.5 py-1 text-[12px] font-medium transition-colors ${
              active === s.i
                ? 'border-brand-500 bg-brand-600 text-white shadow-sm'
                : 'border-[var(--line)] bg-[var(--bg)] text-[var(--ink-soft)] transition-colors hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-300'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default function LessonPage() {
  const { unitId, lessonId } = useParams()
  const unit = unitId ? getUnit(unitId) : undefined
  const lesson = unit?.lessons.find((l) => l.id === lessonId)
  const progress = useProgress()
  const navigate = useNavigate()
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const navData = unitId && lessonId ? nav(unitId, lessonId) : { prev: undefined, next: undefined }
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
  }, [navigate, unitId, lessonId])

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

  const exercises = lesson.blocks.filter((b): b is Extract<ContentBlock, { type: 'exercise' }> => b.type === 'exercise')
  const exercisesDone = exercises.filter((b) => progress.bestQuiz(b.exercise.id)).length
  const unitQuiz = getUnitQuiz(unit.id)
  const isUnitLastLesson = unit.lessons[unit.lessons.length - 1]?.id === lesson.id

  const showStudyCard = exercises.length > 0 || (unitQuiz && isUnitLastLesson)

  return (
    <div ref={mainRef} className="fade-up mx-auto max-w-3xl">
      <ReadingProgress />

      <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-[var(--ink-faint)]">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
          <IconHome size={14} /> Home
        </Link>
        <IconChevronRight size={13} className="text-[var(--ink-faint)]" />
        <Link to={`/unit/${unit.id}`} className="hover:text-[var(--ink)]">
          {unitLabel}
        </Link>
        <IconChevronRight size={13} />
        <span className="text-[var(--ink)]">{lesson.title}</span>
      </nav>

      <header className="mb-8 border-b border-[var(--line)] pb-6">
        <div className="flex items-center gap-2">
          {lesson.code !== 'Review' && (
            <span className="rounded-lg bg-brand-600 px-3 py-1 text-base font-bold text-white">{lesson.code}</span>
          )}
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-300">
            {unitLabel}
          </p>
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight lg:text-4xl">{lesson.title}</h1>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">
          {unit.title} {'\u00b7'} Pages {lesson.pages[0]}{'\u2013'}{lesson.pages[1]}
        </p>

        {lesson.labels && (
          <div className="mt-4 flex flex-wrap gap-2">
            {lesson.labels.grammar && (
              <span className="section-label bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                <IconTarget size={12} />
                {lesson.labels.grammar}
              </span>
            )}
            {lesson.labels.vocabulary && (
              <span className="section-label bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300">
                <IconList size={12} />
                {lesson.labels.vocabulary}
              </span>
            )}
            {lesson.labels.pronunciation && (
              <span className="section-label bg-warm-100 text-warm-700 dark:bg-warm-900 dark:text-warm-100">
                <IconVolume size={12} />
                {lesson.labels.pronunciation}
              </span>
            )}
            {lesson.labels.skills && (
              <span className="section-label bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-100">
                <IconVideo size={12} />
                {lesson.labels.skills}
              </span>
            )}
          </div>
        )}

        {lesson.objectives && lesson.objectives.length > 0 && (
          <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">What you{'\u2019'}ll learn</p>
            <ul className="space-y-1 text-sm">
              {lesson.objectives.map((o, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                    {i + 1}
                  </span>
                  <span className="text-[var(--ink-soft)]">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--ink-faint)]">
          {hasAudio && (
            <span className="inline-flex items-center gap-1">
              <IconVolume size={13} /> Audio
            </span>
          )}
          {hasVideo && (
            <span className="inline-flex items-center gap-1">
              <IconVideo size={13} /> Video
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

      <TableOfContents lesson={lesson} />

      <Blocks blocks={lesson.blocks} />

      {showStudyCard && (
        <section className="mt-8 grid gap-3 sm:grid-cols-2">
          {exercises.length > 0 && (
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Exercises</p>
              <p className="mt-1 text-2xl font-bold tabular-nums">
                {exercisesDone}
                <span className="text-sm font-medium text-[var(--ink-faint)]"> / {exercises.length} done</span>
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--line)]">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all"
                  style={{ width: `${exercises.length > 0 ? Math.round((exercisesDone / exercises.length) * 100) : 0}%` }}
                />
              </div>
            </div>
          )}
          {unitQuiz && isUnitLastLesson && (
            <Link
              to={`/unit/${unit.id}/quiz`}
              className="group flex flex-col justify-center gap-1.5 rounded-2xl border border-brand-300 bg-brand-50 p-4 transition-all hover:border-brand-500 hover:shadow-sm dark:border-brand-800 dark:bg-brand-950"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300">
                <IconTarget size={12} /> {unitLabel} quiz
              </span>
              <span className="font-semibold">Finished this unit? Test yourself.</span>
              <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Start the quiz {'\u2192'}</span>
            </Link>
          )}
        </section>
      )}

      <div className="mt-8 text-center">
        <Link
          to={`/unit/${unit.id}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-4 py-1.5 text-sm font-medium text-[var(--ink-soft)] transition-colors hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
        >
          <IconChevronLeft size={14} /> Back to {unitLabel}
        </Link>
      </div>

      <PrevNext unitId={unit.id} lessonId={lesson.id} />
      <p className="mt-3 text-center text-[11px] text-[var(--ink-faint)]">
        Tip: use the {'\u2190'} and {'\u2192'} arrow keys to move between lessons
      </p>
    </div>
  )
}
