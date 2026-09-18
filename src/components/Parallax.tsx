import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export default function Parallax({
  strength = 22,
  className = '',
  children,
}: {
  strength?: number
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = (r.top + r.height / 2 - vh / 2) / (vh / 2)
      el.style.setProperty('--parallax', `${(-progress * strength).toFixed(1)}px`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [strength])

  return (
    <div ref={ref} data-parallax className={className}>
      {children}
    </div>
  )
}