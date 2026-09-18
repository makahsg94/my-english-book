import { BOOK, flattenLessons, unitLabel } from '../content/book'
import type { Exercise, ExerciseQuestion, Lesson } from '../types/content'

export interface SearchHit {
  type: 'page' | 'lesson' | 'bank'
  title: string
  subtitle?: string
  snippet: string
  url: string
  score: number
}

const STOP = new Set([
  'the', 'a', 'an', 'of', 'to', 'in', 'on', 'at', 'and', 'or', 'for', 'with',
  'you', 'we', 'they', 'your', 'is', 'are', 'was', 'were', 'be', 'do', 'does',
])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9']+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
}

function scoreTokens(haystack: string, queryTokens: string[]): number {
  const words = tokenize(haystack)
  if (words.length === 0) return 0
  const counts = new Map<string, number>()
  for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1)
  let score = 0
  for (const q of queryTokens) {
    if (counts.has(q)) {
      score += 2
      if (counts.get(q)! > 1) score += 1
    } else {
      const partial = [...counts.keys()].filter((w) => w.startsWith(q) || q.startsWith(w))
      if (partial.length) score += 1
    }
  }
  return score
}

function snippet(text: string, queryTokens: string[], around = 90): string {
  const lower = text.toLowerCase()
  let idx = -1
  for (const q of queryTokens) {
    const i = lower.indexOf(q)
    if (i >= 0 && (idx === -1 || i < idx)) idx = i
  }
  if (idx === -1) return text.slice(0, around) + (text.length > around ? '\u2026' : '')
  const start = Math.max(0, idx - around / 3)
  const end = Math.min(text.length, idx + around)
  return (start > 0 ? '\u2026' : '') + text.slice(start, end).trim() + (end < text.length ? '\u2026' : '')
}

function lessonText(lesson: Lesson): string {
  const parts: string[] = []
  parts.push(lesson.code, lesson.title, ...(lesson.labels?.grammar ?? '').split(','))
  if (lesson.labels?.vocabulary) parts.push(lesson.labels.vocabulary)
  if (lesson.labels?.pronunciation) parts.push(lesson.labels.pronunciation)
  for (const b of lesson.blocks) {
    if (b.type === 'text') parts.push(...b.paragraphs)
    if (b.type === 'callout') parts.push(b.text)
    if (b.type === 'vocab') {
      for (const item of b.items) parts.push(item.word, item.meaning ?? '')
    }
    if (b.type === 'grammar') {
      parts.push(b.explanation ?? '', b.rule ?? '')
      if (b.examples) parts.push(...b.examples)
    }
    if (b.type === 'examples') parts.push(...b.items)
    if (b.type === 'exercise') parts.push(exerciseText(b.exercise))
    if (b.type === 'audio') parts.push(...b.tracks.map((t) => t.label))
  }
  return parts.join(' ')
}

function exerciseText(ex: Exercise): string {
  const parts = [ex.title, ex.instructions ?? '']
  const pushQ = (q: ExerciseQuestion) => {
    if (q.kind === 'mcq') parts.push(q.prompt, ...q.options.map((o) => o.label))
    if (q.kind === 'true-false') parts.push(q.statement)
    if (q.kind === 'fill-blank') parts.push(q.before, q.answer, q.after)
    if (q.kind === 'matching') for (const p of q.pairs) parts.push(p.left, p.right)
    if (q.kind === 'ordering') parts.push(q.title, ...q.items)
  }
  for (const q of ex.questions) pushQ(q)
  return parts.join(' ')
}

/** Full-text search across lesson data, OCR page text and bank titles. */
export function searchBook(query: string): SearchHit[] {
  const tokens = tokenize(query)
  if (tokens.length === 0) return []
  const hits: SearchHit[] = []

  for (const { unit, lesson } of flattenLessons()) {
    const hay = `${unit.title} ${lessonText(lesson)}`
    const score = scoreTokens(hay, tokens)
    if (score > 0) {
      hits.push({
        type: 'lesson',
        title: `${unitLabel(unit)} \u00b7 ${lesson.code}: ${lesson.title}`,
        subtitle: unit.title,
        snippet: snippet(hay, tokens),
        url: `/unit/${unit.id}/lesson/${lesson.id}`,
        score,
      })
    }
  }

  for (const p of BOOK.searchablePages) {
    if (p.bookPage < 4) continue
    const hay = `${p.label} ${p.text}`
    const score = scoreTokens(hay, tokens)
    if (score > 0) {
      hits.push({
        type: 'page',
        title: `Page ${p.bookPage} \u2013 ${p.label || `PDF page ${p.pdf}`}`,
        subtitle: p.label || '',
        snippet: snippet(p.text, tokens),
        url: `/page/${p.pdf}`,
        score,
      })
    }
  }

  for (const bank of BOOK.banks) {
    const hay = `${bank.title} ${bank.description}`
    const score = scoreTokens(hay, tokens)
    if (score > 0) {
      hits.push({
        type: 'bank',
        title: bank.title,
        subtitle: `pages ${bank.pages[0]}\u2013${bank.pages[1]}`,
        snippet: bank.description,
        url: `/bank/${bank.id}`,
        score,
      })
    }
  }

  return hits
    .sort((a, b) => b.score - a.score)
    .slice(0, 40)
}