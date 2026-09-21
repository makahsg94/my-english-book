import { useCallback, useState } from 'react'

export interface SpeechSettings {
  accent: 'en-GB' | 'en-US'
  rate: number
}

export const SPEECH_DEFAULT: SpeechSettings = { accent: 'en-GB', rate: 0.9 }
export const SPEECH_STORAGE_KEY = 'speakout-a2.speech.v1'
const LEGACY_KEY = 'review-speech-settings'

export const ACCENTS = [
  { id: 'en-GB', label: 'بريطاني' },
  { id: 'en-US', label: 'أمريكي' },
] as const

export const SPEEDS = [
  { id: 'slow', label: 'بطيء', rate: 0.6 },
  { id: 'normal', label: 'عادي', rate: 0.9 },
  { id: 'fast', label: 'سريع', rate: 1.3 },
] as const

export function loadSpeech(): SpeechSettings {
  const read = (key: string): SpeechSettings | null => {
    try {
      const raw = window.localStorage.getItem(key)
      if (!raw) return null
      const parsed = JSON.parse(raw) as Partial<SpeechSettings>
      return {
        accent: parsed.accent === 'en-US' ? 'en-US' : 'en-GB',
        rate: typeof parsed.rate === 'number' ? parsed.rate : SPEECH_DEFAULT.rate,
      }
    } catch {
      return null
    }
  }
  const legacy = read(LEGACY_KEY)
  const current = read(SPEECH_STORAGE_KEY)
  if (current) return current
  if (legacy) {
    saveSpeech(legacy)
    return legacy
  }
  return SPEECH_DEFAULT
}

export function saveSpeech(settings: SpeechSettings) {
  try {
    window.localStorage.setItem(SPEECH_STORAGE_KEY, JSON.stringify(settings))
  } catch {
    /* storage unavailable – ignore */
  }
}

export function sayWord(word: string, settings: SpeechSettings) {
  if (!('speechSynthesis' in window) || !word.trim()) return
  const synth = window.speechSynthesis
  synth.cancel()

  const parts = word
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean)
  const texts = parts.length > 0 ? parts : [word.trim()]

  const makeUtterance = (text: string) => {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = settings.accent
    u.rate = settings.rate
    const voices = synth.getVoices()
    const voice =
      voices.find((v) => v.lang.toLowerCase().startsWith(settings.accent.toLowerCase())) ??
      voices.find((v) => v.lang.toLowerCase().startsWith('en'))
    if (voice) u.voice = voice
    return u
  }

  const speakNext = (i: number) => {
    if (i >= texts.length) return
    const u = makeUtterance(texts[i])
    const next = () => {
      if (i + 1 < texts.length) window.setTimeout(() => speakNext(i + 1), 200)
    }
    u.onend = next
    u.onerror = next
    synth.speak(u)
  }

  speakNext(0)
}

export function useSpeech() {
  const [speech, setSpeechState] = useState<SpeechSettings>(() => loadSpeech())
  const setSpeech = useCallback((next: SpeechSettings) => {
    setSpeechState(next)
    saveSpeech(next)
  }, [])
  return { settings: speech, setSettings: setSpeech }
}