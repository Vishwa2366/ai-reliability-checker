import { useEffect, useState } from 'react'
import { getScoreLabel, formatScore } from '../utils/helpers'

export default function ScoreBar({ score }) {
  const [width, setWidth] = useState(0)
  const pct = formatScore(score)
  const { label, color } = getScoreLabel(pct)

  useEffect(() => {
    const t = requestAnimationFrame(() => setWidth(pct))
    return () => cancelAnimationFrame(t)
  }, [pct])

  return (
    <div className="score-bar-wrap">
      <div className="score-bar-header">
        <span className="score-bar-label">Reliability Score</span>
        <span className="score-bar-value" style={{ color }}>{pct}</span>
      </div>

      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${width}%`, background: color }}
        />
      </div>

      <span className="score-verdict" style={{ color }}>{label}</span>
    </div>
  )
}
