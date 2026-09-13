import { Link } from 'react-router-dom'
import { useTheme } from '../lib/appContext'
import SearchBox from './SearchBox'
import { IconBook, IconList, IconMoon, IconSun } from './Icons'

export default function Header({ onContents }: { onContents: () => void }) {
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto grid max-w-4xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2.5 sm:px-6">
        <button
          type="button"
          onClick={onContents}
          aria-label="Open contents"
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--line-strong)] px-2.5 py-2 text-sm font-medium text-[var(--ink-soft)] transition-colors hover:bg-[var(--line)]"
        >
          <IconList size={16} />
          <span className="hidden sm:inline">Contents</span>
        </button>

        <Link to="/" className="flex min-w-0 items-baseline justify-center gap-2 truncate">
          <span className="font-display text-sm font-bold uppercase tracking-[0.22em]">Speakout</span>
          <span className="hidden text-[10px] tracking-widest text-[var(--ink-faint)] md:inline">
            A2 {'\u00b7'} 3rd edition
          </span>
        </Link>

        <div className="flex min-w-0 items-center justify-self-end gap-2">
          <div className="hidden w-48 lg:block">
            <SearchBox />
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch theme. Current theme: ${theme}`}
            className="grid size-9 place-items-center rounded-lg border border-[var(--line-strong)] text-[var(--ink-soft)] transition-colors hover:bg-[var(--line)]"
          >
            {theme === 'dark' ? <IconSun size={17} /> : theme === 'reading' ? <IconBook size={17} /> : <IconMoon size={17} />}
          </button>
        </div>
      </div>
    </header>
  )
}