import { flattenLessons } from '../content/book'
import { useProgress } from '../lib/appContext'
import AnimatedBar from './AnimatedBar'

export default function BookProgress({ compact = false }: { compact?: boolean }) {
  const progress = useProgress()
  const lessons = flattenLessons()
  const done = lessons.filter(({ lesson }) => progress.isLessonComplete(lesson.id)).length
  const pct = Math.round((done / Math.max(1, lessons.length)) * 100)

  if (compact) {
    return (
      <div className="hidden min-w-28 sm:block" aria-label={`Book progress ${pct}%`}>
        <div className="mb-1 flex items-center justify-between text-[10px] font-semibold text-[var(--ink-faint)]">
          <span>Book</span>
          <span>{pct}%</span>
        </div>
        <AnimatedBar value={pct} className="h-1" bar="bg-gradient-to-r from-brand-500 to-accent-500" />
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold">Book progress</span>
        <span className="font-bold tabular-nums text-brand-700 dark:text-brand-300">{pct}%</span>
      </div>
      <AnimatedBar value={pct} className="h-2" bar="bg-gradient-to-r from-brand-500 to-accent-500" />
      <p className="mt-2 text-xs text-[var(--ink-faint)]">
        {done} of {lessons.length} lessons completed
      </p>
    </div>
  )
}
