// Daily share card – drawn entirely on a <canvas> (no libraries).
// Metro "Speakout Line" style: a level ring, today's stats and the line itself.

import type { ProgressState } from './progress'
import { levelForXp, achievementsFor, todayCounts } from './progress'

const W = 1200
const H = 630

const FONT = 'Segoe UI, Arial, sans-serif'
const BG_TOP = '#101624'
const BG_BOTTOM = '#211a2e'
const TRACK = '#2c3446'
const TRAVELED = '#e8642f'
const INK = '#f4f6fb'
const SOFT = '#9aa5b8'
const CARD = 'rgba(255,255,255,0.06)'
const CARD_LINE = 'rgba(255,255,255,0.12)'

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function text(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, { color = INK, weight = '600', caps = false } = {}) {
  ctx.font = `${weight} ${size}px ${FONT}`
  ctx.fillStyle = color
  ctx.fillText(caps ? s.toUpperCase() : s, x, y)
}

export function drawShareCard(state: ProgressState, totalLessons: number): string {
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  const count = Object.values(state.lessons).filter((l) => l.completed).length
  const today = todayCounts(state)
  const achievements = achievementsFor(state, totalLessons)
  const earned = achievements.filter((a) => a.earned).length
  const level = levelForXp(state.xp)
  const label = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })

  // background
  const grad = ctx.createLinearGradient(0, 0, 0, H)
  grad.addColorStop(0, BG_TOP)
  grad.addColorStop(1, BG_BOTTOM)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  // faint station pulses
  for (let i = 0; i < 5; i += 1) {
    ctx.fillStyle = 'rgba(232,100,47,0.06)'
    ctx.beginPath()
    ctx.arc(90 + i * 260, 50 + (i % 3) * 22, 40, 0, Math.PI * 2)
    ctx.fill()
  }

  // heading
  text(ctx, 'The Speakout Line', 60, 92, 34, { color: INK, weight: '800', caps: true })
  text(ctx, 'Speakout A2 \u00b7 3rd edition \u00b7 course companion', 60, 122, 15, { color: SOFT, weight: '600' })
  text(ctx, label, W - 60, 92, 16, { color: SOFT, weight: '600', caps: true })

  // level ring
  const cx = 250
  const cy = 350
  const R = 130
  ctx.lineWidth = 14
  ctx.strokeStyle = CARD_LINE
  ctx.beginPath()
  ctx.arc(cx, cy, R, 0, Math.PI * 2)
  ctx.stroke()
  ctx.strokeStyle = TRAVELED
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (state.xp % 100) / 100)
  ctx.stroke()
  ctx.textAlign = 'center'
  text(ctx, String(level), cx, cy - 26, 88, { color: INK, weight: '800' })
  text(ctx, 'LEVEL', cx, cy + 20, 16, { color: SOFT, weight: '700', caps: true })
  text(ctx, `${state.xp} XP total`, cx, cy + 52, 16, { color: TRAVELED, weight: '700' })
  ctx.textAlign = 'left'

  // stat tiles
  const tiles = [
    { label: 'today', value: `+${today.xpToday}`, sub: 'XP earned today' },
    { label: 'streak', value: `${state.streak}`, sub: state.streak === 1 ? 'day in a row' : 'days in a row' },
    { label: 'lessons', value: `${count}/${totalLessons}`, sub: 'lessons completed' },
    { label: 'badges', value: `${earned}/${achievements.length}`, sub: 'achievements unlocked' },
  ]
  const tileW = 288
  const tileH = 108
  tiles.forEach((t, i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const x = 520 + col * (tileW + 24)
    const y = 268 + row * (tileH + 20)
    ctx.fillStyle = CARD
    roundRect(ctx, x, y, tileW, tileH, 18)
    ctx.fill()
    ctx.strokeStyle = CARD_LINE
    ctx.lineWidth = 1
    roundRect(ctx, x, y, tileW, tileH, 18)
    ctx.stroke()
    text(ctx, t.label.toUpperCase(), x + 20, y + 30, 12, { color: SOFT, weight: '700' })
    text(ctx, String(t.value), x + 20, y + 74, 38, { color: INK, weight: '800' })
    text(ctx, t.sub, x + 20, y + 96, 12, { color: SOFT })
  })

  // metro line
  const stations = 9
  const pts: { x: number; y: number }[] = []
  const left = 90
  const right = W - 90
  const baseY = 556
  for (let i = 0; i < stations; i += 1) {
    const x = left + (i * (right - left)) / (stations - 1)
    const y = baseY + Math.sin((i / (stations - 1)) * Math.PI * 1.7) * 44
    pts.push({ x, y })
  }
  const lineTo = Math.max(1, Math.round((count / Math.max(1, totalLessons)) * (stations - 1)) + 1)
  ctx.lineWidth = 6
  ctx.lineCap = 'round'
  ctx.strokeStyle = TRACK
  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i < stations; i += 1) {
    ctx.quadraticCurveTo(pts[i - 1].x + (pts[i].x - pts[i - 1].x) / 2, pts[i - 1].y, pts[i].x, pts[i].y)
  }
  ctx.stroke()
  ctx.strokeStyle = TRAVELED
  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i < Math.min(lineTo, stations); i += 1) {
    ctx.quadraticCurveTo(pts[i - 1].x + (pts[i].x - pts[i - 1].x) / 2, pts[i - 1].y, pts[i].x, pts[i].y)
  }
  ctx.stroke()
  pts.forEach((p, i) => {
    ctx.beginPath()
    ctx.arc(p.x, p.y, i < lineTo ? 9 : 8, 0, Math.PI * 2)
    ctx.fillStyle = i < lineTo ? TRAVELED : '#171d2b'
    ctx.fill()
    if (i >= lineTo) {
      ctx.strokeStyle = TRACK
      ctx.lineWidth = 2
      ctx.stroke()
    }
  })

  text(ctx, '\u2014 today\u2019s station: keep riding the line \u2014', 60, H - 26, 13, { color: SOFT, weight: '600' })
  ctx.textAlign = 'right'
  text(ctx, 'made with speakout-b1', W - 60, H - 26, 13, { color: SOFT })
  ctx.textAlign = 'left'

  return canvas.toDataURL('image/jpeg', 0.92)
}

export async function shareCardBlob(state: ProgressState, totalLessons: number): Promise<Blob> {
  const data = drawShareCard(state, totalLessons)
  const res = await fetch(data)
  return res.blob()
}