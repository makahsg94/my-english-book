import { UNIT_QUIZZES } from '../src/content/quizzes'
import { validateAllQuizzes, validateBookExercises, summarize } from '../src/lib/quizValidation'
import type { ValidationIssue } from '../src/lib/quizValidation'
import { REVIEW_VOCAB, REVIEW_GRAMMAR, REVIEW_QUIZ } from '../src/content/review'
import { leadIn } from '../src/content/units/lead-in'
import { unit01 } from '../src/content/units/unit-01'
import { unit02 } from '../src/content/units/unit-02'
import { unit03 } from '../src/content/units/unit-03'
import { unit04 } from '../src/content/units/unit-04'
import { unit05 } from '../src/content/units/unit-05'
import { unit06 } from '../src/content/units/unit-06'
import { unit07 } from '../src/content/units/unit-07'
import { unit08 } from '../src/content/units/unit-08'
import { finalReview } from '../src/content/units/final-review'

const hasArabic = (t: string) => /[\u0600-\u06FF]/.test(t)

const units = [leadIn, unit01, unit02, unit03, unit04, unit05, unit06, unit07, unit08, finalReview]

const quizIssues = validateAllQuizzes(UNIT_QUIZZES, units)
const exerciseIssues = validateBookExercises(units)

const print = (label: string, issues: (typeof quizIssues)[]) => {
  console.log(`\n=== ${label} ===`)
  if (issues.length === 0) {
    console.log('OK')
    return
  }
  for (const issue of issues) {
    const where = [issue.quizId ?? 'exercise', issue.unitId, issue.lessonId, issue.itemId].filter(Boolean).join(' / ')
    console.log(`  [${issue.code}] (${where}) ${issue.message}`)
  }
  console.log(summarize(issues))
}

print('Unit quizzes', quizIssues)
print('In-lesson exercises', exerciseIssues)

const reviewIssues = validateReview()
print('Review data', reviewIssues)

const total = quizIssues.length + exerciseIssues.length + reviewIssues.length
console.log(`\nResult: ${total === 0 ? 'ALL VALID' : `${quizIssues.length} quiz issue(s), ${exerciseIssues.length} exercise issue(s), ${reviewIssues.length} review issue(s)`}`)
if (total > 0) process.exitCode = 1

function validateReview(): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const push = (code: string, where: string, message: string) =>
    issues.push({ scope: 'quiz', unitId: 'review', itemId: where, code, message })

  const expected = new Set([1, 2, 3, 4, 5, 6, 7, 8])
  const seen = new Set<number>()
  const arabicLabels = (g: { unit: string }) => {
    const m = g.unit.match(/الوحدة (\d+):/)
    if (!m) return -1
    const n = Number(m[1])
    seen.add(n)
    return n
  }
  for (const group of REVIEW_VOCAB) {
    const num = arabicLabels(group)
    if (num === -1) push('REV-V1', group.unit, 'unit label must be "الوحدة N:"')
    if (group.tables.length === 0) push('REV-V2', group.unit, 'no tables')
    for (const table of group.tables) {
      const where = `${group.unit} · ${table.title}`
      if (!table.title.trim()) push('REV-V3', group.unit, 'empty table title')
      if (table.headers.length < 2 || table.headers.length > 5) push('REV-V4', where, `headers length ${table.headers.length}`)
      let anyArabic = table.headers.some((h) => hasArabic(h))
      table.rows.forEach((row, ri) => {
        if (row.length !== table.headers.length) push('REV-V5', `${where}/r${ri + 1}`, `${row.length} cells vs ${table.headers.length} headers`)
        if (!row[0]?.trim()) push('REV-V6', `${where}/r${ri + 1}`, 'empty first cell')
        if (row.some((c) => hasArabic(c))) anyArabic = true
      })
      if (!anyArabic) push('REV-V7', where, 'no Arabic content')
    }
  }
  for (const group of REVIEW_GRAMMAR) {
    const where = group.unit
    if (group.points.length === 0) push('REV-G1', where, 'no points')
    for (const point of group.points) {
      const where2 = `${where} · ${point.title}`
      if (!point.title || !hasArabic(point.title)) push('REV-G2', where2, 'title missing Arabic')
      if (!point.explanation || !hasArabic(point.explanation)) push('REV-G3', where2, 'explanation missing Arabic')
      if (point.rules.length === 0) push('REV-G4', where2, 'no rules')
      for (const r of point.rules) {
        if (!r.rule || !hasArabic(r.rule)) push('REV-G5', where2, `rule missing Arabic: "${r.rule}"`)
        if (!r.examples?.trim()) push('REV-G6', where2, 'rule has no examples')
      }
    }
  }
  for (const n of expected) if (!seen.has(n)) push('REV-V8', `unit ${n}`, 'missing vocab group')
  for (const g of REVIEW_GRAMMAR) {
    const m = g.unit.match(/الوحدة (\d+):/)
    if (!m || !expected.has(Number(m[1]))) push('REV-G7', g.unit, 'unexpected unit label')
  }

  if (REVIEW_QUIZ.length !== 25) push('REV-Q1', 'quiz', `expected 25 questions, got ${REVIEW_QUIZ.length}`)
  const optionSets = new Set<string>()
  REVIEW_QUIZ.forEach((q, i) => {
    const where = `quiz q${i + 1}`
    if (!q.prompt?.trim()) push('REV-Q2', where, 'empty prompt')
    if (!Array.isArray(q.options) || q.options.length !== 4) push('REV-Q3', where, `options length ${Array.isArray(q.options) ? q.options.length : 'n/a'}`)
    else {
      const key = q.options.join('\u0000')
      if (optionSets.has(key)) push('REV-Q4', where, 'duplicate option set')
      optionSets.add(key)
    }
    if (!q.answer || !q.options.includes(q.answer)) push('REV-Q5', where, `answer "${q.answer}" not in options`)
    if (!q.explanation || !hasArabic(q.explanation)) push('REV-Q6', where, 'explanation missing Arabic')
    if (q.wrongNotes) {
      for (const [opt, note] of Object.entries(q.wrongNotes)) {
        if (!q.options.includes(opt) || opt === q.answer) push('REV-Q7', where, `wrongNotes key "${opt}" is invalid`)
        if (!note || !hasArabic(note)) push('REV-Q8', where, `wrongNotes["${opt}"] missing Arabic`)
      }
    }
  })
  return issues
}