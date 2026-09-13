import type { VideoRef } from '../types/content'
import { BUNDLED_VIDEOS, videoSrc } from '../lib/videos'
import { IconVideo } from './Icons'

export function VideoCard({ video }: { video: VideoRef }) {
  const bundled = BUNDLED_VIDEOS.has(video.file)

  return (
    <div className="group overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-lg">
      {bundled ? (
        <video
          src={videoSrc(video.file)}
          controls
          preload="metadata"
          playsInline
          className="aspect-video w-full bg-black"
          aria-label={video.title}
        />
      ) : (
        <div className="flex items-start gap-3 p-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent-100 text-accent-700 dark:bg-accent-950 dark:text-accent-300">
            <IconVideo size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold leading-snug">{video.title}</h4>
            <p className="mt-1 font-mono text-xs text-[var(--ink-faint)]">{video.file}</p>
            {video.page && <span className="mt-1 inline-block text-xs text-[var(--ink-faint)]">Book page {video.page}</span>}
            {video.note && <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-soft)]">{video.note}</p>}
          </div>
        </div>
      )}
      {bundled && (
        <div className="px-4 py-3">
          <h4 className="text-sm font-semibold leading-snug">{video.title}</h4>
          <div className="mt-1 flex flex-wrap gap-3 text-xs text-[var(--ink-faint)]">
            <span className="font-mono">{video.file}</span>
            {video.page && <span>Book page {video.page}</span>}
            <span>No autoplay</span>
          </div>
        </div>
      )}
    </div>
  )
}
