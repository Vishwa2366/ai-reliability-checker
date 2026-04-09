import { useEffect, useRef } from 'react'

export default function Loader() {
  const ref = useRef(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <div className="loader-wrap" ref={ref} tabIndex={-1} aria-live="polite" aria-label="Analyzing content">
      <div className="spinner" />
      <p className="loader-text">Analyzing content with AI…</p>
    </div>
  )
}
