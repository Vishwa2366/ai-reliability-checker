import { truncate, getScoreLabel, formatScore } from '../utils/helpers'

export default function Dashboard({ history }) {
  const total = history.length
  const avg = total ? Math.round(history.reduce((s, h) => s + h.score, 0) / total) : 0
  const high = history.filter((h) => h.score >= 80).length
  const low  = history.filter((h) => h.score < 50).length

  return (
    <main className="container">
      <section className="hero" style={{ paddingBottom: '1.5rem' }}>
        <div className="hero-badge"><span className="hero-badge-dot" />Session History</div>
        <h1>Your Analysis Dashboard</h1>
        <p>Overview of content you've analyzed during this session.</p>
      </section>

      <div className="dash-grid">
        <StatCard val={total} label="Total Analyses" />
        <StatCard val={`${avg}%`} label="Average Score" />
        <StatCard val={high} label="High Reliability" color="#22c55e" />
        <StatCard val={low}  label="Low Reliability"  color="#ef4444" />
      </div>

      <h2 style={{ marginTop: '2.5rem', fontWeight: 700, fontSize: '1.05rem', color: 'var(--muted)', letterSpacing: '-0.01em' }}>
        Recent Checks
      </h2>

      {history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <p>No analyses yet. Head to the Home page to get started.</p>
        </div>
      ) : (
        <div className="history-list">
          {[...history].reverse().map((item, i) => {
            const { label, color } = getScoreLabel(item.score)
            return (
              <div className="history-item" key={i}>
                <div className="history-snippet">
                  <span>{truncate(item.input, 60)}</span>
                  {new Date(item.ts).toLocaleTimeString()} · {label}
                </div>
                <span className="history-score" style={{ color }}>
                  {formatScore(item.score)}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}

function StatCard({ val, label, color }) {
  return (
    <div className="dash-stat">
      <span className="dash-stat-val" style={color ? { WebkitTextFillColor: color, backgroundImage: 'none' } : {}}>{val}</span>
      <span className="dash-stat-lbl">{label}</span>
    </div>
  )
}
