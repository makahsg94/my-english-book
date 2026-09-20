import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../lib/appContext'
import { useAuth } from '../lib/authContext'
import SearchBox from './SearchBox'
import { playSound, setSoundEnabled, soundEnabled } from '../lib/sounds'
import { IconBook, IconList, IconMoon, IconSun, IconVolume, IconVolumeOff } from './Icons'

export default function Header({ onContents }: { onContents: () => void }) {
  const { theme, toggle } = useTheme()
  const { user } = useAuth()
  const [soundOn, setSoundOn] = useState(() => soundEnabled())

  const toggleSound = () => {
    const next = !soundOn
    setSoundEnabled(next)
    setSoundOn(next)
    if (next) playSound('tap')
  }

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
            the line {'\u00b7'} A2 {'\u00b7'} 3rd edition
          </span>
        </Link>

        <div className="flex min-w-0 items-center justify-self-end gap-2">
          <div className="hidden w-48 lg:block">
            <SearchBox />
          </div>
          <Link
            to="/account"
            className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-2 text-sm font-bold transition-colors ${
              user
                ? 'border-brand-300 bg-brand-50 text-brand-800 hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200 dark:hover:bg-brand-900/60'
                : 'border-[var(--line-strong)] text-[var(--ink-soft)] hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-300'
            }`}
          >
            {user ? (
              <>
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-600 text-[10px] font-extrabold text-white">
                  {user.slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden max-w-28 truncate sm:inline">{user}</span>
              </>
            ) : (
              <span>دخول</span>
            )}
          </Link>
          <button
            type="button"
            onClick={toggleSound}
            aria-label={`Sound effects ${soundOn ? 'on' : 'off'}. Toggle sound`}
            aria-pressed={soundOn}
            className={`grid size-9 place-items-center rounded-lg border transition-colors ${
              soundOn
                ? 'border-[var(--line-strong)] text-[var(--ink-soft)] hover:bg-[var(--line)] hover:text-brand-700 dark:hover:text-brand-300'
                : 'border-transparent text-[var(--ink-faint)] hover:bg-[var(--line)]'
            }`}
          >
            {soundOn ? <IconVolume size={17} /> : <IconVolumeOff size={17} />}
          </button>
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