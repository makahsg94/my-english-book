// Tiny zero-dependency confetti burst. Purely decorative; honors
// prefers-reduced-motion. The host canvas is mounted once in App.

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  w: number
  h: number
  rot: number
  vr: number
  color: string
  born: number
  ttl: number
}

const COLORS = ['#0ea5e9', '#f59e0b', '#10b981', '#8b5cf6', '#f43f5e', '#14b8a6']

const burstListeners = new Set<() => void>()
let particles: Particle[] = []
let rafId = 0
let ctx: CanvasRenderingContext2D | null = null
let dpr = 1

function startLoop() {
  if (rafId) return
  let last = performance.now()
  const tick = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    if (!ctx) {
      particles = []
      rafId = 0
      return
    }
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    particles = particles.filter((p) => now - p.born < p.ttl)
    for (const p of particles) {
      p.vy += 900 * dt
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.rot += p.vr * dt
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      ctx.globalAlpha = 1 - Math.max(0, (now - p.born) / p.ttl) * 0.6
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      ctx.restore()
    }
    if (particles.length > 0) {
      rafId = requestAnimationFrame(tick)
    } else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      rafId = 0
    }
  }
  rafId = requestAnimationFrame(tick)
}

export function burstConfetti() {
  for (const l of burstListeners) l()
}

export function ConfettiHost() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    dpr = Math.min(2, window.devicePixelRatio || 1)
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      ctx = canvas.getContext('2d')
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const x = window.innerWidth / 2
      const y = window.innerHeight * 0.28
      for (let i = 0; i < 150; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 280 + Math.random() * 380
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 220,
          w: 6 + Math.random() * 6,
          h: 4 + Math.random() * 5,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 14,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          born: performance.now(),
          ttl: 1000 + Math.random() * 700,
        })
      }
      startLoop()
    }
    burstListeners.add(spawn)

    return () => {
      burstListeners.delete(spawn)
      window.removeEventListener('resize', resize)
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
      particles = []
      canvas.width = 0
    }
  }, [])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[70]" />
}