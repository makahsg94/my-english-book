import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { VOCAB_1_4 } from './review-parts/vocab-1-4'
import { VOCAB_5_8 } from './review-parts/vocab-5-8'
import { GRAMMAR_1_4 } from './review-parts/grammar-1-4'
import { GRAMMAR_5_8 } from './review-parts/grammar-5-8'
import { REVIEW_QUIZ } from './review-parts/quiz'
import type {
  ReviewVocabGroup,
  ReviewGrammarGroup,
  ReviewQuizQuestion,
} from './review-parts/types'

const VOCAB: ReviewVocabGroup[] = [...VOCAB_1_4, ...VOCAB_5_8]
const GRAMMAR: ReviewGrammarGroup[] = [...GRAMMAR_1_4, ...GRAMMAR_5_8]
const QUIZ: ReviewQuizQuestion[] = REVIEW_QUIZ

const hasArabic = (text: string) => /[\u0600-\u06FF]/.test(text)

const issues: string[] = []
const issue = (msg: string) => issues.push(msg)

// ------------------------------------------------------------------ vocab ----
const expectedUnits = new Set([1, 2, 3, 4, 5, 6, 7, 8])
const seenUnits = new Set<number>()
for (const group of VOCAB) {
  const m = group.unit.match(/الوحدة (\d+):/)
  if (!m) {
    issue(`vocab: unit label must start with "الوحدة N:" — got "${group.unit}"`)
    continue
  }
  const num = Number(m[1])
  if (!expectedUnits.has(num)) issue(`vocab: unexpected unit number ${num} in "${group.unit}"`)
  if (seenUnits.has(num)) issue(`vocab: duplicate unit group for unit ${num}`)
  seenUnits.add(num)
  if (group.tables.length === 0) issue(`vocab: unit ${num} has no tables`)
  for (const table of group.tables) {
    if (!table.title || !table.title.trim()) issue(`vocab: unit ${num} table with empty title`)
    if (table.headers.length < 2 || table.headers.length > 5) issue(`vocab: unit ${num} "${table.title}" headers length ${table.headers.length}`)
    if (table.rows.length === 0) issue(`vocab: unit ${num} "${table.title}" has no rows`)
    let anyArabic = table.headers.some((h) => hasArabic(h))
    table.rows.forEach((row, ri) => {
      if (row.length !== table.headers.length) issue(`vocab: unit ${num} "${table.title}" row ${ri + 1} has ${row.length} cells (headers ${table.headers.length})`)
      if (!row[0] || !row[0].trim()) issue(`vocab: unit ${num} "${table.title}" row ${ri + 1} first cell empty`)
      if (row.some((c) => hasArabic(c))) anyArabic = true
    })
    if (!anyArabic) issue(`vocab: unit ${num} "${table.title}" has no Arabic content`)
  }
}
for (const num of expectedUnits) {
  if (!seenUnits.has(num)) issue(`vocab: missing group for unit ${num}`)
}

// ---------------------------------------------------------------- grammar ----
for (const group of GRAMMAR) {
  const m = group.unit.match(/الوحدة (\d+):/)
  if (!m) issue(`grammar: unit label must start with "الوحدة N:" — got "${group.unit}"`)
  if (group.points.length === 0) issue(`grammar: ${group.unit} has no points`)
  for (const point of group.points) {
    if (!point.title || !hasArabic(point.title)) issue(`grammar: ${group.unit} point title missing Arabic — "${point.title}"`)
    if (!point.explanation || !hasArabic(point.explanation)) issue(`grammar: ${group.unit} "${point.title}" explanation missing Arabic`)
    if (point.rules.length === 0) issue(`grammar: ${group.unit} "${point.title}" has no rules`)
    for (const r of point.rules) {
      if (!r.rule || !hasArabic(r.rule)) issue(`grammar: ${group.unit} "${point.title}" rule missing Arabic — "${r.rule}"`)
      if (!r.examples || !r.examples.trim()) issue(`grammar: ${group.unit} "${point.title}" rule "${r.rule}" has no examples`)
    }
  }
}

// ------------------------------------------------------------------- quiz ----
if (QUIZ.length !== 25) issue(`quiz: expected 25 questions, got ${QUIZ.length}`)
const quizOptionSets = new Set<string>()
for (let i = 0; i < QUIZ.length; i++) {
  const q = QUIZ[i]
  if (!q.prompt || !q.prompt.trim()) issue(`quiz[${i}]: empty prompt`)
  if (!Array.isArray(q.options) || q.options.length !== 4) issue(`quiz[${i}]: options must be exactly 4 (got ${Array.isArray(q.options) ? q.options.length : 'n/a'})`)
  else {
    q.options.forEach((o) => {
      if (!o.trim()) issue(`quiz[${i}]: empty option string`)
    })
    const key = q.options.join('\u0000')
    if (quizOptionSets.has(key)) issue(`quiz[${i}]: duplicate option set`)
    quizOptionSets.add(key)
  }
  if (!q.answer || !q.options.includes(q.answer)) issue(`quiz[${i}]: answer "${q.answer}" not in options`)
  if (!q.explanation || !hasArabic(q.explanation)) issue(`quiz[${i}]: explanation must be Arabic — "${q.explanation}"`)
  if (q.wrongNotes) {
    for (const [opt, note] of Object.entries(q.wrongNotes)) {
      if (!q.options.includes(opt) || opt === q.answer) issue(`quiz[${i}]: wrongNotes key "${opt}" is not a wrong option`)
      if (!note || !hasArabic(note)) issue(`quiz[${i}]: wrongNotes["${opt}"] must be Arabic`)
    }
  }
}

// -------------------------------------------------------------- assemble ----
const header = `// ---------------------------------------------------------------------------
// Comprehensive review data - extracted and translated from the Speakout B1
// unit lessons. Vocabulary tables (word + Arabic meaning + example), grammar
// summaries and a 25-question quiz. Rendered by pages/ReviewPage.tsx
// ---------------------------------------------------------------------------
`

const iface = `export interface ReviewVocabTable {
  title: string
  headers: string[]
  rows: string[][]
}

export interface ReviewVocabGroup {
  unit: string
  tables: ReviewVocabTable[]
}

export const REVIEW_VOCAB: ReviewVocabGroup[] = `

const grammarIface = `
export interface ReviewGrammarRule {
  rule: string
  examples: string
}

export interface ReviewGrammarPoint {
  title: string
  explanation: string
  rules: ReviewGrammarRule[]
}

export interface ReviewGrammarGroup {
  unit: string
  points: ReviewGrammarPoint[]
}

export const REVIEW_GRAMMAR: ReviewGrammarGroup[] = `

const quizIface = `
export interface ReviewQuizQuestion {
  prompt: string
  options: string[]
  answer: string
  /** Arabic note explaining why \`answer\` is correct. */
  explanation: string
  /** Optional Arabic note per wrong option explaining why that choice is wrong. */
  wrongNotes?: Record<string, string>
}

export const REVIEW_QUIZ: ReviewQuizQuestion[] = `

const fmt = (v: unknown) => JSON.stringify(v, null, 2)

let out = header + iface + fmt(VOCAB)
out += grammarIface + fmt(GRAMMAR)
out += quizIface + fmt(QUIZ)
out += `

export const REVIEW_QUIZ_LETTERS = ['a', 'b', 'c', 'd'] as const
`

const target = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'review.ts')
if (issues.length === 0) {
  writeFileSync(target, out, 'utf8')
}

// ------------------------------------------------------------------ report ----
const vocabItems = VOCAB.reduce((n, g) => n + g.tables.reduce((t, x) => t + x.rows.filter((r) => r[0].trim()).length, 0), 0)
const tables = VOCAB.reduce((n, g) => n + g.tables.length, 0)
const grammarPoints = GRAMMAR.reduce((n, g) => n + g.points.length, 0)
console.log(`review parts → ${target}`)
console.log(`  vocab: ${VOCAB.length} groups / ${tables} tables / ${vocabItems} rows`)
console.log(`  grammar: ${GRAMMAR.length} groups / ${grammarPoints} points`)
console.log(`  quiz: ${QUIZ.length} questions`)
if (issues.length > 0) {
  console.log(`\n${issues.length} ISSUE(S):`)
  for (const i of issues) console.log('  - ' + i)
  process.exitCode = 1
} else {
  console.log('REVIEW VALID')
}