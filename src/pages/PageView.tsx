import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BOOK, pageInfo } from '../content/book'
import { pageImageUrl } from '../lib/images'
import { openLightbox } from '../components/Media'
import { IconChevronLeft, IconChevronRight, IconClose } from '../components/Icons'

export default function PageView() {
  const { pdf } = useParams()
  const n = Number(pdf)
  const info = Number.isFinite(n) ? pageInfo(n) : undefined
  const [showOcr, setShowOcr] = useState(false)

  // Reset the OCR toggle when navigating between pages.
  useEffect(() => {
    setShowOcr(false)
    // oxlint-disable-next-line react/set-state-in-effect
  }, [pdf])

  if (!info) {
    return (
      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-8 text-center">
        <p className="text-[var(--ink-soft)]">Page not found.</p>
        <Link to="/book" className="mt-2 inline-block text-sm font-medium text-brand-600">
          Back to the book map
        </Link>
      </div>
    )
  }

  const pages = BOOK.searchablePages.map((p) => p.pdf).sort((a, b) => a - b)
  const at = pages.indexOf(n)
  const prev = at > 0 ? pages[at - 1] : null
  const next = at !== -1 && at < pages.length - 1 ? pages[at + 1] : null

  const pageLabel = (pdf: number) => {
    const p = pageInfo(pdf)
    return p && p.bookPage >= 1 ? p.bookPage : `PDF ${pdf}`
  }

  return (
    <div className="fade-up mx-auto max-w-4xl">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Page {info.bookPage >= 1 ? info.bookPage : `PDF ${info.pdf}`}</h1>
          {info.label && <p className="text-sm text-[var(--ink-soft)]">{info.label}</p>}
        </div>
        <div className="flex items-center gap-2">
          {prev && (
            <Link to={`/page/${prev}`} className="inline-flex items-center gap-1 rounded-lg border border-[var(--line-strong)] px-3 py-1.5 text-sm hover:bg-[var(--line)]">
              <IconChevronLeft size={14} /> {pageLabel(prev)}
            </Link>
          )}
          {next && (
            <Link to={`/page/${next}`} className="inline-flex items-center gap-1 rounded-lg border border-[var(--line-strong)] px-3 py-1.5 text-sm hover:bg-[var(--line)]">
              {pageLabel(next)} <IconChevronRight size={14} />
            </Link>
          )}
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex justify-center bg-[var(--surface)] p-3">
          <button type="button" onClick={() => openLightbox(pageImageUrl(n))} className="cursor-zoom-in">
            <img src={pageImageUrl(n)} alt={info.label} className="h-auto max-w-full object-contain shadow" />
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setShowOcr((s) => !s)}
            className="mb-2 inline-flex items-center gap-2 rounded-lg border border-[var(--line-strong)] px-3 py-1.5 text-sm text-[var(--ink-soft)] hover:bg-[var(--line)]"
          >
            {showOcr ? <IconClose size={14} /> : 'Show OCR text'}
            {showOcr ? ' Hide' : ' Transcript'}
          </button>
          {showOcr && info.text && (
            <div className="max-h-96 overflow-y-auto rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 font-mono text-xs leading-relaxed text-[var(--ink-soft)] scrollbar-thin">
              {info.text.trim()}
            </div>
          )}
          <div className="mt-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 text-xs text-[var(--ink-faint)]">
            This is the scanned page from the {'Student\u2019s'} Book. Use the lightbox to zoom, and check exercises against the text.
          </div>
        </div>
      </div>
    </div>
  )
}