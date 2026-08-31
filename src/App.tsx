import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, ProgressProvider } from './lib/appContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import BookPage from './pages/BookPage'
import UnitPage from './pages/UnitPage'
import LessonPage from './pages/LessonPage'
import PageView from './pages/PageView'
import BankPage from './pages/BankPage'
import { Link } from 'react-router-dom'
import { IconHome } from './components/Icons'

function NotFound() {
  return (
    <div className="fade-up mx-auto max-w-md py-20 text-center">
      <p className="text-6xl font-bold text-brand-300">404</p>
      <h1 className="mt-2 text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-[var(--ink-soft)]">
        This page isn{'\u2019'}t in the course companion.
      </p>
      <Link
        to="/"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        <IconHome size={16} />
        Take me home
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="book" element={<BookPage />} />
              <Route path="unit/:unitId" element={<UnitPage />} />
              <Route path="unit/:unitId/lesson/:lessonId" element={<LessonPage />} />
              <Route path="page/:pdf" element={<PageView />} />
              <Route path="bank/:bankId" element={<BankPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </ThemeProvider>
  )
}