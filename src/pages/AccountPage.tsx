import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { BOOK, flattenLessons } from '../content/book'
import { UNIT_QUIZZES } from '../content/quizzes'
import { WRITING_TASKS } from '../content/writing'
import { useAuth } from '../lib/authContext'
import { useProgress } from '../lib/appContext'
import { achievementsFor, levelProgress, levelForXp, type ProgressState } from '../lib/progress'
import { userJoinedAt, userAge, validateAge } from '../lib/auth'
import { pullAll, persistProfile } from '../lib/sync'
import { IconAward, IconBook, IconChevronRight, IconFlame, IconHome, IconLayers, IconPen, IconTarget } from '../components/Icons'

function Ar({ children }: { children: React.ReactNode }) {
  return (
    <span dir="rtl" lang="ar" className="ar inline-block">
      {children}
    </span>
  )
}

type Mode = 'login' | 'register'

function Field({
  label,
  type,
  value,
  onChange,
  autoComplete,
}: {
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[var(--line-strong)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none transition-colors focus:border-brand-400"
      />
    </label>
  )
}

export function AccountGate() {
  const { login, register } = useAuth()
  const progress = useProgress()
  const [mode, setMode] = useState<Mode>('register')
  const [username, setUsername] = useState('')
  const [age, setAge] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (mode === 'register') {
      const ageError = validateAge(age)
      if (ageError) {
        setError(ageError)
        return
      }
      if (password !== confirm) {
        setError('كلمة السر والتأكيد مش متطابقين')
        return
      }
    }
    setBusy(true)
try {
        const result =
          mode === 'login'
            ? await login(username, password)
            : await register(username, password, Number(age.trim()))
        if (!result.ok) {
          setError(result.error ?? 'حصلت مشكلة، حاول تاني')
          return
        }
        if (mode === 'register') {
          await persistProfile({ age: Number(age.trim()) })
        }
        await pullAll()
        progress.reload()
      } catch {
      setError('حصلت مشكلة، حاول تاني')
    } finally {
      setBusy(false)
    }
  }

  const switchMode = (next: Mode) => {
    setMode(next)
    setError('')
    setConfirm('')
  }

  return (
    <div className="fade-up mx-auto max-w-md space-y-6">
      <nav className="flex items-center gap-1 text-sm text-[var(--ink-faint)]">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
          <IconHome size={14} /> Home
        </Link>
        <IconChevronRight size={13} />
        <span className="text-[var(--ink)]">
          <Ar>الحساب</Ar>
        </span>
      </nav>

      <header className="text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-300">
          Speakout B1 {'\u00b7'} Your account
        </p>
        <h1 className="display mt-3 text-4xl font-bold tracking-tight">
          <Ar>ابدأ من تاني بس تقدّمك يفضل معاك</Ar>
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[var(--ink-soft)]">
          <Ar>
            اعمل حساب، وكل كويز تخلصه وتقدّمك في الكتاب هيتحفظ على حسابك — تقدّر تكمّل من نفس مكانك في أي وقت.
          </Ar>
        </p>
      </header>

      <form
        onSubmit={submit}
        className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm sm:p-6"
      >
        <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl bg-[var(--line)]/60 p-1">
          <button
            type="button"
            onClick={() => switchMode('login')}
            aria-pressed={mode === 'login'}
            className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
              mode === 'login' ? 'bg-brand-600 text-white' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
            }`}
          >
            <Ar>تسجيل الدخول</Ar>
          </button>
          <button
            type="button"
            onClick={() => switchMode('register')}
            aria-pressed={mode === 'register'}
            className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
              mode === 'register' ? 'bg-brand-600 text-white' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
            }`}
          >
            <Ar>إنشاء حساب جديد</Ar>
          </button>
        </div>

        <div className="space-y-3.5">
          <Field label="الاسم" type="text" value={username} onChange={setUsername} autoComplete="username" />
          {mode === 'register' && (
            <Field label="العمر" type="number" value={age} onChange={setAge} autoComplete="bday" />
          )}
          <Field
            label="كلمة السر"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
          />
          {mode === 'register' && (
            <Field
              label="تأكيد كلمة السر"
              type="password"
              value={confirm}
              onChange={setConfirm}
              autoComplete="new-password"
            />
          )}
        </div>

        {error && (
          <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            <Ar>{error}</Ar>
          </p>
        )}

        <button
          type="submit"
          disabled={
            busy ||
            !username.trim() ||
            !password ||
            (mode === 'register' && (!age.trim() || password !== confirm))
          }
          className="mt-5 w-full rounded-xl bg-brand-600 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Ar>{mode === 'login' ? 'دخول' : 'إنشاء الحساب والبدء'}</Ar>
        </button>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-[var(--ink-faint)]">
          <Ar>حسابك بيحفظ تقدّمك (الكويزات والدروس والإنجازات). لو دخلت بنفس الحساب من جهاز تاني، هتلاقي تقدّمك موجود.</Ar>
        </p>
      </form>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
      <span className="inline-flex items-center gap-1.5 text-[var(--ink-faint)]">{icon}</span>
      <p className="mt-1.5 text-xl font-extrabold tabular-nums tracking-tight text-[var(--ink)]">{value}</p>
      <p className="text-[12px] font-semibold text-[var(--ink-soft)]">
        <Ar>{label}</Ar>
      </p>
      {hint && <p className="mt-0.5 text-[11px] text-[var(--ink-faint)]">{hint}</p>}
    </div>
  )
}

function courseProgress(state: ProgressState, totalLessons: number) {
  const lessonsDone = Object.values(state.lessons).filter((l) => l.completed).length
  const unitQuizzes = UNIT_QUIZZES.map((q) => q.id)
  const quizzesDone = unitQuizzes.filter((id) => (state.quizzes[id] ?? []).length > 0).length
  const writingDone = WRITING_TASKS.filter((t) => (state.writing[t.id] ?? []).length > 0).length
  const lessonPct = totalLessons > 0 ? lessonsDone / totalLessons : 0
  const quizPct = unitQuizzes.length > 0 ? quizzesDone / unitQuizzes.length : 0
  const writePct = WRITING_TASKS.length > 0 ? writingDone / WRITING_TASKS.length : 0
  const overall = Math.round(lessonPct * 60 + quizPct * 20 + writePct * 20)
  return { lessonsDone, quizzesDone, writingDone, overall, unitQuizzesTotal: unitQuizzes.length }
}

function Profile({ username }: { username: string }) {
  const { logout } = useAuth()
  const progress = useProgress()
  const state = progress.state

  const totalLessons = useMemo(() => flattenLessons().length, [])
  const stats = useMemo(() => courseProgress(state, totalLessons), [state, totalLessons])
  const lp = levelProgress(state.xp)
  const achievements = useMemo(() => achievementsFor(state, totalLessons), [state, totalLessons])
  const earned = achievements.filter((a) => a.earned).length
  const allResults = Object.values(state.quizzes).flat()
  const attempts = allResults.length
  const bestAccuracy = attempts > 0 ? Math.round((allResults.reduce((s, r) => s + r.correct, 0) / allResults.reduce((s, r) => s + r.total, 0)) * 100) : 0
  const joined = userJoinedAt(username)
  const age = userAge(username)

  const formatDate = (ts?: number) => {
    if (!ts) return ''
    return new Date(ts).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const handleLogout = () => {
    logout()
    progress.reload()
  }

  return (
    <div className="fade-up mx-auto max-w-3xl space-y-6">
      <nav className="flex items-center gap-1 text-sm text-[var(--ink-faint)]">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
          <IconHome size={14} /> Home
        </Link>
        <IconChevronRight size={13} />
        <span className="text-[var(--ink)]">
          <Ar>بروفايل</Ar>
        </span>
      </nav>

      <header className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-600 text-2xl font-extrabold text-white">
            {username.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0">
            <h1 className="display truncate text-3xl font-bold tracking-tight text-[var(--ink)]">{username}</h1>
            <p className="text-[13px] text-[var(--ink-soft)]">
              <Ar>حساب على {BOOK.title} {BOOK.level}</Ar>
              {joined ? (
                <>
                  {' \u00b7 '}
                  <Ar>مسجّل من {formatDate(joined)}</Ar>
                </>
              ) : null}
              {age ? (
                <>
                  {' \u00b7 '}
                  <Ar>العمر: {age}</Ar>
                </>
              ) : null}
            </p>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-[var(--line-strong)] px-3.5 py-1.5 text-xs font-bold text-[var(--ink-soft)] transition-colors hover:border-red-300 hover:text-red-600"
            >
              <Ar>تسجيل الخروج</Ar>
            </button>
            <button
              type="button"
              onClick={() => {
                progress.resetAll()
              }}
              className="rounded-full border border-[var(--line-strong)] px-3.5 py-1.5 text-xs font-bold text-[var(--ink-faint)] transition-colors hover:border-red-300 hover:text-red-600"
            >
              <Ar>محو التقدّم</Ar>
            </button>
          </div>
        </div>
      </header>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="flex items-center gap-2 text-sm font-bold text-[var(--ink)]">
            <IconLayers size={16} className="text-brand-600" />
            <Ar>خلصت قد إيه من الكتاب؟</Ar>
          </h2>
          <span className="text-sm font-extrabold tabular-nums text-brand-700 dark:text-brand-300">
            {stats.overall}% <Ar>تمام</Ar>
          </span>
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[var(--line)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-500"
            style={{ width: `${stats.overall}%` }}
          />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          <StatCard icon={<IconBook size={15} />} label="دروس مكتملة" value={`${stats.lessonsDone} / ${totalLessons}`} />
          <StatCard icon={<IconTarget size={15} />} label="كويزات وحدات" value={`${stats.quizzesDone} / ${stats.unitQuizzesTotal}`} />
          <StatCard
            icon={<IconPen size={15} />}
            label="مهام كتابة"
            value={`${stats.writingDone} / ${WRITING_TASKS.length}`}
          />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<IconAward size={15} />}
          label={`المستوى ${lp.level}`}
          value={`${state.xp} XP`}
          hint={`${lp.current} / ${lp.target} للمستوى ${lp.level + 1}`}
        />
        <StatCard
          icon={<IconFlame size={15} />}
          label="أيام متتالية"
          value={`${state.streak}`}
          hint={state.streak > 0 ? 'واصل التعلّم كل يوم!' : 'ابدأ سلسلة اليوم'}
        />
        <StatCard
          icon={<IconTarget size={15} />}
          label="اجابات الكويزات الصحيحة"
          value={`${bestAccuracy}%`}
          hint={`${attempts} محاولة`}
        />
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-bold text-[var(--ink)]">
            <IconAward size={16} className="text-accent-600" />
            <Ar>الإنجازات</Ar>
          </h2>
          <span className="text-xs font-bold tabular-nums text-[var(--ink-faint)]">
            {earned} / {achievements.length}
          </span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 ${
                a.earned
                  ? 'border-brand-200 bg-brand-50 dark:border-brand-900 dark:bg-brand-950/40'
                  : 'border-[var(--line)] opacity-55'
              }`}
            >
              <span className="text-[22px] leading-none">{a.emoji}</span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-bold text-[var(--ink)]">{a.title}</span>
                <span className="block truncate text-[11px] text-[var(--ink-faint)]">{a.desc}</span>
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-[var(--ink-faint)]">
          <Ar>المستوى الحالي: {levelForXp(state.xp)} — كمّل الدروس والخامت باش تكسب XP وإنجازات جديدة.</Ar>
        </p>
      </section>
    </div>
  )
}

export default function AccountPage() {
  const { user } = useAuth()
  return user ? <Profile username={user} /> : <AccountGate />
}