import type { Book, Lesson, Unit } from '../types/content'
import { leadIn } from './units/lead-in'
import { unit01 } from './units/unit-01'
import { unit02 } from './units/unit-02'
import { unit03 } from './units/unit-03'
import { unit04 } from './units/unit-04'
import { unit05 } from './units/unit-05'
import { unit06 } from './units/unit-06'
import { unit07 } from './units/unit-07'
import { unit08 } from './units/unit-08'
import ocrHints from './ocrHints.json'

const UNITS: Unit[] = [
  leadIn,
  unit01,
  unit02,
  unit03,
  unit04,
  unit05,
  unit06,
  unit07,
  unit08,
]

export const BOOK: Book = {
  id: 'speakout-b1',
  title: 'Speakout',
  subtitle: 'Student\u2019s Book with eBook and Online Practice',
  edition: '3rd Edition',
  level: 'B1',
  authors: ['Frances Eales', 'Steve Oakes'],
  description:
    'Interactive course companion for the Speakout B1 Student\u2019s Book \u2013 every unit, grammar reference, vocabulary bank and review with quizzes, audio and progress tracking.',
  coverPage: 3,
  units: UNITS,
  banks: [
    {
      id: 'grammar',
      title: 'Grammar Bank',
      description: 'Reference and practice for the grammar of each lesson, pages 104\u2013135.',
      pages: [104, 135],
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary Bank',
      description: 'Words and phrases grouped by unit (including the Lead-in), pages 136\u2013145.',
      pages: [136, 145],
    },
    {
      id: 'mediation',
      title: 'Mediation Bank',
      description: 'Mediation skill tasks referenced in the lessons, pages 150\u2013157.',
      pages: [150, 157],
    },
  ],
  searchablePages: ocrHints,
}

export function getUnit(id: string): Unit | undefined {
  return UNITS.find((u) => u.id === id)
}

export function getLesson(unitId: string, lessonId: string): Lesson | undefined {
  return getUnit(unitId)?.lessons.find((l) => l.id === lessonId)
}

export interface FlatEntry {
  unit: Unit
  lesson: Lesson
}

/** Flat list of all lessons (including Reviews), preserving book order. */
export function flattenLessons(): FlatEntry[] {
  return UNITS.flatMap((unit) => unit.lessons.map((lesson) => ({ unit, lesson })))
}

export interface NavTarget {
  unitId?: string
  lessonId?: string
}

/** Previous/next lesson in book order (Reviews can point back into a unit). */
export function nav(unitId: string, lessonId: string): { prev?: NavTarget; next?: NavTarget } {
  const flat = flattenLessons()
  const i = flat.findIndex((f) => f.unit.id === unitId && f.lesson.id === lessonId)
  if (i === -1) return {}
  return {
    prev: i > 0 ? { unitId: flat[i - 1].unit.id, lessonId: flat[i - 1].lesson.id } : undefined,
    next: i < flat.length - 1 ? { unitId: flat[i + 1].unit.id, lessonId: flat[i + 1].lesson.id } : undefined,
  }
}

/** Printed book page of a given PDF page, if present in the OCR index. */
export function pageInfo(pdf: number) {
  return BOOK.searchablePages.find((p) => p.pdf === pdf)
}