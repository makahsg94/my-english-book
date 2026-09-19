import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  REVIEW_VOCAB,
  REVIEW_GRAMMAR,
  REVIEW_QUIZ,
  REVIEW_QUIZ_LETTERS,
  type ReviewVocabTable,
} from '../content/review'
import { IconChevronRight, IconHome, IconLayers, IconList, IconTarget, IconVolume } from '../components/Icons'
import { burstConfetti } from '../lib/confetti'

type Tab = 'vocab' | 'grammar' | 'quiz'

const hasArabic = (text: string) => /[\u0600-\u06FF]/.test(text)

function Ar({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span dir="rtl" lang="ar" className={`ar ${className}`}>
      {children}
    </span>
  )
}

function sayWord(word: string) {
  if (!('speechSynthesis' in window) || !word.trim()) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(word)
  u.lang = 'en-GB'
  u.rate = 0.9
  const voices = window.speechSynthesis.getVoices()
  const voice =
    voices.find((v) => v.lang.toLowerCase().startsWith('en-gb')) ??
    voices.find((v) => v.lang.toLowerCase().startsWith('en'))
  if (voice) u.voice = voice
  window.speechSynthesis.speak(u)
}

function Tabs({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const items: { id: Tab; label: string; sub: string; icon: React.ReactNode }[] = [
    { id: 'vocab', label: 'الكلمات', sub: 'جداول بالترجمة والأمثلة', icon: <IconList size={15} /> },
    { id: 'grammar', label: 'الجرامر', sub: 'قواعد وأمثلة لكل درس', icon: <IconLayers size={15} /> },
    { id: 'quiz', label: 'الكويز', sub: '25 سؤال بتصحيح فوري', icon: <IconTarget size={15} /> },
  ]
  return (
    <div className="mx-auto grid max-w-3xl gap-2 sm:grid-cols-3" role="tablist" aria-label="أقسام المراجعة">
      {items.map((item) => {
        const active = tab === item.id
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={`tactile flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all ${
              active
                ? 'border-brand-500 bg-brand-600 text-white shadow-sm'
                : 'border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-brand-400'
            }`}
          >
            <span
              className={`grid size-8 shrink-0 place-items-center rounded-lg ${
                active ? 'bg-white/15' : 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
              }`}
            >
              {item.icon}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold leading-tight">{item.label}</span>
              <span className={`block truncate text-[11px] leading-tight ${active ? 'text-white/75' : 'text-[var(--ink-faint)]'}`}>
                {item.sub}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

function VocabTable({ table }: { table: ReviewVocabTable }) {
  const lastIsExample = /مثال/.test(table.headers[table.headers.length - 1] ?? '')
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
      <div className="overflow-x-auto">
        <table className="content-table !rounded-none !border-0">
          <thead>
            <tr>
              {table.headers.map((h, j) => (
                <th key={j} className={hasArabic(h) ? 'ar' : ''}>
                  {hasArabic(h) ? <Ar>{h}</Ar> : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => {
                  const isWord = j === 0 && !hasArabic(cell)
                  const isLast = j === row.length - 1
                  const italic = lastIsExample && isLast
                  if (isWord) {
                    return (
                      <td key={j} className="align-top">
                        <button
                          type="button"
                          onClick={() => sayWord(cell)}
                          title="اضغط للاستماع"
                          aria-label={`استمع إلى ${cell}`}
                          className="group/word inline-flex max-w-full items-center gap-1.5 text-left font-semibold text-brand-800 underline-offset-4 hover:underline dark:text-brand-200"
                        >
                          <span className="min-w-0">{cell}</span>
                          <IconVolume
                            size={13}
                            className="shrink-0 text-brand-500 opacity-40 transition-opacity group-hover/word:opacity-100 dark:text-brand-300"
                          />
                        </button>
                      </td>
                    )
                  }
                  return (
                    <td key={j} className="align-top">
                      {hasArabic(cell) ? (
                        <Ar className={italic ? 'italic' : ''}>{cell}</Ar>
                      ) : italic ? (
                        <em>{`\u201c${cell}\u201d`}</em>
                      ) : (
                        cell
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function VocabPart() {
  return (
    <div className="fade-up space-y-10">
      <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-[var(--ink-soft)]">
        <Ar>كل جدول بيمثل مجموعة كلمات من الكتاب: الكلمة، ترجمتها بالعربي، ومثال من الدرس.</Ar>
      </p>
      {REVIEW_VOCAB.map((group) => (
        <section key={group.unit} className="space-y-6">
          <h2 className="display flex items-baseline gap-3 text-2xl tracking-tight">
            <Ar className="shrink-0!">{group.unit}</Ar>
            <span className="h-px flex-1 bg-gradient-to-r from-brand-400/60 to-transparent" aria-hidden />
          </h2>
          <div className="space-y-5">
            {group.tables.map((t, j) => (
              <div key={j}>
                <h3 className="mb-2 flex items-center gap-2 text-[15px] font-bold">
                  <span className="h-4 w-1 rounded-full bg-gradient-to-b from-accent-500 to-brand-500" />
                  <Ar>{t.title}</Ar>
                </h3>
                <VocabTable table={t} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function GrammarPart() {
  return (
    <div className="fade-up space-y-10">
      <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-[var(--ink-soft)]">
        <Ar>ملخص لكل درس قواعد في الكتاب: القاعدة، شرحها بالعربي، وأمثلة من الدرس.</Ar>
      </p>
      {REVIEW_GRAMMAR.map((group) => (
        <section key={group.unit} className="space-y-5">
          <h2 className="display flex items-baseline gap-3 text-2xl tracking-tight">
            <Ar className="shrink-0!">{group.unit}</Ar>
            <span className="h-px flex-1 bg-gradient-to-r from-accent-400/60 to-transparent" aria-hidden />
          </h2>
          <div className="grid gap-4">
            {group.points.map((point, j) => (
              <section
                key={j}
                className="overflow-hidden rounded-2xl border border-brand-200 bg-[var(--surface)] shadow-sm dark:border-brand-800"
              >
                <header className="flex items-center gap-2 bg-gradient-to-r from-brand-50 to-accent-50 px-4 py-2.5 dark:from-brand-950/70 dark:to-accent-950/70">
                  <span className="grid size-7 place-items-center rounded-md bg-brand-600 text-white">
                    <IconLayers size={15} />
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-800 dark:text-brand-200">
                    <Ar className="!normal-case">{point.title}</Ar>
                  </h3>
                </header>
                <div className="space-y-4 p-4 sm:p-5">
                  {point.explanation && (
                    <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
                      <Ar>{point.explanation}</Ar>
                    </p>
                  )}
                  <div className="overflow-x-auto rounded-xl">
                    <table className="content-table">
                      <thead>
                        <tr>
                          <th>
                            <Ar>القاعدة / Rule</Ar>
                          </th>
                          <th>
                            <Ar>أمثلة / Examples</Ar>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {point.rules.map((r, k) => (
                          <tr key={k}>
                            <td className="align-top font-semibold text-brand-800 dark:text-brand-200">
                              {hasArabic(r.rule) ? <Ar>{r.rule}</Ar> : r.rule}
                            </td>
                            <td className="align-top">
                              {hasArabic(r.examples) ? <Ar>{r.examples}</Ar> : r.examples}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

interface QuizAnswer {
  index: number
  correct?: boolean
}

function QuizPart() {
  const [answers, setAnswers] = useState<Record<number, QuizAnswer>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    return REVIEW_QUIZ.reduce((acc, _q, i) => acc + (answers[i]?.correct ? 1 : 0), 0)
  }, [answers])

  const allAnswered = Object.keys(answers).length === REVIEW_QUIZ.length

  const pick = (qi: number, oi: number) => {
    if (submitted) return
    const correct = REVIEW_QUIZ[qi].options[oi] === REVIEW_QUIZ[qi].answer
    setAnswers((prev) => ({ ...prev, [qi]: { index: oi, correct } }))
  }

  const submit = () => {
    if (!allAnswered) return
    setSubmitted(true)
    const pct = score / REVIEW_QUIZ.length
    if (pct === 1) burstConfetti()
  }

  const retry = () => {
    setAnswers({})
    setSubmitted(false)
  }

  const pct = Math.round((score / REVIEW_QUIZ.length) * 100)

  return (
    <div className="fade-up mx-auto max-w-3xl space-y-6">
      <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-[var(--ink-soft)]">
        <Ar>اختر الإجابة الصحيحة لكل سؤال، ثم اضغط «صحّح». الإجابات مش هتتظهر غير بعد التصحيح.</Ar>
      </p>

      <div className="mx-auto max-w-md space-y-3">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm">
          <p className="flex items-center justify-between text-xs text-[var(--ink-faint)]">
            <span>
              <Ar>أجبت على</Ar> {Object.keys(answers).length}/{REVIEW_QUIZ.length}
            </span>
            <span className="font-semibold tabular-nums text-[var(--ink-soft)]">{submitted ? `${score}/25` : '\u2014'}</span>
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--line)]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                pct === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-brand-500 to-accent-500'
              }`}
              style={{ width: `${Math.round((Object.keys(answers).length / REVIEW_QUIZ.length) * 100)}%` }}
            />
          </div>
          {submitted && (
            <p className="pop mt-3 text-center text-sm font-bold text-brand-800 dark:text-brand-200">
              <Ar>
                نتيجتك: {score} من {REVIEW_QUIZ.length} ({pct}%)
              </Ar>
            </p>
          )}
          <div className="mt-3 flex gap-2">
            {!submitted ? (
              <button
                type="button"
                onClick={submit}
                disabled={!allAnswered}
                className="tactile inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IconTarget size={15} />
                <Ar>صحّح</Ar>
              </button>
            ) : (
              <button
                type="button"
                onClick={retry}
                className="tactile inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-brand-300 bg-brand-50 px-3 py-2 text-sm font-bold text-brand-800 transition-colors hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200"
              >
                <IconList size={15} />
                <Ar>إعادة المحاولة</Ar>
              </button>
            )}
          </div>
        </div>
      </div>

      <ol className="space-y-4">
        {REVIEW_QUIZ.map((q, qi) => {
          const picked = answers[qi]
          return (
            <li key={qi} className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
              <div className="flex items-start gap-3 border-b border-[var(--line)] bg-[var(--line)]/40 px-4 py-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-brand-600 text-[12px] font-bold text-white">
                  {qi + 1}
                </span>
                <p className="min-w-0 text-[15px] font-semibold leading-relaxed">{q.prompt}</p>
              </div>
              <div className="grid gap-2 p-3 sm:grid-cols-2">
                {q.options.map((opt, oi) => {
                  const isPicked = picked?.index === oi
                  const isCorrect = opt === q.answer
                  let cls =
                    'border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink)] hover:border-brand-400'
                  if (submitted && isCorrect) {
                    cls = 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100'
                  } else if (submitted && isPicked) {
                    cls = 'border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950 dark:text-rose-100'
                  } else if (isPicked) {
                    cls = 'border-brand-500 bg-brand-50 text-brand-900 dark:bg-brand-950 dark:text-brand-100'
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={submitted}
                      onClick={() => pick(qi, oi)}
                      aria-pressed={isPicked}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm leading-relaxed transition-colors disabled:cursor-default ${cls}`}
                    >
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-md text-[11px] font-bold ${
                          submitted ? (isCorrect ? 'bg-emerald-600 text-white' : isPicked ? 'bg-rose-600 text-white' : 'bg-[var(--line)] text-[var(--ink-faint)]') : isPicked ? 'bg-brand-600 text-white' : 'bg-[var(--line)] text-[var(--ink-soft)]'
                        }`}
                      >
                        {submitted && isCorrect ? '\u2713' : submitted && isPicked ? '\u2715' : REVIEW_QUIZ_LETTERS[oi]}
                      </span>
                      <span>{opt}</span>
                    </button>
                  )
                })}
              </div>
              {submitted && (
                <p className="px-4 pb-3 text-[12px] leading-relaxed text-[var(--ink-soft)]">
                  {picked?.correct ? (
                    <Ar className="font-semibold text-emerald-700 dark:text-emerald-300">الإجابة صحيحة ✓</Ar>
                  ) : (
                    <Ar>
                      <span className="font-semibold text-rose-600 dark:text-rose-300">إجابة خطأ</span> — الإجابة الصحيحة:{' '}
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300">{q.answer}</span>
                    </Ar>
                  )}
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default function ReviewPage() {
  const [tab, setTab] = useState<Tab>('vocab')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tab])

  return (
    <div className="fade-up mx-auto max-w-4xl space-y-8">
      <nav className="flex items-center gap-1 text-sm text-[var(--ink-faint)]">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
          <IconHome size={14} /> Home
        </Link>
        <IconChevronRight size={13} />
        <span className="text-[var(--ink)]">
          <Ar>المراجعة الشاملة</Ar>
        </span>
      </nav>

      <header className="text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-300">
          Speakout A2 {'\u00b7'} Full course review
        </p>
        <h1 className="display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
          <Ar>مراجعة شاملة</Ar>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
          <Ar>
            كلمات في جداول (بالعربي ومع أمثلة)، ملخص القواعد (الجرامر) لكل درس، وكويز 25 سؤال
            بعدّلك فورًا — كل ده من محتوى الوحدات الثماني + الـ Lead-in.
          </Ar>
        </p>
      </header>

      <Tabs tab={tab} onChange={setTab} />

      <div key={tab}>
        {tab === 'vocab' ? <VocabPart /> : tab === 'grammar' ? <GrammarPart /> : <QuizPart />}
      </div>
    </div>
  )
}