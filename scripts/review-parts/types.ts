// Shared types for the review generator parts. The generated src/content/review.ts
// re-declares these same interfaces inline (mirroring book 1), so this file only
// type-checks the authoring step.

export interface ReviewVocabTable {
  title: string
  headers: string[]
  rows: string[][]
}

export interface ReviewVocabGroup {
  unit: string
  tables: ReviewVocabTable[]
}

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

export interface ReviewQuizQuestion {
  prompt: string
  options: string[]
  answer: string
  /** Arabic note explaining why `answer` is correct. */
  explanation: string
  /** Optional Arabic note per wrong option explaining why that choice is wrong. */
  wrongNotes?: Record<string, string>
}