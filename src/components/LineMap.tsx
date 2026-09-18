import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BOOK } from '../content/book'
import { useProgress } from '../lib/appContext'
import { IconCheck } from './Icons'

const W = 1200
const H = 380
const X0 = 96
const SPAN = W - X0 * 2

function stationY(i: number, n: number) {
  const base = H / 2
  const wave = n === 1 ? 0 : Math.sin((i / (n - 1)) * Math.PI * 1.7)
  return base + wave * 96
}

function calcPoints(n: number) {
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i < n; i += 1) {
    pts.push({ x: X0 + (i * SPAN) / Math.max(1, n - 1), y: stationY(i, n) })
  }
  return pts
}

function buildPath(pts: { x: number; y: number }[], to: number) {
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i <= Math.min(to, pts.length - 1); i += 1) {
    const p0 = pts[i - 1]
    const p1 = pts[i]
    d += ` q ${(p1.x - p0.x) / 2} 0, ${p1.x - p0.x} ${p1.y - p0.y}`
  }
  return d
}

export default function LineMap() {
  const navigate = useNavigate()
  const progress = useProgress()
  const [reduce, setReduce] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(mq.matches)
    const on = (e: MediaQueryListEvent) => setReduce(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const units = BOOK.units
  const n = units.length
  const pts = calcPoints(n)

  const lastUnitIndex = progress.state.lastUnit ? units.findIndex((u) => u.id === progress.state.lastUnit) : -1
  const currentIndex = lastUnitIndex >= 0 ? lastUnitIndex : 0

  const carried = buildPath(pts, currentIndex)
  const full = buildPath(pts, n - 1)
  const frac = Math.max(0, Math.min(1, currentIndex / Math.max(1, n - 1)))

  return (
    <div className="line-card overflow-hidden px-4 pb-3 pt-6 sm:px-6">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`The Speakout line: ${n} stations`}>
        <path d={full} className="line-track" />
        {!reduce && <path d={full} className="line-track-dash" />}
        {currentIndex > 0 && <path d={carried} className="line-traveled" />}

        {units.map((unit, i) => {
          const p = pts[i]
          const done = unit.lessons.every((l) => progress.isLessonComplete(l.id))
          const current = i === currentIndex
          const fill = done ? 'var(--color-brand-600)' : current ? 'var(--color-accent-500)' : 'var(--surface)'
          const stroke = done || current ? 'none' : 'var(--line-strong)'
          const numFill = done || current ? '#fff' : 'var(--ink-faint)'
          const above = p.y > H * 0.62
          const labelY = above ? p.y - 40 : p.y + 46
          return (
            <g key={unit.id} className={`station-dot${done ? ' reached' : ''}`} onClick={() => navigate(`/unit/${unit.id}`)}>
              {current && !reduce && <circle cx={p.x} cy={p.y} r={22} className="station-pulse" fill="var(--color-accent-500)" />}
              <circle className="dot" cx={p.x} cy={p.y} r={current ? 22 : 16} fill={fill} stroke={stroke} strokeWidth={2.5} />
              {done && <circle className="dot-ring" cx={p.x} cy={p.y} r={current ? 28 : 21} />}
              {done ? (
                <IconCheck
                  size={current ? 18 : 14}
                  x={p.x - (current ? 9 : 7)}
                  y={p.y - (current ? 9 : 7)}
                  className="pointer-events-none"
                  fill="none"
                />
              ) : (
                <text className="num" x={p.x} y={p.y + 6} textAnchor="middle" fontSize={current ? 17 : 14} fill={numFill}>
                  {unit.number === 0 ? '0' : String(unit.number)}
                </text>
              )}
              <text
                className="label"
                x={p.x}
                y={labelY}
                textAnchor="middle"
                fontSize={13}
                fontWeight={current ? 700 : 500}
              >
                {unit.number === 0 ? 'Lead-in' : `Unit ${unit.number}`}
              </text>
            </g>
          )
        })}

        {!reduce && currentIndex > 0 && (
          <g className="train-body train-glow">
            <animateMotion dur="2.6s" repeatCount="1" fill="freeze" keyPoints={`0;${frac}`} keyTimes="0;1" calcMode="linear" path={carried} />
            <rect className="tm" x={-26} y={-15} width={48} height={30} rx={7} />
            <path className="tnose" d="M 26 -12 L 36 0 L 26 12 Z" />
            <rect className="twin" x={-18} y={-10} width={10} height={9} rx={2} />
            <rect className="twin" x={-4} y={-10} width={10} height={9} rx={2} />
            <rect className="twin" x={10} y={-10} width={10} height={9} rx={2} />
          </g>
        )}
      </svg>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-2 px-1 pb-1 text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
        <span>Single track {'\u00b7'} {n} stations {'\u00b7'} board at station {'\u2018'}{units[currentIndex].number === 0 ? 'Lead-in' : `Unit ${units[currentIndex].number}`}{'\u2019'}</span>
        <span>End of the line: reference banks</span>
      </div>
    </div>
  )
}