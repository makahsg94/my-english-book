import { Link } from 'react-router-dom'
import { BOOK } from '../content/book'
import { pageImageUrl } from '../lib/images'
import { useProgress } from '../lib/appContext'
import Reveal from '../components/Reveal'
import CoverStack from '../components/CoverStack'
import { IconCheck, IconLayers } from '../components/Icons'

export default function BookPage() {
  const progress = useProgress()

  const deckCovers = BOOK.units.map((unit) => ({
    unitId: unit.id,
    number: unit.number,
    title: unit.phrase ?? unit.title,
    subtitle: unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`,
    img: pageImageUrl(unit.overviewPage + 2),
    done: unit.lessons.every((l) => progress.isLessonComplete(l.id)),
  }))

  return (
    <div className="fade-up book-page px-6 py-8 sm:px-10">
      <div className="running-head">
        <span>
          {BOOK.title} {'\u00b7'} Level {BOOK.level}
        </span>
        <span className="rh-right">Contents of the book</span>
      </div>

      <header className="title-page mx-auto max-w-xl pb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--ink-faint)]">
          {BOOK.edition} {'\u00b7'} A2
        </p>
        <h1 className="display mt-3 text-4xl tracking-tight sm:text-5xl">{BOOK.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
          {BOOK.authors.join(' \u2022 ')} {'\u00b7'} One course companion for every lesson, review and bank.
        </p>
      </header>

      <section className="flex flex-col items-center gap-3 py-8">
        <CoverStack covers={deckCovers} />
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--ink-faint)]">
          Hover to fan the chapters {'\u00b7'} click a cover to open it
        </p>
      </section>

      <ol className="space-y-5">
        {BOOK.units.map((unit, i) => {
          const unitDone = unit.lessons.filter((l) => progress.isLessonComplete(l.id)).length
          const unitPct = Math.round((unitDone / Math.max(1, unit.lessons.length)) * 100)
          return (
            <Reveal key={unit.id} delay={i * 30}>
              <li className="border-b border-[var(--line)] pb-4">
                <Link to={`/unit/${unit.id}`} className="group flex items-baseline gap-4 py-1">
                  <span className="chapter-num font-display text-4xl leading-none">
                    {unit.number === 0 ? '0' : String(unit.number)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
                      {unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`}
                    </span>
                    <span className="mt-0.5 block truncate font-display text-lg font-semibold tracking-tight group-hover:text-brand-700 dark:group-hover:text-brand-300">
                      {unit.phrase ?? unit.title}
                    </span>
                  </span>
                  <span className="hidden text-xs text-[var(--ink-faint)] sm:inline">
                    {unitDone}/{unit.lessons.length} {'\u00b7'} {unitPct}%
                  </span>
                  <span className="toc-page">{unit.pages[0]}</span>
                </Link>

                <ul className="mt-1.5 space-y-0.5 border-l border-[var(--line)] pl-4">
                  {unit.lessons.map((lesson) => {
                    const isDone = progress.isLessonComplete(lesson.id)
                    return (
                      <li key={lesson.id}>
                        <Link
                          to={`/unit/${unit.id}/lesson/${lesson.id}`}
                          className="toc-row text-[13px]"
                        >
                          <span className="w-3 shrink-0 text-center text-[10px] leading-none">
                            {isDone ? (
                              <IconCheck size={10} className="text-brand-600" />
                            ) : (
                              <span className="text-[var(--ink-faint)]">○</span>
                            )}
                          </span>
                          <span className="min-w-0 truncate transition-colors group-hover:text-brand-700 dark:group-hover:text-brand-300">
                            {lesson.code !== 'Review' ? `${lesson.code} ` : ''}
                            {lesson.title}
                          </span>
                          <span className="toc-dots" aria-hidden />
                          <span className="toc-page shrink-0">{lesson.pages[0]}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </Reveal>
          )
        })}
      </ol>

      <section className="mt-8 border-t border-[var(--line)] pt-5">
        <div className="flex items-baseline gap-3">
          <IconLayers size={14} className="shrink-0 self-center text-[var(--ink-faint)]" />
          <h2 className="font-display text-lg font-semibold tracking-tight">Reference banks</h2>
          <span className="toc-dots" aria-hidden />
          <span className="toc-page">back of the book</span>
        </div>
        <ul className="mt-2 space-y-0.5">
          {BOOK.banks.map((bank) => (
            <li key={bank.id}>
              <Link
                to={`/bank/${bank.id}`}
                className="toc-row group text-[13px]"
              >
                <span className="w-3 shrink-0 text-center text-[10px] text-[var(--ink-faint)]">▲</span>
                <span className="min-w-0 truncate transition-colors group-hover:text-brand-700 dark:group-hover:text-brand-300">
                  {bank.title}
                </span>
                <span className="toc-dots" aria-hidden />
                <span className="toc-page shrink-0">
                  {bank.pages[0]}{'\u2013'}{bank.pages[1]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}