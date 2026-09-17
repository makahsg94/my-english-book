// Shared, module-level audio engine so that several AudioPlayer instances and the
// floating MiniPlayer stay in sync. Only one track plays at a time (like a radio).

export interface Playhead {
  instance: number
  file: string
  label: string
  playing: boolean
  position: number
  duration: number
}

export const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]

let audio: HTMLAudioElement | null = null
if (typeof Audio !== 'undefined') {
  try {
    audio = new Audio()
  } catch {
    audio = null
  }
}

let rate = 1

let playhead: Playhead | null = null
let seq = 0
const listeners = new Set<() => void>()
const endCallbacks = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

if (audio) {
  audio.addEventListener('timeupdate', () => {
    if (playhead) {
      playhead.position = audio!.currentTime ?? 0
      emit()
    }
  })
  audio.addEventListener('loadedmetadata', () => {
    if (playhead) {
      playhead.duration = Number.isFinite(audio!.duration) ? audio!.duration : 0
      emit()
    }
  })
  audio.addEventListener('play', () => {
    if (playhead) {
      playhead.playing = true
      emit()
    }
  })
  audio.addEventListener('pause', () => {
    if (playhead) {
      playhead.playing = false
      emit()
    }
  })
  audio.addEventListener('ended', () => {
    if (playhead) {
      playhead.playing = false
      playhead.position = 0
    }
    for (const cb of endCallbacks) cb()
    emit()
  })
  audio.addEventListener('error', () => {
    if (playhead) {
      playhead.playing = false
      emit()
    }
  })
}

export function nextInstance(): number {
  return ++seq
}

export function getPlayhead(): Playhead | null {
  return playhead
}

export function getPlaybackRate(): number {
  return rate
}

export function setPlaybackRate(next: number) {
  rate = Math.min(3, Math.max(0.25, next))
  if (audio) audio.playbackRate = rate
  emit()
}

export function subscribePlayhead(fn: () => void): () => void {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export function onEnded(fn: () => void): () => void {
  endCallbacks.add(fn)
  return () => {
    endCallbacks.delete(fn)
  }
}

/** Toggle play/pause, switching to the given track if another one is active. */
export function toggleTrack(file: string, label: string, instance: number) {
  if (!audio) return
  if (playhead && playhead.instance === instance && playhead.file === file) {
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
    return
  }
  audio.src = file
  audio.load()
  audio.playbackRate = rate
  playhead = { instance, file, label, playing: false, position: 0, duration: 0 }
  audio.play().catch(() => {})
  emit()
}

export function seekAudio(seconds: number) {
  if (!audio || !playhead) return
  const max = playhead.duration || seconds
  const target = Math.max(0, Math.min(seconds, max))
  audio.currentTime = target
  playhead.position = target
  emit()
}

export function stepAudio(delta: number) {
  if (!audio || !playhead) return
  const now = audio.currentTime ?? playhead.position
  const max = playhead.duration || now + delta
  const target = Math.max(0, Math.min(now + delta, max))
  audio.currentTime = target
  playhead.position = target
  emit()
}

export function stopAudio() {
  if (audio) {
    audio.pause()
    audio.removeAttribute('src')
    audio.load()
  }
  playhead = null
  emit()
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const s = Math.floor(seconds)
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, '0')}`
}

export function isTrackActive(file: string): boolean {
  return !!playhead && playhead.file === file
}