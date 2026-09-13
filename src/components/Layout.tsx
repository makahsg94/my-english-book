import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import MiniPlayer from './MiniPlayer'
import BackToTop from './BackToTop'
import { LightboxProvider } from './Media'
import { IconClose } from './Icons'

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Header onMenu={() => setDrawerOpen(true)} />
      <LightboxProvider />

      <div className="mx-auto flex max-w-6xl">
        {/* Desktop sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-[var(--line)] lg:block scrollbar-thin">
          <Sidebar />
        </aside>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
            <aside className="absolute left-0 top-0 h-full w-72 overflow-y-auto border-r border-[var(--line)] bg-[var(--bg)] shadow-2xl scrollbar-thin">
              <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
                <span className="text-sm font-semibold">Keep up</span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="grid size-8 place-items-center rounded-lg text-[var(--ink-soft)] hover:bg-[var(--line)]"
                >
                  <IconClose size={16} />
                </button>
              </div>
              <Sidebar onNavigate={() => setDrawerOpen(false)} />
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      <MiniPlayer />
      <BackToTop />

      <footer className="border-t border-[var(--line)] py-6 text-center text-xs text-[var(--ink-faint)]">
        Speakout 3rd Edition A2 {'\u00b7'} course companion {'\u2013'} for studying with your class
      </footer>
    </div>
  )
}
