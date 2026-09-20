import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { ContentBlock, GrammarBlock, Unit, VocabBlock } from '../src/types/content'
import { unit01 } from '../src/content/units/unit-01'
import { unit02 } from '../src/content/units/unit-02'
import { unit03 } from '../src/content/units/unit-03'
import { unit04 } from '../src/content/units/unit-04'
import { unit05 } from '../src/content/units/unit-05'
import { unit06 } from '../src/content/units/unit-06'
import { unit07 } from '../src/content/units/unit-07'
import { unit08 } from '../src/content/units/unit-08'

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), 'review-parts')
mkdirSync(OUT_DIR, { recursive: true })

interface VocabRow {
  word: string
  meaning?: string
  example?: string
  pronunciation?: string
  note?: string
  opposite?: string
  response?: string
}

interface VocabEntry {
  unitNumber: number
  lessonCode: string
  lessonTitle: string
  blockTitle: string
  source?: string
  items: VocabRow[]
}

interface GrammarEntry {
  unitNumber: number
  lessonCode: string
  lessonTitle: string
  title: string
  explanation?: string
  rule?: string
  examples?: string[]
  bankPage?: number
  table?: { headers: string[]; rows: { label?: string; values: string[] }[] }
}

function isVocab(b: ContentBlock): b is VocabBlock {
  return b.type === 'vocab'
}

function isGrammar(b: ContentBlock): b is GrammarBlock {
  return b.type === 'grammar'
}

function collect(unit: Unit): { vocab: VocabEntry[]; grammar: GrammarEntry[] } {
  const vocab: VocabEntry[] = []
  const grammar: GrammarEntry[] = []
  for (const lesson of unit.lessons) {
    for (const block of lesson.blocks) {
      if (isVocab(block)) {
        vocab.push({
          unitNumber: unit.number,
          lessonCode: lesson.code,
          lessonTitle: lesson.title,
          blockTitle: block.title ?? '',
          source: block.source,
          items: block.items.map((it) => ({
            word: it.word,
            meaning: it.meaning,
            example: it.example,
            pronunciation: it.pronunciation,
            note: it.note,
            opposite: it.opposite,
            response: it.response,
          })),
        })
      } else if (isGrammar(block)) {
        grammar.push({
          unitNumber: unit.number,
          lessonCode: lesson.code,
          lessonTitle: lesson.title,
          title: block.title ?? '',
          explanation: block.explanation,
          rule: block.rule,
          examples: block.examples,
          bankPage: block.bankPage,
          table: block.table
            ? {
                headers: block.table.headers,
                rows: block.table.rows.map((r) => ({ label: r.label, values: r.values })),
              }
            : undefined,
        })
      }
    }
  }
  return { vocab, grammar }
}

const units = [unit01, unit02, unit03, unit04, unit05, unit06, unit07, unit08]

const all = units.map((u) => ({ unit: u, ...collect(u) }))
const meta = all.map(({ unit }) => ({ id: unit.id, number: unit.number, title: unit.title, phrase: unit.phrase }))

const dump = (range: number[], label: string) => {
  const slice = all.filter((e) => range.includes(e.unit.number))
  const out = {
    units: meta.filter((m) => range.includes(m.number)),
    vocab: slice.flatMap((s) => s.vocab),
    grammar: slice.flatMap((s) => s.grammar),
  }
  const file = join(OUT_DIR, `source-${label}.json`)
  writeFileSync(file, JSON.stringify(out, null, 2), 'utf8')

  const items = out.vocab.reduce((n, v) => n + v.items.length, 0)
  const grammars = out.grammar.length
  const tables = out.vocab.length
  console.log(`[${label}] wrote ${file}`)
  console.log(`  units: ${range.join(',')} · vocab blocks: ${tables} · vocab items: ${items} · grammar points: ${grammars}`)
}

dump([1, 2, 3, 4], '1-4')
dump([5, 6, 7, 8], '5-8')

const totalItems = all.reduce((n, s) => n + s.vocab.reduce((m, v) => m + v.items.length, 0), 0)
const totalTables = all.reduce((n, s) => n + s.vocab.length, 0)
const totalGrammar = all.reduce((n, s) => n + s.grammar.length, 0)
console.log(`\nTOTAL — vocab blocks: ${totalTables} · vocab items: ${totalItems} · grammar points: ${totalGrammar}`)