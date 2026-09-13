import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BOOK, getUnit } from '../content/book'
import { getWritingTask } from '../content/writing'
import { getUnitQuiz } from '../content/quizzes'
import { useProgress } from '../lib/appContext'
import { PageFigure } from '../components/PageFigure'
import Reveal from '../components/Reveal'
import AnimatedBar from '../components/AnimatedBar'
import Parallax from '../components/Parallax'
import { IconChevronRight, IconVideo, IconHome, IconCheck, IconList, IconTarget, IconVolume, IconSpark, IconPen } from '../components/Icons'

function LessonPreview({ lesson }: { lesson: { title: string; pages: [number, number]; labels?: { grammar?: string; vocabulary?: string; pronunciation?: string; skills?: string }; objectives?: string[]; blocks: { type: string; title?: string; exercise?: { title?: string }; videos?: unknown[]; tracks?: unknown[] }[] } }) {
  const exercises = lesson.blocks.filter((b) => b.type === 'exercise').length
  const videos = lesson.blocks.filter((b) => b.type === 'video').reduce((n, b) => n + (b.videos?.length ?? 0), 0)
  const audio = lesson.blocks.filter((b) => b.type === 'audio').reduce((n, b) => n + (b.tracks?.length ?? 0), 0)
  return (
    <div className="rise rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-2xl">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ink-faint)]">Lesson preview</p>
      <h3 className="mt-1 text-lg font-bold">{lesson.title}</h3>
      <p className="page-number mt-1">Pages {lesson.pages[0]}{'\u2013'}{lesson.pages[1]}</p>
      {lesson.labels && (
        <p className="mt-2 flex flex-wrap gap-1.5">
          {lesson.labels.grammar && (
            <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-semibold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
              {lesson.labels.grammar}
            </span>
          )}
          {lesson.labels.vocabulary && (
            <span className="rounded-full bg-accent-100 px-2 py-0.5 text-[11px] font-semibold text-accent-700 dark:bg-accent-900 dark:text-accent-300">
              {lesson.labels.vocabulary}
            </span>
          )}
          {lesson.labels.skills && (
            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-semibold text-sky-700 dark:bg-sky-900 dark:text-sky-100">
              {lesson.labels.skills}
            </span>
          )}
        </p>
      )}
      {lesson.objectives && lesson.objectives.length > 0 && (
        <ul className="mt-2 space-y-1">
          {lesson.objectives.slice(0, 3).map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-[12px] text-[var(--ink-soft)]">
              <IconSpark size={11} className="mt-0.5 shrink-0 text-brand-500" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--ink-faint)]">
        {exercises > 0 && <span>{exercises} exercise{exercises > 1 ? 's' : ''}</span>}
        {audio > 0 && (
          <span className="inline-flex items-center gap-1">
            <IconVolume size={11} /> {audio} track{audio > 1 ? 's' : ''}
          </span>
        )}
        {videos > 0 && (
          <span className="inline-flex items-center gap-1 text-accent-600">
            <IconVideo size={11} /> {videos} video{videos > 1 ? 's' : ''}
          </span>
        )}
      </div>
      <p className="mt-3 border-t border-[var(--line)] pt-2 text-[11px] text-brand-700 dark:text-brand-300">
        Hover to peek {'\u00b7'} Enter to open {'\u2192'}
      </p>
    </div>
  )
}

export default function UnitPage() {
  const { unitId } = useParams()
  const unit = unitId ? getUnit(unitId) : undefined
  const progress = useProgress()
  const [previewId, setPreviewId] = useState<string | null>(null)

  if (!unit) return null

  const unitIndex = BOOK.units.findIndex((u) => u.id === unit.id)
  const nextUnit = unitIndex >= 0 ? BOOK.units[unitIndex + 1] : undefined

  const unitLabel = unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`
  const done = unit.lessons.filter((l) => progress.isLessonComplete(l.id)).length
  const pct = Math.round((done / Math.max(1, unit.lessons.length)) * 100)
  const quiz = getUnitQuiz(unit.id)
  const quizBest = quiz ? progress.bestQuiz(quiz.id) : undefined
  const writingTask = getWritingTask(unit.id)
  const writingBest = writingTask ? progress.bestWriting(writingTask.id) : undefined

  const previewLesson = previewId ? unit.lessons.find((l) => l.id === previewId) : undefined

  return (
    <div className="fade-up book-page mx-auto w-full max-w-4xl space-y-10 px-6 py-8 sm:px-10">
      <div className="running-head">
        <span>
          Station {unitLabel} {'\u00b7'} {unit.title}
        </span>
        <span className="rh-right">pages {unit.pages[0]}{'\u2013'}{unit.pages[1]}</span>
      </div>

      <nav className="flex items-center gap-1 text-sm text-[var(--ink-faint)]">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
          <IconHome size={14} /> Home
        </Link>
        <IconChevronRight size={13} />
        <span className="text-[var(--ink)]">{unitLabel}</span>
      </nav>

      <header className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div>
          <div className="flex items-center gap-4">
            <span className="chapter-num text-6xl lg:text-7xl" aria-hidden>
              {unit.number === 0 ? '0' : String(unit.number)}
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700 dark:text-brand-300">
                {unitLabel}
              </p>
              <p className="page-number mt-1">{unit.title}</p>
            </div>
          </div>
          <h1 className="display mt-3 text-4xl tracking-tight lg:text-5xl">{unit.phrase ?? unit.title}</h1>
          {unit.intro && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--ink-soft)]">{unit.intro}</p>}

          {unit.objectives && unit.objectives.length > 0 && (
            <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--ink-faint)]">
                <span aria-hidden className="size-1.5 rounded-full bg-brand-500" />
                Unit objectives
              </p>
              <ul className="space-y-2">
                {unit.objectives.map((o, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-brand-200 bg-brand-50 text-[11px] font-bold text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
                      {i + 1}
                    </span>
                    <span className="text-sm text-[var(--ink-soft)]">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-5 max-w-xs">
            <div className="mb-1.5 flex justify-between text-xs text-[var(--ink-faint)]">
              <span className="font-medium">Progress</span>
              <span className="font-semibold text-brand-700 dark:text-brand-300">
                {done}/{unit.lessons.length} ({pct}%)
              </span>
            </div>
            <AnimatedBar value={pct} className="h-2.5" bar="bg-gradient-to-r from-brand-500 to-accent-500" />
          </div>
        </div>
        <div className="w-full lg:justify-self-end">
          <Parallax strength={18}>
            <PageFigure image={{ pdf: unit.overviewPage + 2, bookPage: unit.overviewPage }} />
          </Parallax>
        </div>
      </header>

      <div className="section-divider">
        <span>
          <IconList size={12} className="mr-1 inline" />
          In this chapter
        </span>
      </div>

      {writingTask && (
        <Reveal delay={20}>
          <Link
            to={`/unit/${unit.id}/writing`}
            className="group flex items-center gap-4 rounded-2xl border border-warm-300 bg-gradient-to-r from-warm-50 to-brand-50 p-4 transition-all hover:border-warm-400 hover:shadow-sm dark:border-warm-800 dark:from-warm-950/70 dark:to-brand-950/60 dark:hover:border-warm-500"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-warm-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <IconPen size={22} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="font-semibold">{unitLabel} writing desk</span>
                {writingBest && (
                  <span className="rounded-full bg-warm-600 px-2 py-0.5 text-[11px] font-bold text-white">
                    best {writingBest.grade} {writingBest.score}%
                  </span>
                )}
              </span>
              <span className="mt-0.5 block truncate text-sm text-[var(--ink-soft)]">
                {writingTask.title} {'\u00b7'} {writingTask.minWords}+ words {'\u00b7'} check your writing and get a grade
              </span>
            </span>
            <IconChevronRight
              size={18}
              className="shrink-0 text-warm-600 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      )}

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
        <ol className="space-y-1">
          {unit.lessons.map((lesson, i) => {
            const isDone = progress.isLessonComplete(lesson.id)
            const started = !isDone && !!progress.state.lessons[lesson.id]?.lastVisit
            return (
              <li key={lesson.id}>
                <Reveal delay={i * 45}>
                  <Link
                    to={`/unit/${unit.id}/lesson/${lesson.id}`}
                    onMouseEnter={() => setPreviewId(lesson.id)}
                    onMouseLeave={() => setPreviewId(null)}
                    onFocus={() => setPreviewId(lesson.id)}
                    onBlur={() => setPreviewId(null)}
                    className="group flex w-full items-baseline gap-3 rounded-lg px-2 py-1.5 text-[15px] transition-colors hover:bg-[var(--line)]"
                  >
                    <span className="w-4 shrink-0 text-center text-[11px] leading-none">
                      {isDone ? (
                        <IconCheck size={12} className="text-brand-600" />
                      ) : started ? (
                        <span className="text-accent-600">●</span>
                      ) : lesson.code === 'Review' ? (
                        <span className="text-accent-500">★</span>
                      ) : (
                        <span className="text-[var(--ink-faint)]">○</span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      <span className="font-semibold transition-colors group-hover:text-brand-700 dark:group-hover:text-brand-300">
                        {lesson.code !== 'Review' ? `${lesson.code} ` : ''}
                        {lesson.title}
                      </span>
                      {lesson.labels?.grammar && (
                        <span className="ml-2 text-xs text-[var(--ink-faint)]">{lesson.labels.grammar}</span>
                      )}
                    </span>
                    <span className="toc-dots" aria-hidden />
                    <span className="toc-page shrink-0">{lesson.pages[0]}</span>
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
            className="page-corner tactile group flex items-center gap-4 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-4 transition-all hover:border-brand-400 hover:shadow-sm"
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

      {previewLesson && previewId && (
        <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden w-80 -translate-y-1/2 xl:block">
          <LessonPreview lesson={previewLesson} />
        </div>
      )}
    </div>
  )
}
