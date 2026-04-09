import ScoreBar from './ScoreBar'

const TYPE_ICON = { text: '📝', url: '🔗', image: '🖼️' }

export default function ResultCard({ result }) {
  const { score, explanation, type, tags = [] } = result

  return (
    <div className="result-card">
      <div className="result-header">
        <span>{TYPE_ICON[type] ?? '🔍'}</span>
        <span>Analysis Result</span>
      </div>

      <ScoreBar score={score} />

      <div className="result-divider" />

      <p className="result-explanation">{explanation}</p>

      {tags.length > 0 && (
        <div className="result-meta">
          {tags.map((tag) => (
            <span className="result-tag" key={tag}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  )
}
