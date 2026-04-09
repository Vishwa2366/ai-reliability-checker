import { useState } from 'react'
import InputBox from '../components/InputBox'
import UploadImage from '../components/UploadImage'
import ResultCard from '../components/ResultCard'
import Loader from '../components/Loader'
import { analyzeContent } from '../services/api'

const MOCK_RESULT = {
  score: 72,
  explanation:
    'The content displays several credible indicators including cited sources and consistent factual claims, though some assertions lack direct evidence. Overall reliability is moderate-to-high.',
  type: 'text',
  tags: ['News', 'Politics', 'Verified Sources'],
}

export default function Home({ addToHistory }) {
  const [mode, setMode] = useState('text')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleAnalyze = async (payload) => {
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const data = await analyzeContent(payload)
      setResult(data)
      addToHistory?.({ ...data, input: payload.text || payload.url || 'Image', ts: Date.now() })
    } catch (err) {
      if (import.meta.env.DEV) {
        // Dev fallback so UI is testable without a running backend
        const mock = { ...MOCK_RESULT, type: payload.type }
        setResult(mock)
        addToHistory?.({ ...mock, input: payload.text || payload.url || 'Image', ts: Date.now() })
      } else {
        setError(err.response?.data?.detail || err.message || 'Something went wrong.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          AI-Powered Analysis
        </div>
        <h1>Is This Information Reliable?</h1>
        <p>Paste text, enter a URL, or upload an image — our AI scores its reliability in seconds.</p>
      </section>

      <div className="card">
        <div className="input-tabs" style={{ marginBottom: '1.25rem' }}>
          {['text', 'image'].map((m) => (
            <button
              key={m}
              type="button"
              id={`mode-${m}`}
              className={`tab-btn${mode === m ? ' active' : ''}`}
              onClick={() => { setMode(m); setResult(null); setError(null) }}
            >
              {m === 'text' ? '📝 Text / URL' : '🖼️ Image'}
            </button>
          ))}
        </div>

        {mode === 'text'
          ? <InputBox onSubmit={handleAnalyze} loading={loading} />
          : <UploadImage onSubmit={handleAnalyze} loading={loading} />}

        {loading && <Loader />}

        {error && (
          <div className="error-box" role="alert">
            ⚠️ {error}
          </div>
        )}

        {result && !loading && <ResultCard result={result} />}
      </div>
    </main>
  )
}
