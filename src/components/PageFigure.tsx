import type { PageImage } from '../types/content'
import { pageImageUrl } from '../lib/images'
import { IconZoomIn } from './Icons'
import { openLightbox } from './Media'

export function PageFigure({ image }: { image: PageImage }) {
  const src = pageImageUrl(image.pdf)
  return (
    <figure className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]">
      <button
        type="button"
        onClick={() => openLightbox(src)}
        className="group relative block w-full cursor-zoom-in"
        aria-label={`View page ${image.bookPage} full size`}
      >
        <img
          src={src}
          alt={image.alt ?? `Book page ${image.bookPage}`}
          loading="lazy"
          className="h-auto w-full bg-white"
        />
        <span className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white opacity-90 backdrop-blur transition-opacity group-hover:opacity-100">
          <IconZoomIn size={15} />
          Zoom
        </span>
      </button>
      {(image.caption ?? image.alt) && (
        <figcaption className="border-t border-[var(--line)] px-3 py-2 text-xs text-[var(--ink-faint)]">
          {image.caption ?? image.alt}
        </figcaption>
      )}
    </figure>
  )
}

export function PageThumb({ pdf, label }: { pdf: number; label?: string }) {
  const src = pageImageUrl(pdf)
  return (
    <a
      href={`/page/${pdf}`}
      className="block overflow-hidden rounded-lg border border-[var(--line)] bg-white transition-shadow hover:shadow-md"
    >
      <img src={src} alt={label ?? `PDF page ${pdf}`} loading="lazy" className="aspect-[3/4] w-full object-cover object-top" />
      {label && (
        <span className="block border-t border-[var(--line)] bg-[var(--surface)] px-2 py-1 text-[11px] text-[var(--ink-faint)]">
          {label}
        </span>
      )}
    </a>
  )
}