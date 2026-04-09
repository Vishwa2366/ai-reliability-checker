import { useState, useCallback } from 'react'

const ACCEPT = 'image/png,image/jpeg,image/webp,image/gif'

export default function UploadImage({ onSubmit, loading }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [drag, setDrag] = useState(false)

  const pick = (f) => {
    if (!f || !f.type.startsWith('image/')) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDrag(false)
    pick(e.dataTransfer.files[0])
  }, [])

  const remove = () => {
    if (preview) URL.revokeObjectURL(preview)
    setFile(null)
    setPreview(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file || loading) return
    onSubmit({ type: 'image', image: file })
  }

  return (
    <form className="input-section" onSubmit={handleSubmit} noValidate>
      {!preview ? (
        <label
          className={`upload-zone${drag ? ' drag-over' : ''}`}
          htmlFor="image-upload"
          onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
          onDragLeave={() => setDrag(false)}
          onDrop={handleDrop}
        >
          <input
            id="image-upload"
            type="file"
            accept={ACCEPT}
            onChange={(e) => pick(e.target.files[0])}
          />
          <span className="upload-icon">🖼️</span>
          <p>Drag & drop an image or <strong>browse</strong></p>
          <p style={{ fontSize: '0.78rem' }}>PNG, JPG, WEBP, GIF · max 10 MB</p>
        </label>
      ) : (
        <div className="upload-preview">
          <img src={preview} alt="Preview of selected image" />
          <button className="preview-remove" type="button" onClick={remove} aria-label="Remove image">✕</button>
        </div>
      )}

      <button className="btn-primary" type="submit" disabled={!file || loading} id="analyze-image-btn">
        {loading ? 'Analyzing…' : '⚡ Analyze Image'}
      </button>
    </form>
  )
}
