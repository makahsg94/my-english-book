import { Link } from 'react-router-dom'
import { BOOK, nav, unitLabel } from '../content/book'
import { IconChevronLeft, IconChevronRight } from './Icons'

export default function PrevNext({ unitId, lessonId }: { unitId: string; lessonId: string }) {
  const { prev, next } = nav(unitId, lessonId)

  const chip = (target?: { unitId?: string; lessonId?: string }, dir?: 'prev' | 'next') => {
    if (!target?.unitId || !target.lessonId) return <div aria-hidden className="flex-1" />
    const unit = BOOK.units.find((u) => u.id === target.unitId)
    const lesson = unit?.lessons.find((l) => l.id === target.lessonId)
    const label = unit ? unitLabel(unit) : ''
    return (
      <Link
        to={`/unit/${target.unitId}/lesson/${target.lessonId}`}
        className={`group flex w-1/2 flex-col gap-0.5 rounded-xl border border-[var(--line-strong)] bg-[var(--surface)] px-3 py-2.5 transition-colors hover:border-brand-400 ${
          dir === 'next' ? 'items-end text-right' : 'items-start text-left'
        }`}
      >
        <span className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-[var(--ink-faint)]">
          {dir === 'next' ? (
            <>
              Next <IconChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </>
          ) : (
            <>
              <IconChevronLeft size={12} className="transition-transform group-hover:-translate-x-0.5" /> Previous
            </>
          )}
        </span>
        <span className="truncate text-sm font-medium">{lesson?.title ?? lessonId}</span>
        <span className="truncate text-xs text-[var(--ink-faint)]">
          {label} {lesson?.code}
        </span>
      </Link>
    )
  }

  return (
    <div className="mt-8 flex items-stretch justify-between gap-3 border-t border-[var(--line)] pt-4">
      {chip(prev, 'prev')}
      {chip(next, 'next')}
    </div>
  )
}