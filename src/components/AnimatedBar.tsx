import { useEffect, useState } from 'react'

export default function AnimatedBar({
  value,
  className = '',
  bar = '',
}: {
  value: number
  className?: string
  bar?: string
}) {
  const [w, setW] = useState(0)

  useEffect(() => {
    const t = window.setTimeout(() => setW(Math.max(0, Math.min(100, value))), 40)
    return () => window.clearTimeout(t)
  }, [value])

  return (
    <div className={`overflow-hidden rounded-full bg-[var(--line)] ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${bar}`}
        style={{ width: `${w}%` }}
      />
    </div>
  )
}