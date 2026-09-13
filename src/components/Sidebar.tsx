import { NavLink } from 'react-router-dom'
import { BOOK } from '../content/book'
import { getUnitQuiz } from '../content/quizzes'
import { useProgress } from '../lib/appContext'
import BookProgress from './BookProgress'
import { IconBook, IconCheck, IconTarget } from './Icons'

type Status = 'done' | 'started' | 'todo'

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const progress = useProgress()

  return (
    <nav className="px-3 py-4">
      <div className="mb-4">
        <BookProgress />
      </div>

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

      {BOOK.units.map((unit) => {
        const doneCount = unit.lessons.filter((l) => progress.isLessonComplete(l.id)).length
        const pct = Math.round((doneCount / Math.max(1, unit.lessons.length)) * 100)
        const quiz = getUnitQuiz(unit.id)
        return (
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

            <div className="ml-3 mt-1 flex items-center gap-2 pr-1">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--line)]">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold tabular-nums text-[var(--ink-faint)]">
                {doneCount}/{unit.lessons.length}
              </span>
            </div>

            <div className="ml-3 mt-1 space-y-0.5 border-l border-[var(--line)] pl-2">
              {unit.lessons.map((lesson) => {
                const status: Status = progress.isLessonComplete(lesson.id)
                  ? 'done'
                  : progress.state.lessons[lesson.id]?.lastVisit
                    ? 'started'
                    : 'todo'
                return (
                  <NavLink
                    key={lesson.id}
                    to={`/unit/${unit.id}/lesson/${lesson.id}`}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 truncate rounded-md px-2 py-1 text-[13px] transition-colors ${
                        isActive
                          ? 'bg-[var(--line)] text-[var(--ink)]'
                          : status === 'todo'
                            ? 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                            : 'text-[var(--ink)]'
                      }`
                    }
                  >
                    <span className="w-3 shrink-0 text-center text-[10px] leading-none">
                      {status === 'done' ? (
                        <IconCheck size={10} className="text-brand-600" />
                      ) : status === 'started' ? (
                        <span className="text-accent-600">●</span>
                      ) : (
                        <span className="text-[var(--ink-faint)]">○</span>
                      )}
                    </span>
                    <span className="truncate">
                      {lesson.code !== 'Review' ? `${lesson.code} ` : ''}
                      {lesson.title}
                    </span>
                  </NavLink>
                )
              })}
              {quiz && (
                <NavLink
                  to={`/unit/${unit.id}/quiz`}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] transition-colors ${
                      isActive ? 'bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200' : 'text-brand-600 hover:bg-[var(--line)] dark:text-brand-300'
                    }`
                  }
                >
                  <IconTarget size={11} />
                  Unit quiz
                </NavLink>
              )}
            </div>
          </div>
        )
      })}

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
