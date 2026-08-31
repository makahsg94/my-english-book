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
} from './Icons'
import { Link } from 'react-router-dom'

function BankLink({ page }: { page: number }) {
  return (
    <Link
      to="/bank/grammar"
      className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white transition-all hover:bg-brand-700 hover:shadow-sm"
    >
      <IconTarget size={13} />
      Grammar Bank, page {page}
      <IconChevronRight size={13} />
    </Link>
  )
}

/** Splits a rule string on "·" into colour-coded chunks. */
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

export default function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'text':
            return (
              <section key={i} className="fade-up prose-book max-w-prose">
                {block.title && (
                  <h2 className="mb-2 mt-6 flex items-center gap-2 text-xl font-semibold">
                    <span className="h-5 w-1 rounded-full bg-gradient-to-b from-brand-500 to-accent-500" />
                    {block.title}
                  </h2>
                )}
                {block.paragraphs.map((p, j) => (
                  <p key={j} className={j === 0 ? 'text-[16px] leading-relaxed' : 'text-[15px] text-[var(--ink-soft)]'}>
                    {p}
                  </p>
                ))}
              </section>
            )

          case 'callout': {
            const style =
              block.tone === 'warning'
                ? 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100'
                : block.tone === 'note'
                  ? 'border-accent-200 bg-accent-50 text-accent-900 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-100'
                  : 'border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-100'
            return (
              <aside key={i} className={`rounded-xl border p-4 ${style}`}>
                {block.title && (
                  <p className="mb-1 flex items-center gap-2 text-sm font-bold">
                    {block.tone === 'warning' ? <IconChat size={15} /> : <IconSpark size={15} />}
                    {block.title}
                  </p>
                )}
                <p className="text-[15px] leading-relaxed">{block.text}</p>
              </aside>
            )
          }

          case 'vocab':
            return (
              <section key={i}>
                {block.title && (
                  <h2 className="mb-3 mt-6 flex items-center gap-2 text-xl font-semibold">
                    <span className="h-5 w-1 rounded-full bg-gradient-to-b from-accent-500 to-brand-500" />
                    {block.title}
                  </h2>
                )}
                <div className="grid gap-2 sm:grid-cols-2">
                  {(block.items ?? []).map((item, j) => (
                    <div
                      key={j}
                      className="group rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-sm font-semibold text-brand-800 dark:text-brand-200">{item.word}</span>
                        {item.opposite && (
                          <span className="text-xs text-[var(--ink-faint)]">
                            opp.: <span className="font-medium text-accent-600 dark:text-accent-400">{item.opposite}</span>
                          </span>
                        )}
                        {item.pronunciation && (
                          <span className="ml-auto text-[11px] italic text-[var(--ink-faint)]">/ {item.pronunciation} /</span>
                        )}
                      </div>
                      {item.meaning && <p className="mt-0.5 text-sm text-[var(--ink-soft)]">{item.meaning}</p>}
                      {item.example && (
                        <p className="mt-1 text-xs italic text-[var(--ink-faint)]">{'\u201c'}{item.example}{'\u201d'}</p>
                      )}
                      {item.response && (
                        <p className="mt-1 rounded-md border border-accent-200 bg-accent-50 px-2 py-1 text-xs text-accent-800 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-200">
                          {'\u2192'} {item.response}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                {block.source && <p className="mt-2 text-xs text-[var(--ink-faint)]">{block.source}</p>}
              </section>
            )

          case 'grammar':
            return (
              <section
                key={i}
                className="overflow-hidden rounded-2xl border border-brand-200 bg-[var(--surface)] shadow-sm dark:border-brand-800"
              >
                <header className="flex items-center gap-2 bg-gradient-to-r from-brand-50 to-accent-50 px-4 py-2.5 dark:from-brand-950/70 dark:to-accent-950/70">
                  <span className="grid size-7 place-items-center rounded-md bg-brand-600 text-white">
                    <IconSpark size={15} />
                  </span>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-brand-800 dark:text-brand-200">{block.title}</h2>
                </header>

                <div className="space-y-3 p-4 sm:p-5">
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
                    <div className="overflow-x-auto rounded-xl border border-[var(--line)]">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-brand-600 text-left text-xs uppercase tracking-wider text-white">
                            {block.table.headers.map((h) => (
                              <th key={h} className="px-3 py-2.5 font-semibold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.table.rows.map((row, j) => (
                            <tr key={j} className="align-top odd:bg-[var(--surface)] even:bg-[var(--line)]/40">
                              {row.label && (
                                <td className="px-3 py-2 text-[13px] font-semibold text-brand-800 dark:text-brand-200">
                                  {row.label}
                                </td>
                              )}
                              <td className="px-3 py-2">
                                {row.values.map((v, k) => (
                                  <p key={k} className="text-[13.5px] text-[var(--ink)]">
                                    {v}
                                  </p>
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
                      <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-accent-700 dark:text-accent-300">
                        <IconLayers size={13} />
                        Examples
                      </p>
                      <ul className="space-y-1.5">
                        {block.examples.map((ex, j) => (
                          <li key={j} className="flex items-start gap-2 rounded-lg bg-[var(--line)]/50 px-3 py-1.5 text-sm">
                            <IconChevronRight size={15} className="mt-1 shrink-0 text-accent-500" />
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
              <section key={i} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
                {block.title && (
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--ink-faint)]">
                    <IconList size={14} />
                    {block.title}
                  </h3>
                )}
                <ul className="divide-y divide-[var(--line)]">
                  {block.items.map((ex, j) => (
                    <li key={j} className="flex items-center gap-2 py-1.5 text-[15px]">
                      <IconSpark size={15} className="shrink-0 text-accent-500" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </section>
            )

          case 'exercise':
            return <Quiz key={i} exercise={block.exercise} />

          case 'audio':
            return <AudioPlayer key={i} tracks={block.tracks} title={block.title} />

          case 'video':
            return (
              <section key={i} className="space-y-2">
                {block.title && (
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent-700 dark:text-accent-300">
                    <IconLayers size={15} />
                    {block.title}
                  </h3>
                )}
                <div className="grid gap-2">
                  {block.videos.map((v, j) => (
                    <VideoCard key={j} video={v} />
                  ))}
                </div>
              </section>
            )

          case 'pages':
            return (
              <div key={i} className="grid gap-3 sm:grid-cols-2">
                {block.images.map((image, j) => (
                  <PageFigure key={j} image={image} />
                ))}
              </div>
            )

          case 'review':
            return (
              <section key={i} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
                {block.title && <h3 className="mb-2 font-semibold">{block.title}</h3>}
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