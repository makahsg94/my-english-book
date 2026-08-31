// ---------------------------------------------------------------------------
// Content model for the Speakout A2 Student's Book platform.
// All book content lives in src/content/. These types describe how lessons,
// sections and exercises are structured so the UI can render them generically
// (add a lesson → add data, no component changes required).
// ---------------------------------------------------------------------------

export interface PageImage {
  /** PDF page index (1-based) used to resolve the asset path /assets/book/pNNN.jpg */
  pdf: number
  /** Printed book page number */
  bookPage: number
  /** Optional caption shown under the image */
  caption?: string
  alt?: string
}

export interface AudioTrack {
  /** Track label as printed in the book, e.g. "2.07" or "VB 4.01" */
  label: string
  /** Public path of the audio file, e.g. /audio/034_SO3_A2_SB_2C_Audio_2_07.mp3 */
  file?: string
  /** Shown when the audio file is not included in this copy */
  note?: string
  /** Where the track appears (printed page) */
  page?: number
}

export interface VideoRef {
  title: string
  /** Source file name (in the provided media pack) */
  file: string
  /** Where the video activity appears in the book */
  page?: number
  /** Note, e.g. video not bundled to keep the project small */
  note?: string
}

// ---------------------------------------------------------------------------
// Exercises
// ---------------------------------------------------------------------------

export type ExerciseKind = 'mcq' | 'true-false' | 'fill-blank' | 'matching' | 'ordering'

export interface McqOption {
  label: string
  correct?: boolean
}

export interface MatchingPair {
  left: string
  right: string
}

export type ExerciseQuestion =
  | {
      id: string
      kind: 'mcq'
      prompt: string
      options: McqOption[]
    }
  | {
      id: string
      kind: 'true-false'
      statement: string
      correct: boolean
    }
  | {
      id: string
      kind: 'fill-blank'
      /** sentence before the blank, e.g. "I ___ football every" */
      before: string
      /** the correct answer word(s) */
      answer: string
      /** other accepted spellings/alternatives (checked case-insensitively) */
      accept?: string[]
      /** sentence after the blank */
      after: string
    }
  | {
      id: string
      kind: 'matching'
      /** pairs to match (left = item, right = correct partner) */
      pairs: MatchingPair[]
    }
  | {
      id: string
      kind: 'ordering'
      title: string
      /** items in the order the learner must reconstruct */
      items: string[]
      prompt?: string
    }

export interface Exercise {
  id: string
  /** Short name, e.g. "2A Vocabulary" */
  title: string
  kind: ExerciseKind
  /** Instructions as printed in the book */
  instructions?: string
  questions: ExerciseQuestion[]
  /** printed book page the exercise comes from */
  page?: number
  /** set true when the answer has been transcribed from the book and verified */
  verified?: boolean
  /** set true when content might contain OCR ambiguity requiring manual review */
  needsReview?: boolean
}

// ---------------------------------------------------------------------------
// Content blocks renderable inside a lesson
// ---------------------------------------------------------------------------

export interface VocabItem {
  word: string
  meaning?: string
  example?: string
  pronunciation?: string
  note?: string
  opposite?: string
  /** a model answer / sample line that goes with the word (e.g. social phrases) */
  response?: string
}

export interface GrammarTableRow {
  label?: string
  values: string[]
}

export type ContentBlock =
  | {
      type: 'text'
      title?: string
      paragraphs: string[]
    }
  | {
      type: 'callout'
      title?: string
      tone?: 'info' | 'tip' | 'note' | 'warning'
      text: string
    }
  | {
      type: 'vocab'
      title?: string
      items: VocabItem[]
      /** e.g. "Vocabulary Bank page 130" */
      source?: string
    }
  | {
      type: 'grammar'
      title?: string
      explanation?: string
      rule?: string
      table?: { headers: string[]; rows: GrammarTableRow[] }
      examples?: string[]
      /** optional link to grammar bank book page */
      bankPage?: number
    }
  | {
      type: 'examples'
      title?: string
      items: string[]
    }
  | {
      type: 'exercise'
      exercise: Exercise
    }
  | {
      type: 'audio'
      title?: string
      tracks: AudioTrack[]
    }
  | {
      type: 'video'
      title?: string
      videos: VideoRef[]
    }
  | {
      type: 'pages'
      images: PageImage[]
    }
  | {
      type: 'review'
      title?: string
      text: string
    }

// ---------------------------------------------------------------------------
// Lessons and units
// ---------------------------------------------------------------------------

export interface Lesson {
  id: string
  /** lesson code as printed, e.g. "1A", "2C", "Review" */
  code: string
  title: string
  subtitle?: string
  /** printed page range, e.g. [10, 11] */
  pages: [number, number]
  /** short meta labels taken from the lesson header, e.g. "Grammar / present simple" */
  labels?: { grammar?: string; vocabulary?: string; pronunciation?: string; skills?: string }
  objectives?: string[]
  blocks: ContentBlock[]
}

export interface Unit {
  id: string
  number: number
  title: string
  phrase?: string
  /** printed page of the unit opener with learning objectives */
  overviewPage: number
  pages: [number, number]
  intro?: string
  objectives?: string[]
  /** BBC video materials for the unit */
  video?: VideoRef[]
  /** class audio tracks shared across the unit */
  audio?: AudioTrack[]
  lessons: Lesson[]
  /** e.g. "Unit 1 Review" entry - rendered as a lesson too */
  videoNote?: string
}

export interface BankKind {
  id: string
  title: string
  pages: [number, number]
}

export interface Book {
  id: string
  title: string
  subtitle: string
  edition: string
  level: string
  authors: string[]
  description: string
  coverPage: number
  units: Unit[]
  banks: { id: string; title: string; description: string; pages: [number, number] }[]
  searchablePages: { pdf: number; bookPage: number; label: string; text: string }[]
}