// Resolve scanned page images through Vite's module graph so asset URLs
// work in both dev and the hashed production build.
const pageImages = import.meta.glob<string>('/src/assets/book/*.jpg', {
  import: 'default',
  eager: true,
})

const FALLBACK = Object.values(pageImages)[0] ?? ''

export function pageImageUrl(pdf: number): string {
  const key = `/src/assets/book/p${String(pdf).padStart(3, '0')}.jpg`
  return pageImages[key] ?? FALLBACK
}

export const pageImageCount = Object.keys(pageImages).length