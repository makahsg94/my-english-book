import { Link, useParams } from 'react-router-dom'
import { BOOK } from '../content/book'
import { pageInfo } from '../content/book'
import { PageThumb } from '../components/PageFigure'
import { IconHome, IconChevronRight } from '../components/Icons'

export default function BankPage() {
  const { bankId } = useParams()
  const bank = BOOK.banks.find((b) => b.id === bankId)

  if (!bank) {
    return (
      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-8 text-center">
        <p className="text-[var(--ink-soft)]">Bank not found.</p>
        <Link to="/book" className="mt-2 inline-block text-sm font-medium text-brand-600">
          Back to the book map
        </Link>
      </div>
    )
  }

  // printed page -> pdf
  const pages: { pdf: number; bookPage: number; label: string }[] = []
  for (let printed = bank.pages[0]; printed <= bank.pages[1]; printed += 1) {
    pages.push({ pdf: printed + 14, bookPage: printed, label: pageInfo(printed + 14)?.label ?? '' })
  }

  return (
    <div className="fade-up mx-auto max-w-4xl">
      <nav className="mb-4 flex items-center gap-1 text-sm text-[var(--ink-faint)]">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
          <IconHome size={14} /> Home
        </Link>
        <IconChevronRight size={13} />
        <span className="text-[var(--ink)]">{bank.title}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-bold">{bank.title}</h1>
        <p className="mt-2 max-w-2xl text-[15px] text-[var(--ink-soft)]">{bank.description}</p>
        <p className="mt-1 text-sm text-[var(--ink-faint)]">
          pages {bank.pages[0]}{'\u2013'}{bank.pages[1]}
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {pages.map((p) => (
          <div key={p.pdf}>
            <PageThumb pdf={p.pdf} label={p.label ? `${p.bookPage} \u00b7 ${p.label}` : `page ${p.bookPage}`} />
          </div>
        ))}
      </div>
    </div>
  )
}