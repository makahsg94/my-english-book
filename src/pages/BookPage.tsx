import { Link } from 'react-router-dom'
import { BOOK } from '../content/book'
import { pageImageUrl } from '../lib/images'
import Reveal from '../components/Reveal'
import { IconChevronRight, IconLayers } from '../components/Icons'

export default function BookPage() {
  return (
    <div className="fade-up space-y-12">
      <header>
        <p className="page-number mb-2">{BOOK.edition} {'\u00b7'} A2</p>
        <h1 className="display text-4xl tracking-tight sm:text-5xl">
          {BOOK.title}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
          {BOOK.authors.join(' \u2022 ')} {'\u00b7'} Level {BOOK.level} {'\u00b7'} One course companion for every lesson, review and bank.
        </p>
      </header>

      <section>
        <div className="mb-5 flex items-baseline gap-3">
          <h2 className="display text-3xl tracking-tight">Units</h2>
          <span className="section-label">{BOOK.units.length} chapters</span>
        </div>
        <ol className="grid gap-3 md:grid-cols-2">
          {BOOK.units.map((unit, i) => (
            <Reveal key={unit.id} delay={i * 70}>
              <li>
                <Link
                  to={`/unit/${unit.id}`}
                  className="group flex h-full items-center gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
                >
                  <img
                    src={pageImageUrl(unit.overviewPage + 2)}
                    alt=""
                    loading="lazy"
                    className="h-20 w-14 shrink-0 rounded-md border border-[var(--line)] object-cover object-top"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
                      {unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`}
                    </p>
                    <h3 className="mt-0.5 truncate font-display text-lg font-semibold tracking-tight">
                      {unit.phrase ?? unit.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-[var(--ink-soft)]">{unit.intro}</p>
                  </div>
                  <IconChevronRight size={16} className="shrink-0 text-[var(--ink-faint)] transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section>
        <div className="mb-5 flex items-baseline gap-3">
          <h2 className="display flex items-center gap-2 text-3xl tracking-tight">
            Reference banks
          </h2>
          <span className="section-label bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300">
            <IconLayers size={12} />
            {BOOK.banks.length} references
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
          {BOOK.banks.map((bank, i) => (
            <Reveal key={bank.id} delay={i * 70}>
              <Link
                to={`/bank/${bank.id}`}
                className="flex h-full flex-col rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
              >
                <h3 className="font-display text-lg font-semibold tracking-tight">{bank.title}</h3>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">{bank.description}</p>
                <span className="page-number mt-3">pages {bank.pages[0]}{'\u2013'}{bank.pages[1]}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}