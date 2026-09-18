import type { AudioTrack, PageImage } from '../types/content'
import { AUDIO } from './audioMap'

/** Build a PageImage entry from the PDF page number (printed page = pdf - 14). */
export function img(pdf: number, caption?: string, alt?: string): PageImage {
  return { pdf, bookPage: pdf - 14, caption, alt }
}

/** Build AudioTrack[] from canonical track labels, resolving public audio URLs. */
export function au(labels: string[], page?: number): AudioTrack[] {
  const base = import.meta.env.BASE_URL
  return labels.map((label) => {
    const file = AUDIO[label]
    if (file) {
      return { label, file: base + file.replace(/^\//, ''), page }
    }
    return {
      label,
      page,
      note: 'Track not included in this copy of the audio',
    }
  })
}

export function pagePath(pdf: number): string {
  const n = String(pdf).padStart(3, '0')
  return `/book-pages/p${n}.jpg`
}