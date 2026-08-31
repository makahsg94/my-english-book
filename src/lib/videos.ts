// Registry of BBC videos bundled in public/videos/ (copied from the source media pack).
// Content files reference videos by their source pack filename; VideoCard plays any
// file listed here and falls back to a placeholder card for the rest.
export const BUNDLED_VIDEOS: ReadonlySet<string> = new Set([
  'SO3 A2 U1 BBC StreetInt.mp4',
  'SO3 A2 U1 BBC Vlogs.mp4',
  'SO3 A2 U2 BBC Programmes.mp4',
  'SO3 A2 U2 BBC Vlogs.mp4',
  'SO3 A2 U3 BBC StreetInt.mp4',
  'SO3 A2 U3 BBC Vlogs.mp4',
  'SO3 A2 U4 BBC Programmes.mp4',
  'SO3 A2 U4 BBC Vlogs.mp4',
  'SO3 A2 U5 BBC StreetInt.mp4',
  'SO3 A2 U5 BBC Vlogs.mp4',
  'SO3 A2 U6 BBC Programmes.mp4',
  'SO3 A2 U6 BBC Vlogs (1).mp4',
  'SO3 A2 U7 BBC StreetInt.mp4',
  'SO3 A2 U7 BBC Vlogs.mp4',
  'SO3 A2 U8 BBC Programmes.mp4',
  'SO3 A2 U8 BBC Vlogs.mp4',
])

export function videoSrc(file: string): string {
  return `/videos/${encodeURI(file)}`
}