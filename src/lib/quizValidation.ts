import type { Exercise, ExerciseQuestion, QuizCategory, QuizDifficulty, Unit, UnitQuiz } from '../types/content'

export interface ValidationIssue {
  scope: 'quiz' | 'exercise'
  quizId?: string
  unitId: string
  lessonId?: string
  itemId?: string
  code: string
  message: string
}

const CATEGORIES: QuizCategory[] = ['grammar', 'vocabulary', 'reading', 'communication']
const DIFFICULTIES: QuizDifficulty[] = ['easy', 'medium', 'hard']

function push(
  issues: ValidationIssue[],
  scope: 'quiz' | 'exercise',
  unitId: string,
  code: string,
  message: string,
  extra: { quizId?: string; lessonId?: string; itemId?: string } = {},
) {
  issues.push({ scope, unitId, code, message, ...extra })
}

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim()

/** Validate the global shape of a UnitQuiz and every question inside it. */
export function validateUnitQuiz(quiz: UnitQuiz, units: Unit[]): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const unit = units.find((u) => u.id === quiz.unitId)

  if (!unit) {
    issues.push({ scope: 'quiz', quizId: quiz.id, unitId: quiz.unitId, code: 'UNKNOWN_UNIT', message: `Quiz references unknown unit "${quiz.unitId}".` })
  }

  if (!quiz.id.trim()) {
    issues.push({ scope: 'quiz', quizId: quiz.id, unitId: quiz.unitId, code: 'EMPTY_QUIZ_ID', message: 'Quiz id is empty.' })
  }

  if (!quiz.description.trim()) push(issues, 'quiz', quiz.unitId, 'EMPTY_DESCRIPTION', `Quiz "${quiz.id}" has an empty description.`, { quizId: quiz.id })

  const count = quiz.questions.length
  const max = quiz.maxQuestions ?? 20
  if (count < 8 || count > max) {
    push(issues, 'quiz', quiz.unitId, 'QUESTION_COUNT', `Quiz "${quiz.id}" has ${count} questions (expected 8\u2013${max}).`, { quizId: quiz.id })
  }

  for (const item of quiz.questions) {
    const base = { quizId: quiz.id, lessonId: item.lessonId, itemId: item.id }

    if (item.unitId !== quiz.unitId) {
      push(issues, 'quiz', quiz.unitId, 'UNIT_MISMATCH', `Question ${item.id} has unitId "${item.unitId}" but the quiz unitId is "${quiz.unitId}".`, base)
    }

    if (!unit) continue
    if (!unit.lessons.some((l) => l.id === item.lessonId)) {
      push(issues, 'quiz', quiz.unitId, 'UNKNOWN_LESSON', `Question ${item.id} references unknown lesson "${item.lessonId}" in unit "${quiz.unitId}".`, base)
    }

    if (!CATEGORIES.includes(item.category)) {
      push(issues, 'quiz', quiz.unitId, 'UNKNOWN_CATEGORY', `Question ${item.id} has invalid category "${String(item.category)}".`, base)
    }
    if (!DIFFICULTIES.includes(item.difficulty)) {
      push(issues, 'quiz', quiz.unitId, 'UNKNOWN_DIFFICULTY', `Question ${item.id} has invalid difficulty "${String(item.difficulty)}".`, base)
    }
    if (!item.skill.trim()) push(issues, 'quiz', quiz.unitId, 'EMPTY_SKILL', `Question ${item.id} has no skill label.`, base)
    if (!item.explanation.trim()) push(issues, 'quiz', quiz.unitId, 'EMPTY_EXPLANATION', `Question ${item.id} has no explanation.`, base)

    const q = item.question
    if (q.kind === 'mcq') {
      if (!q.prompt.trim()) push(issues, 'quiz', quiz.unitId, 'EMPTY_PROMPT', `MCQ ${item.id} has an empty prompt.`, base)
      const labels = q.options.map((o) => o.label.trim())
      const correct = q.options.filter((o) => o.correct)
      if (q.options.length < 2) push(issues, 'quiz', quiz.unitId, 'TOO_FEW_OPTIONS', `MCQ ${item.id} needs at least two options.`, base)
      if (correct.length === 0) push(issues, 'quiz', quiz.unitId, 'NO_CORRECT', `MCQ ${item.id} has no correct option.`, base)
      if (correct.length > 1) push(issues, 'quiz', quiz.unitId, 'MULTIPLE_CORRECT', `MCQ ${item.id} has ${correct.length} correct options.`, base)
      labels.forEach((label, i) => {
        if (!label) push(issues, 'quiz', quiz.unitId, 'EMPTY_OPTION', `MCQ ${item.id} has an empty option (option ${i + 1}).`, base)
      })
      if (new Set(labels.map(norm)).size !== labels.length) {
        push(issues, 'quiz', quiz.unitId, 'DUPLICATE_OPTIONS', `MCQ ${item.id} has duplicate option labels.`, base)
      }
    }
    if (q.kind === 'true-false' && !q.statement.trim()) {
      push(issues, 'quiz', quiz.unitId, 'EMPTY_STATEMENT', `True/false ${item.id} has an empty statement.`, base)
    }
    if (q.kind === 'fill-blank') {
      if (!q.answer.trim()) push(issues, 'quiz', quiz.unitId, 'EMPTY_ANSWER', `Fill-blank ${item.id} has no answer.`, base)
      if (!q.before.trim() && !q.after.trim()) {
        push(issues, 'quiz', quiz.unitId, 'EMPTY_CONTEXT', `Fill-blank ${item.id} has no surrounding context.`, base)
      }
    }
  }

  return issues
}

function validateMcqShape(
  issues: ValidationIssue[],
  question: Extract<ExerciseQuestion, { kind: 'mcq' }>,
  scope: 'quiz' | 'exercise',
  unitId: string,
  itemId: string,
) {
  if (!question.prompt.trim()) push(issues, scope, unitId, 'EMPTY_PROMPT', `MCQ ${itemId} has an empty prompt.`, { itemId })
  const labels = question.options.map((o) => o.label.trim())
  const correct = question.options.filter((o) => o.correct)
  if (question.options.length < 2) push(issues, scope, unitId, 'TOO_FEW_OPTIONS', `MCQ ${itemId} needs at least two options.`, { itemId })
  if (correct.length === 0) push(issues, scope, unitId, 'NO_CORRECT', `MCQ ${itemId} has no correct option.`, { itemId })
  if (correct.length > 1) push(issues, scope, unitId, 'MULTIPLE_CORRECT', `MCQ ${itemId} has ${correct.length} correct options.`, { itemId })
  labels.forEach((label, i) => {
    if (!label) push(issues, scope, unitId, 'EMPTY_OPTION', `MCQ ${itemId} has an empty option (option ${i + 1}).`, { itemId })
  })
  if (new Set(labels.map(norm)).size !== labels.length) {
    push(issues, scope, unitId, 'DUPLICATE_OPTIONS', `MCQ ${itemId} has duplicate option labels.`, { itemId })
  }
}

/** Validate every exercise of every lesson in the given units (in-lesson data). */
export function validateBookExercises(units: Unit[]): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  for (const unit of units) {
    for (const lesson of unit.lessons) {
      for (const block of lesson.blocks) {
        if (block.type !== 'exercise') continue
        const ex: Exercise = block.exercise
        for (const q of ex.questions) {
          const base = { lessonId: lesson.id, itemId: q.id }
          if (!q.id.trim()) push(issues, 'exercise', unit.id, 'EMPTY_ID', 'Exercise question has an empty id.', base)
          switch (q.kind) {
            case 'mcq':
              validateMcqShape(issues, q, 'exercise', unit.id, q.id)
              break
            case 'true-false':
              if (!q.statement.trim()) push(issues, 'exercise', unit.id, 'EMPTY_STATEMENT', `True/false ${q.id} has an empty statement.`, base)
              break
            case 'fill-blank':
              if (!q.answer.trim()) push(issues, 'exercise', unit.id, 'EMPTY_ANSWER', `Fill-blank ${q.id} has no answer.`, base)
              if (!q.before.trim() && !q.after.trim()) push(issues, 'exercise', unit.id, 'EMPTY_CONTEXT', `Fill-blank ${q.id} has no surrounding context.`, base)
              break
            case 'matching':
              if (q.pairs.length === 0) push(issues, 'exercise', unit.id, 'EMPTY_PAIRS', `Matching ${q.id} has no pairs.`, base)
              const left = q.pairs.map((p) => p.left.trim())
              const right = q.pairs.map((p) => p.right.trim())
              if (new Set(left.map(norm)).size !== left.length) push(issues, 'exercise', unit.id, 'DUPLICATE_LEFT', `Matching ${q.id} has duplicate left items.`, base)
              if (new Set(right.map(norm)).size !== right.length) push(issues, 'exercise', unit.id, 'DUPLICATE_RIGHT', `Matching ${q.id} has duplicate right items.`, base)
              left.forEach((l, i) => {
                if (!l || !right[i]) push(issues, 'exercise', unit.id, 'EMPTY_PAIR', `Matching ${q.id} has an empty item in pair ${i + 1}.`, base)
              })
              break
            case 'ordering':
              if (q.items.length < 2) push(issues, 'exercise', unit.id, 'TOO_FEW_ITEMS', `Ordering ${q.id} needs at least two items.`, base)
              if (new Set(q.items.map(norm)).size !== q.items.length) push(issues, 'exercise', unit.id, 'DUPLICATE_ITEMS', `Ordering ${q.id} has duplicate items.`, base)
              break
          }
        }
      }
    }
  }

  return issues
}

/** Validate all unit quizzes against the book structure. */
export function validateAllQuizzes(quizzes: UnitQuiz[], units: Unit[]): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const seen = new Set<string>()
  for (const quiz of quizzes) {
    if (seen.has(quiz.id)) {
      push(issues, 'quiz', quiz.unitId, 'DUPLICATE_QUIZ_ID', `Duplicate quiz id "${quiz.id}".`, { quizId: quiz.id })
    }
    seen.add(quiz.id)
    issues.push(...validateUnitQuiz(quiz, units))
  }
  return issues
}

export function summarize(issues: ValidationIssue[]): string {
  const byCode = new Map<string, number>()
  for (const i of issues) byCode.set(i.code, (byCode.get(i.code) ?? 0) + 1)
  if (issues.length === 0) return 'No validation issues.'
  const lines = [...byCode.entries()].map(([code, n]) => `  ${n} \u00d7 ${code}`).join('\n')
  return `Found ${issues.length} validation issue(s):\n${lines}`
}