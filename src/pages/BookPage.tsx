import { Link } from 'react-router-dom'
import { BOOK } from '../content/book'
import { pageImageUrl } from '../lib/images'
import { IconBook, IconChevronRight, IconLayers } from '../components/Icons'

export default function BookPage() {
  return (
    <div className="fade-up space-y-8">
      <header>
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <IconBook size={26} className="text-brand-600" />
          {BOOK.title} {BOOK.edition}
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] text-[var(--ink-soft)]">
          {BOOK.authors.join(' \u2022 ')} {'\u00b7'} Level {BOOK.level} {'\u00b7'} One course companion for every lesson, review and bank.
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Units</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {BOOK.units.map((unit) => (
            <Link
              key={unit.id}
              to={`/unit/${unit.id}`}
              className="group flex items-center gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 transition-shadow hover:shadow-md"
            >
              <img
                src={pageImageUrl(unit.overviewPage + 2)}
                alt=""
                loading="lazy"
                className="h-20 w-14 shrink-0 rounded-md border border-[var(--line)] object-cover object-top"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
                  {unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`}
                </p>
                <h3 className="truncate text-lg font-bold">{unit.phrase ?? unit.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-[var(--ink-soft)]">{unit.intro}</p>
              </div>
              <IconChevronRight size={16} className="shrink-0 text-[var(--ink-faint)] transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <IconLayers size={18} className="text-accent-600" />
          Reference banks
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
          {BOOK.banks.map((bank) => (
            <Link
              key={bank.id}
              to={`/bank/${bank.id}`}
              className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold">{bank.title}</h3>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{bank.description}</p>
<span className="mt-2 inline-block text-xs text-brand-600 dark:text-brand-300">
                    pages {bank.pages[0]}{'\u2013'}{bank.pages[1]}
                  </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}