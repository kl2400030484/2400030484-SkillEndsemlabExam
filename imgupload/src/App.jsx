import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [previews, setPreviews] = useState([])

  function handleFiles(e) {
    const files = Array.from(e.target.files || [])
    // revoke previous object URLs
    previews.forEach(p => URL.revokeObjectURL(p.url))
    const next = files.map(f => ({
      name: f.name,
      url: URL.createObjectURL(f),
      size: f.size,
      type: f.type,
    }))
    setPreviews(next)
  }

  function removePreview(index) {
    setPreviews(prev => {
      const item = prev[index]
      if (item) URL.revokeObjectURL(item.url)
      return prev.filter((_, i) => i !== index)
    })
  }

  function clearAll() {
    previews.forEach(p => URL.revokeObjectURL(p.url))
    setPreviews([])
  }

  return (
    <>
      
      <p className="read-the-docs">
        Click on the below so that you can upload and preview images!
      </p>

      <div style={{ marginTop: 20 }}>
        <label style={{ display: 'block', marginBottom: 8 }}>
          Select images:
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            style={{ display: 'block', marginTop: 8 }}
          />
        </label>

        {previews.length > 0 && (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {previews.map((p, i) => (
                <div
                  key={p.url}
                  style={{
                    width: 140,
                    border: '1px solid #ddd',
                    padding: 8,
                    borderRadius: 6,
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={p.url}
                    alt={p.name}
                    style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 4 }}
                  />
                  <div style={{ marginTop: 6, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.name}
                  </div>
                  <button
                    type="button"
                    onClick={() => removePreview(i)}
                    style={{ marginTop: 6 }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12 }}>
              <button type="button" onClick={clearAll}>
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App;
