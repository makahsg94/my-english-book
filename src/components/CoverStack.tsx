import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconCheck, IconChevronRight } from './Icons'

export type StackCover = {
  unitId: string
  number: number
  title: string
  subtitle: string
  img: string
  done: boolean
}

function useCompact() {
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 640px)').matches)
  useEffect(() => {
    const m = window.matchMedia('(max-width: 640px)')
    const handler = () => setCompact(m.matches)
    m.addEventListener('change', handler)
    return () => m.removeEventListener('change', handler)
  }, [])
  return compact
}

function useHoverCapable() {
  const [hoverable, setHoverable] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  useEffect(() => {
    const m = window.matchMedia('(hover: hover) and (pointer: fine)')
    const handler = () => setHoverable(m.matches)
    m.addEventListener('change', handler)
    return () => m.removeEventListener('change', handler)
  }, [])
  return hoverable
}

export default function CoverStack({ covers }: { covers: StackCover[] }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [flipping, setFlipping] = useState<string | null>(null)
  const compact = useCompact()
  const hoverable = useHoverCapable()

  if (covers.length === 0) return null

  const W = compact ? 116 : 156
  const spread = compact ? 30 : 52
  const mid = (covers.length - 1) / 2

  const transformFor = (k: number) => {
    const gap = k - mid
    if (flipping === covers[k].unitId) {
      return { transform: 'rotateY(92deg)', zIndex: 50 }
    }
    if (open) {
      const z = covers.length - Math.abs(gap)
      return {
        transform: `translateX(${gap * spread}px) translateY(${-Math.abs(gap) * 3}px) rotateY(${gap * 9}deg)`,
        zIndex: z,
      }
    }
    return {
      transform: `translateY(${k * 6}px)`,
      zIndex: covers.length - k,
    }
  }

  const openUnit = (unitId: string) => {
    if (flipping) return
    setFlipping(unitId)
    window.setTimeout(() => {
      navigate(`/unit/${unitId}`)
    }, 360)
  }

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div
        className="stack-deck relative h-52 w-full sm:h-56"
        onMouseEnter={() => hoverable && setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {covers.map((cover, k) => {
          const t = transformFor(k)
          return (
            <div
              key={cover.unitId}
              className="stack-card left-1/2 top-1"
              style={{ ['--t' as string]: t.transform, zIndex: t.zIndex } as React.CSSProperties}
            >
              <button
                type="button"
                onClick={() => openUnit(cover.unitId)}
                aria-label={`Open ${cover.title}`}
                className="group block overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-lg"
                style={{ width: W, marginLeft: -W / 2 }}
              >
                <span className="relative block">
                  <img
                    src={cover.img}
                    alt=""
                    loading="lazy"
                    className="h-40 w-full border-b border-[var(--line)] object-cover object-top sm:h-44"
                  />
                  <span className="stack-caption pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 via-black/35 to-transparent p-2 opacity-0">
                    <span className="min-w-0">
                      <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-white/80">
                        {cover.subtitle}
                      </span>
                      <span className="block truncate text-[12px] font-semibold text-white">{cover.title}</span>
                    </span>
                    <IconChevronRight size={13} className="shrink-0 text-white" />
                  </span>
                  {cover.done && (
                    <span className="absolute left-1.5 top-1.5 grid size-5 place-items-center rounded-full bg-brand-600 text-white shadow">
                      <IconCheck size={11} />
                    </span>
                  )}
                </span>
              </button>
            </div>
          )
        })}
      </div>
      <p className="text-center text-[11px] leading-snug text-[var(--ink-faint)]">
        Hover the stack to fan the covers open {'\u2022'} click any cover to open the unit
      </p>
    </div>
  )
}