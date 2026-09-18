// Lightweight sound effects built on WebAudio — no audio files, no libraries.
// Toggled via a preference flag stored in localStorage ("speakout-b1.sound").

export type SoundName =
  | 'tap'
  | 'correct'
  | 'wrong'
  | 'xp'
  | 'achievement'
  | 'levelup'
  | 'write'
  | 'star'
  | 'echo'

const KEY = 'speakout-b1.sound.on'
let enabled = loadFlag()
let ctx: AudioContext | null = null

function loadFlag(): boolean {
  try {
    return localStorage.getItem(KEY) !== 'off'
  } catch {
    return true
  }
}

export function soundEnabled() {
  return enabled
}

export function setSoundEnabled(on: boolean) {
  enabled = on
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    /* ignore */
  }
}

function ensureCtx(): AudioContext | null {
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    if (!ctx) ctx = new AC()
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function tone(
  ctx: AudioContext,
  freq: number,
  start: number,
  dur: number,
  opts: { type?: OscillatorType; gain?: number; slide?: number } = {},
) {
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  const peak = opts.gain ?? 0.06
  const t0 = ctx.currentTime + start
  osc.type = opts.type ?? 'sine'
  osc.frequency.setValueAtTime(freq, t0)
  if (opts.slide) osc.frequency.exponentialRampToValueAtTime(Math.max(30, opts.slide), t0 + dur)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(peak, t0 + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(g)
  g.connect(ctx.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.02)
}

function seq(freqs: number[], opts?: { type?: OscillatorType; gain?: number; step?: number; hold?: number }) {
  const c = ensureCtx()
  if (!c) return
  const step = opts?.step ?? 0.11
  const hold = opts?.hold ?? 0.16
  freqs.forEach((f, i) => tone(c, f, i * step, hold, opts))
}

export function playSound(name: SoundName) {
  if (!enabled) return
  switch (name) {
    case 'tap':
      seq([360], { type: 'sine', gain: 0.03, hold: 0.06 })
      break
    case 'correct':
      seq([523.25, 783.99], { type: 'sine', gain: 0.05, step: 0.09, hold: 0.14 })
      break
    case 'wrong':
      seq([176], { type: 'square', gain: 0.028, hold: 0.22 })
      break
    case 'xp':
      seq([659.25, 880], { type: 'sine', gain: 0.05, step: 0.08, hold: 0.12 })
      break
    case 'achievement':
      seq([523.25, 659.25, 783.99, 1046.5], { type: 'triangle', gain: 0.05, step: 0.11, hold: 0.2 })
      break
    case 'levelup':
      seq([659.25, 783.99, 987.77, 1318.5, 1567.98], { type: 'triangle', gain: 0.05, step: 0.11, hold: 0.24 })
      break
    case 'write':
      seq([587.33, 880], { type: 'sine', gain: 0.045, step: 0.12, hold: 0.18 })
      break
    case 'star':
      seq([1046.5, 1318.5, 1567.98, 2093], { type: 'triangle', gain: 0.05, step: 0.1, hold: 0.18 })
      break
    case 'echo':
      seq([784, 1046.5], { type: 'sine', gain: 0.045, step: 0.07, hold: 0.12 })
      break
  }
}