import { NavLink } from 'react-router-dom'
import { BOOK } from '../content/book'
import { getWritingTask } from '../content/writing'
import { getUnitQuiz } from '../content/quizzes'
import { useProgress } from '../lib/appContext'
import { useAuth } from '../lib/authContext'
import BookProgress from './BookProgress'
import { IconBook, IconCheck, IconLayers, IconMic, IconPen, IconTarget } from './Icons'

type Status = 'done' | 'started' | 'todo'

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const progress = useProgress()
  const { user } = useAuth()

  return (
    <nav className="px-5 py-6">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--ink-faint)]">
        Contents of the book
      </p>
      <div className="mb-5">
        <BookProgress />
      </div>

      <NavLink
        to="/account"
        onClick={onNavigate}
        className={({ isActive }) =>
          `mb-4 block rounded-lg px-2.5 py-1.5 transition-colors ${
            isActive
              ? 'bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200'
              : 'text-brand-700 hover:bg-[var(--line)] dark:text-brand-300 dark:hover:text-brand-200'
          }`
        }
      >
        <span className="flex items-center gap-1.5">
          <IconLayers size={13} className="shrink-0" />
          <span className="block text-[13px] font-bold leading-snug" dir="rtl" lang="ar">
            {user ? `حساب ${user}` : 'أنشئ حسابك / دخول'}
          </span>
        </span>
        <span className="block pl-5 text-[12px] leading-snug opacity-80">
          <span dir="rtl" lang="ar">سجّل تقدّمك وقابله على أي جهاز</span>
        </span>
      </NavLink>

      <div className="mb-1 flex items-baseline gap-2 pb-1">
        <IconBook size={13} className="shrink-0 self-center text-[var(--ink-faint)]" />
        <span className="truncate font-semibold">This course</span>
        <span className="toc-dots" aria-hidden />
        <span className="toc-page">book map</span>
      </div>
      <NavLink
        to="/book"
        onClick={onNavigate}
        className={({ isActive }) =>
          `mb-4 block rounded-lg px-2.5 py-1.5 text-[13px] leading-snug transition-colors ${
            isActive
              ? 'bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200'
              : 'text-[var(--ink-soft)] hover:bg-[var(--line)]'
          }`
        }
      >
        Open the full contents of this course, unit by unit.
      </NavLink>

      <NavLink
        to="/review"
        onClick={onNavigate}
        className={({ isActive }) =>
          `mb-4 block rounded-lg px-2.5 py-1.5 transition-colors ${
            isActive
              ? 'bg-warm-50 text-warm-800 dark:bg-warm-950 dark:text-warm-200'
              : 'text-warm-600 hover:text-warm-700 dark:text-warm-300 dark:hover:text-warm-200'
          }`
        }
      >
        <span className="block text-[13px] font-bold leading-snug" dir="rtl" lang="ar">
          المراجعة الشاملة
        </span>
        <span className="block text-[12px] leading-snug opacity-80">
          Vocab tables · grammar · 25-question quiz
        </span>
      </NavLink>

      <NavLink
        to="/shadowing"
        onClick={onNavigate}
        className={({ isActive }) =>
          `mb-4 block rounded-lg px-2.5 py-1.5 transition-colors ${
            isActive
              ? 'bg-accent-50 text-accent-800 dark:bg-accent-950 dark:text-accent-200'
              : 'text-accent-600 hover:text-accent-700 dark:text-accent-300 dark:hover:text-accent-200'
          }`
        }
      >
        <span className="flex items-center gap-1.5">
          <IconMic size={13} className="shrink-0" />
          <span className="block text-[13px] font-bold leading-snug" dir="rtl" lang="ar">
            استوديو الشادونج
          </span>
        </span>
        <span className="block pl-5 text-[12px] leading-snug opacity-80">
          Listen · loop · repeat · record
        </span>
      </NavLink>

      <div className="space-y-5">
        {BOOK.units.map((unit) => {
          const quiz = getUnitQuiz(unit.id)
          return (
            <div key={unit.id}>
              <NavLink
                to={`/unit/${unit.id}`}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `group flex items-baseline gap-2 transition-colors ${
                    isActive ? 'text-brand-700 dark:text-brand-300' : 'hover:text-brand-700 dark:hover:text-brand-300'
                  }`
                }
              >
                <span className="font-display text-lg font-bold leading-none tracking-tight">
                  {unit.number === 0 ? '0' : String(unit.number)}
                </span>
                <span className="min-w-0 truncate text-[13px] font-semibold">
                  {unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`} {'\u2014'} {unit.title}
                </span>
                <span className="toc-dots" aria-hidden />
                <span className="toc-page">{unit.pages[0]}</span>
              </NavLink>

              <div className="mt-1.5 space-y-0.5 border-l border-[var(--line)] pl-3">
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
                        `toc-row group truncate rounded px-1.5 py-0.5 text-[13px] transition-colors ${
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
                      <span className="min-w-0 truncate">
                        {lesson.code !== 'Review' ? `${lesson.code} ` : ''}
                        {lesson.title}
                      </span>
                      <span className="toc-dots" aria-hidden />
                      <span className="toc-page shrink-0">{lesson.pages[0]}</span>
                    </NavLink>
                  )
                })}
                {getWritingTask(unit.id) && (
                  <NavLink
                    to={`/unit/${unit.id}/writing`}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `toc-row group truncate rounded px-1.5 py-0.5 text-[13px] transition-colors ${
                        isActive
                          ? 'bg-warm-50 text-warm-800 dark:bg-warm-950 dark:text-warm-200'
                          : 'text-warm-600 hover:text-warm-700 dark:text-warm-300 dark:hover:text-warm-200'
                      }`
                    }
                  >
                    <IconPen size={11} className="shrink-0" />
                    <span className="min-w-0 truncate">Writing task</span>
                    <span className="toc-dots" aria-hidden />
                    <span className="toc-page shrink-0">94</span>
                  </NavLink>
                )}
                {quiz && (
                  <NavLink
                    to={`/unit/${unit.id}/quiz`}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `toc-row group truncate rounded px-1.5 py-0.5 text-[13px] transition-colors ${
                        isActive
                          ? 'bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200'
                          : 'text-brand-600 hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200'
                      }`
                    }
                  >
                    <IconTarget size={11} className="shrink-0" />
                    <span className="min-w-0 truncate">{unitLabel(unit.number)} quiz</span>
                    <span className="toc-dots" aria-hidden />
                    <span className="toc-page shrink-0">end</span>
                  </NavLink>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        <NavLink
          to="/book"
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-baseline gap-2 transition-colors ${
              isActive ? 'text-brand-700 dark:text-brand-300' : 'hover:text-brand-700 dark:hover:text-brand-300'
            }`
          }
        >
          <span className="font-display text-lg font-bold leading-none tracking-tight">A</span>
          <span className="truncate text-[13px] font-semibold">Reference banks</span>
          <span className="toc-dots" aria-hidden />
          <span className="toc-page">back</span>
        </NavLink>
        <div className="mt-1.5 space-y-0.5 border-l border-[var(--line)] pl-3">
          {BOOK.banks.map((bank) => (
            <NavLink
              key={bank.id}
              to={`/bank/${bank.id}`}
              onClick={onNavigate}
              className={({ isActive }) =>
                `toc-row group truncate rounded px-1.5 py-0.5 text-[13px] transition-colors ${
                  isActive
                    ? 'bg-[var(--line)] text-[var(--ink)]'
                    : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                }`
              }
            >
              <span className="w-3 shrink-0 text-[10px] leading-none text-[var(--ink-faint)]">▲</span>
              <span className="min-w-0 truncate">{bank.title}</span>
              <span className="toc-dots" aria-hidden />
              <span className="toc-page shrink-0">{bank.pages[0]}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

function unitLabel(number: number) {
  return number === 0 ? 'Lead-in' : `Unit ${number}`
}