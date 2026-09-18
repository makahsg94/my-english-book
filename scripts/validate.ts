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

const total = quizIssues.length + exerciseIssues.length
console.log(`\nResult: ${total === 0 ? 'ALL VALID' : `${quizIssues.length} quiz issue(s), ${exerciseIssues.length} exercise issue(s)`}`)
if (total > 0) process.exitCode = 1