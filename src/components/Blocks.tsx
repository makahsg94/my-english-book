import type { ContentBlock } from '../types/content'
import { Quiz } from './Exercise'
import { AudioPlayer } from './Media'
import { VideoCard } from './VideoCard'
import { PageFigure } from './PageFigure'
import {
  IconChevronRight,
  IconChat,
  IconSpark,
  IconTarget,
  IconLayers,
  IconList,
  IconBook,
} from './Icons'
import { Link } from 'react-router-dom'

function BankLink({ page }: { page: number }) {
  return (
    <Link
      to="/bank/grammar"
      className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white transition-all hover:bg-brand-700 hover:shadow-sm"
    >
      <IconTarget size={13} />
      Grammar Bank, page {page}
      <IconChevronRight size={13} />
    </Link>
  )
}

function RuleChips({ rule }: { rule: string }) {
  const parts = rule.split('·')
  if (parts.length < 2) {
    return <code className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed">{rule}</code>
  }
  return (
    <span className="flex flex-wrap gap-1.5">
      {parts.map((p, i) => {
        const t = p.trim()
        if (!t) return null
        const tone = i % 2 === 0 ? 'bg-brand-600 text-white' : 'bg-accent-600 text-white'
        return (
          <code key={i} className={`rounded-md px-2 py-0.5 font-mono text-[12.5px] ${tone}`}>
            {t}
          </code>
        )
      })}
    </span>
  )
}

function SectionLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`section-label bg-[var(--line)] text-[var(--ink-faint)] ${className}`}>
      {children}
    </span>
  )
}

function calloutIcon(tone?: string) {
  switch (tone) {
    case 'warning':
      return <IconChat size={15} />
    case 'note':
      return <IconBook size={15} />
    case 'tip':
      return <IconSpark size={15} />
    default:
      return <IconSpark size={15} />
  }
}

function calloutToneClasses(tone?: string) {
  switch (tone) {
    case 'warning':
      return 'callout-warning border-rose-200 text-rose-900 dark:border-rose-800 dark:text-rose-100'
    case 'note':
      return 'callout-note border-warm-200 text-warm-900 dark:border-warm-900 dark:text-warm-100'
    case 'tip':
      return 'callout-tip border-accent-200 text-accent-900 dark:border-accent-800 dark:text-accent-100'
    default:
      return 'callout-info border-brand-200 text-brand-900 dark:border-brand-800 dark:text-brand-100'
  }
}

export default function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, i) => {
        const id = `section-${i}`
        switch (block.type) {
          case 'text':
            return (
              <section key={i} id={id} className="fade-up prose-book drop-cap">
                {block.title && (
                  <h2 className="mb-3 mt-8 flex items-center gap-2.5 text-xl font-bold">
                    <span className="h-6 w-1 rounded-full bg-gradient-to-b from-brand-500 to-accent-500" />
                    {block.title}
                  </h2>
                )}
                {block.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </section>
            )

          case 'callout':
            return (
              <aside
                key={i}
                id={id}
                className={`rounded-xl border-l-4 p-4 ${calloutToneClasses(block.tone)}`}
              >
                {block.title && (
                  <p className="mb-1.5 flex items-center gap-2 text-sm font-bold">
                    {calloutIcon(block.tone)}
                    {block.title}
                  </p>
                )}
                <p className="text-[15px] leading-relaxed">{block.text}</p>
              </aside>
            )

          case 'vocab':
            return (
              <section key={i} id={id}>
                {block.title && (
                  <div className="mb-3 mt-8 flex items-center gap-2.5">
                    <h2 className="flex items-center gap-2 text-xl font-bold">
                      <span className="h-6 w-1 rounded-full bg-gradient-to-b from-accent-500 to-brand-500" />
                      {block.title}
                    </h2>
                  </div>
                )}
                <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
                  <div className="hidden border-b border-[var(--line)] bg-[var(--line)]/50 px-4 py-2 sm:grid sm:grid-cols-[1fr_1fr_2fr] sm:gap-4">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Word</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Meaning</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Example / Note</span>
                  </div>
                  <div className="divide-y divide-[var(--line)]">
                    {(block.items ?? []).map((item, j) => (
                      <div
                        key={j}
                        className="group grid gap-1 px-4 py-3 transition-colors hover:bg-[var(--line)]/30 sm:grid-cols-[1fr_1fr_2fr] sm:items-start sm:gap-4"
                      >
                        <div className="min-w-0">
                          <span className="text-[15px] font-semibold text-brand-800 dark:text-brand-200">{item.word}</span>
                          {item.opposite && (
                            <span className="ml-2 text-xs text-[var(--ink-faint)]">
                              opp.{' '}
                              <span className="font-medium text-accent-600 dark:text-accent-400">{item.opposite}</span>
                            </span>
                          )}
                          {item.pronunciation && (
                            <span className="ml-1.5 text-[11px] italic text-[var(--ink-faint)]">/{item.pronunciation}/</span>
                          )}
                        </div>
                        <div className="min-w-0 text-sm text-[var(--ink-soft)]">
                          {item.meaning || '\u2014'}
                        </div>
                        <div className="min-w-0 space-y-1">
                          {item.example && (
                            <p className="text-[13px] italic text-[var(--ink-faint)]">
                              {'\u201c'}{item.example}{'\u201d'}
                            </p>
                          )}
                          {item.response && (
                            <p className="inline-flex items-center gap-1 rounded-md border border-accent-200 bg-accent-50 px-2 py-0.5 text-[12px] text-accent-800 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-200">
                              {'\u2192'} {item.response}
                            </p>
                          )}
                          {item.note && (
                            <p className="text-[12px] text-[var(--ink-faint)]">{item.note}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {block.source && (
                  <p className="mt-2 text-[12px] text-[var(--ink-faint)]">{block.source}</p>
                )}
              </section>
            )

          case 'grammar':
            return (
              <section
                key={i}
                id={id}
                className="overflow-hidden rounded-2xl border border-brand-200 bg-[var(--surface)] shadow-sm dark:border-brand-800"
              >
                <header className="flex items-center gap-2 bg-gradient-to-r from-brand-50 to-accent-50 px-4 py-2.5 dark:from-brand-950/70 dark:to-accent-950/70">
                  <span className="grid size-7 place-items-center rounded-md bg-brand-600 text-white">
                    <IconSpark size={15} />
                  </span>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-brand-800 dark:text-brand-200">{block.title}</h2>
                </header>

                <div className="space-y-4 p-4 sm:p-5">
                  {block.explanation && (
                    <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">{block.explanation}</p>
                  )}

                  {block.rule && (
                    <div className="rounded-xl border border-brand-200 bg-brand-50/60 p-3 dark:border-brand-800 dark:bg-brand-950/40">
                      <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300">
                        <IconTarget size={13} />
                        The pattern
                      </p>
                      <RuleChips rule={block.rule} />
                    </div>
                  )}

                  {block.table && (
                    <div className="overflow-x-auto rounded-xl">
                      <table className="content-table">
                        <thead>
                          <tr>
                            {block.table.headers.map((h) => (
                              <th key={h}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.table.rows.map((row, j) => (
                            <tr key={j}>
                              {row.label && (
                                <td className="font-semibold text-brand-800 dark:text-brand-200">{row.label}</td>
                              )}
                              <td>
                                {row.values.map((v, k) => (
                                  <p key={k} className="text-[13.5px]">{v}</p>
                                ))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {block.examples && block.examples.length > 0 && (
                    <div>
                      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-accent-700 dark:text-accent-300">
                        <IconLayers size={13} />
                        Examples
                      </p>
                      <ul className="space-y-1.5">
                        {block.examples.map((ex, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 rounded-lg bg-[var(--line)]/40 px-3 py-2 text-sm leading-relaxed"
                          >
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                              {j + 1}
                            </span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {block.bankPage && <BankLink page={block.bankPage} />}
                </div>
              </section>
            )

          case 'examples':
            return (
              <section key={i} id={id} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
                {block.title && (
                  <div className="mb-2 flex items-center gap-2">
                    <SectionLabel>
                      <IconList size={12} />
                      {block.title}
                    </SectionLabel>
                  </div>
                )}
                <ul className="space-y-1">
                  {block.items.map((ex, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 rounded-lg px-3 py-2 text-[15px] leading-relaxed transition-colors hover:bg-[var(--line)]/30"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-100 text-[11px] font-bold text-accent-700 dark:bg-accent-900 dark:text-accent-300">
                        {j + 1}
                      </span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )

          case 'exercise':
            return (
              <div key={i} id={id}>
                <Quiz exercise={block.exercise} />
              </div>
            )

          case 'audio':
            return (
              <div key={i} id={id}>
                <AudioPlayer tracks={block.tracks} title={block.title} />
              </div>
            )

          case 'video':
            return (
              <section key={i} id={id}>
                {block.title && (
                  <div className="mb-3 mt-6 flex items-center gap-2.5">
                    <SectionLabel className="bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300">
                      <IconLayers size={12} />
                      {block.title}
                    </SectionLabel>
                  </div>
                )}
                <div className="grid gap-3">
                  {block.videos.map((v, j) => (
                    <VideoCard key={j} video={v} />
                  ))}
                </div>
              </section>
            )

          case 'pages':
            return (
              <section key={i} id={id}>
                <div className="section-divider">
                  <span>Book Pages</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {block.images.map((image, j) => (
                    <PageFigure key={j} image={image} />
                  ))}
                </div>
              </section>
            )

          case 'review':
            return (
              <section key={i} id={id} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
                {block.title && (
                  <div className="mb-2 flex items-center gap-2">
                    <SectionLabel>
                      <IconBook size={12} />
                      {block.title}
                    </SectionLabel>
                  </div>
                )}
                <p className="text-[15px] leading-relaxed">{block.text}</p>
              </section>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
