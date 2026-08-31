import { NavLink } from 'react-router-dom'
import { BOOK } from '../content/book'
import { useProgress } from '../lib/appContext'
import { IconBook } from './Icons'

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const progress = useProgress()

  const done = (lessonId: string) => (progress.isLessonComplete(lessonId) ? 'text-brand-600' : 'text-[var(--ink-faint)]')

  return (
    <nav className="px-3 py-4">
      <NavLink
        to="/book"
        onClick={onNavigate}
        className={({ isActive }) =>
          `mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            isActive ? 'bg-brand-600 text-white' : 'text-[var(--ink-soft)] hover:bg-[var(--line)]'
          }`
        }
      >
        <IconBook size={16} />
        Book map
      </NavLink>

      {BOOK.units.map((unit) => (
        <div key={unit.id} className="mb-2">
          <NavLink
            to={`/unit/${unit.id}`}
            onClick={onNavigate}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                isActive ? 'bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200' : 'text-[var(--ink)] hover:bg-[var(--line)]'
              }`
            }
          >
            {unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`}{' '}
            <span className="font-normal text-[var(--ink-faint)]">{unit.title}</span>
          </NavLink>
          <div className="ml-3 mt-0.5 space-y-0.5 border-l border-[var(--line)] pl-2">
            {unit.lessons.map((lesson) => (
              <NavLink
                key={lesson.id}
                to={`/unit/${unit.id}/lesson/${lesson.id}`}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `block truncate rounded-md px-2 py-1 text-[13px] transition-colors ${
                    isActive ? 'bg-[var(--line)] text-[var(--ink)]' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                  }`
                }
              >
                <span className={done(lesson.id)}>{'\u25cf'}</span>{' '}
                <span>{lesson.code !== 'Review' ? `${lesson.code} ` : ''}{lesson.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}

      <div className="mb-2">
        <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-[var(--ink-faint)]">Banks</p>
        <div className="ml-3 space-y-0.5 border-l border-[var(--line)] pl-2">
          {BOOK.banks.map((bank) => (
            <NavLink
              key={bank.id}
              to={`/bank/${bank.id}`}
              onClick={onNavigate}
              className={({ isActive }) =>
                `block rounded-md px-2 py-1 text-[13px] transition-colors ${
                  isActive ? 'bg-[var(--line)] text-[var(--ink)]' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                }`
              }
            >
              {bank.title}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}