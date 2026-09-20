// Regenerates only the quiz section of src/content/review.ts from the authored
// parts file (scripts/review-parts/quiz.ts), preserving vocab/grammar as-is.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { type QuizQuestion, QUIZ } from './review-parts/quiz'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const file = path.join(root, 'src', 'content', 'review.ts')
const src = readFileSync(file, 'utf8')

const hasArabic = (t: string) => /[\u0600-\u06FF]/.test(t)
const issues: string[] = []

if (QUIZ.length !== 25) issues.push(`quiz: expected 25 questions, got ${QUIZ.length}`)
QUIZ.forEach((q, i) => {
  const where = `quiz[${i}]`
  if (!q.prompt?.trim()) issues.push(`${where}: empty prompt`)
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    issues.push(`${where}: options length ${Array.isArray(q.options) ? q.options.length : 'n/a'}`)
  }
  if (!q.answer || !q.options.includes(q.answer)) issues.push(`${where}: answer "${q.answer}" not in options`)
  if (!q.explanation || !hasArabic(q.explanation)) issues.push(`${where}: explanation must be Arabic — "${q.explanation}"`)
  if (q.wrongNotes) {
    for (const [opt, note] of Object.entries(q.wrongNotes)) {
      if (!q.options.includes(opt) || opt === q.answer) issues.push(`${where}: wrongNotes key "${opt}" is not a wrong option`)
      if (!note || !hasArabic(note)) issues.push(`${where}: wrongNotes["${opt}"] must be Arabic`)
    }
  }
})

if (issues.length > 0) {
  console.error('ERRORS:\n' + issues.map((i) => `  - ${i}`).join('\n'))
  process.exit(1)
}

const block = (q: QuizQuestion) => {
  const notes = q.wrongNotes ? `\n    wrongNotes: ${JSON.stringify(q.wrongNotes)},` : ''
  return `  {
    prompt: ${JSON.stringify(q.prompt)},
    options: ${JSON.stringify(q.options)},
    answer: ${JSON.stringify(q.answer)},
    explanation: ${JSON.stringify(q.explanation)},${notes}
  },`
}

const iface = `export interface ReviewQuizQuestion {
  prompt: string
  options: string[]
  answer: string
  /** Arabic note explaining why \`answer\` is correct. */
  explanation: string
  /** Optional Arabic note per wrong option explaining why that choice is wrong. */
  wrongNotes?: Record<string, string>
}

export const REVIEW_QUIZ: ReviewQuizQuestion[] = [
${QUIZ.map(block).join('\n')}
]
`

const start = src.indexOf('export interface ReviewQuizQuestion')
const end = src.indexOf('export const REVIEW_QUIZ_LETTERS')
if (start === -1 || end === -1 || end < start) {
  console.error('Could not locate quiz block markers in src/content/review.ts')
  process.exit(1)
}

const out = src.slice(0, start) + iface.trimEnd() + '\n' + src.slice(end)
writeFileSync(file, out)
console.log('quiz regenerated with explanations: 25 questions VALID')