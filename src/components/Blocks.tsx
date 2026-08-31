import type { ContentBlock } from '../types/content'
import { Quiz } from './Exercise'
import { AudioPlayer } from './Media'
import { VideoCard } from './VideoCard'
import { PageFigure } from './PageFigure'
import { IconChevronRight, IconChat, IconSpark, IconTarget, IconLayers } from './Icons'
import { Link } from 'react-router-dom'

function BankLink({ page }: { page: number }) {
  return (
    <Link
      to="/bank/grammar"
      className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-100 dark:bg-brand-950 dark:text-brand-300 dark:hover:bg-brand-900"
    >
      <IconTarget size={13} />
      Grammar Bank, page {page}
      <IconChevronRight size={13} />
    </Link>
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
                {block.title && <h2 className="mb-2 mt-6 text-xl font-semibold">{block.title}</h2>}
                {block.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
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
                {block.title && <h2 className="mb-3 mt-6 text-xl font-semibold">{block.title}</h2>}
                <div className="grid gap-2 sm:grid-cols-2">
                  {(block.items ?? []).map((item, j) => (
                    <div key={j} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-sm font-semibold">{item.word}</span>
                        {item.opposite && (
                          <span className="text-xs text-[var(--ink-faint)]">opp.: {item.opposite}</span>
                        )}
                      </div>
                      {item.meaning && <p className="mt-0.5 text-sm text-[var(--ink-soft)]">{item.meaning}</p>}
                      {item.example && <p className="mt-1 text-xs italic text-[var(--ink-faint)]">”{item.example}”</p>}
                      {item.response && (
                        <p className="mt-1 rounded-md bg-[var(--line)] px-2 py-1 text-xs text-[var(--ink-soft)]">
                          {item.response}
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
              <section key={i} className="rounded-2xl border border-brand-200 bg-[var(--surface)] p-4 sm:p-5 dark:border-brand-800">
                <h2 className="mb-2 mt-6 text-xl font-semibold text-brand-800 dark:text-brand-200">{block.title}</h2>
                {block.explanation && <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">{block.explanation}</p>}
                {block.rule && (
                  <p className="mt-3 rounded-lg bg-[var(--line)] px-3 py-2 font-mono text-[13px] leading-relaxed">{block.rule}</p>
                )}
                {block.table && (
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[var(--line-strong)] text-left text-xs uppercase tracking-wide text-[var(--ink-faint)]">
                          {block.table.headers.map((h) => (
                            <th key={h} className="py-2 pr-4 font-medium">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.table.rows.map((row, j) => (
                          <tr key={j} className="border-b border-[var(--line)] align-top last:border-0">
                            {row.label && <td className="py-2 pr-4 font-medium">{row.label}</td>}
                            <td className="py-2">
                              {row.values.map((v, k) => (
                                <p key={k} className="text-[var(--ink-soft)]">{v}</p>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {block.examples && block.examples.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {block.examples.map((ex, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <IconChevronRight size={15} className="mt-1 shrink-0 text-brand-500" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {block.bankPage && <BankLink page={block.bankPage} />}
              </section>
            )

          case 'examples':
            return (
              <section key={i} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
                {block.title && <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--ink-faint)]">{block.title}</h3>}
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
        }
      })}
    </div>
  )
}