import type { WritingTask } from '../content/writing'

export interface WriteStats {
  words: number
  sentences: number
  paragraphs: number
}

export interface WriteIssue {
  kind: 'length' | 'sentences' | 'targets' | 'mechanics'
  text: string
  example?: string
}

export interface WritingCheck {
  score: number
  grade: string
  gradeLabel: string
  emoji: string
  stats: WriteStats
  targetsUsed: string[]
  targetsMissing: string[]
  wins: string[]
  issues: WriteIssue[]
}

function countStats(text: string): WriteStats {
  const words = text.split(/\s+/).filter((w) => w.trim().length > 0).length
  const sentences = text.split(/[.!?]+[\s$]/).map((s) => s.trim()).filter((s) => s.length > 0).length
  const paragraphs = Math.max(1, text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length)
  return { words, sentences, paragraphs }
}

function gradeFor(score: number): { grade: string; gradeLabel: string; emoji: string } {
  if (score >= 85) return { grade: 'A', gradeLabel: 'Excellent \u2013 wonderful writing!', emoji: '\u2B50' }
  if (score >= 70) return { grade: 'B', gradeLabel: 'Great work \u2013 so close!', emoji: '\u2B50' }
  if (score >= 55) return { grade: 'C', gradeLabel: 'Good progress \u2013 keep going!', emoji: '\u2606' }
  return { grade: 'D', gradeLabel: 'A good start \u2013 try once more.', emoji: '\u{1F331}' }
}

function point(s: string) {
  return { text: s }
}

function exampleAround(text: string, match: string, radius = 24): string {
  const i = text.toLowerCase().indexOf(match.toLowerCase())
  if (i === -1) return match
  const from = Math.max(0, i - radius / 2)
  const to = Math.min(text.length, i + match.length + radius / 2)
  return `\u201c${text.slice(from, to).trim()}\u201d`
}

export function checkWriting(text: string, task: Pick<WritingTask, 'minWords' | 'targets'>): WritingCheck {
  const stats = countStats(text)

  const wins: string[] = []
  const issues: WriteIssue[] = []

  // Mechanics: sentence-final punctuation
  const noFinal = text
    .split(/(?<=[a-zA-Z0-9)\u201d])\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !/[.!?]\s*$/.test(s))
  if (noFinal.length > 0) {
    issues.push({
      kind: 'mechanics',
      text: `Some sentences end without a full stop (${noFinal.length}). Add . ! or ? at the end.`,
      example: exampleAround(text, noFinal[0].slice(0, 12)),
    })
  }

  // Mechanics: capitalized sentence starts
  const lowStarts = text.match(/([.!?])\s+([a-z])/g)
  if (lowStarts && lowStarts.length > 0) {
    issues.push({
      kind: 'mechanics',
      text: `Start every new sentence with a capital letter (${lowStarts.length} example${lowStarts.length > 1 ? 's' : ''}).`,
      example: point(`\u201c${lowStarts[0]}\u2026\u201d`).text,
    })
  }
  const firstChar = text.trim()[0]
  if (/[a-z]/.test(firstChar ?? '')) {
    issues.push({
      kind: 'mechanics',
      text: 'Your paragraph starts with a small letter \u2013 start it with a capital letter.',
    })
  }

  // Mechanics: repeated word
  const dup = text.match(/\b(\w+)\s+(\1)\b/gi)
  if (dup && dup.length > 0) {
    issues.push({
      kind: 'mechanics',
      text: `The word ${text.match(/\b(\w+)\s+\1\b/gi)?.[0]?.split(/\s+/)[0]} appears twice in a row. Say it once.`,
      example: exampleAround(text, dup[0]),
    })
  }

  // Mechanics: double spaces
  if (/\s{2,}/.test(text)) {
    issues.push({ kind: 'mechanics', text: 'There are extra spaces between some words. Use one space only.' })
  }

  // Target words from the unit
  const lower = text.toLowerCase()
  const targetsUsed = task.targets.filter((t) => lower.includes(t))
  const targetsMissing = task.targets
    .filter((t) => !lower.includes(t))
    .sort((a, b) => a.length - b.length)
    .slice(0, 5)
  const cleanUsed = targetsUsed.filter((t) => t.trim().length > 1)

  // ---- Score (0-100) ----
  const lengthScore = Math.min(100, (stats.words / Math.max(1, task.minWords)) * 100)
  const sentenceScore = Math.min(100, (stats.sentences / 4) * 100)
  const targetScore = Math.min(100, (cleanUsed.length / 2) * 100)
  const structureScore =
    stats.paragraphs >= 2 ? 100 : stats.sentences >= 3 ? 60 : stats.words >= task.minWords ? 50 : 25
  const issuesTotal = issues.length
  const mechanicsScore = Math.max(0, 100 - issuesTotal * 15)

  const score = Math.round(
    lengthScore * 0.22 + sentenceScore * 0.16 + targetScore * 0.26 + structureScore * 0.12 + mechanicsScore * 0.24,
  )
  const g = gradeFor(score)

  // ---- Friendly feedback ----
  wins.push(
    `Nice! You wrote ${stats.words} word${stats.words === 1 ? '' : 's'} in ${stats.sentences} sentence${stats.sentences === 1 ? '' : 's'} across ${stats.paragraphs} paragraph${stats.paragraphs === 1 ? '' : 's'}.`,
  )
  if (cleanUsed.length >= 2) {
    wins.push(`Great \u2013 you used unit words: ${cleanUsed.slice(0, 4).join(', ')}.`)
  }
  if (stats.paragraphs >= 2) {
    wins.push('You used two or more paragraphs \u2013 that makes your writing easy to read.')
  }

  if (stats.words < task.minWords) {
    issues.push({
      kind: 'length',
      text: `Write a little more \u2013 add ${task.minWords - stats.words} more word${task.minWords - stats.words === 1 ? '' : 's'}. That helps you practise.`,
    })
  }
  if (stats.sentences < 3) {
    issues.push({
      kind: 'sentences',
      text: `Write ${3 - stats.sentences} more sentence${3 - stats.sentences === 1 ? '' : 's'} to tell the story.`,
    })
  }
  if (cleanUsed.length < 2) {
    const remaining = cleanUsed.length === 0 ? task.targets.slice(0, 3) : targetsMissing.slice(0, 2)
    issues.push({
      kind: 'targets',
      text: `Try to use words from this unit, for example: ${remaining.join(', ')}.`,
    })
  }

  return {
    score,
    ...g,
    stats,
    targetsUsed: cleanUsed,
    targetsMissing: targetsMissing.filter((t) => t.trim().length > 1),
    wins,
    issues: issues.map((i) => ({ ...i })),
  }
}