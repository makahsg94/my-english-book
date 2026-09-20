import { UNIT_QUIZZES } from '../src/content/quizzes'
import { validateAllQuizzes, validateBookExercises, summarize } from '../src/lib/quizValidation'
import { leadIn } from '../src/content/units/lead-in'
import { unit01 } from '../src/content/units/unit-01'
import { unit02 } from '../src/content/units/unit-02'
import { unit03 } from '../src/content/units/unit-03'
import { unit04 } from '../src/content/units/unit-04'
import { unit05 } from '../src/content/units/unit-05'
import { unit06 } from '../src/content/units/unit-06'
import { unit07 } from '../src/content/units/unit-07'
import { unit08 } from '../src/content/units/unit-08'
import { REVIEW_QUIZ } from '../src/content/review'

const hasArabic = (t: string) => /[\u0600-\u06FF]/.test(t)

const units = [leadIn, unit01, unit02, unit03, unit04, unit05, unit06, unit07, unit08]

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

const reviewIssues = validateReviewQuiz()
print('Review quiz', reviewIssues)

const total = quizIssues.length + exerciseIssues.length + reviewIssues.length
console.log(`\nResult: ${total === 0 ? 'ALL VALID' : `${quizIssues.length} quiz issue(s), ${exerciseIssues.length} exercise issue(s), ${reviewIssues.length} review issue(s)`}`)
if (total > 0) process.exitCode = 1

function validateReviewQuiz(): (typeof quizIssues)[] {
  const issues: (typeof quizIssues)[] = []
  const push = (code: string, where: string, message: string) =>
    issues.push({ scope: 'quiz', unitId: 'review', itemId: where, code, message })

  if (REVIEW_QUIZ.length !== 25) push('REV-Q0', 'quiz', `expected 25 questions, got ${REVIEW_QUIZ.length}`)
  REVIEW_QUIZ.forEach((q, i) => {
    const where = `q${i + 1}`
    if (!q.prompt?.trim()) push('REV-Q1', where, 'empty prompt')
    if (!Array.isArray(q.options) || q.options.length !== 4) push('REV-Q2', where, `options length ${Array.isArray(q.options) ? q.options.length : 'n/a'}`)
    if (!q.answer || !q.options.includes(q.answer)) push('REV-Q3', where, `answer "${q.answer}" not in options`)
    if (!q.explanation || !hasArabic(q.explanation)) push('REV-Q4', where, 'explanation missing Arabic')
    if (q.wrongNotes) {
      for (const [opt, note] of Object.entries(q.wrongNotes)) {
        if (!q.options.includes(opt) || opt === q.answer) push('REV-Q5', where, `wrongNotes key "${opt}" not a wrong option`)
        if (!note || !hasArabic(note)) push('REV-Q6', where, `wrongNotes["${opt}"] missing Arabic`)
      }
    }
  })
  return issues
}