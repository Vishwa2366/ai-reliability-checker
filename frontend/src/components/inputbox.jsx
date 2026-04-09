import { useState } from 'react'
import { isValidUrl } from '../utils/helpers'

const MAX_CHARS = 2000

export default function InputBox({ onSubmit, loading }) {
  const [mode, setMode] = useState('text')
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')

  const canSubmit = !loading && (
    (mode === 'text' && text.trim().length > 10) ||
    (mode === 'url' && isValidUrl(url.trim()))
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit({ type: mode, text: mode === 'text' ? text.trim() : undefined, url: mode === 'url' ? url.trim() : undefined })
  }

  return (
    <form className="input-section" onSubmit={handleSubmit} noValidate>
      <div className="input-tabs">
        {['text', 'url'].map((m) => (
          <button
            key={m}
            type="button"
            id={`tab-${m}`}
            className={`tab-btn${mode === m ? ' active' : ''}`}
            onClick={() => setMode(m)}
          >
            {m === 'text' ? '📝 Text' : '🔗 URL'}
          </button>
        ))}
      </div>

      {mode === 'text' ? (
        <div className="textarea-wrap">
          <textarea
            id="text-input"
            placeholder="Paste article, claim, or any text to analyze…"
            value={text}
            maxLength={MAX_CHARS}
            onChange={(e) => setText(e.target.value)}
          />
          <span className="char-count">{text.length}/{MAX_CHARS}</span>
        </div>
      ) : (
        <input
          id="url-input"
          type="text"
          placeholder="https://example.com/article"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      )}

      <button className="btn-primary" type="submit" disabled={!canSubmit} id="analyze-btn">
        {loading ? 'Analyzing…' : '⚡ Analyze Reliability'}
      </button>
    </form>
  )
}
