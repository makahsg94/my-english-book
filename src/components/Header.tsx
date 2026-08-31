import { Link } from 'react-router-dom'
import { useTheme } from '../lib/appContext'
import SearchBox from './SearchBox'
import { IconBook, IconMenu, IconMoon, IconSun } from './Icons'

export default function Header({ onMenu }: { onMenu: () => void }) {
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open menu"
          className="grid size-9 place-items-center rounded-lg border border-[var(--line-strong)] text-[var(--ink-soft)] lg:hidden"
        >
          <IconMenu size={18} />
        </button>

        <Link to="/" className="flex items-center gap-2.5 font-semibold">
          <span className="grid size-9 place-items-center rounded-lg bg-brand-600 text-white">
            <IconBook size={18} />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm">Speakout</span>
            <span className="text-[11px] font-normal text-[var(--ink-faint)]">{'3rd edition \u00b7 A2 Student\u2019s Book'}</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <div className="w-0 sm:w-56 md:w-72">
            <SearchBox />
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid size-9 place-items-center rounded-lg border border-[var(--line-strong)] text-[var(--ink-soft)] transition-colors hover:bg-[var(--line)]"
          >
            {theme === 'dark' ? <IconSun size={17} /> : <IconMoon size={17} />}
          </button>
        </div>
      </div>
    </header>
  )
}